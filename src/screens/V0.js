// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import { Dp } from "../core/recovered.js";
import * as ReactHooks from "react";
import { ChevronRight as Xt } from "lucide-react";
import { colors } from "../core/recovered.js";
import { dateKey } from "../core/recovered.js";
import React from "react";
import { Calendar as pi } from "lucide-react";
import { ChevronLeft as qo } from "lucide-react";
import { qp } from "../screens/qp.js";
function V0({
  dataKey: dataKey,
  setDataKey: setDataKey,
  marcadores: marcadores,
}) {
  const y = dateKey(),
    [v, E] = ReactHooks.useState(!1),
    [b, _] = ReactHooks.useState(new Date(dataKey + "T12:00:00")),
    D = (T) => {
      const U = new Date(dataKey + "T12:00:00");
      (U.setDate(U.getDate() + T), setDataKey(dateKey(U)));
    };
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
        },
      },
      React.createElement(
        "button",
        {
          className: "press-fx",
          onClick: () => D(-1),
          style: {
            border: "none",
            background: colors.white,
            borderRadius: 12,
            padding: 10,
          },
        },
        React.createElement(qo, {
          size: 17,
          color: colors.dark,
        }),
      ),
      React.createElement(
        Card,
        {
          style: {
            flex: 1,
            padding: 11,
            textAlign: "center",
            boxShadow: "none",
            background: colors.primaryLight,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 800,
              color: colors.primaryDark,
            },
          },
          Dp(dataKey),
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 12,
              color: colors.primaryDark,
              marginTop: 2,
            },
          },
          dataKey === y ? "Hoje" : "Data selecionada",
        ),
      ),
      React.createElement(
        "button",
        {
          className: "press-fx",
          onClick: () => D(1),
          style: {
            border: "none",
            background: colors.white,
            borderRadius: 12,
            padding: 10,
          },
        },
        React.createElement(Xt, {
          size: 17,
          color: colors.dark,
        }),
      ),
      React.createElement(
        "button",
        {
          className: "press-fx",
          onClick: () => {
            (_(new Date(dataKey + "T12:00:00")), E((T) => !T));
          },
          style: {
            border: "none",
            background: v ? colors.primaryLight : colors.white,
            borderRadius: 12,
            padding: 10,
          },
        },
        React.createElement(pi, {
          size: 17,
          color: colors.primaryDark,
        }),
      ),
    ),
    dataKey !== y &&
      React.createElement(
        "button",
        {
          onClick: () => setDataKey(y),
          style: {
            alignSelf: "center",
            border: "none",
            background: "none",
            color: colors.primary,
            fontSize: 14,
            fontWeight: 700,
          },
        },
        "Ir para hoje",
      ),
    v &&
      React.createElement(qp, {
        mesBase: b,
        setMesBase: _,
        dataSelecionada: dataKey,
        onSelecionar: (T) => {
          (setDataKey(T), E(!1));
        },
        marcadores: marcadores,
      }),
  );
}
export { V0 };
