// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import * as ReactHooks from "react";
import { ChevronRight as Xt } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
function Accordion({
  titulo: titulo,
  subtitulo: subtitulo,
  children: children,
  defaultAberta = !1,
}) {
  const [v, E] = ReactHooks.useState(defaultAberta);
  return React.createElement(
    Card,
    {
      style: {
        padding: 0,
        overflow: "hidden",
      },
    },
    React.createElement(
      "button",
      {
        className: "press-fx",
        onClick: () => E((b) => !b),
        style: {
          width: "100%",
          background: "transparent",
          border: "none",
          padding: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "left",
          cursor: "pointer",
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 700,
              color: colors.dark,
            },
          },
          titulo,
        ),
        subtitulo &&
          React.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                color: colors.gray,
                marginTop: 2,
              },
            },
            subtitulo,
          ),
      ),
      React.createElement(Xt, {
        size: 16,
        color: colors.gray,
        style: {
          transform: v ? "rotate(90deg)" : "none",
          transition: "transform 0.15s ease",
          flexShrink: 0,
          marginLeft: 8,
        },
      }),
    ),
    v &&
      React.createElement(
        "div",
        {
          style: {
            padding: "0 14px 14px",
          },
        },
        children,
      ),
  );
}
export { Accordion };
