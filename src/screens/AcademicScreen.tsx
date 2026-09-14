import { useEffect, useRef, useState } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Fields";
import { Select, Card, Notice, ActionBar } from "../components/Controls";
import {
  calculateAverage,
  parseGrade,
  patchGrade,
  validateAcademic,
  type AcademicData,
  type Assessment,
  type Grade,
  type GradeSettings,
} from "../domain/academic";
import { loadAcademic, saveAcademic } from "../data/academicRepository";
import { entityId } from "../data/localStore";
import type { ClassRoom, Student } from "../domain/models";
import { exportText } from "../data/export";
import { csvCell } from "../domain/reports";
import { capabilitiesFor, type EducationConfig } from "../domain/education";
import { confirmAction } from "../core/recovered.js";
const gradeEmpty: Grade = {
  valor: null,
  conceito: "",
  parecer: "",
  status: "pendente",
};
type Props = {
  turma: ClassRoom & EducationConfig;
  alunos: Student[];
  onBack: () => void;
  studentId?: string;
  goTo?: (route: string) => void;
  onDirtyChange?: (dirty: boolean) => void;
};
export function AcademicScreen({
  turma,
  alunos,
  onBack,
  studentId,
  goTo,
  onDirtyChange,
}: Props) {
  const [data, setData] = useState<AcademicData | null>(null),
    [error, setError] = useState(""),
    [saving, setSaving] = useState(false),
    [status, setStatus] = useState(""),
    [selected, setSelected] = useState(""),
    [editor, setEditor] = useState<Assessment | null>(null),
    [config, setConfig] = useState<GradeSettings | null>(null),
    [period, setPeriod] = useState(""),
    [component, setComponent] = useState(""),
    [archived, setArchived] = useState(false),
    [bulk, setBulk] = useState(""),
    [unsaved, setUnsaved] = useState(false),
    [invalidRows, setInvalidRows] = useState<Record<string, boolean>>({});
  const latest = useRef<AcademicData | null>(null),
    queue = useRef(Promise.resolve());
  const caps = capabilitiesFor(turma);
  const reload = () => {
    setError("");
    loadAcademic(turma.id)
      .then((next) => {
        latest.current = next;
        setData(next);
      })
      .catch(() =>
        setError("Não foi possível carregar as avaliações. Tente novamente."),
      );
  };
  useEffect(() => {
    reload();
  }, [turma.id]);
  useEffect(() => () => onDirtyChange?.(false), [onDirtyChange]);
  const invalid = Object.values(invalidRows).some(Boolean);
  useEffect(() => {
    onDirtyChange?.(!!editor || !!config || unsaved || invalid);
  }, [editor, config, unsaved, invalid, onDirtyChange]);
  const persist = async (next: AcademicData) => {
    validateAcademic(next);
    latest.current = next;
    setData(next);
    setSaving(true);
    setError("");
    setStatus("Salvando…");
    setUnsaved(true);
    const write = queue.current
      .catch(() => {})
      .then(() => saveAcademic(turma.id, next));
    queue.current = write;
    try {
      await write;
      if (queue.current === write) {
        setStatus("Salvo neste dispositivo");
        setUnsaved(false);
      }
    } catch (e) {
      if (queue.current === write) {
        setError(e instanceof Error ? e.message : "Não foi possível salvar.");
        setStatus("Alterações ainda não salvas");
      }
      throw e;
    } finally {
      if (queue.current === write) setSaving(false);
    }
  };
  const attempt = async (action: () => Promise<void>) => {
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível salvar.");
    }
  };
  const changeGrade = (
    assessmentId: string,
    id: string,
    patch: Partial<Grade>,
  ) =>
    attempt(async () => {
      const current = latest.current!;
      await persist({
        ...current,
        avaliacoes: current.avaliacoes.map((a) =>
          a.id === assessmentId
            ? {
                ...a,
                notas: {
                  ...a.notas,
                  [id]: patchGrade(
                    a.notas[id] || gradeEmpty,
                    patch,
                    current.config.sistema,
                  ),
                },
              }
            : a,
        ),
      });
    });
  const startNew = () => {
    const first = data!.config.periodos.find((p) => !p.arquivado);
    setEditor({
      id: entityId("avaliacao"),
      titulo: "",
      componente:
        (turma.componentesCurriculares as string[] | undefined)?.[0] || "",
      data: new Date().toLocaleDateString("en-CA"),
      periodoId: first?.id || "",
      tipo: "Prova",
      maximo: data!.config.escala,
      peso: 1,
      descricao: "",
      notas: {},
    });
    onDirtyChange?.(true);
  };
  const assessments =
    data?.avaliacoes.filter(
      (a) =>
        !!a.arquivadaEm === archived &&
        (!period || a.periodoId === period) &&
        (!component || a.componente === component),
    ) || [];
  const selectedAssessment = data?.avaliacoes.find((a) => a.id === selected);
  const students = studentId
    ? alunos.filter((s) => s.id === studentId)
    : alunos;
  const exportGrades = () =>
    attempt(async () => {
      const rows = [
        [
          "Aluno",
          "Período",
          "Componente",
          "Avaliação",
          "Nota",
          "Conceito",
          "Situação",
          "Parecer",
        ],
        ...assessments.flatMap((a) =>
          students.map((s) => {
            const g = a.notas[s.id];
            return [
              s.nome,
              data!.config.periodos.find((p) => p.id === a.periodoId)?.nome ||
                "",
              a.componente,
              a.titulo,
              g?.valor ?? "",
              g?.conceito || "",
              g?.status || "pendente",
              g?.parecer || "",
            ];
          }),
        ),
      ];
      await exportText(
        "avaliacoes.csv",
        "\ufeff" + rows.map((row) => row.map(csvCell).join(";")).join("\r\n"),
        "text/csv",
      );
    });
  return (
    <section>
      <ScreenHeader
        title={
          editor
            ? "Avaliação"
            : config
              ? "Sistema de avaliação"
              : selectedAssessment
                ? selectedAssessment.titulo
                : "Notas e desempenho"
        }
        subtitle={turma.nome}
        onBack={async () => {
          if (saving) return;
          if (editor || config) {
            if (
              !(await confirmAction({
                title: "Sair da edição?",
                message:
                  "As alterações deste formulário ainda não foram salvas.",
                confirmLabel: "Descartar alterações",
              }))
            )
              return;
            setEditor(null);
            setConfig(null);
          } else if (selected) {
            if (unsaved || invalid) {
              if (
                !(await confirmAction({
                  title: "Sair dos resultados?",
                  message:
                    "Há alterações não salvas ou notas inválidas. Você pode continuar editando para corrigi-las.",
                  confirmLabel: "Sair mesmo assim",
                }))
              )
                return;
            }
            setInvalidRows({});
            setSelected("");
          } else onBack();
        }}
      />
      <div className="module-content">
        {error && <Notice error>{error}</Notice>}
        {status && (
          <Notice>
            {invalid
              ? "Há notas inválidas. Corrija os campos destacados; os demais resultados são salvos automaticamente."
              : status}
          </Notice>
        )}
        {error && latest.current && (
          <button
            className="secondary-button"
            onClick={() => attempt(() => persist(latest.current!))}
          >
            Tentar salvar novamente
          </button>
        )}
        {!data && (
          <button className="secondary-button" onClick={reload}>
            Carregar avaliações
          </button>
        )}
        {data &&
          (!caps.notas ? (
            <Card>
              <h2>Acompanhamento qualitativo</h2>
              <p>
                Esta turma está configurada sem notas. Os registros e o
                portfólio continuam disponíveis, assim como as avaliações
                guardadas anteriormente.
              </p>
              {goTo && (
                <button
                  className="secondary-button"
                  onClick={() => goTo("gerenciar-turmas")}
                >
                  Configurar módulos da turma
                </button>
              )}
            </Card>
          ) : null)}
        {data && config ? (
          <Card>
            <h2>Como esta turma é avaliada?</h2>
            <Select
              label="Sistema"
              value={config.sistema}
              onChange={(e) =>
                setConfig({
                  ...config,
                  sistema: e.target.value as GradeSettings["sistema"],
                })
              }
            >
              <option value="nota_numerica">Nota numérica</option>
              <option value="conceito">Conceitos</option>
              <option value="qualitativa">Qualitativa</option>
              <option value="mista">Modelo misto</option>
            </Select>
            <div className="two-fields">
              <Input
                label="Escala máxima"
                type="number"
                min="1"
                value={config.escala}
                onChange={(e) =>
                  setConfig({ ...config, escala: Number(e.target.value) })
                }
              />
              <Input
                label="Limite para alerta (opcional)"
                type="number"
                min="0"
                value={config.limite ?? ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    limite:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </div>
            <Select
              label="Cálculo das médias"
              value={config.metodo}
              onChange={(e) =>
                setConfig({
                  ...config,
                  metodo: e.target.value as GradeSettings["metodo"],
                })
              }
            >
              <option value="simples">Média simples</option>
              <option value="ponderada">Média ponderada pelos pesos</option>
              <option value="soma">Soma dos pontos</option>
              <option value="personalizada">Fórmula personalizada</option>
            </Select>
            {config.metodo === "personalizada" && (
              <>
                <Input
                  label="Fórmula"
                  placeholder="A1 * 0,4 + A2 * 0,6"
                  value={config.formula ?? ""}
                  onChange={(e) => setConfig({ ...config, formula: e.target.value })}
                />
                <p className="helper-text">Use A1, A2… na ordem das avaliações, números e + − × ÷. Exemplo: A1 * 0,4 + A2 * 0,6.</p>
              </>
            )}
            <Input
              label="Conceitos, separados por vírgula"
              value={config.conceitos.join(",")}
              onChange={(e) =>
                setConfig({ ...config, conceitos: e.target.value.split(",") })
              }
            />
            <h2>Períodos avaliativos</h2>
            <p>
              Defina os períodos usados pela sua escola. Arquivar mantém o
              histórico.
            </p>
            {config.periodos.map((p) => (
              <fieldset key={p.id}>
                <legend>{p.nome || "Período"}</legend>
                <Input
                  label="Nome"
                  value={p.nome}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      periodos: config.periodos.map((x) =>
                        x.id === p.id ? { ...x, nome: e.target.value } : x,
                      ),
                    })
                  }
                />
                <div className="two-fields">
                  <Input
                    type="date"
                    label="Início"
                    value={p.inicio}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        periodos: config.periodos.map((x) =>
                          x.id === p.id ? { ...x, inicio: e.target.value } : x,
                        ),
                      })
                    }
                  />
                  <Input
                    type="date"
                    label="Fim"
                    value={p.fim}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        periodos: config.periodos.map((x) =>
                          x.id === p.id ? { ...x, fim: e.target.value } : x,
                        ),
                      })
                    }
                  />
                </div>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={!!p.arquivado}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        periodos: config.periodos.map((x) =>
                          x.id === p.id
                            ? { ...x, arquivado: e.target.checked }
                            : x,
                        ),
                      })
                    }
                  />
                  Arquivado
                </label>
              </fieldset>
            ))}
            <button
              className="secondary-button"
              onClick={() =>
                setConfig({
                  ...config,
                  periodos: [
                    ...config.periodos,
                    { id: entityId("periodo"), nome: "", inicio: "", fim: "" },
                  ],
                })
              }
            >
              Adicionar período
            </button>
            {!config.periodos.length && (
              <ActionBar>
                {[
                  [4, "Bimestre"],
                  [3, "Trimestre"],
                  [2, "Semestre"],
                ].map(([count, name]) => (
                  <button
                    className="secondary-button"
                    key={name}
                    onClick={() =>
                      setConfig({
                        ...config,
                        periodos: Array.from(
                          { length: Number(count) },
                          (_, i) => ({
                            id: entityId("periodo"),
                            nome: `${i + 1}º ${name}`,
                            inicio: "",
                            fim: "",
                          }),
                        ),
                      })
                    }
                  >
                    {name}s
                  </button>
                ))}
              </ActionBar>
            )}
            <button
              className="ui-button"
              disabled={saving}
              onClick={() =>
                attempt(async () => {
                  await persist({
                    ...data,
                    config: {
                      ...config,
                      conceitos: config.conceitos
                        .map((s) => s.trim())
                        .filter(Boolean),
                    },
                  });
                  setConfig(null);
                })
              }
            >
              Salvar configuração
            </button>
          </Card>
        ) : null}
        {data && editor ? (
          <Card>
            <Input
              label="Título da avaliação"
              value={editor.titulo}
              onChange={(e) => setEditor({ ...editor, titulo: e.target.value })}
            />
            <Input
              label="Componente curricular"
              list="components"
              value={editor.componente}
              onChange={(e) =>
                setEditor({ ...editor, componente: e.target.value })
              }
            />
            <datalist id="components">
              {((turma.componentesCurriculares as string[]) || []).map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <Input
              type="date"
              label="Data"
              value={editor.data}
              onChange={(e) => setEditor({ ...editor, data: e.target.value })}
            />
            <Select
              label="Período"
              value={editor.periodoId}
              onChange={(e) =>
                setEditor({ ...editor, periodoId: e.target.value })
              }
            >
              <option value="">Selecione</option>
              {data.config.periodos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </Select>
            <Select
              label="Tipo"
              value={editor.tipo}
              onChange={(e) => setEditor({ ...editor, tipo: e.target.value })}
            >
              {[
                "Prova",
                "Atividade",
                "Trabalho",
                "Seminário",
                "Projeto",
                "Participação",
                "Diagnóstica",
                "Formativa",
                "Outro",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
            <div className="two-fields">
              <Input
                type="number"
                min="0.01"
                step="any"
                label="Valor máximo"
                value={editor.maximo}
                onChange={(e) =>
                  setEditor({ ...editor, maximo: Number(e.target.value) })
                }
              />
              <Input
                type="number"
                min="0.01"
                step="any"
                label="Peso"
                value={editor.peso}
                onChange={(e) =>
                  setEditor({ ...editor, peso: Number(e.target.value) })
                }
              />
            </div>
            <Input
              label="Descrição"
              value={editor.descricao}
              onChange={(e) =>
                setEditor({ ...editor, descricao: e.target.value })
              }
            />
            <Select
              label="Recuperação"
              value={editor.recuperacao?.politica || ""}
              onChange={(e) =>
                setEditor({
                  ...editor,
                  recuperacao: e.target.value
                    ? {
                        politica: e.target.value as NonNullable<
                          Assessment["recuperacao"]
                        >["politica"],
                      }
                    : undefined,
                })
              }
            >
              <option value="">Avaliação regular</option>
              <option value="menor">Substituir a menor nota</option>
              <option value="especifica">
                Substituir avaliação específica
              </option>
              <option value="somar">Somar pontos à média</option>
              <option value="separada">Registrar separadamente</option>
            </Select>
            {editor.recuperacao?.politica === "especifica" && (
              <Select
                label="Avaliação a substituir"
                value={editor.recuperacao.avaliacaoId || ""}
                onChange={(e) =>
                  setEditor({
                    ...editor,
                    recuperacao: {
                      politica: "especifica",
                      avaliacaoId: e.target.value,
                    },
                  })
                }
              >
                <option value="">Selecione</option>
                {data.avaliacoes
                  .filter(
                    (a) =>
                      a.id !== editor.id &&
                      !a.recuperacao &&
                      a.periodoId === editor.periodoId &&
                      a.componente === editor.componente,
                  )
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.titulo}
                    </option>
                  ))}
              </Select>
            )}
            <button
              className="ui-button"
              disabled={saving}
              onClick={() =>
                attempt(async () => {
                  const exists = data.avaliacoes.some(
                    (a) => a.id === editor.id,
                  );
                  await persist({
                    ...data,
                    avaliacoes: exists
                      ? data.avaliacoes.map((a) =>
                          a.id === editor.id ? editor : a,
                        )
                      : [...data.avaliacoes, editor],
                  });
                  setSelected(editor.id);
                  setEditor(null);
                })
              }
            >
              Salvar avaliação
            </button>
          </Card>
        ) : null}
        {data && !editor && !config && selectedAssessment ? (
          <>
            <Card>
              <p>
                {selectedAssessment.componente} · Valor{" "}
                {selectedAssessment.maximo} · Peso {selectedAssessment.peso}
              </p>
              <ActionBar>
                <button
                  className="secondary-button"
                  onClick={() => {
                    setEditor(structuredClone(selectedAssessment));
                    onDirtyChange?.(true);
                  }}
                >
                  Editar avaliação
                </button>
                <button
                  className="text-button"
                  onClick={() => {
                    setEditor({
                      ...structuredClone(selectedAssessment),
                      id: entityId("avaliacao"),
                      titulo: `${selectedAssessment.titulo} (cópia)`,
                      notas: {},
                      arquivadaEm: null,
                    });
                    onDirtyChange?.(true);
                  }}
                >
                  Duplicar sem notas
                </button>
              </ActionBar>
              <Input
                label="Nota em lote"
                inputMode="decimal"
                value={bulk}
                onChange={(e) => setBulk(e.target.value)}
              />
              <button
                className="secondary-button"
                disabled={saving || !bulk.trim()}
                onClick={() =>
                  attempt(async () => {
                    const value = parseGrade(bulk, selectedAssessment.maximo);
                    const current = latest.current!;
                    await persist({
                      ...current,
                      avaliacoes: current.avaliacoes.map((a) =>
                        a.id === selectedAssessment.id
                          ? {
                              ...a,
                              notas: {
                                ...a.notas,
                                ...Object.fromEntries(
                                  students
                                    .filter(
                                      (s) =>
                                        !a.notas[s.id] ||
                                        a.notas[s.id].status === "pendente",
                                    )
                                    .map((s) => [
                                      s.id,
                                      {
                                        ...gradeEmpty,
                                        valor: value,
                                        status: "avaliado",
                                      },
                                    ]),
                                ),
                              },
                            }
                          : a,
                      ),
                    });
                    setBulk("");
                  })
                }
              >
                Aplicar somente aos pendentes
              </button>
            </Card>
            {students.map((s) => (
              <GradeRow
                key={`${selectedAssessment.id}-${s.id}`}
                student={s}
                grade={selectedAssessment.notas[s.id] || gradeEmpty}
                config={data.config}
                max={selectedAssessment.maximo}
                onValidationChange={(hasError) =>
                  setInvalidRows((rows) =>
                    rows[s.id] === hasError
                      ? rows
                      : { ...rows, [s.id]: hasError },
                  )
                }
                onSave={(g) => changeGrade(selectedAssessment.id, s.id, g)}
              />
            ))}
            {!students.length && (
              <Notice>Cadastre alunos na turma para lançar resultados.</Notice>
            )}
          </>
        ) : null}
        {data && !editor && !config && !selectedAssessment ? (
          <>
            <ActionBar>
              <button
                className="secondary-button"
                onClick={() => {
                  setConfig(structuredClone(data.config));
                  onDirtyChange?.(true);
                }}
              >
                Configurar períodos e médias
              </button>
              {caps.notas && (
                <button
                  className="ui-button"
                  disabled={!data.config.periodos.some((p) => !p.arquivado)}
                  onClick={startNew}
                >
                  Nova avaliação
                </button>
              )}
            </ActionBar>
            {!data.config.periodos.length && (
              <Notice>Configure os períodos avaliativos para começar.</Notice>
            )}
            <div className="two-fields">
              <Select
                label="Período"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="">Todos</option>
                {data.config.periodos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </Select>
              <Select
                label="Componente"
                value={component}
                onChange={(e) => setComponent(e.target.value)}
              >
                <option value="">Todos</option>
                {[...new Set(data.avaliacoes.map((a) => a.componente))].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  ),
                )}
              </Select>
            </div>
            <label className="check-row">
              <input
                type="checkbox"
                checked={archived}
                onChange={(e) => setArchived(e.target.checked)}
              />
              Ver avaliações arquivadas
            </label>
            {assessments.map((a) => (
              <Card key={a.id}>
                <h2>{a.titulo}</h2>
                <p>
                  {a.componente} · {a.data.split("-").reverse().join("/")} ·{" "}
                  {
                    Object.values(a.notas).filter(
                      (g) => g.status === "avaliado",
                    ).length
                  }{" "}
                  resultados
                </p>
                <ActionBar>
                  <button
                    className="secondary-button"
                    onClick={() => setSelected(a.id)}
                  >
                    Resultados
                  </button>
                  <button
                    className="text-button"
                    onClick={() =>
                      attempt(() =>
                        persist({
                          ...data,
                          avaliacoes: data.avaliacoes.map((x) =>
                            x.id === a.id
                              ? {
                                  ...x,
                                  arquivadaEm: x.arquivadaEm
                                    ? null
                                    : new Date().toISOString(),
                                }
                              : x,
                          ),
                        }),
                      )
                    }
                  >
                    {a.arquivadaEm ? "Restaurar" : "Arquivar"}
                  </button>
                </ActionBar>
              </Card>
            ))}
            {!assessments.length && (
              <Notice>Nenhuma avaliação neste filtro.</Notice>
            )}
            {!archived &&
              students.map((s) => (
                <Card key={s.id}>
                  <h2>{s.nome}</h2>
                  {[
                    ...new Set(
                      assessments.map((a) => `${a.periodoId}|${a.componente}`),
                    ),
                  ].map((key) => {
                    const [p, c] = key.split("|");
                    const result = calculateAverage(
                      s.id,
                      assessments.filter(
                        (a) => a.periodoId === p && a.componente === c,
                      ),
                      data.config,
                    );
                    return (
                      <div key={key}>
                        <strong>
                          {c} ·{" "}
                          {data.config.periodos.find((x) => x.id === p)?.nome}:{" "}
                          {result.value === null
                            ? "Sem nota numérica"
                            : result.value.toLocaleString("pt-BR", {
                                maximumFractionDigits: 2,
                              })}
                        </strong>
                        {result.value !== null &&
                          data.config.limite !== null &&
                          result.value < data.config.limite && (
                            <p className="notice">
                              Abaixo do limite configurado ({data.config.limite}
                              ).
                            </p>
                          )}
                        <details>
                          <summary>Como é calculado</summary>
                          <p>{result.formula}</p>
                          {result.notes.map((n, i) => (
                            <p key={i}>{n}</p>
                          ))}
                        </details>
                      </div>
                    );
                  })}
                </Card>
              ))}
            <button
              className="secondary-button"
              disabled={!assessments.length}
              onClick={exportGrades}
            >
              Exportar avaliações (CSV)
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
}
function GradeRow({
  student,
  grade,
  config,
  max,
  onSave,
  onValidationChange,
}: {
  student: Student;
  grade: Grade;
  config: GradeSettings;
  max: number;
  onSave: (g: Partial<Grade>) => Promise<void>;
  onValidationChange: (invalid: boolean) => void;
}) {
  const [value, setValue] = useState(
      grade.valor === null ? "" : String(grade.valor),
    ),
    [error, setError] = useState("");
  const focused = useRef(false);
  useEffect(() => {
    if (!focused.current)
      setValue(
        grade.valor === null ? "" : String(grade.valor).replace(".", ","),
      );
  }, [grade.valor]);
  const saveValue = (text: string) => {
    try {
      // A trailing decimal separator is an intermediate valid edit ("8," → 8).
      const number = parseGrade(text.replace(/^(\d+)[.,]$/, "$1"), max);
      setError("");
      onValidationChange(false);
      void onSave({ valor: number });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Nota inválida.");
      onValidationChange(true);
    }
  };
  return (
    <Card>
      <h2>{student.nome}</h2>
      {["nota_numerica", "mista"].includes(config.sistema) && (
        <Input
          label={`Nota de ${student.nome} (0–${max})`}
          inputMode="decimal"
          enterKeyHint="next"
          data-grade-input="true"
          aria-invalid={!!error}
          value={value}
          onFocus={() => {
            focused.current = true;
          }}
          onChange={(e) => {
            setValue(e.target.value);
            saveValue(e.target.value);
          }}
          onBlur={() => {
            focused.current = false;
          }}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || error) return;
            event.preventDefault();
            const inputs = [
              ...event.currentTarget
                .closest("section")!
                .querySelectorAll<HTMLInputElement>("input[data-grade-input]"),
            ];
            const next = inputs[inputs.indexOf(event.currentTarget) + 1];
            if (next) {
              next.focus();
              next.select();
            } else event.currentTarget.blur();
          }}
        />
      )}
      {["conceito", "mista"].includes(config.sistema) && (
        <Select
          label="Conceito"
          value={grade.conceito}
          onChange={(e) =>
            void onSave({
              conceito: e.target.value,
            })
          }
        >
          <option value="">Sem conceito</option>
          {config.conceitos.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      )}
      <Select
        label="Situação"
        value={grade.status}
        onChange={(e) =>
          void onSave({ status: e.target.value as Grade["status"] })
        }
      >
        <option value="pendente">Pendente</option>
        <option value="avaliado">Avaliado</option>
        <option value="ausente">Ausente</option>
        <option value="nao_entregue">Não entregue</option>
      </Select>
      <label className="field-label">
        {config.sistema === "qualitativa" ? "Parecer descritivo" : "Observação"}
        <textarea
          rows={3}
          value={grade.parecer}
          onChange={(e) =>
            void onSave({
              parecer: e.target.value,
            })
          }
        />
      </label>
      {error && <Notice error>{error}</Notice>}
    </Card>
  );
}
