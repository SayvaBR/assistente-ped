// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { RotateCcw as Fp } from "lucide-react";
import { Clock as Hl } from "lucide-react";
import { Flashlight as Kf } from "lucide-react";
import { Play as Mp } from "lucide-react";
import * as ReactHooks from "react";
import { Timer as Np } from "lucide-react";
import { ScreenHeader } from "../core/recovered.js";
import { Calculator as Uh } from "lucide-react";
import { Delete as Xh } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
import { Pause as rg } from "lucide-react";
import { Torch as vs } from "@capawesome/capacitor-torch";
import { x0 } from "../core/recovered.js";
function ToolsScreen({ onBack: onBack }) {
  const [u, f] = ReactHooks.useState("timer"),
    [y, v] = ReactHooks.useState(3e5),
    [E, b] = ReactHooks.useState(3e5),
    [_, D] = ReactHooks.useState(0),
    [T, U] = ReactHooks.useState(3e5),
    [R, X] = ReactHooks.useState(!1),
    [ce, J] = ReactHooks.useState("0"),
    [pe, ge] = ReactHooks.useState(null),
    [ue, Se] = ReactHooks.useState(null),
    [Ce, ke] = ReactHooks.useState(!1),
    [ye, Ee] = ReactHooks.useState(null),
    [Ie, Oe] = ReactHooks.useState(!1),
    [ze, te] = ReactHooks.useState("");
  (ReactHooks.useEffect(
    () => (
      vs
        .isAvailable()
        .then((O) => Ee(O.available))
        .catch(() => Ee(!1)),
      () => {
        vs.disable().catch(() => {});
      }
    ),
    [],
  ),
    ReactHooks.useEffect(() => {
      if (!R) return;
      const O = () => {
        const ne = Date.now() - _,
          We = u === "timer" ? Math.max(0, T - ne) : T + ne;
        (b(We), u === "timer" && We <= 0 && (X(!1), U(0), x0()));
      };
      O();
      const M = setInterval(O, 100);
      return () => clearInterval(M);
    }, [R, _, u, T]));
  const Le = async (O) => {
      (X(!1),
        Ie && O !== "lanterna" && (await vs.disable().catch(() => {}), Oe(!1)),
        f(O),
        te(""),
        O === "timer" && (b(y), U(y)),
        O === "cronometro" && (b(0), U(0)));
    },
    xe = () => {
      if (R) {
        const O = Date.now() - _,
          M = u === "timer" ? Math.max(0, T - O) : T + O;
        (b(M), U(M), X(!1));
      } else (D(Date.now()), U(E), X(!0));
    },
    Me = () => {
      X(!1);
      const O = u === "timer" ? y : 0;
      (b(O), U(O));
    },
    tt = (O) => {
      const M = Math.floor(O / 1e3),
        ne = Math.floor(M / 60),
        We = M % 60,
        rt = Math.floor((O % 1e3) / 100);
      return u === "cronometro"
        ? `${String(ne).padStart(2, "0")}:${String(We).padStart(2, "0")}.${rt}`
        : `${String(ne).padStart(2, "0")}:${String(We).padStart(2, "0")}`;
    },
    yt = () => Number(ce.replace(",", ".")),
    Be = (O, M, ne) =>
      ne === "+"
        ? O + M
        : ne === "−"
          ? O - M
          : ne === "×"
            ? O * M
            : ne === "÷"
              ? M === 0
                ? NaN
                : O / M
              : M,
    dt = (O) => {
      if ((te(""), /^\d$/.test(O))) {
        (J((ne) => (Ce ? O : (ne === "0" ? O : ne + O).slice(0, 14))), ke(!1));
        return;
      }
      if (O === ",") {
        Ce ? (J("0,"), ke(!1)) : ce.includes(",") || J((ne) => `${ne},`);
        return;
      }
      if (O === "C") {
        (J("0"), Se(null), ge(null), ke(!1));
        return;
      }
      if (O === "⌫") {
        J((ne) => (ne.length > 1 ? ne.slice(0, -1) : "0"));
        return;
      }
      if (O === "±") {
        J((ne) =>
          ne.startsWith("-") ? ne.slice(1) : ne === "0" ? ne : `-${ne}`,
        );
        return;
      }
      if (O === "%") {
        J(String(yt() / 100).replace(".", ","));
        return;
      }
      const M = yt();
      if (O === "=") {
        if (ue === null || !pe) return;
        const ne = Be(ue, M, pe);
        (Number.isFinite(ne)
          ? J(String(Number(ne.toFixed(8))).replace(".", ","))
          : (te("Não é possível dividir por zero."), J("0")),
          Se(null),
          ge(null),
          ke(!0));
        return;
      }
      ["+", "−", "×", "÷"].includes(O) && (Se(M), ge(O), ke(!0));
    },
    me = async () => {
      te("");
      try {
        (Ie ? await vs.disable() : await vs.enable(), Oe((O) => !O));
      } catch {
        te("Não foi possível controlar a lanterna neste aparelho.");
      }
    },
    se = [
      ["timer", "Temporizador", Np],
      ["cronometro", "Cronômetro", Hl],
      ["calculadora", "Calculadora", Uh],
      ["lanterna", "Lanterna", Kf],
    ];
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "Ferramentas de sala",
      subtitle: "Recursos rápidos para usar durante a aula",
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
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 14,
          },
        },
        se.map(([O, M, ne]) =>
          React.createElement(
            "button",
            {
              key: O,
              className: "touch-target tool-mode-button",
              onClick: () => Le(O),
              "aria-pressed": u === O,
              style: {
                border: `1px solid ${u === O ? colors.primary : colors.border}`,
                borderRadius: 14,
                background: u === O ? colors.primaryLight : colors.white,
                color: u === O ? colors.primaryDark : colors.dark,
                fontWeight: 750,
              },
            },
            React.createElement(ne, {
              size: 18,
            }),
            M,
          ),
        ),
      ),
      (u === "timer" || u === "cronometro") &&
        React.createElement(
          Card,
          {
            style: {
              textAlign: "center",
              padding: 24,
            },
          },
          u === "timer" &&
            !R &&
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 18,
                },
              },
              [6e4, 3e5, 6e5, 9e5].map((O) =>
                React.createElement(
                  "button",
                  {
                    key: O,
                    onClick: () => {
                      (v(O), b(O), U(O));
                    },
                    style: {
                      minWidth: 48,
                      minHeight: 48,
                      border: `1px solid ${y === O ? colors.primary : colors.border}`,
                      borderRadius: 12,
                      background: y === O ? colors.primaryLight : colors.white,
                      color: colors.dark,
                      fontWeight: 700,
                    },
                  },
                  O / 6e4,
                  "m",
                ),
              ),
            ),
          React.createElement(
            "div",
            {
              "aria-live": "polite",
              style: {
                fontSize: "clamp(44px,15vw,62px)",
                fontWeight: 800,
                fontVariantNumeric: "tabular-nums",
                color: colors.dark,
                letterSpacing: 1,
              },
            },
            tt(E),
          ),
          u === "timer" &&
            E === 0 &&
            React.createElement(
              "div",
              {
                role: "status",
                style: {
                  color: colors.primary,
                  fontWeight: 800,
                  marginTop: 8,
                },
              },
              "Tempo encerrado",
            ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 10,
                marginTop: 22,
              },
            },
            React.createElement(
              "button",
              {
                className: "touch-target tool-action-button",
                onClick: Me,
                style: {
                  flex: 1,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 15,
                  background: colors.white,
                  color: colors.dark,
                  fontWeight: 750,
                },
              },
              React.createElement(Fp, {
                size: 17,
              }),
              "Zerar",
            ),
            React.createElement(
              "button",
              {
                className: "touch-target tool-action-button",
                onClick: xe,
                disabled: u === "timer" && E === 0,
                style: {
                  flex: 1,
                  border: "none",
                  borderRadius: 15,
                  background: colors.primary,
                  color: colors.onPrimary,
                  fontWeight: 750,
                },
              },
              R
                ? React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(rg, {
                      size: 17,
                    }),
                    "Pausar",
                  )
                : React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Mp, {
                      size: 17,
                    }),
                    "Iniciar",
                  ),
            ),
          ),
        ),
      u === "calculadora" &&
        React.createElement(
          Card,
          null,
          React.createElement(
            "div",
            {
              "aria-live": "polite",
              "aria-label": `Resultado ${ce}`,
              style: {
                background: colors.bg,
                borderRadius: 15,
                padding: "16px 12px",
                textAlign: "right",
                fontSize: 34,
                fontWeight: 800,
                color: colors.dark,
                overflowX: "auto",
                fontVariantNumeric: "tabular-nums",
              },
            },
            ce,
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 8,
                marginTop: 12,
              },
            },
            [
              "C",
              "±",
              "%",
              "⌫",
              "7",
              "8",
              "9",
              "÷",
              "4",
              "5",
              "6",
              "×",
              "1",
              "2",
              "3",
              "−",
              "0",
              ",",
              "=",
              "+",
            ].map((O) =>
              React.createElement(
                "button",
                {
                  key: O,
                  className: "touch-target",
                  "aria-label": O === "⌫" ? "Apagar último dígito" : O,
                  onClick: () => dt(O),
                  style: {
                    border: `1px solid ${colors.border}`,
                    borderRadius: 13,
                    background: ["÷", "×", "−", "+", "="].includes(O)
                      ? colors.primaryLight
                      : colors.white,
                    color: ["÷", "×", "−", "+", "="].includes(O)
                      ? colors.primaryDark
                      : colors.dark,
                    fontSize: 18,
                    fontWeight: 800,
                  },
                },
                O === "⌫"
                  ? React.createElement(Xh, {
                      size: 19,
                    })
                  : O,
              ),
            ),
          ),
        ),
      u === "lanterna" &&
        React.createElement(
          Card,
          {
            style: {
              textAlign: "center",
              padding: 28,
            },
          },
          React.createElement(Kf, {
            size: 44,
            color: Ie ? colors.orange : colors.primary,
          }),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 17,
                fontWeight: 800,
                color: colors.dark,
                marginTop: 10,
              },
            },
            Ie ? "Lanterna ligada" : "Lanterna desligada",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
                lineHeight: 1.45,
                margin: "6px 0 16px",
              },
            },
            ye === !1
              ? "Este aparelho não informou uma lanterna disponível."
              : "Use a luz traseira do aparelho sem sair do aplicativo.",
          ),
          React.createElement(
            Button,
            {
              onClick: me,
              disabled: !ye,
            },
            Ie ? "Desligar lanterna" : "Ligar lanterna",
          ),
        ),
      ze &&
        React.createElement(
          "div",
          {
            role: "alert",
            style: {
              color: colors.red,
              fontSize: 14,
              marginTop: 10,
            },
          },
          ze,
        ),
    ),
  );
}
export { ToolsScreen };
