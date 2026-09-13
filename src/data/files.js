import { Filesystem, Directory } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import { FileViewer } from "@capacitor/file-viewer";

export const Sh = Object.freeze({
  foto: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  audio: ["audio/webm", "audio/mp4", "audio/mpeg", "audio/wav", "audio/ogg"],
  documento: [
    "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain", "image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "video/quicktime",
  ],
});

export const Ea = "root";
export const Ou = "documentos:app:v2";
export const Ep = "biblioteca:pessoal:pastas:v1";
export const TrashKey = "biblioteca:pessoal:lixeira:v1";
const MAX_NAME = 180;
const FOLDER_COLORS = ["primary", "orange", "green", "purple", "red"];

export function Gf(value, fallback = "arquivo") {
  return String(value ?? "").trim().replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").slice(0, 80) || fallback;
}
export function bh(mime) {
  return ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "audio/webm": "webm", "audio/mp4": "m4a", "audio/mpeg": "mp3", "audio/wav": "wav", "audio/ogg": "ogg", "video/mp4": "mp4", "video/webm": "webm", "video/quicktime": "mov", "application/pdf": "pdf", "application/msword": "doc", "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx", "application/vnd.ms-excel": "xls", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx", "application/vnd.ms-powerpoint": "ppt", "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx", "text/plain": "txt" }[mime] || "bin");
}
export function xh(dataUrl) {
  const match = String(dataUrl ?? "").match(/^data:([^;,]+);base64,([A-Za-z0-9+/=\s]+)$/);
  if (!match) throw new Error("O arquivo selecionado está em formato inválido.");
  return { mime: match[1].toLowerCase(), base64: match[2].replace(/\s/g, "") };
}
export async function saveMedia({ dataUrl, tipo, proprietarioId, id, nomeOriginal = "" }, { filesystem = Filesystem, storage: _storage } = {}) {
  const accepted = Sh[tipo];
  if (!accepted) throw new Error("Tipo de arquivo não suportado.");
  const { mime, base64 } = xh(dataUrl);
  if (!accepted.includes(mime)) throw new Error("Este formato de arquivo não é aceito nesta área.");
  const path = `midia/${Gf(proprietarioId, "geral")}/${Gf(id || Date.now())}.${bh(mime)}`;
  await filesystem.writeFile({ path, data: base64, directory: Directory.Data, recursive: true });
  const { uri } = await filesystem.getUri({ path, directory: Directory.Data });
  return { id: Gf(id || Date.now()), tipo, mime, path, uri, nomeOriginal: String(nomeOriginal || "").slice(0, MAX_NAME), criadoEm: new Date().toISOString() };
}
export async function deleteMedia(item, { filesystem = Filesystem } = {}) {
  if (!item?.path) return;
  try { await filesystem.deleteFile({ path: item.path, directory: Directory.Data }); }
  catch (error) { const message = String(error?.message || error).toLowerCase(); if (!["not found", "does not exist", "ausente", "encontrada", "encontrado"].some((term) => message.includes(term))) throw error; }
}
export function Ss(item, { convertFileSrc } = {}) {
  if (!item) return "";
  if (String(item.uri || "").startsWith("data:")) return item.uri;
  return typeof convertFileSrc === "function" ? convertFileSrc(item.uri) : item.uri || "";
}
function text(value, limit = MAX_NAME) { return String(value ?? "").trim().slice(0, limit); }
function missing(error) { const message = String(error?.message || error).toLowerCase(); return ["not found", "does not exist", "ausente", "encontrada", "encontrado", "registro não encontrado"].some((term) => message.includes(term)); }
function parseArray(value, invalidMessage) { const parsed = JSON.parse(value); if (!Array.isArray(parsed)) throw new Error(invalidMessage); return parsed; }

export function _s(value) {
  const nome = text(value?.nome);
  if (!value?.id || !nome || !value?.path || !value?.uri || !value?.mime) throw new Error("Há um documento local incompleto.");
  return { ...value, id: text(value.id, 120), nome, tamanho: Number(value.tamanho) || 0, mime: text(value.mime, 160), path: text(value.path, 500), uri: text(value.uri, 2000), favorito: !!value.favorito, pastaId: text(value.pastaId || Ea, 120) || Ea, criadoEm: value.criadoEm || new Date().toISOString(), atualizadoEm: value.atualizadoEm || value.criadoEm || new Date().toISOString() };
}
export async function bs(port) {
  try { return parseArray((await port.get(Ou)).value, "A lista de documentos está corrompida.").map(_s); }
  catch (error) { if (missing(error)) return []; throw error; }
}
export async function $l(port, items) { const normalized = items.map(_s); await port.set(Ou, JSON.stringify(normalized)); return normalized; }
export async function gp({ dataUrl, nome, tamanho, id, pastaId = Ea, favorito = false, mime }, { storage, filesystem = Filesystem } = {}) {
  if (!storage) throw new Error("O armazenamento da biblioteca não está disponível.");
  const saved = await saveMedia({ dataUrl, tipo: "documento", proprietarioId: "documentos", id, nomeOriginal: nome }, { filesystem });
  const document = _s({ ...saved, nome, tamanho, mime: mime || saved.mime, pastaId, favorito, atualizadoEm: saved.criadoEm });
  try { const current = await bs(storage); await storage.set(Ou, JSON.stringify([document, ...current])); return document; }
  catch (error) { await deleteMedia(document, { filesystem }).catch(() => {}); throw error; }
}
export async function readDocumentDataUrl(item, { filesystem = Filesystem } = {}) {
  const document = _s(item); const result = await filesystem.readFile({ path: document.path, directory: Directory.Data });
  if (typeof result.data !== "string") return URL.createObjectURL(result.data);
  return `data:${document.mime};base64,${result.data}`;
}
export async function vp(item, { fileViewer = FileViewer, isNative = Capacitor.isNativePlatform(), openWindow = (url) => window.open(url, "_blank", "noopener,noreferrer") } = {}) {
  const document = _s(item);
  if (isNative) return fileViewer.openDocumentFromLocalPath({ path: document.uri });
  if (openWindow(document.uri) === null) throw new Error("O navegador bloqueou a abertura do documento.");
}

export function normalizeFolder(value, { id, agora = new Date().toISOString() } = {}) {
  const nome = text(value?.nome, 120); if (!nome) throw new Error("Informe o nome da pasta.");
  const pastaPaiId = text(value?.pastaPaiId || Ea, 120) || Ea; const folderId = text(value?.id || id, 120);
  if (!folderId || folderId === Ea || folderId === pastaPaiId) throw new Error("Esta pasta não pode ser criada aqui.");
  return { ...value, id: folderId, nome, pastaPaiId, cor: FOLDER_COLORS.includes(value?.cor) ? value.cor : "primary", favorito: !!value?.favorito, criadoEm: value?.criadoEm || agora, atualizadoEm: agora };
}
export async function Ch(port) {
  try { return parseArray((await port.get(Ep)).value, "A lista de pastas está corrompida.").map((folder) => normalizeFolder(folder, { id: folder.id, agora: folder.atualizadoEm || folder.criadoEm })); }
  catch (error) { if (missing(error)) return []; throw error; }
}
export async function Jf(port, items) {
  const ids = new Set(); const normalized = items.map((item) => { const folder = normalizeFolder(item, { id: item.id, agora: item.atualizadoEm || new Date().toISOString() }); if (ids.has(folder.id)) throw new Error("Há pastas duplicadas na biblioteca."); ids.add(folder.id); return folder; });
  for (const folder of normalized) if (folder.pastaPaiId !== Ea && !ids.has(folder.pastaPaiId)) throw new Error("Uma pasta está fora da estrutura da biblioteca.");
  await port.set(Ep, JSON.stringify(normalized)); return normalized;
}
export function Ph(folders, folderId) { const result = []; const visited = new Set(); let current = folderId; while (current && current !== Ea) { if (visited.has(current)) throw new Error("A estrutura de pastas contém um ciclo."); visited.add(current); const folder = folders.find((item) => item.id === current); if (!folder) break; result.unshift(folder); current = folder.pastaPaiId; } return result; }
export function Ah(folders, documents, folderId) { if (folders.some((folder) => folder.pastaPaiId === folderId) || documents.some((doc) => (doc.pastaId || Ea) === folderId)) throw new Error("Esvazie esta pasta antes de excluí-la."); return folders.filter((folder) => folder.id !== folderId); }

export async function listTrash(port) { try { return parseArray((await port.get(TrashKey)).value, "A lixeira da biblioteca está corrompida."); } catch (error) { if (missing(error)) return []; throw error; } }
async function saveTrash(port, items) { await port.set(TrashKey, JSON.stringify(items)); return items; }
function trashEntry(item, type) { return { id: `lixeira_${type}_${item.id}`, type, item, deletedAt: new Date().toISOString() }; }
export async function trashDocument(document, documents, { storage } = {}) {
  const current = documents.map(_s); const target = _s(document); if (!storage) throw new Error("O armazenamento da biblioteca não está disponível.");
  const next = current.filter((item) => item.id !== target.id); const trash = await listTrash(storage);
  await $l(storage, next);
  try { await saveTrash(storage, [trashEntry(target, "file"), ...trash]); } catch (error) { await $l(storage, current).catch(() => {}); throw error; }
  return next;
}
export async function trashFolder(folder, folders, documents, { storage } = {}) {
  if (!storage) throw new Error("O armazenamento da biblioteca não está disponível.");
  const next = Ah(folders, documents, folder.id); const trash = await listTrash(storage); await Jf(storage, next);
  try { await saveTrash(storage, [trashEntry(normalizeFolder(folder, { id: folder.id }), "folder"), ...trash]); } catch (error) { await Jf(storage, folders).catch(() => {}); throw error; }
  return next;
}
export async function restoreTrash(entry, { storage } = {}) {
  if (!storage || !entry?.item) throw new Error("Item da lixeira inválido."); const trash = await listTrash(storage); const remaining = trash.filter((item) => item.id !== entry.id);
  if (entry.type === "file") { const documents = await bs(storage); const folders = await Ch(storage); const item = _s({ ...entry.item, pastaId: folders.some((folder) => folder.id === entry.item.pastaId) ? entry.item.pastaId : Ea, atualizadoEm: new Date().toISOString() }); await $l(storage, [item, ...documents]); await saveTrash(storage, remaining); return item; }
  const folders = await Ch(storage); const item = normalizeFolder({ ...entry.item, pastaPaiId: folders.some((folder) => folder.id === entry.item.pastaPaiId) ? entry.item.pastaPaiId : Ea }, { id: entry.item.id }); await Jf(storage, [item, ...folders]); await saveTrash(storage, remaining); return item;
}
export async function deleteTrashPermanently(entry, { storage, filesystem = Filesystem } = {}) { if (!storage || !entry?.item) throw new Error("Item da lixeira inválido."); const trash = await listTrash(storage); await saveTrash(storage, trash.filter((item) => item.id !== entry.id)); if (entry.type === "file") await deleteMedia(entry.item, { filesystem }); }
export async function updateFolder(port, folder, changes) {
  const folders = await Ch(port); const target = folders.find((item) => item.id === folder.id); if (!target) throw new Error("Pasta não encontrada.");
  const next = normalizeFolder({ ...target, ...changes }, { id: target.id });
  if (next.pastaPaiId !== target.pastaPaiId && Ph(folders, next.pastaPaiId).some((item) => item.id === target.id)) throw new Error("Uma pasta não pode ficar dentro de uma subpasta dela.");
  if (folders.some((item) => item.id !== target.id && item.pastaPaiId === next.pastaPaiId && item.nome.toLocaleLowerCase() === next.nome.toLocaleLowerCase())) throw new Error("Já existe uma pasta com esse nome aqui.");
  return Jf(port, folders.map((item) => item.id === folder.id ? next : item));
}
export async function moveFolder(port, folder, pastaPaiId = Ea) {
  const folders = await Ch(port); const target = folders.find((item) => item.id === folder.id); if (!target) throw new Error("Pasta não encontrada.");
  if (pastaPaiId === target.id) throw new Error("Uma pasta não pode ficar dentro dela mesma.");
  return updateFolder(port, target, { pastaPaiId });
}
export async function moveDocument(port, document, pastaId) { const folders = await Ch(port); if (pastaId !== Ea && !folders.some((folder) => folder.id === pastaId)) throw new Error("A pasta de destino não existe."); const documents = await bs(port); return $l(port, documents.map((item) => item.id === document.id ? { ...item, pastaId, atualizadoEm: new Date().toISOString() } : item)); }
export async function shareDocument(document, { share, navigatorObject = typeof navigator !== "undefined" ? navigator : undefined, filesystem = Filesystem } = {}) { const item = _s(document); const dataUrl = await readDocumentDataUrl(item, { filesystem }); if (navigatorObject?.share && !Capacitor.isNativePlatform()) { await navigatorObject.share({ title: item.nome, text: item.nome, url: dataUrl }); return; } if (!share) throw new Error("O compartilhamento não está disponível neste dispositivo."); const { value } = await share.canShare(); if (!value) throw new Error("O compartilhamento não está disponível neste dispositivo."); const { uri } = await filesystem.getUri({ path: item.path, directory: Directory.Data }); return share.share({ title: item.nome, files: [uri], dialogTitle: "Compartilhar arquivo" }); }

// Compatibility with the older Documents screen; deletion is now recoverable.
export async function yp(document, documents, options) { return trashDocument(document, documents, options); }
