import { useEffect, useState } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Fields";
import { Card, Notice, Select, ActionBar } from "../components/Controls";
import {
  capabilitiesFor,
  stageLabels,
  stageFrom,
  levelsFor,
  type EducationStage,
} from "../domain/education";
import type { ClassRoom } from "../domain/models";
import {
  loadOrganization,
  type Organization,
} from "../data/organizationRepository";
import { normalizeClass, saveClasses, mh } from "../data/classes.js";
import { storage, entityId } from "../data/localStore";
import { confirmAction } from "../core/recovered.js";
interface Classroom extends ClassRoom {
  etapa?: EducationStage | null;
  componentesCurriculares?: string[];
  escolaId?: string;
  anoLetivoId?: string;
  duracaoAulaMin?: number;
  rotinaInfantilHabilitada?: boolean;
  notasHabilitadas?: boolean;
}
interface Props {
  onBack: () => void;
  turmas: Classroom[];
  turmaAtiva: Classroom | null;
  onAtualizar: (result: unknown) => void;
  onAtivar: (id: string) => Promise<void>;
  onDirtyChange?: (dirty: boolean) => void;
  goTo?: (route: string) => void;
}
export function ClassesScreen({
  onBack,
  turmas,
  turmaAtiva,
  onAtualizar,
  onAtivar,
  onDirtyChange,
  goTo,
}: Props) {
  const [draft, setDraft] = useState<Classroom | null>(null),
    [query, setQuery] = useState(""),
    [archive, setArchive] = useState(false),
    [school, setSchool] = useState(""),
    [year, setYear] = useState(""),
    [error, setError] = useState(""),
    [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false),
    [offline, setOffline] = useState(
      () => typeof navigator !== "undefined" && !navigator.onLine,
    ),
    [org, setOrg] = useState<Organization>({ escolas: [], anos: [] });
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  useEffect(() => {
    loadOrganization()
      .then(setOrg)
      .catch(() => setError("Não foi possível carregar as escolas."));
  }, []);
  useEffect(() => {
    onDirtyChange?.(!!draft);
    return () => onDirtyChange?.(false);
  }, [draft, onDirtyChange]);
  const mutate = async (task: () => Promise<unknown>) => {
    setBusy(true);
    setError("");
    setStatus("");
    try {
      onAtualizar(await task());
      setDraft(null);
      setStatus("Alterações salvas neste dispositivo.");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Não foi possível salvar a turma.",
      );
    } finally {
      setBusy(false);
    }
  };
  const save = () =>
    mutate(async () => {
      if (!draft || !stageFrom(draft.etapa))
        throw new Error("Escolha a etapa de ensino da turma.");
      if (!draft.duracaoAulaMin || draft.duracaoAulaMin < 1)
        throw new Error("Informe a duração da aula.");
      const next = normalizeClass(
        {
          ...draft,
          componentesCurriculares: [
            ...new Set(
              (draft.componentesCurriculares || [])
                .map((name) => name.trim())
                .filter(Boolean),
            ),
          ],
        },
        {
          id: draft.id || entityId("turma"),
          professorId: turmaAtiva?.professorId,
        },
      );
      return saveClasses(
        storage,
        draft.id
          ? turmas.map((c) => (c.id === draft.id ? next : c))
          : [...turmas, next],
        turmaAtiva?.id || next.id,
      );
    });
  const field = <K extends keyof Classroom>(key: K, value: Classroom[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));
  const filtered = turmas.filter(
    (c) =>
      !!c.arquivadaEm === archive &&
      c.nome.toLocaleLowerCase().includes(query.toLocaleLowerCase()) &&
      (!school || c.escolaId === school) &&
      (!year || c.anoLetivoId === year),
  );
  return (
    <section>
      <ScreenHeader
        title="Minhas turmas"
        subtitle="Configuração pedagógica de cada turma"
        onBack={onBack}
      />
      <div className="module-content">
        {offline && (
          <Notice>
            Você está offline. As alterações serão salvas localmente neste
            dispositivo.
          </Notice>
        )}
        {error && <Notice error>{error}</Notice>}
        {status && <Notice>{status}</Notice>}
        {draft ? (
          <Card>
            <h2>{draft.id ? "Editar turma" : "Nova turma"}</h2>
            <Input
              label="Nome da turma"
              value={draft.nome}
              onChange={(e) => field("nome", e.target.value)}
            />
            <Select
              label="Etapa de ensino"
              value={draft.etapa || ""}
              onChange={(e) => {
                const etapa = stageFrom(e.target.value)!;
                setDraft({
                  ...draft,
                  etapa,
                  nivel: "",
                  rotinaInfantilHabilitada: etapa === "educacao_infantil",
                  notasHabilitadas: etapa !== "educacao_infantil",
                });
              }}
            >
              <option value="">Selecione a etapa</option>
              {Object.entries(stageLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
            <Input
              label="Ano, série ou faixa"
              list="class-levels"
              value={draft.nivel || ""}
              onChange={(e) => field("nivel", e.target.value)}
            />
            <datalist id="class-levels">
              {levelsFor(draft.etapa || "").map((level) => (
                <option key={level} value={level} />
              ))}
            </datalist>
            <Select
              label="Turno"
              value={draft.turno || ""}
              onChange={(e) => field("turno", e.target.value)}
            >
              <option value="">Selecione</option>
              {[
                "Matutino",
                "Vespertino",
                "Noturno",
                "Integral",
                ...(draft.turno &&
                !["Matutino", "Vespertino", "Noturno", "Integral"].includes(
                  draft.turno,
                )
                  ? [draft.turno]
                  : []),
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
            <Select
              label="Escola (opcional)"
              value={draft.escolaId || ""}
              onChange={(e) => field("escolaId", e.target.value)}
            >
              <option value="">Sem vínculo</option>
              {org.escolas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome}
                  {s.arquivadaEm ? " (arquivada)" : ""}
                </option>
              ))}
            </Select>
            <Select
              label="Ano letivo (opcional)"
              value={draft.anoLetivoId || ""}
              onChange={(e) => field("anoLetivoId", e.target.value)}
            >
              <option value="">Sem vínculo</option>
              {org.anos.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.nome}
                </option>
              ))}
            </Select>
            <Input
              label="Componentes curriculares (separados por vírgula)"
              value={(draft.componentesCurriculares || []).join(",")}
              onChange={(e) =>
                field("componentesCurriculares", e.target.value.split(","))
              }
            />
            <Input
              type="number"
              min="1"
              label="Duração padrão da aula (minutos)"
              value={draft.duracaoAulaMin ?? 50}
              onChange={(e) => field("duracaoAulaMin", Number(e.target.value))}
            />
            <label className="check-row">
              <input
                type="checkbox"
                checked={capabilitiesFor(draft).rotina}
                onChange={(e) =>
                  field("rotinaInfantilHabilitada", e.target.checked)
                }
              />
              Registrar rotina infantil
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={capabilitiesFor(draft).notas}
                onChange={(e) => field("notasHabilitadas", e.target.checked)}
              />
              Usar notas e avaliações
            </label>
            <p className="helper-text">
              Alterar a etapa ou ocultar um módulo preserva todo o histórico
              existente.
            </p>
            <ActionBar>
              <button className="ui-button" disabled={busy} onClick={save}>
                {busy ? "Salvando…" : "Salvar turma"}
              </button>
              <button
                className="secondary-button"
                disabled={busy}
                onClick={() => setDraft(null)}
              >
                Cancelar
              </button>
            </ActionBar>
          </Card>
        ) : (
          <>
            <button
              className="ui-button"
              onClick={() =>
                setDraft({
                  id: "",
                  nome: "",
                  nivel: "",
                  turno: "",
                  duracaoAulaMin: 50,
                  componentesCurriculares: [],
                })
              }
            >
              Criar turma
            </button>
            {goTo && (
              <button
                className="secondary-button"
                onClick={() => goTo("organizacao")}
              >
                Gerenciar escolas e anos letivos
              </button>
            )}
            <Input
              label="Buscar turma"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="two-fields">
              <Select
                label="Escola"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              >
                <option value="">Todas</option>
                {org.escolas.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome}
                  </option>
                ))}
              </Select>
              <Select
                label="Ano letivo"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Todos</option>
                {org.anos.map((y) => (
                  <option key={y.id} value={y.id}>
                    {y.nome}
                  </option>
                ))}
              </Select>
            </div>
            <label className="check-row">
              <input
                type="checkbox"
                checked={archive}
                onChange={(e) => setArchive(e.target.checked)}
              />
              Mostrar turmas arquivadas
            </label>
            {filtered.map((c) => (
              <Card key={c.id}>
                <h2>
                  {c.nome}
                  {turmaAtiva?.id === c.id ? " · Atual" : ""}
                </h2>
                <p>
                  {c.etapa
                    ? stageLabels[c.etapa]
                    : "Selecione a etapa desta turma"}{" "}
                  · {c.nivel} · {c.turno}
                </p>
                <ActionBar>
                  <button
                    className="secondary-button"
                    onClick={() =>
                      setDraft({ ...c, duracaoAulaMin: c.duracaoAulaMin || 50 })
                    }
                  >
                    Configurar
                  </button>
                  {!c.arquivadaEm && turmaAtiva?.id !== c.id && (
                    <button
                      className="secondary-button press-fx touch-target"
                      disabled={busy}
                      onClick={async () => {
                        try {
                          await onAtivar(c.id);
                        } catch {
                          setError("Não foi possível selecionar a turma.");
                        }
                      }}
                    >
                      Usar turma
                    </button>
                  )}
                  <button
                    className="text-button"
                    disabled={busy}
                    onClick={async () => {
                      if (c.arquivadaEm)
                        return mutate(() =>
                          saveClasses(
                            storage,
                            turmas.map((t) =>
                              t.id === c.id ? { ...t, arquivadaEm: null } : t,
                            ),
                            turmaAtiva?.id || c.id,
                          ),
                        );
                      if (
                        await confirmAction({
                          title: "Arquivar turma?",
                          message:
                            "Os alunos e registros continuarão guardados.",
                          confirmLabel: "Arquivar",
                        })
                      )
                        await mutate(() =>
                          mh(storage, turmas, c.id, turmaAtiva?.id),
                        );
                    }}
                  >
                    {c.arquivadaEm ? "Restaurar" : "Arquivar"}
                  </button>
                </ActionBar>
              </Card>
            ))}
            {!filtered.length && (
              <Notice>Nenhuma turma encontrada neste filtro.</Notice>
            )}
          </>
        )}
      </div>
    </section>
  );
}
