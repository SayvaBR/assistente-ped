import { useEffect, useState } from "react";
import {
  Users,
  User,
  CalendarRange,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Fields";
import { Select, Card, Notice } from "../components/Controls";
import { storage, readJson } from "../data/localStore";
import { loadAcademic } from "../data/academicRepository";
import { calculateAverage, type AcademicData } from "../domain/academic";
import { capabilitiesFor, type EducationConfig } from "../domain/education";
import type { Attendance, Student, ClassRoom } from "../domain/models";
import type { PdfDocument, PdfSection } from "../data/pdfExport";
import { buildAttendanceReport, reportCsv } from "../domain/reports";
import { exportText } from "../data/export";
import { loadNotebook } from "../data/notebookRepository";
import type { NotebookEntry } from "../domain/notebook";
const choices = [
  {
    key: "individual",
    name: "Relatório individual",
    description: "Frequência, resultados e registros do aluno",
    Icon: User,
  },
  {
    key: "turma",
    name: "Relatório da turma",
    description: "Acompanhe todos os alunos da turma",
    Icon: Users,
  },
  {
    key: "periodo",
    name: "Relatório por período",
    description: "Consulte um intervalo de datas",
    Icon: CalendarRange,
  },
  {
    key: "personalizado",
    name: "Relatório personalizado",
    description: "Escolha alunos, seções e observações",
    Icon: SlidersHorizontal,
  },
];
type RecordEntry = {
  texto?: string;
  descricao?: string;
  data?: string;
  criadoEm?: string;
  atualizadoEm?: string;
};
function recordDate(record: RecordEntry) {
  const raw = record.criadoEm || record.atualizadoEm || record.data || "";
  return /^\d{2}\/\d{2}\/\d{4}$/.test(raw)
    ? raw.split("/").reverse().join("-")
    : raw.slice(0, 10);
}
export function ReportsScreen({
  onBack,
  alunos = [],
  turma,
  goTo,
}: {
  onBack: () => void;
  alunos: Student[];
  turma?: (ClassRoom & EducationConfig) | null;
  goTo?: (route: string, data?: unknown) => void;
}) {
  const [kind, setKind] = useState(""),
    [from, setFrom] = useState(""),
    [to, setTo] = useState(""),
    [student, setStudent] = useState(""),
    [selected, setSelected] = useState<string[]>([]),
    [notes, setNotes] = useState("");
  const [days, setDays] = useState<Record<string, Attendance>>({}),
    [records, setRecords] = useState<Record<string, RecordEntry[]>>({}),
    [academic, setAcademic] = useState<AcademicData | null>(null),
    [notebook, setNotebook] = useState<NotebookEntry[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [preview, setPreview] = useState(false),
    [sections, setSections] = useState({
      frequencia: true,
      registros: true,
      notas: true,
      caderno: false,
    }),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    if (!turma?.id) {
      setLoading(false);
      setError("");
      return () => {
        active = false;
      };
    }
    setLoading(true);
    setError("");
    (async () => {
      try {
        const prefix = `turma:${turma.id}:chamada:`;
        const attendance: Record<string, Attendance> = {};
        for (const key of (await storage.list(prefix)).keys)
          attendance[key.slice(prefix.length)] = await readJson<Attendance>(
            key,
            {},
          );
        const studentRecords = Object.fromEntries(
          await Promise.all(
            alunos.map(async (s) => [
              s.id,
              await readJson<RecordEntry[]>(`obs:${s.id}`, []),
            ]),
          ),
        );
        const grades = await loadAcademic(turma.id);
        const notes = await loadNotebook(turma.id);
        if (active) {
          setDays(attendance);
          setRecords(studentRecords);
          setAcademic(grades);
          setNotebook(notes.entradas);
        }
      } catch {
        if (active)
          setError(
            "Não foi possível ler os dados para o relatório. Tente novamente.",
          );
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [turma?.id, retry]);
  if (!turma) {
    return (
      <section>
        <ScreenHeader
          title="Relatórios"
          subtitle="Resumo pedagógico e frequência"
          onBack={onBack}
        />
        <div className="module-content">
          <Notice>
            Selecione ou crie uma turma para gerar um relatório com dados
            pedagógicos.
          </Notice>
          {goTo && (
            <button className="ui-button" onClick={() => goTo("gerenciar-turmas")}>
              Gerenciar turmas
            </button>
          )}
        </div>
      </section>
    );
  }
  const invalid = !!from && !!to && from > to;
  const filtered =
    kind === "individual"
      ? alunos.filter((a) => a.id === student)
      : kind === "personalizado"
        ? alunos.filter((a) => selected.includes(a.id))
        : alunos;
  const rows = invalid ? [] : buildAttendanceReport(filtered, days, from, to);
  const caps = capabilitiesFor(turma);
  const dateIncluded = (day: string) =>
    !!day && (!from || day >= from) && (!to || day <= to);
  const content: PdfDocument = {
    title: choices.find((c) => c.key === kind)?.name || "Relatório pedagógico",
    subtitle: `${turma.nome} · ${from || "Início dos registros"} a ${to || "Último registro"}`,
    sections: rows.flatMap((row) => {
      const paragraphs: string[] = [];
      if (sections.frequencia)
        paragraphs.push(
          row.percentage === null
            ? "Sem chamada registrada no período."
            : `Frequência: ${row.percentage}%. Presenças: ${row.presencas}. Atrasos: ${row.atrasos}. Saídas antecipadas: ${row.saidasAntecipadas}. Faltas: ${row.faltas}. Faltas justificadas: ${row.faltasJustificadas}.`,
        );
      if (sections.registros) {
        const entries = (records[row.id] || []).filter((r) =>
          dateIncluded(recordDate(r)),
        );
        paragraphs.push(
          ...entries.map(
            (r) =>
              `${recordDate(r).split("-").reverse().join("/")}: ${r.texto || r.descricao || "Registro com mídia no perfil do aluno."}`,
          ),
        );
        if (!entries.length) paragraphs.push("Sem observações no período.");
      }
      if (sections.notas && caps.notas && academic) {
        const assessments = academic.avaliacoes.filter(
          (a) => !a.arquivadaEm && dateIncluded(a.data),
        );
        const groups = new Map<string, typeof assessments>();
        for (const a of assessments) {
          const key = JSON.stringify([a.periodoId, a.componente]);
          groups.set(key, [...(groups.get(key) || []), a]);
        }
        for (const [key, group] of groups) {
          const [periodId, component] = JSON.parse(key) as string[];
          const average = calculateAverage(row.id, group, academic.config);
          paragraphs.push(
            `${component} · ${academic.config.periodos.find((p) => p.id === periodId)?.nome || ""}: ${average.value === null ? "sem média numérica" : average.value.toLocaleString("pt-BR")}`,
            average.formula,
            ...average.notes,
          );
          for (const a of group) {
            const grade = a.notas[row.id];
            if (grade)
              paragraphs.push(
                `${a.titulo}: ${grade.valor ?? grade.conceito ?? "Sem nota"} · ${grade.status}${grade.parecer ? " · " + grade.parecer : ""}`,
              );
          }
        }
      }
      if (sections.caderno) {
        for (const entry of notebook.filter(
          (e) =>
            !e.excluidaEm &&
            e.alunoIds.includes(row.id) &&
            dateIncluded(e.criadoEm.slice(0, 10)),
        ))
          paragraphs.push(
            `Caderno — ${entry.titulo}`,
            entry.texto,
            ...entry.tarefas.map(
              (t) => `${t.concluida ? "Concluída" : "Pendente"}: ${t.texto}`,
            ),
          );
      }
      return [
        {
          title: row.nome,
          paragraphs: paragraphs.length
            ? paragraphs
            : ["Nenhuma seção selecionada."],
        },
      ];
    }),
  };
  if (sections.caderno && kind !== "individual") {
    const classNotes = notebook.filter(
      (e) =>
        !e.excluidaEm &&
        !e.alunoIds.length &&
        dateIncluded(e.criadoEm.slice(0, 10)),
    );
    content.sections.unshift(
      ...classNotes.map((e) => ({
        title: `Caderno da turma — ${e.titulo}`,
        paragraphs: [
          e.texto,
          ...e.tarefas.map(
            (t) => `${t.concluida ? "Concluída" : "Pendente"}: ${t.texto}`,
          ),
        ],
      })),
    );
  }
  if (notes.trim())
    content.sections.push({
      title: "Observações do professor",
      paragraphs: [notes],
    });
  const exportReport = async (format: "pdf" | "csv") => {
    setBusy(true);
    setError("");
    try {
      if (format === "csv")
        await exportText("frequencia.csv", reportCsv(rows), "text/csv");
      else {
        const { sharePdf } = await import("../data/pdfExport");
        await sharePdf("relatorio-pedagogico.pdf", content);
      }
    } catch {
      setError("Não foi possível exportar o relatório. Tente novamente.");
    } finally {
      setBusy(false);
    }
  };
  const enabled = !busy && !loading && !error && !invalid && rows.length > 0;
  return (
    <section>
      <ScreenHeader
        title={kind ? content.title : "Relatórios"}
        subtitle={turma.nome}
        onBack={
          preview ? () => setPreview(false) : kind ? () => setKind("") : onBack
        }
      />
      <div className="module-content">
        {error && (
          <>
            <Notice error>{error}</Notice>
            <button
              className="secondary-button"
              onClick={() => setRetry((n) => n + 1)}
            >
              Carregar novamente
            </button>
          </>
        )}
        {loading && <Notice>Carregando dados locais…</Notice>}
        {!kind ? (
          choices.map(({ key, name, description, Icon }) => (
            <button
              key={key}
              className="menu-card"
              onClick={() => setKind(key)}
            >
              <span className="menu-icon">
                <Icon size={24} />
              </span>
              <span>
                <strong>{name}</strong>
                <small>{description}</small>
              </span>
              <ChevronRight size={20} />
            </button>
          ))
        ) : preview ? (
          <>
            <Notice>
              Confira o conteúdo antes de exportar ou compartilhar.
            </Notice>
            {content.sections.map((s, i) => (
              <ReportSection key={i} section={s} />
            ))}
            <button
              className="ui-button"
              disabled={!enabled}
              onClick={() => exportReport("pdf")}
            >
              {busy ? "Gerando PDF…" : "Salvar ou compartilhar PDF"}
            </button>
            <button
              className="secondary-button"
              disabled={!enabled}
              onClick={() => exportReport("csv")}
            >
              Exportar frequência (CSV)
            </button>
          </>
        ) : (
          <>
            <Card>
              <div className="two-fields">
                <Input
                  type="date"
                  label="Data inicial"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
                <Input
                  type="date"
                  label="Data final"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              {invalid && (
                <Notice error>
                  A data inicial deve vir antes da data final.
                </Notice>
              )}
              {kind === "individual" && (
                <Select
                  label="Aluno"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                >
                  <option value="">Selecione um aluno</option>
                  {alunos.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nome}
                    </option>
                  ))}
                </Select>
              )}
              {kind === "personalizado" && (
                <fieldset>
                  <legend>Alunos do relatório</legend>
                  {alunos.map((a) => (
                    <label className="check-row" key={a.id}>
                      <input
                        type="checkbox"
                        checked={selected.includes(a.id)}
                        onChange={() =>
                          setSelected((prev) =>
                            prev.includes(a.id)
                              ? prev.filter((id) => id !== a.id)
                              : [...prev, a.id],
                          )
                        }
                      />
                      {a.nome}
                    </label>
                  ))}
                </fieldset>
              )}
              <fieldset>
                <legend>Conteúdo</legend>
                {(
                  [
                    ["frequencia", "Frequência"],
                    ["registros", "Observações pedagógicas"],
                    ["caderno", "Notas do caderno"],
                    ...(caps.notas ? [["notas", "Notas e avaliações"]] : []),
                  ] as [keyof typeof sections, string][]
                ).map(([key, label]) => (
                  <label className="check-row" key={key}>
                    <input
                      type="checkbox"
                      checked={sections[key]}
                      onChange={(e) =>
                        setSections({ ...sections, [key]: e.target.checked })
                      }
                    />
                    {label}
                  </label>
                ))}
              </fieldset>
              <label className="field-label">
                Observações para este relatório
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
            </Card>
            {rows.map((row) => (
              <Card key={row.id}>
                <h2>{row.nome}</h2>
                <p>
                  {row.percentage === null
                    ? "Sem chamada registrada"
                    : `${row.percentage}% de frequência no período`}
                </p>
                <div className="report-counts">
                  <span>
                    <strong>{row.presencas}</strong>Presenças
                  </span>
                  <span>
                    <strong>{row.atrasos}</strong>Atrasos
                  </span>
                  <span>
                    <strong>{row.saidasAntecipadas}</strong>Saídas
                  </span>
                  <span>
                    <strong>{row.faltas}</strong>Faltas
                  </span>
                  <span>
                    <strong>{row.faltasJustificadas}</strong>Justificadas
                  </span>
                </div>
              </Card>
            ))}
            {!alunos.length && (
              <Card>
                <h2>Nenhum aluno cadastrado</h2>
                {goTo && (
                  <button
                    className="secondary-button"
                    onClick={() => goTo("novo-aluno")}
                  >
                    Adicionar aluno
                  </button>
                )}
              </Card>
            )}
            <p className="helper-text">
              Atrasos contam como comparecimento. Dias sem marcação não entram
              no cálculo. Revise os registros e compartilhe apenas com
              destinatários autorizados.
            </p>
            <button
              className="ui-button"
              disabled={!enabled || !Object.values(sections).some(Boolean)}
              onClick={() => setPreview(true)}
            >
              Revisar relatório
            </button>
          </>
        )}
      </div>
    </section>
  );
}
function ReportSection({ section }: { section: PdfSection }) {
  return (
    <Card>
      <h2>{section.title}</h2>
      {section.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </Card>
  );
}
