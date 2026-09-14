// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Nh } from "../core/recovered.js";
import { CameraResultType as bu } from "@capacitor/camera";
import { CameraSource as eo } from "@capacitor/camera";
import { Capacitor as ka } from "@capacitor/core";
import { Camera as kp } from "@capacitor/camera";
function wp(o) {
  return Nh.test(String((o == null ? void 0 : o.message) || o || ""));
}
async function Rh(o = kp) {
  if (!ka.isNativePlatform())
    return {
      camera: "granted",
    };
  let u = await o.checkPermissions();
  if (
    ((u.camera === "prompt" || u.camera === "prompt-with-rationale") &&
      (u = await o.requestPermissions({
        permissions: ["camera"],
      })),
    u.camera !== "granted")
  ) {
    const f = new Error(
      "A câmera está desativada para este aplicativo. Libere a permissão da câmera nas configurações do Android e tente novamente.",
    );
    throw ((f.code = "CAMERA_PERMISSION_DENIED"), f);
  }
  return u;
}
async function Sp(o = kp) {
  await Rh(o);
  const u = await o.getPhoto({
    source: eo.Camera,
    resultType: bu.DataUrl,
    quality: 88,
    width: 1600,
    height: 1600,
    correctOrientation: !0,
    allowEditing: !1,
    saveToGallery: !1,
  });
  if (!(u != null && u.dataUrl))
    throw new Error("A câmera não devolveu uma foto. Tente novamente.");
  return u;
}
function bp(o) {
  if ((o == null ? void 0 : o.code) === "CAMERA_PERMISSION_DENIED")
    return o.message;
  const u = String((o == null ? void 0 : o.message) || o || "");
  return /no camera|camera not available|no activity/i.test(u)
    ? "Não encontramos um aplicativo de câmera disponível neste aparelho."
    : "Não foi possível abrir a câmera. Tente novamente ou escolha uma foto da galeria.";
}
const Oh = Object.freeze([
  "reuniao",
  "evento",
  "feriado",
  "tarefa",
  "lembrete",
]);
function fi(o, u = 200) {
  return String(o ?? "")
    .trim()
    .slice(0, u);
}
function Dh(o) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(o) &&
    !Number.isNaN(new Date(`${o}T12:00:00`).getTime())
  );
}
function normalizeEvent(
  o,
  { id: u, turmaId: f, agora: y = new Date().toISOString() } = {},
) {
  const v = fi(o == null ? void 0 : o.titulo, 140),
    E = fi(o == null ? void 0 : o.tipo, 30).toLowerCase(),
    b = fi(o == null ? void 0 : o.data, 10),
    _ = fi(o == null ? void 0 : o.hora, 5);
  if (!v) throw new Error("Informe o título do compromisso.");
  if (!Oh.includes(E))
    throw new Error("Escolha um tipo de compromisso válido.");
  if (!Dh(b)) throw new Error("Escolha uma data válida.");
  if (_ && !/^([01]\d|2[0-3]):[0-5]\d$/.test(_))
    throw new Error("Escolha um horário válido.");
  return {
    id: fi((o == null ? void 0 : o.id) || u, 120),
    turmaId: fi((o == null ? void 0 : o.turmaId) || f, 120),
    titulo: v,
    tipo: E,
    data: b,
    hora: _,
    observacoes: fi(o == null ? void 0 : o.observacoes, 2e3),
    concluido: !!(o != null && o.concluido),
    notificacaoId: Number.isInteger(o == null ? void 0 : o.notificacaoId)
      ? o.notificacaoId
      : null,
    criadoEm: (o == null ? void 0 : o.criadoEm) || y,
    atualizadoEm: y,
  };
}
function xp(o) {
  const u = fi(o, 120);
  if (!u) throw new Error("Selecione uma turma para usar a agenda.");
  return `turma:${u}:agenda:eventos`;
}
async function Cp(o, u) {
  try {
    const f = await o.get(xp(u)),
      y = JSON.parse(f.value);
    if (!Array.isArray(y))
      throw new Error("A agenda local está em formato inválido.");
    return y.map((v) =>
      normalizeEvent(v, {
        id: v.id,
        turmaId: u,
        agora: v.atualizadoEm || v.criadoEm,
      }),
    );
  } catch (f) {
    const y = String((f == null ? void 0 : f.message) || f).toLowerCase();
    if (
      y.includes("not found") ||
      y.includes("ausente") ||
      y.includes("encontrada") ||
      y.includes("encontrado")
    )
      return [];
    throw f;
  }
}
async function Xf(o, u, f) {
  const y = new Set(),
    v = f.map((E) => {
      const b = normalizeEvent(E, {
        id: E.id,
        turmaId: u,
        agora: E.atualizadoEm || new Date().toISOString(),
      });
      if (!b.id || y.has(b.id))
        throw new Error("Há compromissos duplicados ou sem identificação.");
      return (y.add(b.id), b);
    });
  return (await o.set(xp(u), JSON.stringify(v)), v);
} /**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
export { Sp, Rh, wp, bp, Cp, xp, fi, normalizeEvent, Oh, Dh, Xf };
