// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { Meh as Ip } from "lucide-react";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { Yu } from "../core/recovered.js";
import { Frown as _p } from "lucide-react";
import { colors } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { deleteMedia } from "../data/files.js";
import { Trash2 as mi } from "lucide-react";
import React from "react";
import { nowISO } from "../core/recovered.js";
import { Square as og } from "lucide-react";
import { Smile as qu } from "lucide-react";
import { repository } from "../core/recovered.js";
import { saveMedia } from "../data/files.js";
import { Mic as tg } from "lucide-react";
function ObservationScreen({
  crianca: crianca,
  onBack: onBack,
  onDirtyChange: onDirtyChange,
}) {
  const [y, v] = ReactHooks.useState(null),
    [E, b] = ReactHooks.useState(""),
    [_, D] = ReactHooks.useState(!1),
    [T, U] = ReactHooks.useState(!1),
    [R, X] = ReactHooks.useState(""),
    [ce, J] = ReactHooks.useState(!1),
    [pe, ge] = ReactHooks.useState(null),
    [ue, Se] = ReactHooks.useState(null),
    [Ce, ke] = ReactHooks.useState(0),
    [ye, Ee] = ReactHooks.useState(!1),
    [Ie, Oe] = ReactHooks.useState(!1),
    ze = React.useRef(null),
    te = React.useRef([]),
    Le = React.useRef(null),
    xe = React.useRef(null),
    Me = y !== null || E.trim().length > 0 || !!pe,
    tt = !T && (Me || ce);
  (ReactHooks.useEffect(() => {
    onDirtyChange == null || onDirtyChange(tt);
  }, [tt, onDirtyChange]),
    ReactHooks.useEffect(
      () => () => (onDirtyChange == null ? void 0 : onDirtyChange(!1)),
      [onDirtyChange],
    ));
  const yt = async () => {
      var O, M;
      Se(null);
      try {
        if (
          !((O = navigator.mediaDevices) != null && O.getUserMedia) ||
          typeof MediaRecorder > "u"
        )
          throw new Error(
            "A gravação de áudio não é compatível com este aparelho.",
          );
        const ne = await navigator.mediaDevices.getUserMedia({
          audio: !0,
        });
        ((Le.current = ne), (te.current = []));
        const rt =
            ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((st) => {
              var we;
              return (we = MediaRecorder.isTypeSupported) == null
                ? void 0
                : we.call(MediaRecorder, st);
            }) || "",
          mt = new MediaRecorder(
            ne,
            rt
              ? {
                  mimeType: rt,
                  audioBitsPerSecond: 64e3,
                }
              : void 0,
          );
        ((mt.ondataavailable = (st) => {
          st.data.size > 0 && te.current.push(st.data);
        }),
          (mt.onstop = async () => {
            var st, we;
            Oe(!0);
            try {
              if (!te.current.length)
                throw new Error(
                  "A gravação terminou sem áudio. Tente novamente.",
                );
              const Ue =
                  mt.mimeType ||
                  ((st = te.current[0]) == null ? void 0 : st.type) ||
                  "audio/webm",
                be = new Blob(te.current, {
                  type: Ue,
                });
              if (!be.size)
                throw new Error(
                  "A gravação terminou sem áudio. Tente novamente.",
                );
              ge(await Yu(be));
            } catch (Ue) {
              (console.error("Erro ao preparar o áudio:", Ue),
                Se(
                  (Ue == null ? void 0 : Ue.message) ||
                    "Não foi possível preparar o áudio gravado. Tente novamente.",
                ));
            } finally {
              ((we = Le.current) == null ||
                we.getTracks().forEach((Ue) => Ue.stop()),
                (Le.current = null),
                (ze.current = null),
                Oe(!1));
            }
          }),
          (mt.onerror = () => {
            (clearInterval(xe.current),
              ne.getTracks().forEach((st) => st.stop()),
              J(!1),
              Oe(!1),
              Se(
                "A gravação foi interrompida pelo aparelho. Tente novamente.",
              ));
          }),
          mt.start(250),
          (ze.current = mt),
          J(!0),
          ke(0),
          Rt(700),
          (xe.current = setInterval(() => ke((st) => st + 1), 1e3)));
      } catch (ne) {
        (console.error("Erro ao acessar o microfone:", ne),
          (M = Le.current) == null || M.getTracks().forEach((rt) => rt.stop()),
          (Le.current = null));
        const We = String((ne == null ? void 0 : ne.name) || "");
        Se(
          We === "NotAllowedError" || We === "SecurityError"
            ? "O microfone está desativado para este aplicativo. Libere a permissão nas configurações do Android e tente novamente."
            : We === "NotFoundError"
              ? "Nenhum microfone foi encontrado neste aparelho."
              : We === "NotReadableError"
                ? "O microfone está sendo usado por outro aplicativo. Feche-o e tente novamente."
                : (ne == null ? void 0 : ne.message) ||
                  "Não foi possível iniciar a gravação de áudio. Tente novamente.",
        );
      }
    },
    Be = () => {
      var M;
      const O = ze.current;
      if (O != null && O.state && O.state !== "inactive") {
        try {
          (M = O.requestData) == null || M.call(O);
        } catch {}
        (O.stop(), Oe(!0));
      }
      (J(!1), clearInterval(xe.current), Rt(520));
    },
    dt = () => ge(null);
  ReactHooks.useEffect(
    () => () => {
      var O;
      (clearInterval(xe.current),
        (O = Le.current) == null || O.getTracks().forEach((M) => M.stop()));
    },
    [],
  );
  const me = (O) =>
      `${String(Math.floor(O / 60)).padStart(2, "0")}:${String(O % 60).padStart(2, "0")}`,
    se = async () => {
      if (!Me) {
        X("Registre um humor, um texto ou um áudio antes de salvar.");
        return;
      }
      (D(!0), X(""));
      let O = null;
      try {
        pe &&
          (O = await saveMedia({
            dataUrl: pe,
            tipo: "audio",
            proprietarioId: crianca.id,
            id: createId("audio"),
          }));
        const M = await repository.carregarObservacoes(crianca.id);
        (M.unshift({
          id: createId("obs"),
          data: new Date().toLocaleDateString("pt-BR"),
          criadoEm: nowISO(),
          humor: y,
          texto: E,
          audio: O,
        }),
          await repository.salvarObservacoes(crianca.id, M),
          Rt(700),
          onDirtyChange == null || onDirtyChange(!1),
          U(!0),
          setTimeout(onBack, 700));
      } catch (M) {
        (O && (await deleteMedia(O).catch(() => {})),
          console.error("Erro ao salvar observação:", M),
          X(
            "Não foi possível salvar a observação. Seus dados continuam nesta tela; tente novamente.",
          ));
      } finally {
        D(!1);
      }
    };
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "Nova Observação",
      subtitle: crianca == null ? void 0 : crianca.nome,
      onBack: onBack,
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: 16,
        },
      },
      React.createElement(
        Card,
        {
          style: {
            marginBottom: 14,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 600,
              color: colors.dark,
              marginBottom: 10,
            },
          },
          "Como foi a participação hoje?",
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 10,
            },
          },
          [qu, Ip, _p].map((O, M) =>
            React.createElement(
              "button",
              {
                key: M,
                className: "press-fx",
                onClick: () => v(M),
                style: {
                  flex: 1,
                  padding: 12,
                  borderRadius: 14,
                  border: "none",
                  background: y === M ? colors.primaryLight : colors.bg,
                },
              },
              React.createElement(O, {
                size: 22,
                color: y === M ? colors.primary : colors.gray,
                style: {
                  margin: "0 auto",
                },
              }),
            ),
          ),
        ),
      ),
      React.createElement(
        Card,
        {
          style: {
            marginBottom: 14,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 600,
              color: colors.dark,
              marginBottom: 10,
            },
          },
          "Áudio (opcional)",
        ),
        !pe &&
          !ce &&
          !Ie &&
          React.createElement(
            "button",
            {
              className: "press-fx",
              onClick: () => Ee(!0),
              style: {
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: colors.primaryLight,
                color: colors.primary,
                border: "none",
                borderRadius: 14,
                padding: 12,
                fontWeight: 600,
                fontSize: 14,
              },
            },
            React.createElement(tg, {
              size: 16,
            }),
            " Gravar observação em áudio",
          ),
        ce &&
          React.createElement(
            "button",
            {
              className: "press-fx",
              onClick: Be,
              style: {
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: colors.red,
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: 12,
                fontWeight: 600,
                fontSize: 14,
              },
            },
            React.createElement(og, {
              size: 14,
            }),
            " Gravando... ",
            me(Ce),
            " · Toque para parar",
          ),
        Ie &&
          React.createElement(
            "div",
            {
              role: "status",
              "aria-live": "polite",
              style: {
                minHeight: 48,
                display: "grid",
                placeItems: "center",
                color: colors.gray,
                fontSize: 14,
              },
            },
            "Preparando áudio...",
          ),
        pe &&
          !ce &&
          React.createElement(
            "div",
            null,
            React.createElement("audio", {
              controls: !0,
              src: pe,
              style: {
                width: "100%",
                height: 34,
              },
            }),
            React.createElement(
              "button",
              {
                className: "press-fx",
                onClick: dt,
                style: {
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  color: colors.gray,
                  fontSize: 14,
                  fontWeight: 600,
                },
              },
              React.createElement(mi, {
                size: 13,
              }),
              " Excluir e regravar",
            ),
          ),
        ue &&
          React.createElement(
            "div",
            {
              style: {
                marginTop: 8,
                fontSize: 14,
                color: colors.red,
              },
            },
            ue,
          ),
      ),
      React.createElement(
        Card,
        null,
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 600,
              color: colors.dark,
              marginBottom: 8,
            },
          },
          "Observação livre",
        ),
        React.createElement("textarea", {
          value: E,
          onChange: (O) => b(O.target.value),
          placeholder: "Digite sua observação...",
          rows: 4,
          style: {
            width: "100%",
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 10,
            fontSize: 14,
            resize: "none",
            outline: "none",
            background: "transparent",
            color: colors.dark,
          },
        }),
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 14,
          },
        },
        R &&
          React.createElement(
            "div",
            {
              role: "alert",
              style: {
                marginBottom: 10,
                fontSize: 14,
                color: colors.red,
                lineHeight: 1.45,
              },
            },
            R,
          ),
        React.createElement(
          Button,
          {
            onClick: se,
            disabled: _ || T || ce || Ie || !Me,
          },
          T ? "Salvo ✓" : _ ? "Salvando..." : "Salvar",
        ),
      ),
    ),
    ye &&
      React.createElement(
        "div",
        {
          className: "modal-overlay",
          role: "presentation",
          onClick: () => Ee(!1),
        },
        React.createElement(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "titulo-microfone",
            onClick: (O) => O.stopPropagation(),
            style: {
              width: "calc(100% - 32px)",
              maxWidth: 360,
              background: colors.white,
              borderRadius: 20,
              padding: 18,
              boxShadow: "0 18px 48px rgba(0,0,0,.28)",
            },
          },
          React.createElement(
            "div",
            {
              id: "titulo-microfone",
              style: {
                fontSize: 16,
                fontWeight: 800,
                color: colors.dark,
              },
            },
            "Usar o microfone?",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
                lineHeight: 1.5,
                marginTop: 6,
              },
            },
            "O microfone será usado somente nesta observação. O áudio será associado ao perfil do aluno.",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 8,
                marginTop: 16,
              },
            },
            React.createElement(
              "button",
              {
                className: "press-fx touch-target",
                onClick: () => Ee(!1),
                style: {
                  flex: 1,
                  border: `1px solid ${colors.border}`,
                  background: colors.white,
                  color: colors.dark,
                  borderRadius: 14,
                  fontWeight: 700,
                },
              },
              "Agora não",
            ),
            React.createElement(
              "button",
              {
                className: "press-fx touch-target",
                autoFocus: !0,
                onClick: () => {
                  (Ee(!1), yt());
                },
                style: {
                  flex: 1,
                  border: "none",
                  background: colors.primary,
                  color: colors.onPrimary,
                  borderRadius: 14,
                  fontWeight: 700,
                },
              },
              "Continuar",
            ),
          ),
        ),
      ),
  );
}
export { ObservationScreen };
