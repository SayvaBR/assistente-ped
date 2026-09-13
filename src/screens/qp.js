// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { As } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { ChevronRight as Xt } from "lucide-react";
import { colors } from "../core/recovered.js";
import { dateKey } from "../core/recovered.js";
import React from "react";
import { ChevronLeft as qo } from "lucide-react";
function qp({
  mesBase: mesBase,
  setMesBase: setMesBase,
  dataSelecionada: dataSelecionada,
  onSelecionar: onSelecionar,
  marcadores: marcadores,
}) {
  const E = mesBase.getFullYear(),
    b = mesBase.getMonth(),
    _ = new Date(E, b + 1, 0).getDate(),
    D = new Date(E, b, 1).getDay(),
    T = dateKey();
  return React.createElement(
    Card,
    null,
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        },
      },
      React.createElement(
        "button",
        {
          onClick: () => setMesBase(new Date(E, b - 1, 1)),
          style: {
            border: "none",
            background: "none",
          },
        },
        React.createElement(qo, {
          size: 18,
          color: colors.dark,
        }),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 16,
            fontWeight: 800,
            color: colors.dark,
          },
        },
        As[b].replace(/^./, (U) => U.toUpperCase()),
        " ",
        E,
      ),
      React.createElement(
        "button",
        {
          onClick: () => setMesBase(new Date(E, b + 1, 1)),
          style: {
            border: "none",
            background: "none",
          },
        },
        React.createElement(Xt, {
          size: 18,
          color: colors.dark,
        }),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 5,
          marginBottom: 6,
        },
      },
      ["D", "S", "T", "Q", "Q", "S", "S"].map((U, R) =>
        React.createElement(
          "div",
          {
            key: R,
            style: {
              textAlign: "center",
              fontSize: 12,
              fontWeight: 700,
              color: colors.gray,
            },
          },
          U,
        ),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 5,
        },
      },
      Array.from({
        length: D,
      }).map((U, R) =>
        React.createElement("div", {
          key: "e" + R,
        }),
      ),
      Array.from(
        {
          length: _,
        },
        (U, R) => R + 1,
      ).map((U) => {
        const R = `${E}-${String(b + 1).padStart(2, "0")}-${String(U).padStart(2, "0")}`,
          X = marcadores == null ? void 0 : marcadores[R];
        return React.createElement(
          "button",
          {
            key: U,
            onClick: () => onSelecionar(R),
            style: {
              aspectRatio: "1",
              border: R === T ? `1.5px solid ${colors.primary}` : "none",
              borderRadius: 11,
              background:
                R === dataSelecionada ? colors.primaryLight : "transparent",
              position: "relative",
              color: colors.dark,
              fontWeight: R === T ? 800 : 500,
            },
          },
          U,
          X &&
            React.createElement("span", {
              style: {
                position: "absolute",
                bottom: 4,
                left: "50%",
                transform: "translateX(-50%)",
                width: 5,
                height: 5,
                borderRadius: 5,
                background: X,
              },
            }),
        );
      }),
    ),
  );
}
export { qp };
