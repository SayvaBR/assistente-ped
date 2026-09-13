// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { LocalNotifications as Vl } from "@capacitor/local-notifications";
import { Yf } from "../core/recovered.js";
function _h({ titulo: titulo, mensagem: mensagem, quando: quando }) {
  const y = String(titulo ?? "")
      .trim()
      .slice(0, 100),
    v = String(mensagem ?? "")
      .trim()
      .slice(0, 500),
    E = quando instanceof Date ? quando : new Date(quando);
  if (!y) throw new Error("Informe o título do lembrete.");
  if (!Number.isFinite(E.getTime()))
    throw new Error("Escolha uma data e um horário válidos.");
  if (E.getTime() <= Date.now() + 3e4)
    throw new Error("Escolha um horário pelo menos um minuto à frente.");
  return {
    titulo: y,
    mensagem: v || "Você tem uma tarefa pedagógica planejada.",
    quando: E,
  };
}
function Th(o = Date.now()) {
  return Math.max(1, Math.floor(o % 2e9));
}
async function Ih(o = Vl) {
  let u = await o.checkPermissions();
  if (
    ((u.display === "prompt" || u.display === "prompt-with-rationale") &&
      (u = await o.requestPermissions()),
    u.display !== "granted")
  )
    throw new Error(
      "As notificações estão desativadas nas configurações do Android.",
    );
  return u;
}
async function zh(o, { plugin: u = Vl, id: f = Th() } = {}) {
  const y = _h(o);
  (await Ih(u),
    typeof u.createChannel == "function" &&
      (await u.createChannel({
        id: Yf,
        name: "Lembretes pedagógicos",
        description: "Planos, reuniões e tarefas definidos pelo docente.",
        importance: 4,
        visibility: 1,
      })));
  const v = {
    id: f,
    title: y.titulo,
    body: y.mensagem,
    schedule: {
      at: y.quando,
    },
    channelId: Yf,
    extra: {
      origem: "assistente-pedagogico",
    },
  };
  return (
    await u.schedule({
      notifications: [v],
    }),
    v
  );
}
async function Mh(o = Vl) {
  const u = await o.getPending();
  return Array.isArray(u == null ? void 0 : u.notifications)
    ? u.notifications
    : [];
}
async function Fh(o, u = Vl) {
  await u.cancel({
    notifications: [
      {
        id: Number(o),
      },
    ],
  });
}
export { Mh, zh, Th, _h, Ih, Fh };
