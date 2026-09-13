// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import { M0 } from "../screens/M0.js";
import { Ol } from "../core/recovered.js";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { Check as Zr } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
function AppearanceScreen({
  onBack: onBack,
  theme: theme,
  setTheme: setTheme,
  accentColor: accentColor,
  setAccentColor: setAccentColor,
  systemDark: systemDark,
}) {
  const b = Object.entries(Ol).map(([_, D]) => ({
    key: _,
    nome: D.nome,
    desc: D.desc,
    preview: D,
  }));
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "Aparência",
      subtitle: "Modo de tela e cor de destaque",
      onBack: onBack,
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        },
      },
      React.createElement(
        "section",
        {
          "aria-labelledby": "titulo-modo-aparencia",
        },
        React.createElement(
          "div",
          {
            id: "titulo-modo-aparencia",
            style: {
              fontSize: 14,
              fontWeight: 800,
              color: colors.gray,
              letterSpacing: 0.6,
              margin: "0 4px 8px",
            },
          },
          "MODO DE TELA",
        ),
        React.createElement(
          "div",
          {
            role: "radiogroup",
            "aria-labelledby": "titulo-modo-aparencia",
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 10,
            },
          },
          b.map((_) => {
            const D = theme === _.key,
              T =
                _.key === "sistema"
                  ? "linear-gradient(135deg,#FFFFFF 0 49%,#18171D 51% 100%)"
                  : _.preview.bg;
            return React.createElement(
              "button",
              {
                key: _.key,
                type: "button",
                role: "radio",
                "aria-checked": D,
                className: "press-fx touch-target",
                onClick: () => {
                  (Rt(680), setTheme(_.key));
                },
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  textAlign: "left",
                  padding: 14,
                  borderRadius: 18,
                  background: colors.white,
                  boxShadow: colors.cardShadow,
                  border: D
                    ? `1.5px solid ${colors.primary}`
                    : `1px solid ${colors.border}`,
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: T,
                    border: `1px solid ${_.preview.border || colors.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  },
                },
                React.createElement("div", {
                  style: {
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    background: colors.primary,
                    border: "2px solid rgba(255,255,255,.75)",
                  },
                }),
              ),
              React.createElement(
                "div",
                {
                  style: {
                    flex: 1,
                  },
                },
                React.createElement(
                  "div",
                  {
                    style: {
                      fontSize: 16,
                      fontWeight: 600,
                      color: colors.dark,
                    },
                  },
                  _.nome,
                ),
                React.createElement(
                  "div",
                  {
                    style: {
                      fontSize: 14,
                      color: colors.gray,
                    },
                  },
                  _.key === "sistema"
                    ? `${_.desc} · agora ${systemDark ? "escuro" : "claro"}`
                    : _.desc,
                ),
              ),
              D &&
                React.createElement(Zr, {
                  size: 18,
                  color: colors.primary,
                }),
            );
          }),
        ),
      ),
      React.createElement(
        "section",
        {
          "aria-labelledby": "titulo-cor-destaque",
        },
        React.createElement(
          "div",
          {
            id: "titulo-cor-destaque",
            style: {
              fontSize: 14,
              fontWeight: 800,
              color: colors.gray,
              letterSpacing: 0.6,
              margin: "0 4px 8px",
            },
          },
          "COR DO APLICATIVO",
        ),
        React.createElement(
          Card,
          {
            style: {
              boxShadow: "none",
              border: `1px solid ${colors.border}`,
            },
          },
          React.createElement(M0, {
            value: accentColor,
            onChange: setAccentColor,
          }),
        ),
      ),
    ),
  );
}
export { AppearanceScreen };
