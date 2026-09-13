// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.

function validateBirthDate(o, u = new Date()) {
  const f = String(o ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f))
    throw new Error("Informe a data de nascimento.");
  const y = new Date(`${f}T12:00:00`);
  if (Number.isNaN(y.getTime()) || `${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,'0')}-${String(y.getDate()).padStart(2,'0')}` !== f)
    throw new Error("Informe uma data de nascimento válida.");
  const today = new Date(u.getFullYear(),u.getMonth(),u.getDate(),12);
  if (y > today) throw new Error("A data de nascimento não pode estar no futuro.");
  if (u.getFullYear() - y.getFullYear() > 30)
    throw new Error("Confira a data de nascimento informada.");
  return f;
}
function calculateAge(o, u = new Date()) {
  const f = validateBirthDate(o, u),
    y = new Date(`${f}T12:00:00`);
  let v =
    (u.getFullYear() - y.getFullYear()) * 12 + u.getMonth() - y.getMonth();
  (u.getDate() < y.getDate() && (v -= 1), (v = Math.max(0, v)));
  const E = Math.floor(v / 12),
    b = v % 12;
  return E === 0
    ? `${b} ${b === 1 ? "mês" : "meses"}`
    : b === 0
      ? `${E} ${E === 1 ? "ano" : "anos"}`
      : `${E} ${E === 1 ? "ano" : "anos"} e ${b} ${b === 1 ? "mês" : "meses"}`;
}
function formatPhone(o) {
  let u = String(o ?? "")
    .replace(/\D/g, "")
    .replace(/^55(?=\d{10,11}$)/, "")
    .slice(0, 11);
  if (
    (u.length === 10 &&
      /^[6-9]/.test(u.slice(2)) &&
      (u = `${u.slice(0, 2)}9${u.slice(2)}`),
    !u)
  )
    return "";
  if (u.length <= 2) return `(${u}`;
  const f = u.slice(0, 2),
    y = u.slice(2);
  if (y.length <= 4) return `(${f}) ${y}`;
  const v = y.length > 8 ? 5 : 4;
  return `(${f}) ${y.slice(0, v)}-${y.slice(v)}`;
}
function validatePhone(o, { opcional: u = !0 } = {}) {
  let f = String(o ?? "")
    .replace(/\D/g, "")
    .replace(/^55(?=\d{10,11}$)/, "");
  if (
    (f.length === 10 &&
      /^[6-9]/.test(f.slice(2)) &&
      (f = `${f.slice(0, 2)}9${f.slice(2)}`),
    !f && u)
  )
    return "";
  if (!/^\d{11}$/.test(f) || /^([0-9])\1+$/.test(f))
    throw new Error("Informe um celular completo, com DDD e 9 dígitos.");
  const y = Number(f.slice(0, 2));
  if (y < 11 || y > 99 || f[2] !== "9")
    throw new Error("Informe um celular completo, com DDD e 9 dígitos.");
  return formatPhone(f);
}
function fh(o) {
  const u = validatePhone(o);
  return u ? `tel:+55${u.replace(/\D/g, "")}` : "";
}
const pp = "turmas:lista";
const Bl = "turmas:ativa";
function ys(o, u = 100) {
  return String(o ?? "")
    .trim()
    .slice(0, u);
}
/** @param {any} o @param {{id?:string,professorId?:string,agora?:string}} options */
function normalizeClass(
  o,
  { id: u, professorId: f, agora: y = new Date().toISOString() } = {},
) {
  const v = ys(o == null ? void 0 : o.nome),
    E = ys(o == null ? void 0 : o.nivel),
    b = ys(o == null ? void 0 : o.turno, 30);
  if (!v) throw new Error("Informe o nome da turma.");
  if (!E) throw new Error("Informe o nível, série ou ano da turma.");
  if (!b) throw new Error("Informe o turno da turma.");
  return {
    ...o,
    id: ys((o == null ? void 0 : o.id) || u, 120),
    nome: v,
    nivel: E,
    turno: b,
    professorId: ys((o == null ? void 0 : o.professorId) || f, 120),
    criadoEm: (o == null ? void 0 : o.criadoEm) || y,
    atualizadoEm: y,
    arquivadaEm: (o == null ? void 0 : o.arquivadaEm) || null,
  };
}
async function loadClasses(o) {
  var v, E;
  let u = [];
  try {
    const b = await o.get(pp),
      _ = JSON.parse(b.value);
    if (!Array.isArray(_))
      throw new Error("A lista de turmas está corrompida.");
    u = _.map((D) =>
      normalizeClass(D, {
        id: D.id,
        professorId: D.professorId,
        agora: D.atualizadoEm || D.criadoEm,
      }),
    );
  } catch (b) {
    const _ = String((b == null ? void 0 : b.message) || b).toLowerCase();
    if (
      !_.includes("not found") &&
      !_.includes("ausente") &&
      !_.includes("encontrada")
    )
      throw b;
  }
  let f = "";
  try {
    f = ((v = await o.get(Bl)) == null ? void 0 : v.value) || "";
  } catch {}
  const y = u.filter((b) => !b.arquivadaEm);
  return (
    y.some((b) => b.id === f) ||
      (f = ((E = y[0]) == null ? void 0 : E.id) || ""),
    {
      lista: u,
      ativaId: f,
      ativa: u.find((b) => b.id === f) || null,
    }
  );
}
async function saveClasses(o, u, f) {
  var b;
  const y = new Set(),
    v = u.map((_) => {
      const D = normalizeClass(_, {
        id: _.id,
        professorId: _.professorId,
        agora: _.atualizadoEm || new Date().toISOString(),
      });
      if (!D.id || y.has(D.id))
        throw new Error("Há turmas duplicadas ou sem identificação.");
      return (y.add(D.id), D);
    }),
    E = v.find((_) => _.id === f && !_.arquivadaEm);
  if (v.some((_) => !_.arquivadaEm) && !E)
    throw new Error("Escolha uma turma ativa válida.");
  return (
    await o.set(pp, JSON.stringify(v)),
    E
      ? await o.set(Bl, E.id)
      : await ((b = o.delete) == null ? void 0 : b.call(o, Bl).catch(() => {})),
    {
      lista: v,
      ativaId: (E == null ? void 0 : E.id) || "",
      ativa: E || null,
    }
  );
}
async function ph(o, u, f) {
  const y = u.find((v) => v.id === f && !v.arquivadaEm);
  if (!y) throw new Error("Esta turma não está disponível para seleção.");
  return (await o.set(Bl, y.id), y);
}
async function mh(o, u, f, y, v = new Date().toISOString()) {
  var D;
  const E = u.filter((T) => !T.arquivadaEm && T.id !== f);
  if (f === y && E.length === 0)
    throw new Error(
      "Crie ou ative outra turma antes de arquivar a única turma disponível.",
    );
  const b = u.map((T) =>
      T.id === f
        ? {
            ...T,
            arquivadaEm: v,
            atualizadoEm: v,
          }
        : T,
    ),
    _ = f === y ? ((D = E[0]) == null ? void 0 : D.id) : y;
  return saveClasses(o, b, _);
}
const mp = Object.freeze([
  "rotina:",
  "ocorrencias:",
  "diario:",
  "chamada:",
  "justificativas:",
  "planejamento:",
]);
function hp(o) {
  const u = String(o ?? "").trim();
  if (!u || !/^[a-zA-Z0-9_-]+$/.test(u))
    throw new Error("Turma ativa inválida.");
  return u;
}
function classKey(o, u) {
  const f = hp(o),
    y = String(u ?? "");
  return y === "turma:alunos"
    ? `turma:${f}:alunos`
    : mp.some((v) => y.startsWith(v))
      ? `turma:${f}:${y}`
      : y;
}
function classPrefix(o, u) {
  return classKey(o, u);
}
function gh(o) {
  return o === "turma:alunos" || mp.some((u) => o.startsWith(u));
}
async function migrateLegacyClassData(o, u) {
  var _;
  const f = hp(u),
    y = "migracao:dados-legados:turma-v1";
  try {
    const D = await o.get(y);
    if (D != null && D.value)
      return {
        migrados: 0,
        turmaId: D.value,
        jaExecutada: !0,
      };
  } catch {}
  const v = await o.list(""),
    E = ((v == null ? void 0 : v.keys) || []).filter(gh);
  let b = 0;
  for (const D of E) {
    const T = classKey(f, D);
    let U = !1;
    try {
      U = ((_ = await o.get(T)) == null ? void 0 : _.value) != null;
    } catch {}
    if (U) continue;
    const R = await o.get(D);
    (await o.set(T, R.value), (b += 1));
  }
  return (
    await o.set(y, f),
    {
      migrados: b,
      turmaId: f,
      jaExecutada: !1,
    }
  );
}
export {
  classKey,
  hp,
  mp,
  classPrefix,
  loadClasses,
  pp,
  normalizeClass,
  ys,
  Bl,
  migrateLegacyClassData,
  gh,
  saveClasses,
  ph,
  fh,
  validatePhone,
  formatPhone,
  calculateAge,
  validateBirthDate,
  mh,
};
