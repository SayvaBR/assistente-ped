// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import { IconTile } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { ChevronRight as Xt } from "lucide-react";
import { colors } from "../core/recovered.js";
import { GraduationCap as gi } from "lucide-react";
import React from "react";
import { Smile as qu } from "lucide-react";
function BnccScreen({ onBack: onBack, goTo: goTo }) {
  const f = [
    {
      nome: "Educação Infantil",
      sub: "5 campos de experiência · 93 objetivos de aprendizagem",
      Icon: qu,
      cor: colors.primary,
      disponivel: !0,
      rota: "bncc-infantil",
    },
    {
      nome: "Ensino Fundamental",
      sub: "1.304 habilidades do Ensino Fundamental por ano e componente",
      Icon: gi,
      cor: colors.gray,
      disponivel: !0,
      rota: "bncc",
    },
  ];
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "BNCC",
      subtitle: "Qual etapa você quer consultar?",
      onBack: onBack,
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        },
      },
      f.map((y) =>
        React.createElement(
          Card,
          {
            key: y.nome,
            onClick: y.disponivel ? () => goTo(y.rota) : void 0,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: y.disponivel ? 1 : 0.55,
              cursor: y.disponivel ? "pointer" : "default",
            },
          },
          React.createElement(IconTile, {
            color: y.cor,
            Icon: y.Icon,
          }),
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
              y.nome,
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 14,
                  color: colors.gray,
                },
              },
              y.sub,
            ),
          ),
          y.disponivel
            ? React.createElement(Xt, {
                size: 17,
                color: colors.gray,
              })
            : null,
        ),
      ),
    ),
  );
}
export { BnccScreen };
