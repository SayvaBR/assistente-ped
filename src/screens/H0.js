// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Avatar } from "../core/recovered.js";
import { FileText as Bn } from "lucide-react";
import { Card } from "../core/recovered.js";
import { IconTile } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Wp } from "../screens/Wp.js";
import { colors } from "../core/recovered.js";
import { dateKey } from "../core/recovered.js";
import React from "react";
import { qp } from "../screens/qp.js";
import { repository } from "../core/recovered.js";
function H0({
  alunos: alunos,
  goTo: goTo,
  onAbrirDia: onAbrirDia,
  dataKey: dataKey,
}) {
  const [v, E] = ReactHooks.useState(null),
    [b, _] = ReactHooks.useState(new Date(dataKey + "T12:00:00"));
  ReactHooks.useEffect(() => {
    (async () => E(await repository.listarTodasAsChamadas()))();
  }, []);
  const D = (v == null ? void 0 : v[dateKey()]) || {},
    T = {};
  return (
    v &&
      Object.entries(v).forEach(([U, R]) => {
        const X = Object.values(R);
        X.length &&
          (T[U] = X.some((ce) => ce === "falta") ? colors.red : colors.green);
      }),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 10,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 14,
            opacity: 0.55,
          },
        },
        React.createElement(IconTile, {
          color: colors.gray,
          Icon: Bn,
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
            "Exportar histórico",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
              },
            },
            "PDF com frequência, rotina e ocorrências do período",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              background: colors.primaryLight,
              color: colors.primary,
              borderRadius: 10,
              padding: "3px 8px",
              fontSize: 12,
              fontWeight: 700,
            },
          },
          "EM PREPARAÇÃO",
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 10,
            fontSize: 12,
            color: colors.gray,
            justifyContent: "center",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 4,
            },
          },
          React.createElement("span", {
            style: {
              width: 8,
              height: 8,
              borderRadius: 4,
              background: colors.green,
              display: "inline-block",
            },
          }),
          " Todos presentes",
        ),
        React.createElement(
          "span",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 4,
            },
          },
          React.createElement("span", {
            style: {
              width: 8,
              height: 8,
              borderRadius: 4,
              background: colors.red,
              display: "inline-block",
            },
          }),
          " Alguma falta",
        ),
      ),
      v &&
        React.createElement(qp, {
          mesBase: b,
          setMesBase: _,
          dataSelecionada: dataKey,
          onSelecionar: onAbrirDia,
          marcadores: T,
        }),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            color: colors.gray,
            textAlign: "center",
            marginTop: -4,
          },
        },
        "Toque em um dia do calendário para ver o planejamento",
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 12,
            fontWeight: 800,
            color: colors.gray,
            letterSpacing: 0.6,
            marginTop: 8,
          },
        },
        "FREQUÊNCIA ACUMULADA",
      ),
      alunos.map((U) => {
        const R = U.presencas + U.faltas,
          X = R > 0 ? Math.round((U.presencas / R) * 100) : 0,
          ce = Wp(X),
          J = D[U.id];
        return React.createElement(
          Card,
          {
            key: U.id,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
            },
          },
          React.createElement(Avatar, {
            nome: U.nome,
            cor: U.cor,
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
              U.nome,
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 14,
                  color: colors.gray,
                },
              },
              U.presencas,
              " presenças · ",
              U.faltas,
              " faltas",
            ),
          ),
          J &&
            React.createElement(
              "span",
              {
                style: {
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: 8,
                  padding: "3px 7px",
                  color: J === "presente" ? colors.green : colors.red,
                  background:
                    (J === "presente" ? colors.green : colors.red) + "1a",
                },
              },
              "hoje: ",
              J === "presente" ? "presente" : "falta",
            ),
          React.createElement(
            "div",
            {
              style: {
                background: ce + "22",
                color: ce,
                borderRadius: 12,
                padding: "5px 10px",
                fontSize: 14,
                fontWeight: 700,
              },
            },
            R > 0 ? X + "%" : "—",
          ),
        );
      }),
    )
  );
}
export { H0 };
