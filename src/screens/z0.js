// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { IconTile } from "../core/recovered.js";
import { Compass as Qh } from "lucide-react";
import { ScreenHeader } from "../core/recovered.js";
import { colors } from "../core/recovered.js";
import React from "react";
function z0({ titulo: titulo, onBack: onBack }) {
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 100,
      },
    },
    React.createElement(ScreenHeader, {
      title: titulo,
      onBack: onBack,
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: "40px 24px",
          textAlign: "center",
        },
      },
      React.createElement(IconTile, {
        color: colors.gray,
        Icon: Qh,
        size: 56,
      }),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 15,
            fontWeight: 600,
            color: colors.dark,
            marginTop: 16,
          },
        },
        "Abra o módulo correspondente para usar este recurso.",
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            color: colors.gray,
            marginTop: 6,
            lineHeight: 1.5,
          },
        },
        "Os recursos disponíveis ficam organizados nas abas Início, Planejamento, Turma e Mais.",
      ),
    ),
  );
}
export { z0 };
