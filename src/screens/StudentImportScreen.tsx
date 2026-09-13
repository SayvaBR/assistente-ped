import { useEffect, useState } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Card, Notice } from "../components/Controls";
import { parseStudentList, type ImportRow } from "../domain/studentImport";
import type { Student } from "../domain/models";
import { entityId, readJson, writeJson } from "../data/localStore";
import { colors } from "../core/recovered.js";
interface Props {
  turmaId: string;
  onBack: () => void;
  onImported: (students: Student[]) => void;
  onDirtyChange?: (dirty: boolean) => void;
}
export function StudentImportScreen({
  turmaId,
  onBack,
  onImported,
  onDirtyChange,
}: Props) {
  const [text, setText] = useState(""),
    [rows, setRows] = useState<ImportRow[]>([]),
    [selected, setSelected] = useState<number[]>([]),
    [duplicates, setDuplicates] = useState<number[]>([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [done, setDone] = useState(0),
    [offline, setOffline] = useState(
      () => typeof navigator !== "undefined" && !navigator.onLine,
    );
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  const preview = async () => {
    setError("");
    try {
      const parsed = parseStudentList(text);
      const existing = await readJson<Student[]>(`turma:${turmaId}:alunos`, []);
      const seen = new Set(
        existing
          .filter((s) => !s.deletedAt)
          .map((s) => s.nome.trim().toLocaleLowerCase()),
      );
      const duplicates: number[] = [];
      for (const row of parsed) {
        const name = row.nome.toLocaleLowerCase();
        if (seen.has(name)) duplicates.push(row.line);
        seen.add(name);
      }
      setRows(parsed);
      setDuplicates(duplicates);
      setSelected(
        parsed
          .filter((r) => !r.error && !duplicates.includes(r.line))
          .map((r) => r.line),
      );
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Não foi possível ler a lista.",
      );
    }
  };
  const save = async () => {
    setBusy(true);
    setError("");
    try {
      const existing = await readJson<Student[]>(`turma:${turmaId}:alunos`, []);
      const additions = rows
        .filter((r) => selected.includes(r.line) && !r.error)
        .map((r) => ({
          id: entityId("aluno"),
          nome: r.nome,
          dataNascimento: r.dataNascimento || undefined,
          criadoEm: new Date().toISOString(),
          deletedAt: null,
          cor: colors.blue,
        }));
      const next = [...existing, ...additions];
      await writeJson(`turma:${turmaId}:alunos`, next);
      onImported(next);
      setDone(additions.length);
      setRows([]);
      setText("");
      onDirtyChange?.(false);
    } catch {
      setError(
        "Não foi possível importar. Seus alunos atuais foram preservados.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <section>
      <ScreenHeader
        title="Importar alunos"
        subtitle="Cole uma lista ou escolha um arquivo CSV"
        onBack={onBack}
      />
      <div className="module-content">
        {offline && (
          <Notice>
            Você está offline. A importação será salva somente neste
            dispositivo.
          </Notice>
        )}
        {error && <Notice error>{error}</Notice>}
        {done > 0 && (
          <Notice>{done} alunos importados e salvos nesta turma.</Notice>
        )}
        <Card>
          <label className="field-label">
            Arquivo CSV
            <input
              type="file"
              accept=".csv,.txt,text/csv,text/plain"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                  setError("Escolha um arquivo de até 2 MB.");
                  return;
                }
                try {
                  setText(await file.text());
                  setRows([]);
                  setDone(0);
                  onDirtyChange?.(true);
                } catch {
                  setError("Não foi possível abrir este arquivo.");
                }
              }}
            />
          </label>
          <label className="field-label">
            Um nome por linha
            <textarea
              rows={8}
              value={text}
              placeholder={"Ana Souza\nBruno Lima"}
              onChange={(e) => {
                setText(e.target.value);
                setRows([]);
                setDone(0);
                onDirtyChange?.(true);
              }}
            />
          </label>
          <p className="helper-text">
            No CSV, use as colunas nome e nascimento. A data aceita DD/MM/AAAA
            ou AAAA-MM-DD. Nascimento é opcional na importação.
          </p>
          <button
            className="ui-button"
            disabled={!text.trim()}
            onClick={preview}
          >
            Conferir lista
          </button>
        </Card>
        {rows.length > 0 && (
          <Card>
            <h2>Confira antes de importar</h2>
            <p className="helper-text">
              {selected.length} de {rows.filter((r) => !r.error).length} linhas
              válidas selecionadas. Duplicados ficam desmarcados por segurança.
            </p>
            <button
              className="secondary-button"
              type="button"
              onClick={() =>
                setSelected(
                  selected.length === rows.filter((r) => !r.error).length
                    ? []
                    : rows.filter((r) => !r.error).map((r) => r.line),
                )
              }
            >
              {selected.length === rows.filter((r) => !r.error).length
                ? "Desmarcar válidos"
                : "Selecionar válidos"}
            </button>
            {rows.map((r) => (
              <div key={r.line}>
                <label className="check-row">
                  <input
                    type="checkbox"
                    disabled={!!r.error}
                    checked={selected.includes(r.line)}
                    onChange={(e) =>
                      setSelected((prev) =>
                        e.target.checked
                          ? [...prev, r.line]
                          : prev.filter((n) => n !== r.line),
                      )
                    }
                  />
                  {r.nome || `Linha ${r.line}`}
                </label>
                {r.error && <Notice error>{r.error}</Notice>}
                {duplicates.includes(r.line) && (
                  <p className="helper-text">
                    Nome repetido. Se for outro aluno, selecione para incluir.
                  </p>
                )}
                {r.dataNascimento && (
                  <p className="helper-text">Nascimento: {r.dataNascimento}</p>
                )}
              </div>
            ))}
            <button
              className="ui-button"
              disabled={busy || !selected.length}
              onClick={save}
            >
              {busy ? "Importando…" : `Importar ${selected.length} alunos`}
            </button>
          </Card>
        )}
      </div>
    </section>
  );
}
