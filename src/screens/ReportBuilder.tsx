import { useEffect, useState } from "react";
import {
  Users,
  User,
  CalendarRange,
  SlidersHorizontal,
  ChevronRight,
  Download,
} from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Fields";
import { repository } from "../core/recovered.js";
import type { Attendance, Student } from "../domain/models";
import { buildAttendanceReport, reportCsv } from "../domain/reports";
import { exportText } from "../data/export";
const choices = [
  {
    key: "individual",
    name: "Relatório individual",
    description: "Frequência e registros de um aluno",
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
    description: "Escolha alunos, período e observações",
    Icon: SlidersHorizontal,
  },
];
export function ReportsScreen({
  onBack,
  alunos = [],
  goTo,
  embutido = false,
}: {
  onBack?: () => void;
  alunos: Student[];
  goTo?: (route: string, data?: unknown) => void;
  embutido?: boolean;
}) {
  const [kind, setKind] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [student, setStudent] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [days, setDays] = useState<Record<string, Attendance>>({});
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    setLoading(true);
    repository
      .listarTodasAsChamadas()
      .then((data: unknown) => {
        if (active) setDays(data as Record<string, Attendance>);
      })
      .catch(() => setError("Não foi possível carregar a frequência."))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    let active = true;
    if (!student) {
      setRecords([]);
      return;
    }
    repository
      .carregarObservacoes(student)
      .then((data: Record<string, unknown>[]) => {
        if (active) setRecords(data);
      })
      .catch(() => setError("Não foi possível ler as observações."));
    return () => {
      active = false;
    };
  }, [student]);
  const invalid = !!from && !!to && from > to;
  const filtered =
    kind === "individual"
      ? alunos.filter((a) => a.id === student)
      : kind === "personalizado"
        ? alunos.filter((a) => selected.includes(a.id))
        : alunos;
  const rows = invalid ? [] : buildAttendanceReport(filtered, days, from, to);
  const visibleRecords = records.filter((r) => {
    const day = String(r.criadoEm || r.data || "").slice(0, 10);
    return (!from || day >= from) && (!to || day <= to);
  });
  const download = async () => {
    setBusy(true);
    setError("");
    try {
      await exportText("relatorio-frequencia.csv", reportCsv(rows), "text/csv");
    } catch {
      setError("Não foi possível exportar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  };
  const exportFull = async () => {
    setBusy(true);
    setError("");
    try {
      const text = [
        "Assistente Pedagógico",
        choices.find((c) => c.key === kind)?.name,
        `Período: ${from || "Início dos registros"} a ${to || "Último registro"}`,
        ...rows.map(
          (r) =>
            `${r.nome}: ${r.presencas} presenças, ${r.atrasos} atrasos, ${r.faltas} faltas. Frequência: ${r.percentage === null ? "sem marcação" : r.percentage + "%"}`,
        ),
        ...visibleRecords.map(
          (r) =>
            `${String(r.data || r.criadoEm || "").slice(0, 10)} — ${r.texto || r.descricao || ""}`,
        ),
        notes,
      ]
        .filter(Boolean)
        .join("\n\n");
      await exportText("relatorio-pedagogico.txt", text);
    } catch {
      setError("Não foi possível exportar o relatório.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <section>
      {!embutido && (
        <ScreenHeader
          title={
            kind ? choices.find((c) => c.key === kind)!.name : "Relatórios"
          }
          subtitle="Acompanhamento pedagógico da turma"
          onBack={kind ? () => setKind("") : onBack}
        />
      )}
      <div className="module-content">
        {!kind ? (
          choices.map(({ key, name, description, Icon }) => (
            <button
              key={key}
              className="menu-card"
              onClick={() => {
                setKind(key);
                setError("");
              }}
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
        ) : (
          <>
            {embutido && (
              <button className="text-button" onClick={() => setKind("")}>
                Voltar aos relatórios
              </button>
            )}
            <div className="ui-card report-filters">
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
              {kind === "individual" && (
                <label className="field-label">
                  Aluno
                  <select
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
                  >
                    <option value="">Selecione um aluno</option>
                    {alunos.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nome}
                      </option>
                    ))}
                  </select>
                </label>
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
              {invalid && (
                <p role="alert">A data inicial deve vir antes da data final.</p>
              )}
            </div>
            {loading ? (
              <p role="status">Carregando frequência…</p>
            ) : (
              <div className="report-results">
                {rows.map((row) => (
                  <article className="ui-card" key={row.id}>
                    <h2>{row.nome}</h2>
                    <p>
                      {row.percentage === null
                        ? "Sem chamada registrada no período"
                        : `${row.percentage}% de frequência`}
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
                    {kind === "individual" && goTo && (
                      <button
                        className="text-button"
                        onClick={() => goTo("perfil", row)}
                      >
                        Abrir histórico do aluno
                      </button>
                    )}
                  </article>
                ))}
                {!rows.length && !invalid && (
                  <div className="empty-state">
                    <h2>
                      {alunos.length
                        ? "Selecione os alunos"
                        : "Nenhum aluno cadastrado"}
                    </h2>
                    <p>
                      O relatório usará as chamadas registradas no aplicativo.
                    </p>
                    {!alunos.length && goTo && (
                      <button
                        className="ui-button"
                        onClick={() => goTo("novo-aluno")}
                      >
                        Adicionar aluno
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            {kind === "individual" && visibleRecords.length > 0 && (
              <article className="ui-card">
                <h2>Observações do período</h2>
                {visibleRecords.map((r, i) => (
                  <p key={i}>
                    {String(r.texto || r.descricao || "Registro com mídia")}
                  </p>
                ))}
              </article>
            )}
            {(kind === "personalizado" || kind === "individual") && (
              <label className="field-label">
                Observações do relatório
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </label>
            )}
            <p className="helper-text">
              Atrasos contam como comparecimento. Dias sem marcação não entram
              no cálculo.
            </p>
            {error && <p role="alert">{error}</p>}
            <button
              className="ui-button"
              disabled={busy || invalid || !rows.length || loading}
              onClick={download}
            >
              <Download size={20} />{" "}
              {busy ? "Exportando…" : "Exportar frequência (CSV)"}
            </button>
            <button
              className="onboarding-secondary"
              disabled={busy || invalid || !rows.length || loading}
              onClick={exportFull}
            >
              Exportar relatório completo
            </button>
          </>
        )}
      </div>
    </section>
  );
}
