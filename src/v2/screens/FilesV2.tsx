import { Camera, ChevronRight, FileText, FolderOpen, House, LayoutGrid, Plus, Search, Star, Trash2, Upload, Users, X } from 'lucide-react';
import * as React from 'react';
import { bs, Ch, Ea, Jf, $l, gp, normalizeFolder, trashDocument, vp } from '../../data/files.js';
import type { StoragePort } from '../../domain/models';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './files-v2.css';

type Folder = { id: string; nome: string; pastaPaiId?: string; favorito?: boolean; cor?: string; criadoEm?: string; atualizadoEm?: string };
type DocumentItem = { id: string; nome: string; mime: string; tamanho?: number; pastaId?: string; favorito?: boolean; criadoEm?: string; atualizadoEm?: string; path?: string; uri?: string };
type Props = { storage: StoragePort; onBack?: () => void; onOpenTrash?: () => void; onTabChange?: (tab: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais') => void };
type LoadState = 'loading' | 'ready' | 'empty' | 'error';
const navItems = [{ id: 'inicio', label: 'Início', icon: House }, { id: 'planejamento', label: 'Planejamento', icon: FileText }, { id: 'turmas', label: 'Turmas', icon: Users }, { id: 'arquivos', label: 'Arquivos', icon: FolderOpen }, { id: 'mais', label: 'Mais', icon: LayoutGrid }] as const;
const colors: Record<string, string> = { primary: '#168be0', orange: '#ee9e24', green: '#08a477', purple: '#7664d9', red: '#da5570' };
const fileKind = (item: DocumentItem) => item.mime === 'application/pdf' ? 'PDF' : item.mime.startsWith('image/') ? 'IMAGEM' : item.mime.startsWith('video/') ? 'VÍDEO' : item.nome.split('.').pop()?.toUpperCase() || 'ARQUIVO';
const fileSize = (bytes?: number) => !bytes ? 'Tamanho não informado' : bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
const orderRecent = <T extends { atualizadoEm?: string; criadoEm?: string }>(items: T[]) => [...items].sort((a, b) => String(b.atualizadoEm || b.criadoEm).localeCompare(String(a.atualizadoEm || a.criadoEm)));
const saveDocument = gp as unknown as (input: Record<string, unknown>, options: Record<string, unknown>) => Promise<DocumentItem>;

export function FilesV2({ storage, onBack = () => undefined, onOpenTrash = () => undefined, onTabChange = () => undefined }: Props) {
  const [folders, setFolders] = React.useState<Folder[] | null>(null);
  const [documents, setDocuments] = React.useState<DocumentItem[] | null>(null);
  const [state, setState] = React.useState<LoadState>('loading');
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState<'tudo' | 'recentes' | 'pastas' | 'arquivos'>('tudo');
  const [favoritesOnly, setFavoritesOnly] = React.useState(false);
  const [currentFolder, setCurrentFolder] = React.useState(Ea);
  const [folderName, setFolderName] = React.useState('');
  const [showFolderForm, setShowFolderForm] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [pendingDelete, setPendingDelete] = React.useState<DocumentItem | null>(null);
  const fileInput = React.useRef<HTMLInputElement>(null);

  const hydrate = React.useCallback(async () => {
    setState('loading'); setError('');
    try { const [nextFolders, nextDocuments] = await Promise.all([Ch(storage), bs(storage)]); setFolders(nextFolders); setDocuments(nextDocuments); setState(nextFolders.length || nextDocuments.length ? 'ready' : 'empty'); }
    catch { setFolders(null); setDocuments(null); setState('error'); setError('Não foi possível abrir sua biblioteca local. Seus dados não foram alterados.'); }
  }, []);
  React.useEffect(() => { void hydrate(); }, [hydrate]);

  const lowerQuery = query.trim().toLocaleLowerCase('pt-BR');
  const visibleFolders = React.useMemo(() => orderRecent((folders || []).filter((folder) => {
    const inScope = lowerQuery || filter === 'recentes' ? true : (folder.pastaPaiId || Ea) === currentFolder;
    return inScope && (!lowerQuery || folder.nome.toLocaleLowerCase('pt-BR').includes(lowerQuery)) && filter !== 'arquivos' && (!favoritesOnly || folder.favorito);
  })).slice(0, filter === 'recentes' ? 8 : undefined), [folders, currentFolder, filter, lowerQuery, favoritesOnly]);
  const visibleDocuments = React.useMemo(() => orderRecent((documents || []).filter((doc) => {
    const inScope = lowerQuery || filter === 'recentes' ? true : (doc.pastaId || Ea) === currentFolder;
    return inScope && (!lowerQuery || doc.nome.toLocaleLowerCase('pt-BR').includes(lowerQuery)) && filter !== 'pastas' && (!favoritesOnly || doc.favorito);
  })).slice(0, filter === 'recentes' ? 12 : undefined), [documents, currentFolder, filter, lowerQuery, favoritesOnly]);
  const currentFolderName = folders?.find((folder) => folder.id === currentFolder)?.nome;
  const hasResults = visibleFolders.length || visibleDocuments.length;

  const createFolder = async () => {
    if (!folderName.trim()) return;
    setBusy(true); setError('');
    try { const folder = normalizeFolder({ id: `pasta_${Date.now()}`, nome: folderName, pastaPaiId: currentFolder }); const next = [...(folders || []), folder]; await Jf(storage, next); setFolders(next); setFolderName(''); setShowFolderForm(false); setState('ready'); setMessage('Pasta criada.'); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível criar a pasta.'); }
    finally { setBusy(false); }
  };
  const readDataUrl = (file: File) => new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Arquivo inválido.')); reader.onerror = () => reject(new Error('Não foi possível ler o arquivo.')); reader.readAsDataURL(file); });
  const addFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []); event.target.value = ''; if (!selected.length) return;
    setBusy(true); setError('');
    try { for (const file of selected) await saveDocument({ dataUrl: await readDataUrl(file), nome: file.name, tamanho: file.size, mime: file.type, id: `doc_${Date.now()}_${file.name}`, pastaId: currentFolder }, { storage }); const next = await bs(storage); setDocuments(next); setState('ready'); setMessage(`${selected.length} arquivo${selected.length === 1 ? '' : 's'} adicionado${selected.length === 1 ? '' : 's'}.`); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível adicionar o arquivo.'); }
    finally { setBusy(false); }
  };
  const toggleFavorite = async (document: DocumentItem) => { try { const next = await $l(storage, (documents || []).map((item) => item.id === document.id ? { ...item, favorito: !item.favorito, atualizadoEm: new Date().toISOString() } : item)); setDocuments(next); } catch { setError('Não foi possível atualizar o favorito.'); } };
  const toggleFolderFavorite = async (folder: Folder) => { try { const next = await Jf(storage, (folders || []).map((item) => item.id === folder.id ? { ...item, favorito: !item.favorito, atualizadoEm: new Date().toISOString() } : item)); setFolders(next); } catch { setError('Não foi possível atualizar o favorito.'); } };
  const removeDocument = (document: DocumentItem) => setPendingDelete(document);
  const confirmRemoveDocument = async () => { if (!pendingDelete) return; setBusy(true); try { const next = await trashDocument(pendingDelete, documents || [], { storage }); setDocuments(next); setMessage('Arquivo movido para a lixeira.'); setPendingDelete(null); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível mover o arquivo.'); } finally { setBusy(false); } };
  const handleBack = () => { if (currentFolder === Ea) { onBack(); return; } const parent = folders?.find((folder) => folder.id === currentFolder)?.pastaPaiId || Ea; setCurrentFolder(parent); setQuery(''); setFilter('tudo'); };
  const openDocument = async (document: DocumentItem) => { setBusy(true); setError(''); setMessage(''); try { await vp(document); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível abrir este arquivo.'); } finally { setBusy(false); } };

  return <main className="v2-root v2-files" aria-labelledby="files-v2-title"><div className="v2-screen v2-files__screen">
    <header className="v2-files__header"><button className="v2-files__back v2-pressable" type="button" onClick={handleBack} aria-label={currentFolder === Ea ? 'Voltar' : 'Voltar para a pasta anterior'}><ChevronRight size={24} className="v2-files__back-icon" /></button><div><span className="v2-eyebrow">SEU MATERIAL</span><h1 id="files-v2-title">Arquivos</h1><p>{currentFolder === Ea ? 'Seus materiais pedagógicos, sempre à mão.' : 'Materiais dentro desta pasta.'}</p></div><button className="v2-files__trash v2-pressable" type="button" onClick={onOpenTrash} aria-label="Abrir lixeira"><Trash2 size={21} /></button></header>
    <section className="v2-files__intro"><div><span className="v2-eyebrow">BIBLIOTECA LOCAL</span><h2>{currentFolderName || 'Meus arquivos'}</h2><p>{documents?.length || 0} materiais · {folders?.length || 0} pastas</p></div><FolderOpen size={34} /></section>
    <div className="v2-files__search"><Search size={19} aria-hidden="true" /><input aria-label="Buscar arquivos e pastas" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar arquivos e pastas" />{query && <button type="button" aria-label="Limpar busca" onClick={() => setQuery('')}><X size={17} /></button>}</div>
    <div className="v2-files__filters" role="group" aria-label="Filtrar biblioteca">{[['tudo', 'Tudo'], ['recentes', 'Recentes'], ['pastas', 'Pastas'], ['arquivos', 'Arquivos']].map(([id, label]) => <button key={id} className={`v2-files__filter v2-pressable${filter === id ? ' is-selected' : ''}`} type="button" aria-pressed={filter === id} onClick={() => setFilter(id as typeof filter)}>{label}</button>)}<button className={`v2-files__filter v2-pressable${favoritesOnly ? ' is-selected' : ''}`} type="button" aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly((value) => !value)}><Star size={14} /> Favoritos</button></div>
    <div className="v2-files__actions"><button className="v2-primary-action v2-pressable" type="button" onClick={() => fileInput.current?.click()} disabled={busy}><Upload size={18} /> Adicionar arquivo</button><button className="v2-files__secondary v2-pressable" type="button" onClick={() => fileInput.current?.click()} disabled={busy}><Camera size={18} /> Capturar foto</button></div><input ref={fileInput} className="v2-files__input" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.webp,.gif,.mp4,.webm,.mov" onChange={addFiles} />
    {showFolderForm && <section className="v2-files__create" aria-label="Criar pasta"><label><span>Nome da pasta</span><input autoFocus value={folderName} onChange={(event) => setFolderName(event.target.value)} placeholder="Ex.: Projetos de leitura" /></label><div><button className="v2-files__secondary v2-pressable" type="button" onClick={() => { setShowFolderForm(false); setFolderName(''); }}>Cancelar</button><button className="v2-primary-action v2-pressable" type="button" disabled={busy || !folderName.trim()} onClick={createFolder}>Criar pasta</button></div></section>}
    {state === 'loading' && <div className="v2-files__state" role="status"><span className="v2-files__loader" />Abrindo sua biblioteca…</div>}
    {state === 'error' && <div className="v2-files__state is-error" role="alert"><strong>{error}</strong><button className="v2-files__text-action v2-pressable" type="button" onClick={() => void hydrate()}>Tentar novamente</button></div>}
    {state !== 'loading' && state !== 'error' && error && <div className="v2-files__feedback is-error" role="alert">{error}</div>}{message && <div className="v2-files__feedback" role="status">{message}<button type="button" onClick={() => setMessage('')}>Fechar</button></div>}
    {state !== 'loading' && state !== 'error' && !hasResults && <div className="v2-files__empty"><FolderOpen size={34} /><h2>{lowerQuery ? 'Nenhum resultado' : favoritesOnly ? 'Nenhum favorito ainda' : 'Este espaço é seu'}</h2><p>{lowerQuery ? 'Tente buscar por outro nome.' : 'Crie uma pasta, adicione um arquivo ou capture uma foto para começar.'}</p><button className="v2-primary-action v2-pressable" type="button" onClick={() => setShowFolderForm(true)}><Plus size={18} /> Criar pasta</button></div>}
    {visibleFolders.length > 0 && <section className="v2-files__section"><div className="v2-files__section-head"><div><span className="v2-eyebrow">ORGANIZAÇÃO</span><h2>Pastas</h2></div><button className="v2-files__text-action v2-pressable" type="button" onClick={() => setShowFolderForm(true)}><Plus size={17} /> Nova</button></div><div className="v2-files__folder-list">{visibleFolders.map((folder) => <div className="v2-files__folder-row" key={folder.id}><button className="v2-files__folder-open v2-pressable" type="button" onClick={() => { setCurrentFolder(folder.id); setQuery(''); setFilter('tudo'); }}><span className="v2-files__folder-icon" style={{ '--folder-color': colors[folder.cor || 'primary'] } as React.CSSProperties}><FolderOpen size={22} /></span><span><strong>{folder.nome}</strong><small>Abrir pasta</small></span><ChevronRight size={20} /></button><button className="v2-files__star v2-pressable" type="button" aria-label={folder.favorito ? `Remover ${folder.nome} dos favoritos` : `Favoritar ${folder.nome}`} onClick={() => void toggleFolderFavorite(folder)}><Star size={18} fill={folder.favorito ? '#ee9e24' : 'none'} /></button></div>)}</div></section>}
    {visibleDocuments.length > 0 && <section className="v2-files__section"><div className="v2-files__section-head"><div><span className="v2-eyebrow">MATERIAIS</span><h2>{filter === 'recentes' ? 'Recentes' : 'Arquivos'}</h2></div><span className="v2-files__count">{visibleDocuments.length}</span></div><div className="v2-files__document-list">{visibleDocuments.map((document) => <div className="v2-files__document-row" key={document.id}><span className="v2-files__document-icon"><FileText size={21} /></span><button className="v2-files__document-copy v2-files__document-open v2-pressable" type="button" onClick={() => void openDocument(document)}><strong>{document.nome}</strong><small>{fileKind(document)} · {fileSize(document.tamanho)} · Abrir</small></button><button className="v2-files__star v2-pressable" type="button" aria-label={document.favorito ? `Remover ${document.nome} dos favoritos` : `Favoritar ${document.nome}`} onClick={() => void toggleFavorite(document)}><Star size={18} fill={document.favorito ? '#ee9e24' : 'none'} /></button><button className="v2-files__delete v2-pressable" type="button" aria-label={`Mover ${document.nome} para a lixeira`} onClick={() => removeDocument(document)}><Trash2 size={17} /></button></div>)}</div></section>}
    {pendingDelete && <div className="v2-files__confirm" role="dialog" aria-modal="true" aria-labelledby="files-delete-title"><div><span className="v2-eyebrow">MOVER PARA A LIXEIRA?</span><h2 id="files-delete-title">{pendingDelete.nome}</h2><p>Você poderá restaurar este arquivo depois.</p></div><div><button className="v2-files__secondary v2-pressable" type="button" onClick={() => setPendingDelete(null)}>Cancelar</button><button className="v2-files__danger v2-pressable" type="button" onClick={() => void confirmRemoveDocument()} disabled={busy}>Mover</button></div></div>}
    <nav className="v2-files__bottom-nav" aria-label="Navegação principal">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`v2-files__nav-item v2-pressable${id === 'arquivos' ? ' is-selected' : ''}`} aria-current={id === 'arquivos' ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={23} /><span>{label}</span></button>)}</nav>
  </div></main>;
}
