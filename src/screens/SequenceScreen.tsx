import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, BookOpen, Plus, Trash2 } from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Fields";
import { Card, Notice } from "../components/Controls";
import { entityId } from "../data/localStore";
import {
  deleteSequence,
  loadSequences,
  saveSequence,
} from "../data/sequenceRepository";
import {
  sequenceProgress,
  type SequenceLessonStatus,
  type TeachingSequence,
} from "../domain/sequences";
import type { ClassRoom } from "../domain/models";
import { confirmAction } from "../core/recovered.js";
type Props = {
  turma: ClassRoom;
  onBack: () => void;
  onDirtyChange?: (dirty: boolean) => void;
  goTo: (route: string, data?: unknown) => void;
};
function emptySequence(turmaId: string): TeachingSequence {
  const now = new Date().toISOString();
  return {
    id: entityId("sequencia"),
    turmaId,
    titulo: "",
    objetivo: "",
    bnccIds: [],
    aulas: [],
    criadoEm: now,
    atualizadoEm: now,
  };
}
export function SequenceScreen({ turma, onBack, onDirtyChange, goTo }: Props) {
  const [rows, setRows] = useState<TeachingSequence[]>([]),
    [draft, setDraft] = useState<TeachingSequence | null>(null),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setRows(await loadSequences(turma.id));
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível carregar as sequências.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void load();
  }, [turma.id]);
  useEffect(() => {
    onDirtyChange?.(!!draft || busy);
    return () => onDirtyChange?.(false);
  }, [draft, busy, onDirtyChange]);
  const update = (patch: Partial<TeachingSequence>) =>
    setDraft((current) => (current ? { ...current, ...patch } : current));
  const commit = async () => {
    if (!draft) return;
    if (!draft.titulo.trim()) {
      setError("Informe um título para salvar a sequência.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      setRows(await saveSequence(draft));
      setDraft(null);
      setMessage("Sequência salva neste dispositivo.");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Não foi possível salvar.",
      );
    } finally {
      setBusy(false);
    }
  };
  const move = (index: number, delta: number) => {
    if (!draft) return;
    const aulas = [...draft.aulas];
    const target = index + delta;
    if (target < 0 || target >= aulas.length) return;
    [aulas[index], aulas[target]] = [aulas[target], aulas[index]];
    update({ aulas });
  };
  const back = async () => {
    if (!draft) return onBack();
    if (
      await confirmAction({
        title: "Sair da sequência?",
        message: "As alterações ainda não foram salvas.",
        confirmLabel: "Descartar alterações",
      })
    )
      setDraft(null);
  };
  return (
    <section>
      <ScreenHeader
        title={draft ? "Editar sequência" : "Sequências didáticas"}
        subtitle={turma.nome}
        onBack={() => void back()}
      />
      <div className="module-content">
        {error && <Notice error>{error}</Notice>}
        {message && <Notice>{message}</Notice>}
        {loading ? (
          <Notice>Carregando sequências…</Notice>
        ) : draft ? (
          <Card>
            <fieldset disabled={busy} className="notebook-editor">
              <Input
                label="Título da sequência"
                maxLength={180}
                value={draft.titulo}
                onChange={(event) => update({ titulo: event.target.value })}
              />
              <label className="field-label">
                Objetivo geral
                <textarea
                  rows={4}
                  maxLength={10000}
                  value={draft.objetivo}
                  onChange={(event) => update({ objetivo: event.target.value })}
                />
              </label>
              <h2>Aulas da sequência</h2>
              {draft.aulas.map((lesson, index) => (
                <div className="sequence-lesson" key={lesson.id}>
                  <div className="sequence-lesson-order">
                    <button
                      className="text-button"
                      aria-label={`Subir aula ${index + 1}`}
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                    >
                      <ArrowUp size={16} />
                    </button>
                    <span>{index + 1}</span>
                    <button
                      className="text-button"
                      aria-label={`Descer aula ${index + 1}`}
                      onClick={() => move(index, 1)}
                      disabled={index === draft.aulas.length - 1}
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>
                  <Input
                    label={`Título da aula ${index + 1}`}
                    value={lesson.titulo}
                    onChange={(event) =>
                      update({
                        aulas: draft.aulas.map((item) =>
                          item.id === lesson.id
                            ? { ...item, titulo: event.target.value }
                            : item,
                        ),
                      })
                    }
                  />
                  <label className="field-label sequence-description">
                    Descrição da aula
                    <textarea
                      rows={2}
                      value={lesson.descricao}
                      onChange={(event) =>
                        update({
                          aulas: draft.aulas.map((item) =>
                            item.id === lesson.id
                              ? { ...item, descricao: event.target.value }
                              : item,
                          ),
                        })
                      }
                    />
                  </label>
                  <Input
                    type="date"
                    label="Data"
                    value={lesson.dataKey}
                    onChange={(event) =>
                      update({
                        aulas: draft.aulas.map((item) =>
                          item.id === lesson.id
                            ? { ...item, dataKey: event.target.value }
                            : item,
                        ),
                      })
                    }
                  />
                  <select
                    aria-label={`Estado da aula ${index + 1}`}
                    value={lesson.status}
                    onChange={(event) =>
                      update({
                        aulas: draft.aulas.map((item) =>
                          item.id === lesson.id
                            ? {
                                ...item,
                                status: event.target
                                  .value as SequenceLessonStatus,
                              }
                            : item,
                        ),
                      })
                    }
                  >
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em andamento</option>
                    <option value="concluida">Concluída</option>
                  </select>
                  <button
                    className="text-button"
                    aria-label={`Remover aula ${index + 1}`}
                    onClick={() =>
                      update({
                        aulas: draft.aulas.filter(
                          (item) => item.id !== lesson.id,
                        ),
                      })
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                className="secondary-button"
                onClick={() =>
                  update({
                    aulas: [
                      ...draft.aulas,
                      {
                        id: entityId("aula"),
                        titulo: "",
                        descricao: "",
                        dataKey: "",
                        planoId: "",
                        status: "pendente",
                      },
                    ],
                  })
                }
              >
                <Plus size={17} />
                Adicionar aula
              </button>
              <button className="ui-button" onClick={() => void commit()}>
                {busy ? "Salvando…" : "Salvar sequência"}
              </button>
            </fieldset>
          </Card>
        ) : (
          <>
            <button
              className="ui-button"
              disabled={!!error}
              onClick={() => setDraft(emptySequence(turma.id))}
            >
              <Plus size={20} />
              Nova sequência
            </button>
            {!rows.length && (
              <div className="empty-state">
                <BookOpen size={32} />
                <h2>Nenhuma sequência criada</h2>
                <p>Organize várias aulas em torno de um mesmo objetivo.</p>
              </div>
            )}
            {rows.map((sequence) => {
              const progress = sequenceProgress(sequence);
              return (
                <Card key={sequence.id}>
                  <h2>{sequence.titulo}</h2>
                  <p className="helper-text">
                    {progress.concluida} de {progress.total} aulas concluídas ·{" "}
                    {progress.percentual}%
                  </p>
                  <progress
                    max="100"
                    value={progress.percentual}
                    aria-label={`Progresso de ${sequence.titulo}`}
                  />
                  {sequence.aulas.slice(0, 3).map((lesson) => (
                    <div className="sequence-row" key={lesson.id}>
                      <span>
                        {lesson.status === "concluida" ? "✓" : "○"}{" "}
                        {lesson.titulo}
                      </span>
                      {lesson.dataKey && <small>{lesson.dataKey}</small>}
                    </div>
                  ))}
                  <div className="sequence-actions">
                    <button
                      className="secondary-button"
                      onClick={() => setDraft(structuredClone(sequence))}
                    >
                      Editar
                    </button>
                    {sequence.aulas.find((lesson) => lesson.dataKey) && (
                      <button
                        className="text-button"
                        onClick={() =>
                          goTo("plano-aula", {
                            dataKey: sequence.aulas.find(
                              (lesson) => lesson.dataKey,
                            )?.dataKey,
                          })
                        }
                      >
                        Abrir plano da aula
                      </button>
                    )}
                    <button
                      className="text-button"
                      onClick={async () => {
                        if (busy) return;
                        setBusy(true);
                        try {
                          await deleteSequence(sequence.id, turma.id);
                          await load();
                          setMessage("Sequência removida.");
                        } catch (cause) {
                          setError(
                            cause instanceof Error
                              ? cause.message
                              : "Não foi possível remover.",
                          );
                        } finally {
                          setBusy(false);
                        }
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
