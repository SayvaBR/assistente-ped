import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import {
  BookOpen,
  Pin,
  Plus,
  Archive,
  Trash2,
  Undo2,
  Paperclip,
  Bell,
} from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Fields";
import { Card, Select, Notice, ActionBar } from "../components/Controls";
import { entityId, storage, readJson } from "../data/localStore";
import { loadNotebook, saveNotebookEntry } from "../data/notebookRepository";
import { findNotebookEntries, type NotebookEntry } from "../domain/notebook";
import type { Student, ClassRoom, LessonPlan } from "../domain/models";
import { normalizeLessonPlans } from "../domain/lessonPlans";
import { bs, gp, Sh } from "../data/files.js";
import { openNotebookAttachment as vp } from "../data/notebookAttachments";
import { zh, Fh } from "../data/notifications.js";
import { confirmAction } from "../core/recovered.js";
import { exportText } from "../data/export";
type DocumentRecord = {
  id: string;
  nome: string;
  uri: string;
  path: string;
  mime: string;
  [key: string]: unknown;
};
type LegacyRecord = { id: string; aluno: Student; texto: string; data: string };
type Props = {
  turma: ClassRoom;
  alunos: Student[];
  studentId?: string;
  onBack: () => void;
  onDirtyChange?: (dirty: boolean) => void;
  goTo: (route: string, data?: unknown) => void;
};
export function NotebookScreen({
  turma,
  alunos,
  studentId = "",
  onBack,
  onDirtyChange,
  goTo,
}: Props) {
  const [entries, setEntries] = useState<NotebookEntry[]>([]),
    [draft, setDraft] = useState<NotebookEntry | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [query, setQuery] = useState(""),
    [tag, setTag] = useState(""),
    [student, setStudent] = useState(studentId),
    [view, setView] = useState("ativas"),
    [docs, setDocs] = useState<DocumentRecord[]>([]),
    [plans, setPlans] = useState<LessonPlan[]>([]),
    [legacy, setLegacy] = useState<LegacyRecord[]>([]),
    [reminder, setReminder] = useState("");
  useEffect(() => {
    onDirtyChange?.(!!draft || busy);
    return () => onDirtyChange?.(false);
  }, [draft, busy, onDirtyChange]);
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const notebook = await loadNotebook(turma.id);
      const documents = await bs(storage);
      const prefix = `turma:${turma.id}:planejamento:`;
      const planList: LessonPlan[] = [];
      for (const k of (await storage.list(prefix)).keys) {
        const day = k.slice(prefix.length);
        if (/^\d{4}-\d{2}-\d{2}$/.test(day))
          planList.push(
            ...normalizeLessonPlans(await readJson(k, []), {
              turmaId: turma.id,
              dataKey: day,
            }),
          );
      }
      const previous = (
        await Promise.all(
          alunos.map(async (aluno) =>
            (
              await readJson<
                {
                  id?: string;
                  texto?: string;
                  data?: string;
                  criadoEm?: string;
                }[]
              >(`obs:${aluno.id}`, [])
            ).map((r, i) => ({
              id: `${aluno.id}-${r.id || i}`,
              aluno,
              texto: r.texto || "Registro com mídia",
              data: r.data || r.criadoEm || "",
            })),
          ),
        )
      ).flat();
      setEntries(notebook.entradas);
      setDocs(documents);
      setPlans(planList);
      setLegacy(previous);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Não foi possível carregar o caderno.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void load();
  }, [turma.id]);
  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível concluir.");
    } finally {
      setBusy(false);
    }
  };
  const save = async (entry: NotebookEntry) => {
    const next = await saveNotebookEntry(entry);
    setEntries(next.entradas);
    return next.entradas.find((e) => e.id === entry.id)!;
  };
  const start = () => {
    const now = new Date().toISOString();
    setDraft({
      id: entityId("nota"),
      turmaId: turma.id,
      titulo: "",
      texto: "",
      alunoIds: student ? [student] : [],
      planoId: "",
      tags: [],
      tarefas: [],
      arquivoIds: [],
      fixada: false,
      arquivadaEm: null,
      excluidaEm: null,
      lembrete: null,
      criadoEm: now,
      atualizadoEm: now,
      revisao: 0,
    });
  };
  const back = async () => {
    if (busy) return;
    if (draft) {
      if (
        await confirmAction({
          title: "Sair da nota?",
          message: "As alterações desta nota ainda não foram salvas.",
          confirmLabel: "Descartar alterações",
        })
      )
        setDraft(null);
    } else onBack();
  };
  const move = async (
    entry: NotebookEntry,
    action: "archive" | "trash" | "restore",
  ) => {
    if (
      action === "trash" &&
      !(await confirmAction({
        title: "Mover nota para a lixeira?",
        message: "Você poderá restaurar o texto, os vínculos e os anexos.",
        confirmLabel: "Mover para a lixeira",
      }))
    )
      return;
    await run(async () => {
      const next = {
        ...entry,
        arquivadaEm:
          action === "archive"
            ? entry.arquivadaEm
              ? null
              : new Date().toISOString()
            : entry.arquivadaEm,
        excluidaEm: action === "trash" ? new Date().toISOString() : null,
      };
      const previousReminder = entry.lembrete;
      if (previousReminder && action !== "restore") {
        await Fh(previousReminder.id);
        next.lembrete = null;
      }
      try {
        await save(next);
      } catch (cause) {
        if (
          previousReminder &&
          action !== "restore" &&
          new Date(previousReminder.quando).getTime() > Date.now() + 30000
        )
          await zh(
            {
              titulo: "Revisar caderno pedagógico",
              mensagem: "Você tem uma anotação para revisar no aplicativo.",
              quando: new Date(previousReminder.quando),
            },
            { id: previousReminder.id },
          ).catch(() => {});
        throw cause;
      }
      setMessage(
        action === "restore" ? "Nota restaurada." : "Registro atualizado.",
      );
    });
  };
  const importFile = async (file: File) =>
    run(async () => {
      if (!draft) return;
      if (file.size > 10 * 1024 * 1024)
        throw new Error("Escolha um arquivo de até 10 MB.");
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () =>
          reject(new Error("Não foi possível ler o arquivo."));
        reader.readAsDataURL(file);
      });
      const createDocument = gp as unknown as (
        input: {
          dataUrl: string;
          nome: string;
          tamanho: number;
          mime: string;
          id: string;
          pastaId: string;
        },
        options: { storage: typeof storage },
      ) => Promise<DocumentRecord>;
      const doc = await createDocument(
        {
          dataUrl,
          nome: file.name,
          tamanho: file.size,
          mime: file.type || "application/octet-stream",
          id: entityId("documento"),
          pastaId: "root",
        },
        { storage },
      );
      setDocs((current) => [doc, ...current]);
      setDraft({ ...draft, arquivoIds: [...draft.arquivoIds, doc.id] });
      setMessage(
        "Arquivo adicionado à biblioteca. Salve a nota para manter o vínculo.",
      );
    });
  const visible = findNotebookEntries(entries, {
    query,
    tag,
    studentId: student,
    view,
  });
  const filteredLegacy =
    view === "ativas" && !tag
      ? legacy.filter(
          (r) =>
            (!student || r.aluno.id === student) &&
            `${r.texto} ${r.aluno.nome}`
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()),
        )
      : [];
  return (
    <section>
      <ScreenHeader
        title={draft ? "Editar nota" : "Caderno"}
        subtitle={turma.nome}
        onBack={back}
      />
      <div className="module-content">
        {error && <Notice error>{error}</Notice>}
        {message && <Notice>{message}</Notice>}
        {loading ? (
          <Notice>Carregando caderno…</Notice>
        ) : draft ? (
          <>
            <fieldset disabled={busy} className="notebook-editor">
              <Input
                label="Título da nota"
                maxLength={180}
                value={draft.titulo}
                onChange={(e) => setDraft({ ...draft, titulo: e.target.value })}
              />
              <label className="field-label">
                Anotação
                <textarea
                  rows={7}
                  maxLength={50000}
                  value={draft.texto}
                  onChange={(e) =>
                    setDraft({ ...draft, texto: e.target.value })
                  }
                />
              </label>
              <Input
                label="Etiquetas, separadas por vírgula"
                value={draft.tags.join(",")}
                onChange={(e) =>
                  setDraft({ ...draft, tags: e.target.value.split(",") })
                }
              />
              <details>
                <summary>Vincular alunos ({draft.alunoIds.length})</summary>
                <p className="helper-text">
                  Sem alunos selecionados, o registro pertence à turma inteira.
                </p>
                {alunos.map((s) => (
                  <label className="check-row" key={s.id}>
                    <input
                      type="checkbox"
                      checked={draft.alunoIds.includes(s.id)}
                      onChange={() =>
                        setDraft({
                          ...draft,
                          alunoIds: draft.alunoIds.includes(s.id)
                            ? draft.alunoIds.filter((id) => id !== s.id)
                            : [...draft.alunoIds, s.id],
                        })
                      }
                    />
                    {s.nome}
                  </label>
                ))}
              </details>
              <Select
                label="Plano de aula vinculado"
                value={draft.planoId}
                onChange={(e) =>
                  setDraft({ ...draft, planoId: e.target.value })
                }
              >
                <option value="">Sem vínculo</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.tituloTema || "Plano sem título"} · {p.dataKey}
                  </option>
                ))}
                {draft.planoId &&
                  !plans.some((p) => p.id === draft.planoId) && (
                    <option value={draft.planoId}>
                      Plano removido — vínculo preservado
                    </option>
                  )}
              </Select>
              <h2>Lista de tarefas</h2>
              {draft.tarefas.map((t, i) => (
                <div className="notebook-task" key={t.id}>
                  <input
                    type="checkbox"
                    aria-label={`Concluir tarefa ${i + 1}`}
                    checked={t.concluida}
                    onChange={() =>
                      setDraft({
                        ...draft,
                        tarefas: draft.tarefas.map((x) =>
                          x.id === t.id ? { ...x, concluida: !x.concluida } : x,
                        ),
                      })
                    }
                  />
                  <Input
                    label={`Tarefa ${i + 1}`}
                    value={t.texto}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        tarefas: draft.tarefas.map((x) =>
                          x.id === t.id ? { ...x, texto: e.target.value } : x,
                        ),
                      })
                    }
                  />
                  <button
                    className="text-button"
                    aria-label={`Remover tarefa ${i + 1}`}
                    onClick={() =>
                      setDraft({
                        ...draft,
                        tarefas: draft.tarefas.filter((x) => x.id !== t.id),
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
                  setDraft({
                    ...draft,
                    tarefas: [
                      ...draft.tarefas,
                      { id: entityId("tarefa"), texto: "", concluida: false },
                    ],
                  })
                }
              >
                Adicionar tarefa
              </button>
              <details>
                <summary>Anexos ({draft.arquivoIds.length})</summary>
                <p className="helper-text">
                  Os arquivos são vinculados à biblioteca. Remover um vínculo
                  mantém o arquivo original.
                </p>
                {docs.map((doc) => (
                  <label className="check-row" key={doc.id}>
                    <input
                      type="checkbox"
                      checked={draft.arquivoIds.includes(doc.id)}
                      onChange={() =>
                        setDraft({
                          ...draft,
                          arquivoIds: draft.arquivoIds.includes(doc.id)
                            ? draft.arquivoIds.filter((id) => id !== doc.id)
                            : [...draft.arquivoIds, doc.id],
                        })
                      }
                    />
                    {doc.nome}
                  </label>
                ))}
                <label className="field-label">
                  Adicionar arquivo à biblioteca
                  <input
                    type="file"
                    accept={Sh.documento.join(",")}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void importFile(file);
                      e.target.value = "";
                    }}
                  />
                </label>
              </details>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={draft.fixada}
                  onChange={(e) =>
                    setDraft({ ...draft, fixada: e.target.checked })
                  }
                />
                Fixar no início do caderno
              </label>
              <button
                className="ui-button"
                onClick={() =>
                  run(async () => {
                    await save(draft);
                    setDraft(null);
                    setMessage("Nota salva neste dispositivo.");
                  })
                }
              >
                {busy ? "Salvando…" : "Salvar nota"}
              </button>
            </fieldset>
          </>
        ) : (
          <>
            <button
              className="ui-button"
              disabled={busy || !!error}
              onClick={start}
            >
              <Plus size={20} />
              Nova nota
            </button>
            {error && (
              <button className="secondary-button" onClick={load}>
                Carregar novamente
              </button>
            )}
            <Input
              label="Buscar no caderno"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="two-fields">
              <Select
                label="Exibir"
                value={view}
                onChange={(e) => setView(e.target.value)}
              >
                <option value="ativas">Notas ativas</option>
                <option value="arquivadas">Arquivadas</option>
                <option value="lixeira">Lixeira</option>
              </Select>
              <Select
                label="Aluno"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              >
                <option value="">Toda a turma</option>
                {alunos.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome}
                  </option>
                ))}
              </Select>
            </div>
            <Select
              label="Etiqueta"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="">Todas</option>
              {[...new Set(entries.flatMap((e) => e.tags))].sort().map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
            {!visible.length && !filteredLegacy.length && (
              <div className="empty-state">
                <BookOpen size={32} />
                <h2>Nenhum registro neste filtro</h2>
                <p>Registre ideias, observações e tarefas da turma.</p>
              </div>
            )}
            {visible.map((entry) => (
              <Card key={entry.id}>
                <h2>
                  {entry.fixada && <Pin size={17} aria-label="Nota fixada" />}{" "}
                  {entry.titulo}
                </h2>
                <p className="helper-text">
                  {new Date(entry.atualizadoEm).toLocaleDateString("pt-BR")} ·{" "}
                  {entry.alunoIds.length
                    ? entry.alunoIds
                        .map(
                          (id) =>
                            alunos.find((s) => s.id === id)?.nome ||
                            "Aluno arquivado",
                        )
                        .join(", ")
                    : "Registro da turma"}
                </p>
                {entry.tags.length > 0 && (
                  <p className="helper-text">
                    {entry.tags.map((t) => `#${t}`).join(" ")}
                  </p>
                )}
                <p className="notebook-text">{entry.texto}</p>
                {entry.tarefas.length > 0 && (
                  <p className="helper-text">
                    {entry.tarefas.filter((t) => t.concluida).length} de{" "}
                    {entry.tarefas.length} tarefas concluídas
                  </p>
                )}
                {entry.tarefas.map((t) => (
                  <label className="check-row" key={t.id}>
                    <input
                      type="checkbox"
                      disabled={busy || !!entry.excluidaEm}
                      checked={t.concluida}
                      onChange={() =>
                        run(async () => {
                          await save({
                            ...entry,
                            tarefas: entry.tarefas.map((x) =>
                              x.id === t.id
                                ? { ...x, concluida: !x.concluida }
                                : x,
                            ),
                          });
                        })
                      }
                    />
                    <span
                      style={{
                        textDecoration: t.concluida
                          ? "line-through"
                          : undefined,
                      }}
                    >
                      {t.texto}
                    </span>
                  </label>
                ))}
                {entry.planoId && (
                  <button
                    className="text-button"
                    disabled={
                      busy || !plans.some((p) => p.id === entry.planoId)
                    }
                    onClick={() =>
                      goTo("plano-aula", {
                        plano: plans.find((p) => p.id === entry.planoId),
                      })
                    }
                  >
                    Abrir plano vinculado
                  </button>
                )}
                {entry.arquivoIds.map((id) => {
                  const doc = docs.find((d) => d.id === id);
                  return (
                    <button
                      key={id}
                      className="text-button"
                      disabled={!doc || busy}
                      onClick={() =>
                        run(async () => {
                          await vp(doc!);
                        })
                      }
                    >
                      <Paperclip size={16} />{" "}
                      {doc?.nome || "Arquivo não encontrado na biblioteca"}
                    </button>
                  );
                })}
                {entry.lembrete && (
                  <p className="helper-text">
                    <Bell size={16} /> Lembrete:{" "}
                    {new Date(entry.lembrete.quando).toLocaleString("pt-BR")}
                  </p>
                )}
                <ActionBar>
                  {entry.excluidaEm ? (
                    <button
                      className="secondary-button"
                      disabled={busy}
                      onClick={() => move(entry, "restore")}
                    >
                      <Undo2 size={16} />
                      Restaurar nota
                    </button>
                  ) : (
                    <>
                      <button
                        className="secondary-button"
                        disabled={busy}
                        onClick={() => setDraft(structuredClone(entry))}
                      >
                        Editar nota
                      </button>
                      <button
                        className="text-button"
                        disabled={busy}
                        onClick={() =>
                          run(async () => {
                            await save({ ...entry, fixada: !entry.fixada });
                          })
                        }
                      >
                        {entry.fixada ? "Desafixar" : "Fixar"}
                      </button>
                      <button
                        className="text-button"
                        disabled={busy}
                        onClick={() => move(entry, "archive")}
                      >
                        <Archive size={16} />{" "}
                        {entry.arquivadaEm ? "Desarquivar" : "Arquivar"}
                      </button>
                      <button
                        className="text-button"
                        disabled={busy}
                        onClick={() => move(entry, "trash")}
                      >
                        <Trash2 size={16} />
                        Lixeira
                      </button>
                    </>
                  )}
                </ActionBar>
                {!entry.excluidaEm && (
                  <details>
                    <summary>Exportar e lembrar</summary>
                    <button
                      className="secondary-button"
                      disabled={busy}
                      onClick={() =>
                        run(async () => {
                          await exportText(
                            "nota-pedagogica.txt",
                            [
                              entry.titulo,
                              entry.texto,
                              ...entry.tarefas.map(
                                (t) =>
                                  `${t.concluida ? "[x]" : "[ ]"} ${t.texto}`,
                              ),
                            ].join("\n\n"),
                          );
                        })
                      }
                    >
                      Exportar nota em texto
                    </button>
                    {Capacitor.isNativePlatform() ? (
                      <>
                        <Input
                          label="Data e hora do lembrete"
                          type="datetime-local"
                          value={
                            reminder ||
                            (entry.lembrete
                              ? entry.lembrete.quando.slice(0, 16)
                              : "")
                          }
                          onChange={(e) => setReminder(e.target.value)}
                        />
                        <button
                          className="secondary-button"
                          disabled={busy || !!entry.arquivadaEm}
                          onClick={() =>
                            run(async () => {
                              const oldReminder = entry.lembrete;
                              const id =
                                oldReminder?.id ||
                                (crypto.getRandomValues(new Uint32Array(1))[0] %
                                  2000000000) +
                                  1;
                              const when = new Date(reminder);
                              await zh(
                                {
                                  titulo: "Revisar caderno pedagógico",
                                  mensagem:
                                    "Você tem uma anotação para revisar no aplicativo.",
                                  quando: when,
                                },
                                { id },
                              );
                              try {
                                await save({
                                  ...entry,
                                  lembrete: { id, quando: when.toISOString() },
                                });
                              } catch (cause) {
                                await Fh(id);
                                if (
                                  oldReminder &&
                                  new Date(oldReminder.quando).getTime() >
                                    Date.now() + 30000
                                )
                                  await zh(
                                    {
                                      titulo: "Revisar caderno pedagógico",
                                      mensagem:
                                        "Você tem uma anotação para revisar no aplicativo.",
                                      quando: new Date(oldReminder.quando),
                                    },
                                    { id: oldReminder.id },
                                  ).catch(() => {});
                                throw cause;
                              }
                              setMessage("Lembrete agendado no aparelho.");
                            })
                          }
                        >
                          Agendar lembrete
                        </button>
                        {entry.lembrete && (
                          <button
                            className="text-button"
                            disabled={busy}
                            onClick={() =>
                              run(async () => {
                                const oldReminder = entry.lembrete!;
                                await Fh(oldReminder.id);
                                try {
                                  await save({ ...entry, lembrete: null });
                                } catch (cause) {
                                  if (
                                    new Date(oldReminder.quando).getTime() >
                                    Date.now() + 30000
                                  )
                                    await zh(
                                      {
                                        titulo: "Revisar caderno pedagógico",
                                        mensagem:
                                          "Você tem uma anotação para revisar no aplicativo.",
                                        quando: new Date(oldReminder.quando),
                                      },
                                      { id: oldReminder.id },
                                    ).catch(() => {});
                                  throw cause;
                                }
                              })
                            }
                          >
                            Cancelar lembrete
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="helper-text">
                        O agendamento de notificações funciona no aplicativo
                        Android.
                      </p>
                    )}
                  </details>
                )}
              </Card>
            ))}
            {filteredLegacy.map((record) => (
              <Card key={record.id}>
                <h2>Observação · {record.aluno.nome}</h2>
                <p className="helper-text">{record.data}</p>
                <p className="notebook-text">{record.texto}</p>
                <button
                  className="secondary-button"
                  onClick={() => goTo("perfil", record.aluno)}
                >
                  Abrir registro no perfil
                </button>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
