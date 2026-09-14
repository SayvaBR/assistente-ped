import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpenCheck, ChevronRight, RotateCcw, Search, Star, WifiOff, X } from 'lucide-react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './bncc-v2.css';
import { bnccCatalog, searchSkills, type Skill } from '../../domain/bncc';
import { stageLabels, type EducationStage } from '../../domain/education';
import { readJson, writeJson } from '../../data/localStore';
import type { StoragePort } from '../../domain/models';

const stages: EducationStage[] = ['fundamental_anos_iniciais', 'fundamental_anos_finais', 'ensino_medio', 'educacao_infantil'];

function meta(skill: Skill) {
  const parts = [skill.campo || skill.componente || skill.area];
  if (skill.faixa) parts.push(skill.faixa);
  if (skill.anos.length) parts.push(skill.anos.length === 1 ? `${skill.anos[0]}º ano` : `${skill.anos[0]}º–${skill.anos.at(-1)}º ano`);
  return parts.filter(Boolean).join(' · ');
}

type Props = { etapa?: EducationStage; storage?: StoragePort; onBack: () => void; onOpenPlan?: (skill: Skill) => void };

export function BnccV2({ etapa, storage, onBack, onOpenPlan }: Props) {
  const [stage, setStage] = useState<EducationStage>(etapa ?? 'fundamental_anos_iniciais');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selected, setSelected] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [offline, setOffline] = useState(() => typeof navigator !== 'undefined' && !navigator.onLine);
  const [feedback, setFeedback] = useState('');

  const loadPreferences = async () => {
    setLoading(true);
    setError('');
    try {
      const [saved, savedHistory] = await Promise.all([
        readJson<string[]>('bncc:favoritos', [], storage),
        readJson<string[]>('bncc:historico', [], storage),
      ]);
      setFavorites(saved.filter((code) => typeof code === 'string'));
      setHistory(savedHistory.filter((code) => typeof code === 'string'));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível carregar seus favoritos locais.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadPreferences(); }, []);
  useEffect(() => {
    const update = () => setOffline(navigator.onLine === false);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);

  const results = useMemo(() => searchSkills({ stage, query, favorites: onlyFavorites ? favorites : undefined }), [stage, query, favorites, onlyFavorites]);
  const stageCount = useMemo(() => bnccCatalog.filter((skill) => skill.etapas.includes(stage)).length, [stage]);

  const toggleFavorite = async (code: string) => {
    const next = favorites.includes(code) ? favorites.filter((item) => item !== code) : [...favorites, code];
    try {
      await writeJson('bncc:favoritos', next, storage);
      setFavorites(next);
      setFeedback(favorites.includes(code) ? `${code} removida dos favoritos.` : `${code} adicionada aos favoritos.`);
      window.setTimeout(() => setFeedback(''), 2200);
    } catch {
      setError('Não foi possível salvar o favorito neste dispositivo.');
    }
  };

  const openSkill = (skill: Skill) => {
    setSelected(skill);
    const nextHistory = [skill.codigo, ...history.filter((code) => code !== skill.codigo)].slice(0, 10);
    setHistory(nextHistory);
    void writeJson('bncc:historico', nextHistory, storage).catch(() => undefined);
  };

  if (selected) {
    const isFavorite = favorites.includes(selected.codigo);
    return <main className="v2-root v2-bncc"><div className="v2-screen v2-bncc__screen">
      <header className="v2-bncc__header"><button type="button" className="v2-bncc__back v2-pressable" onClick={() => setSelected(null)} aria-label="Voltar para resultados"><ArrowLeft size={23} /></button><div><span className="v2-eyebrow">DETALHE DA HABILIDADE</span><h1>{selected.codigo}</h1></div><button type="button" className={`v2-bncc__star v2-pressable${isFavorite ? ' is-selected' : ''}`} aria-label={isFavorite ? 'Desfavoritar habilidade' : 'Favoritar habilidade'} aria-pressed={isFavorite} onClick={() => void toggleFavorite(selected.codigo)}><Star size={22} fill={isFavorite ? 'currentColor' : 'none'} /></button></header>
      {offline && <div className="v2-bncc__offline"><WifiOff size={18} /> Catálogo disponível offline neste aparelho.</div>}
      <article className="v2-bncc__detail v2-surface"><div className="v2-bncc__detail-code">{selected.codigo}</div><h2>{selected.componente || selected.campo || selected.area || 'Objetivo de aprendizagem'}</h2><p className="v2-bncc__meta">{meta(selected) || 'Base Nacional Comum Curricular'}</p><p className="v2-bncc__description">{selected.texto}</p>{selected.pagina && <p className="v2-bncc__source">Fonte: BNCC/MEC · página {selected.pagina - 2}</p>}<div className="v2-bncc__detail-note"><BookOpenCheck size={20} /><span>Use este código no plano de aula para manter o objetivo curricular ligado à atividade.</span></div></article>
      {feedback && <p className="v2-bncc__feedback" role="status" aria-live="polite">{feedback}</p>}
      <button type="button" className="v2-primary-action v2-bncc__bottom-action v2-pressable" onClick={() => onOpenPlan ? onOpenPlan(selected) : onBack()}>{onOpenPlan ? 'Abrir no editor de plano' : 'Voltar ao seu espaço'}</button>
    </div></main>;
  }

  return <main className="v2-root v2-bncc"><div className="v2-screen v2-bncc__screen">
    <header className="v2-bncc__header"><button type="button" className="v2-bncc__back v2-pressable" onClick={onBack} aria-label="Voltar"><ArrowLeft size={23} /></button><div><span className="v2-eyebrow">REFERÊNCIA CURRICULAR</span><h1>BNCC</h1><p>Objetivos reais para planejar com intenção.</p></div><div className="v2-bncc__header-mark"><BookOpenCheck size={23} /></div></header>
    {offline && <div className="v2-bncc__offline"><WifiOff size={18} /> Catálogo disponível offline neste aparelho.</div>}
    {error && <div className="v2-bncc__error" role="alert"><span>{error}</span><button type="button" className="v2-text-action" onClick={() => void loadPreferences()}><RotateCcw size={16} /> Tentar novamente</button></div>}
    {feedback && <p className="v2-bncc__feedback" role="status" aria-live="polite">{feedback}</p>}
    <section className="v2-bncc__hero" aria-labelledby="bncc-title"><span className="v2-eyebrow">CATÁLOGO OFICIAL · MEC</span><h2 id="bncc-title">Encontre a habilidade certa para a próxima aula.</h2><p>Pesquise por código, componente ou palavra-chave. A consulta continua funcionando sem internet.</p><div className="v2-bncc__hero-count"><strong>{stageCount.toLocaleString('pt-BR')}</strong><span>habilidades na etapa selecionada</span></div></section>
    <section className="v2-bncc__workspace" aria-label="Filtros e resultados">
      <div className="v2-bncc__stage-label">ETAPA DE ENSINO</div><div className="v2-bncc__stage-tabs" role="tablist" aria-label="Etapa de ensino">{stages.map((option) => <button type="button" role="tab" aria-selected={stage === option} className={`v2-bncc__stage-tab v2-pressable${stage === option ? ' is-selected' : ''}`} key={option} onClick={() => { setStage(option); setQuery(''); setOnlyFavorites(false); }}>{stageLabels[option]}</button>)}</div>
      <label className="v2-bncc__search"><Search size={21} aria-hidden="true" /><span className="v2-sr-only">Buscar habilidade BNCC</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar código ou palavra-chave" autoComplete="off" /><button type="button" aria-label="Limpar busca" onClick={() => setQuery('')} hidden={!query}><X size={18} /></button></label>
      <div className="v2-bncc__result-bar"><span>{loading ? 'Carregando…' : `${results.length.toLocaleString('pt-BR')} ${results.length === 1 ? 'resultado' : 'resultados'}`}</span><button type="button" className={`v2-bncc__favorites-filter v2-pressable${onlyFavorites ? ' is-selected' : ''}`} aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites((value) => !value)}><Star size={16} fill={onlyFavorites ? 'currentColor' : 'none'} /> Favoritos{favorites.length ? ` · ${favorites.length}` : ''}</button></div>
      <div className="v2-bncc__results">{results.slice(0, 30).map((skill) => { const isFavorite = favorites.includes(skill.codigo); return <article className="v2-bncc__row" key={skill.codigo}><button type="button" className="v2-bncc__row-main" onClick={() => openSkill(skill)}><span className="v2-bncc__code">{skill.codigo}</span><strong>{skill.texto}</strong><small>{meta(skill) || 'Objetivo de aprendizagem'}</small></button><button type="button" className={`v2-bncc__row-star v2-pressable${isFavorite ? ' is-selected' : ''}`} aria-label={isFavorite ? `Desfavoritar ${skill.codigo}` : `Favoritar ${skill.codigo}`} aria-pressed={isFavorite} onClick={() => void toggleFavorite(skill.codigo)}><Star size={20} fill={isFavorite ? 'currentColor' : 'none'} /></button><ChevronRight className="v2-bncc__chevron" size={19} aria-hidden="true" /></article>; })}</div>
      {!results.length && <div className="v2-bncc__empty" role="status"><strong>{onlyFavorites ? 'Nenhuma favorita nesta etapa' : 'Nenhuma habilidade encontrada'}</strong><span>Ajuste a busca ou escolha outra etapa para continuar.</span>{(query || onlyFavorites) && <button type="button" className="v2-text-action" onClick={() => { setQuery(''); setOnlyFavorites(false); }}>Limpar filtros</button>}</div>}
      {results.length > 30 && <p className="v2-bncc__limit">Mostrando os primeiros 30 resultados. Refine a busca para encontrar uma habilidade específica.</p>}
    </section>
    <p className="v2-bncc__footer-note">Dados curriculares preservados localmente · sem dados de alunos nesta consulta</p>
  </div></main>;
}
