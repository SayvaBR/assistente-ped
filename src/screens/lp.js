// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import { Star as Vu } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
function lp({
  h: h,
  favorito: favorito,
  onFavoritar: onFavoritar,
  expandido: expandido,
  onExpandir: onExpandir,
}) {
  return React.createElement(
    Card,
    {
      onClick: onExpandir,
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            background: colors.primaryLight,
            color: colors.primary,
            borderRadius: 8,
            padding: "3px 8px",
            fontSize: 12,
            fontWeight: 700,
            flexShrink: 0,
          },
        },
        h.codigo,
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
              fontSize: 14,
              color: colors.gray,
              marginBottom: 2,
            },
          },
          h.campo,
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.dark,
              lineHeight: 1.4,
            },
          },
          expandido
            ? h.texto
            : h.texto.slice(0, 70) + (h.texto.length > 70 ? "..." : ""),
        ),
        expandido &&
          React.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                color: colors.gray,
                marginTop: 6,
              },
            },
            "Faixa etária: ",
            h.faixa,
          ),
      ),
      React.createElement(
        "button",
        {
          className: "press-fx",
          onClick: (E) => {
            (E.stopPropagation(), onFavoritar());
          },
          style: {
            border: "none",
            background: "none",
            flexShrink: 0,
          },
        },
        React.createElement(Vu, {
          size: 18,
          color: colors.orange,
          fill: favorito ? colors.orange : "none",
        }),
      ),
    ),
  );
}
export { lp };
