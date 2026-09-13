import { useEffect, useRef, useState } from "react";
import {
  BookOpenCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  Star,
  WifiOff,
  X,
} from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Fields";
import { Select } from "../components/Controls";
import { stageLabels, type EducationStage } from "../domain/education";
import { bnccCatalog, searchSkills, type Skill } from "../domain/bncc";
import { readJson, writeJson } from "../data/localStore";

const stageOrder: EducationStage[] = [
  "educacao_infantil",
  "fundamental_anos_iniciais",
  "fundamental_anos_finais",
  "ensino_medio",
];

function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}

function skillMeta(skill: Skill) {
  const parts = [skill.campo || skill.componente || skill.area];
  if (skill.faixa) parts.push(skill.faixa);
  if (skill.anos.length) {
    parts.push(
      skill.anos.length === 1
        ? `${skill.anos[0]}º ano`
        : `${skill.anos[0]}º–${skill.anos.at(-1)}º ano`,
    );
  }
  if (skill.competencia) parts.push(`Competência ${skill.competencia}`);
  return parts.filter(Boolean).join(" · ");
}

export function BnccScreen({
  onBack,
  etapa,
}: {
  onBack: () => void;
  etapa?: EducationStage;
}) {
  return (
    <section>
      <ScreenHeader
        title="BNCC"
        subtitle="Consulte habilidades offline e conecte objetivos ao planejamento"
        onBack={onBack}
      />
      <div className="module-content">
        <SkillPicker etapa={etapa} />
      </div>
    </section>
  );
}

export function SkillPicker({
  selecionados = [],
  onToggle,
  etapa,
}: {
  selecionados?: string[];
  onToggle?: (code: string) => void;
  etapa?: EducationStage;
}) {
  const [stage, setStage] = useState<EducationStage>(
    etapa || "educacao_infantil",
  );
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const [year, setYear] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [limit, setLimit] = useState(8);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isOffline, setIsOffline] = useState(
    () => typeof navigator !== "undefined" && !navigator.onLine,
  );
  const [retryToken, setRetryToken] = useState(0);
  const detailHeadingRef = useRef<HTMLHeadingElement>(null);
  const detailTriggerRef = useRef<HTMLElement | null>(null);
  const detailTriggerCodeRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    Promise.all([
      readJson<string[]>("bncc:favoritos", []),
      readJson<string[]>("bncc:historico", []),
    ])
      .then(([savedFavorites, savedHistory]) => {
        if (!active) return;
        setFavorites(savedFavorites.filter((code) => typeof code === "string"));
        setHistory(savedHistory.filter((code) => typeof code === "string"));
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar suas preferências locais.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [retryToken]);

  useEffect(() => {
    const updateConnection = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);
    return () => {
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
    };
  }, []);

  useEffect(() => {
    setLimit(8);
  }, [stage, query, group, year, onlyFavorites]);

  const available = bnccCatalog.filter((skill) => skill.etapas.includes(stage));
  const groups = uniqueSorted(
    available.map((skill) => skill.campo || skill.componente || skill.area),
  );
  const years = [...new Set(available.flatMap((skill) => skill.anos))].sort(
    (a, b) => a - b,
  );
  const results = searchSkills({
    stage,
    query,
    group,
    year,
    favorites: onlyFavorites ? favorites : undefined,
  });
  const detailSkill = selectedCode
    ? bnccCatalog.find((skill) => skill.codigo === selectedCode)
    : undefined;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (selectedCode && detailSkill) {
        detailHeadingRef.current?.focus();
      } else if (!selectedCode) {
        const trigger = detailTriggerCodeRef.current
          ? document.getElementById(`bncc-detail-trigger-${detailTriggerCodeRef.current}`)
          : detailTriggerRef.current;
        trigger?.focus();
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedCode, detailSkill]);

  const changeStage = (nextStage: EducationStage) => {
    setStage(nextStage);
    setGroup("");
    setYear("");
    setQuery("");
    setSelectedCode(null);
  };

  const favorite = async (code: string) => {
    const next = favorites.includes(code)
      ? favorites.filter((item) => item !== code)
      : [...favorites, code];
    try {
      await writeJson("bncc:favoritos", next);
      setFavorites(next);
      setFeedback(
        favorites.includes(code)
          ? `${code} removida dos favoritos.`
          : `${code} adicionada aos favoritos.`,
      );
      setError("");
    } catch {
      setError("Não foi possível salvar o favorito neste dispositivo.");
    }
  };

  const toggleSelected = (code: string) => {
    onToggle?.(code);
    setFeedback(
      selecionados.includes(code)
        ? `${code} removida do plano.`
        : `${code} vinculada ao plano.`,
    );
  };

  const openDetail = async (skill: Skill, trigger: HTMLElement) => {
    detailTriggerRef.current = trigger;
    detailTriggerCodeRef.current = skill.codigo;
    setSelectedCode(skill.codigo);
    const nextHistory = [
      skill.codigo,
      ...history.filter((code) => code !== skill.codigo),
    ].slice(0, 10);
    setHistory(nextHistory);
    try {
      await writeJson("bncc:historico", nextHistory);
    } catch {
      // The catalog remains usable when only the optional history write fails.
    }
  };

  const closeDetail = () => {
    setSelectedCode(null);
  };

  if (detailSkill) {
    return (
      <div className="stack bncc-picker" aria-busy={loading}>
        {isOffline && (
          <div className="notice bncc-offline-notice">
            <WifiOff size={18} aria-hidden="true" />
            <span>Você está offline. O catálogo continua disponível neste aparelho.</span>
          </div>
        )}
        {error && (
          <div className="notice notice-error bncc-error" role="alert">
            <span>{error}</span>
            <button
              type="button"
              className="text-button"
              onClick={() => setRetryToken((token) => token + 1)}
            >
              <RotateCcw size={16} aria-hidden="true" /> Tentar novamente
            </button>
          </div>
        )}
        <button type="button" className="bncc-back-link" onClick={closeDetail}>
          <ChevronLeft size={18} aria-hidden="true" /> Voltar aos resultados
        </button>
        <article className="ui-card bncc-detail" aria-labelledby="bncc-detail-title">
          <div className="bncc-detail-heading">
            <div>
              <span className="bncc-eyebrow">Detalhe da habilidade</span>
              <h2 id="bncc-detail-title" ref={detailHeadingRef} tabIndex={-1}>
                {detailSkill.codigo}
              </h2>
            </div>
            <button
              type="button"
              className="bncc-favorite-button text-button"
              aria-pressed={favorites.includes(detailSkill.codigo)}
              aria-label={`${favorites.includes(detailSkill.codigo) ? "Desfavoritar" : "Favoritar"} ${detailSkill.codigo}`}
              onClick={() => favorite(detailSkill.codigo)}
            >
              <Star
                size={22}
                aria-hidden="true"
                fill={favorites.includes(detailSkill.codigo) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <p className="bncc-detail-meta">{skillMeta(detailSkill)}</p>
          <p className="bncc-detail-text">{detailSkill.texto}</p>
          {detailSkill.pagina && (
            <p className="helper-text">Fonte: BNCC/MEC, página {detailSkill.pagina - 2}.</p>
          )}
          {onToggle && (
            <button
              type="button"
              className="secondary-button bncc-plan-button"
              aria-pressed={selecionados.includes(detailSkill.codigo)}
              onClick={() => toggleSelected(detailSkill.codigo)}
            >
              {selecionados.includes(detailSkill.codigo) ? (
                <>
                  <Check size={17} aria-hidden="true" /> Selecionada no plano
                </>
              ) : (
                <>
                  <BookOpenCheck size={17} aria-hidden="true" /> Vincular ao plano
                </>
              )}
            </button>
          )}
        </article>
        {feedback && <p className="bncc-feedback" role="status" aria-live="polite">{feedback}</p>}
      </div>
    );
  }

  return (
    <div className="stack bncc-picker" aria-busy={loading}>
      {isOffline && (
        <div className="notice bncc-offline-notice">
          <WifiOff size={18} aria-hidden="true" />
          <span>Você está offline. O catálogo continua disponível neste aparelho.</span>
        </div>
      )}
      {error && (
        <div className="notice notice-error bncc-error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            className="text-button"
            onClick={() => setRetryToken((token) => token + 1)}
          >
            <RotateCcw size={16} aria-hidden="true" /> Tentar novamente
          </button>
        </div>
      )}
      {feedback && <p className="bncc-feedback" role="status" aria-live="polite">{feedback}</p>}

      <section className="bncc-controls" aria-labelledby="bncc-filters-title">
        <div className="bncc-controls-heading">
          <div>
            <span className="bncc-eyebrow">Explorar por etapa</span>
            <h2 id="bncc-filters-title">Encontre o objetivo certo</h2>
          </div>
          {loading && <span className="bncc-loading" role="status">Carregando preferências…</span>}
        </div>
        <Select
          label="Etapa de ensino"
          value={stage}
          onChange={(event) => changeStage(event.target.value as EducationStage)}
        >
          {stageOrder.map((stageOption) => (
            <option key={stageOption} value={stageOption}>
              {stageLabels[stageOption]}
            </option>
          ))}
        </Select>
        <div className="bncc-search-row">
          <Input
            label="Buscar código ou descrição"
            icon={Search}
            type="search"
            value={query}
            placeholder="Ex.: EF01LP01 ou leitura"
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => setQuery(event.target.value)}
            aria-describedby="bncc-search-help"
          />
          {query && (
            <button
              type="button"
              className="text-button bncc-clear-button"
              aria-label="Limpar busca"
              onClick={() => setQuery("")}
            >
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>
        <p id="bncc-search-help" className="helper-text">
          A busca funciona por código, palavra-chave e acentos.
        </p>
        <Select
          label={stage === "educacao_infantil" ? "Campo de experiência" : "Componente ou área"}
          value={group}
          onChange={(event) => setGroup(event.target.value)}
        >
          <option value="">Todos</option>
          {groups.map((groupOption) => (
            <option key={groupOption} value={groupOption}>
              {groupOption}
            </option>
          ))}
        </Select>
        <div className="bncc-secondary-filters">
          {stage !== "ensino_medio" && (
            <Select
              label={stage === "educacao_infantil" ? "Faixa etária" : "Ano de ensino"}
              value={year}
              onChange={(event) => setYear(event.target.value)}
            >
              <option value="">Todos</option>
              {stage === "educacao_infantil"
                ? uniqueSorted(available.map((skill) => skill.faixa)).map((age) => (
                    <option key={age}>{age}</option>
                  ))
                : years.map((availableYear) => (
                    <option key={availableYear} value={availableYear}>
                      {availableYear}º ano
                    </option>
                  ))}
            </Select>
          )}
          <label className="check-row bncc-favorites-filter">
            <input
              type="checkbox"
              checked={onlyFavorites}
              onChange={(event) => setOnlyFavorites(event.target.checked)}
            />
            Somente favoritos{favorites.length ? ` (${favorites.length})` : ""}
          </label>
        </div>
      </section>

      {onToggle && selecionados.length > 0 && (
        <section className="ui-card bncc-selected" aria-labelledby="bncc-selected-title">
          <div className="bncc-section-heading">
            <div>
              <span className="bncc-eyebrow">Planejamento atual</span>
              <h2 id="bncc-selected-title">
                {selecionados.length} {selecionados.length === 1 ? "habilidade selecionada" : "habilidades selecionadas"}
              </h2>
            </div>
            <BookOpenCheck size={22} aria-hidden="true" />
          </div>
          <div className="bncc-selected-list">
            {selecionados.map((code) => (
              <button
                key={code}
                type="button"
                className="bncc-selected-chip"
                onClick={() => toggleSelected(code)}
                aria-label={`Remover ${code} do plano`}
              >
                {code} <X size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="bncc-results" aria-labelledby="bncc-results-title">
        <div className="bncc-results-heading">
          <div>
            <span className="bncc-eyebrow">Catálogo oficial</span>
            <h2 id="bncc-results-title">Resultados</h2>
          </div>
          <span className="bncc-count" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? "resultado" : "resultados"}
          </span>
        </div>
        <p className="helper-text">
          Selecione uma habilidade para ler os detalhes. Vincular ao plano registra o trabalho previsto, não o domínio do aluno.
        </p>
        <div className="bncc-result-list">
          {results.slice(0, limit).map((skill) => {
            const isSelected = selecionados.includes(skill.codigo);
            const isFavorite = favorites.includes(skill.codigo);
            return (
              <article key={skill.codigo} className="ui-card bncc-skill-card" aria-labelledby={`bncc-skill-${skill.codigo}`}>
                <div className="bncc-skill-heading">
                  <button
                    type="button"
                    className="bncc-skill-open"
                    id={`bncc-detail-trigger-${skill.codigo}`}
                    onClick={(event) => openDetail(skill, event.currentTarget)}
                    aria-label={`Ver detalhes da habilidade ${skill.codigo}`}
                  >
                    <span className="bncc-skill-code" id={`bncc-skill-${skill.codigo}`}>
                      {skill.codigo}
                    </span>
                    <ChevronRight size={17} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="bncc-favorite-button text-button"
                    aria-pressed={isFavorite}
                    aria-label={`${isFavorite ? "Desfavoritar" : "Favoritar"} ${skill.codigo}`}
                    onClick={() => favorite(skill.codigo)}
                  >
                    <Star size={21} aria-hidden="true" fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                </div>
                <p className="bncc-skill-text">{skill.texto}</p>
                <p className="bncc-skill-meta">{skillMeta(skill)}</p>
                {onToggle && (
                  <button
                    type="button"
                    className="secondary-button bncc-link-button"
                    aria-pressed={isSelected}
                    onClick={() => toggleSelected(skill.codigo)}
                  >
                    {isSelected ? (
                      <>
                        <Check size={16} aria-hidden="true" /> Selecionada
                      </>
                    ) : (
                      "Vincular ao plano"
                    )}
                  </button>
                )}
              </article>
            );
          })}
        </div>
        {!results.length && (
          <div className="notice bncc-empty" role="status">
            <strong>
              {onlyFavorites ? "Nenhuma habilidade favoritada nesta etapa" : "Nenhuma habilidade encontrada"}
            </strong>
            <span>
              {onlyFavorites
                ? "Marque uma estrela ou desative o filtro para voltar ao catálogo."
                : "Ajuste a busca, a etapa ou os filtros para continuar."}
            </span>
            {(query || group || year || onlyFavorites) && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setQuery("");
                  setGroup("");
                  setYear("");
                  setOnlyFavorites(false);
                }}
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}
        {results.length > limit && (
          <button type="button" className="secondary-button bncc-more-button" onClick={() => setLimit((current) => current + 8)}>
            Mostrar mais habilidades
          </button>
        )}
      </section>
      <p className="helper-text bncc-source">
        Fonte: Base Nacional Comum Curricular, MEC. Catálogo preservado e disponível offline neste aplicativo.
      </p>
    </div>
  );
}
