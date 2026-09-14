// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Su } from "../core/recovered.js";
import { dp } from "../core/recovered.js";
import { th } from "../core/recovered.js";
function Mu(o) {
  if (!o || typeof o.list != "function" || typeof o.get != "function")
    throw new TypeError("Armazenamento local indisponível.");
}
function validateBackup(o) {
  const u = typeof o == "string" ? JSON.parse(o) : o;
  if (!u || u.formato !== dp || ![1, Su].includes(u.versao))
    throw new Error(
      "Este arquivo não é um backup compatível do Assistente Pedagógico.",
    );
  if (!Array.isArray(u.registros))
    throw new Error("O backup está incompleto ou corrompido.");
  const f = new Set(),
    y = u.registros.map((_) => {
      if (!_ || typeof _.chave != "string" || typeof _.valor != "string")
        throw new Error("O backup contém um registro inválido.");
      if (!_.chave || _.chave.length > 240 || f.has(_.chave))
        throw new Error("O backup contém chaves inválidas ou duplicadas.");
      return (
        f.add(_.chave),
        {
          chave: _.chave,
          valor: _.valor,
        }
      );
    });
  if (u.versao === Su && !Array.isArray(u.arquivos))
    throw new Error(
      "O backup está incompleto ou corrompido: a lista de arquivos está ausente.",
    );
  const v = new Set(),
    E = (u.versao === 1 ? u.arquivos || [] : u.arquivos).map((_) => {
      const D = String((_ == null ? void 0 : _.path) || ""),
        T = String((_ == null ? void 0 : _.data) || "").replace(/\s/g, "");
      if (
        !/^midia\/[a-zA-Z0-9_./-]+$/.test(D) ||
        D.includes("..") ||
        D.length > 500 ||
        v.has(D)
      )
        throw new Error(
          "O backup contém caminhos de arquivo inválidos ou duplicados.",
        );
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(T))
        throw new Error("O backup contém um arquivo corrompido.");
      return (
        v.add(D),
        {
          path: D,
          data: T,
        }
      );
    });
  if (
    y.reduce((_, D) => _ + D.chave.length + D.valor.length, 0) +
      E.reduce((_, D) => _ + D.path.length + D.data.length, 0) >
    th
  )
    throw new Error("O backup excede o limite de 100 MB desta versão.");
  return {
    ...u,
    arquivos: E,
    registros: y,
  };
}
async function ql(o, u, f = "midia") {
  if (!o) return [];
  let y;
  try {
    y =
      (
        await o.readdir({
          path: f,
          directory: u,
        })
      ).files || [];
  } catch (E) {
    const b = String((E == null ? void 0 : E.message) || E).toLowerCase();
    if (
      b.includes("not found") ||
      b.includes("does not exist") ||
      b.includes("encontr")
    )
      return [];
    throw E;
  }
  const v = [];
  for (const E of y) {
    const b = `${f}/${E.name}`;
    let _ = String(E.type || "").toLowerCase() === "directory";
    if (!E.type)
      try {
        (await o.readdir({
          path: b,
          directory: u,
        }),
          (_ = !0));
      } catch {
        _ = !1;
      }
    if (_) v.push(...(await ql(o, u, b)));
    else {
      const D = await o.readFile({
        path: b,
        directory: u,
      });
      if (typeof D.data != "string")
        throw new Error(`Não foi possível incluir ${E.name} no backup.`);
      v.push({
        path: b,
        data: D.data.replace(/^data:[^,]+,/, ""),
      });
    }
  }
  return v;
}
async function rh(o, u) {
  if (!o) return 0;
  const f = await ql(o, u);
  try {
    await o.rmdir({
      path: "midia",
      directory: u,
      recursive: !0,
    });
  } catch (y) {
    const v = String((y == null ? void 0 : y.message) || y).toLowerCase();
    if (
      !v.includes("not found") &&
      !v.includes("does not exist") &&
      !v.includes("encontr")
    )
      throw y;
  }
  return f.length;
}
async function fp(o, u, f) {
  if (!o && f.length)
    throw new Error(
      "O armazenamento de arquivos não está disponível para esta restauração.",
    );
  for (const y of f)
    await o.writeFile({
      path: y.path,
      data: y.data,
      directory: u,
      recursive: !0,
    });
}
async function Oo(o, u, f) {
  if (o)
    try {
      await o.rmdir({
        path: f,
        directory: u,
        recursive: !0,
      });
    } catch (y) {
      const v = String((y == null ? void 0 : y.message) || y).toLowerCase();
      if (
        !v.includes("not found") &&
        !v.includes("does not exist") &&
        !v.includes("encontr")
      )
        throw y;
    }
}
function ah(o, u) {
  return o.map((f) => ({
    ...f,
    path: `${u}/${f.path.replace(/^midia\//, "")}`,
  }));
}
async function nh(o, u, f, y) {
  if (!f.length) return;
  if (!(o != null && o.rename) || !(o != null && o.readFile))
    throw new Error(
      "A restauração de arquivos não está disponível neste aparelho.",
    );
  await Oo(o, u, y);
  const v = ah(f, y);
  await fp(o, u, v);
  for (const E of v) {
    const b = await o.readFile({
      path: E.path,
      directory: u,
    });
    if (String(b.data).replace(/^data:[^,]+,/, "") !== E.data)
      throw new Error(
        "Não foi possível validar os arquivos antes da restauração.",
      );
  }
}
async function ih(o, u, f, y, v) {
  if (!o) return;
  const E = await ql(o, u);
  await Oo(o, u, v);
  let b = !1;
  try {
    (E.length &&
      (await o.rename({
        from: "midia",
        to: v,
        directory: u,
      }),
      (b = !0)),
      f.length &&
        (await o.rename({
          from: y,
          to: "midia",
          directory: u,
        })),
      await Oo(o, u, v));
  } catch (_) {
    await Oo(o, u, "midia").catch(() => {});
    let D = !b;
    if (b)
      try {
        (await o.rename({
          from: v,
          to: "midia",
          directory: u,
        }),
          (D = !0));
      } catch {
        D = !1;
      }
    await Oo(o, u, y).catch(() => {});
    const T = new Error(
      D
        ? "Falha ao concluir a restauração dos arquivos."
        : "Falha ao concluir a restauração e recuperar os arquivos anteriores.",
      {
        cause: _,
      },
    );
    throw ((T.rollbackMidiaCompleto = D), T);
  }
}
async function createBackup(
  o,
  {
    appVersion: u = "desconhecida",
    now: f = new Date(),
    filesystem: y = null,
    directory: v = "DATA",
  } = {},
) {
  Mu(o);
  const E = await o.list(""),
    b = [...new Set((E == null ? void 0 : E.keys) || [])].sort(),
    _ = [];
  for (const D of b) {
    const T = await o.get(D);
    _.push({
      chave: D,
      valor: String(T.value),
    });
  }
  return {
    formato: dp,
    versao: Su,
    aplicativo: u,
    exportadoEm: f.toISOString(),
    arquivos: await ql(y, v),
    registros: _,
  };
}
function parseBackup(o) {
  return validateBackup(o);
}
async function restoreBackup(
  o,
  u,
  { substituir: f = !0, filesystem: y = null, directory: v = "DATA" } = {},
) {
  if ((Mu(o), typeof o.set != "function" || typeof o.delete != "function"))
    throw new TypeError("O armazenamento local não permite restauração.");
  const E = validateBackup(u),
    b = await o.list(""),
    _ = [];
  for (const R of (b == null ? void 0 : b.keys) || []) {
    const X = await o.get(R);
    _.push({
      chave: R,
      valor: String(X.value),
    });
  }
  const D = E.versao >= 2,
    T = "midia-restauracao-pendente",
    U = "midia-restauracao-anterior";
  D && f && (await nh(y, v, E.arquivos, T));
  try {
    if (f) for (const { chave: R } of _) await o.delete(R);
    for (const { chave: R, valor: X } of E.registros) await o.set(R, X);
    D && f
      ? await ih(y, v, E.arquivos, T, U)
      : D && (await fp(y, v, E.arquivos));
  } catch (R) {
    const X = await o.list("");
    for (const J of (X == null ? void 0 : X.keys) || []) await o.delete(J);
    for (const { chave: J, valor: pe } of _) await o.set(J, pe);
    await Oo(y, v, T).catch(() => {});
    const ce = (R == null ? void 0 : R.rollbackMidiaCompleto) !== !1;
    throw new Error(
      ce
        ? "Não foi possível restaurar o backup. Seus dados anteriores foram preservados."
        : "Não foi possível restaurar o backup, e parte dos arquivos anteriores pode precisar ser recuperada de outra cópia.",
      {
        cause: R,
      },
    );
  }
  return {
    restaurados: E.registros.length,
    arquivosRestaurados: E.arquivos.length,
    exportadoEm: E.exportadoEm,
  };
}
async function clearData(
  o,
  { filesystem: u = null, directory: f = "DATA" } = {},
) {
  if ((Mu(o), typeof o.delete != "function"))
    throw new TypeError("O armazenamento local não permite exclusão.");
  const y = await o.list(""),
    v = [...new Set((y == null ? void 0 : y.keys) || [])];
  for (const b of v) await o.delete(b);
  const E = await rh(u, f);
  return v.length + E;
}
function serializeBackup(o) {
  return JSON.stringify(validateBackup(o), null, 2);
}
export {
  createBackup,
  Mu,
  ql,
  serializeBackup,
  validateBackup,
  parseBackup,
  restoreBackup,
  nh,
  Oo,
  ah,
  fp,
  ih,
  clearData,
  rh,
};
