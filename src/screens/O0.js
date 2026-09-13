// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { EmptyState } from "../core/recovered.js";
import { LoadingState } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Vp } from "../screens/Vp.js";
import { colors } from "../core/recovered.js";
import React from "react";
import { Calendar as pi } from "lucide-react";
import { repository } from "../core/recovered.js";
function O0({ dataKey: dataKey, onAbrirPlano: onAbrirPlano }) {
  const [f, y] = ReactHooks.useState(null);
  return (
    ReactHooks.useEffect(() => {
      (async () => y((await repository.carregarPlanoPorData(dataKey)) || []))();
    }, [dataKey]),
    f === null
      ? React.createElement(LoadingState, {
          label: "Carregando planos...",
        })
      : f.length === 0
        ? React.createElement(
            "div",
            {
              "data-tour": "novo-plano-dia",
            },
            React.createElement(EmptyState, {
              icon: pi,
              illustration: "planning",
              title: "Nenhum plano neste dia",
              description:
                "Organize atividades, objetivos e BNCC para esta data.",
              actionLabel: "Criar plano para este dia",
              onAction: () => onAbrirPlano(null, dataKey),
            }),
          )
        : React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 10,
              },
            },
            f.map((v) => {
              var b, _;
              const E = [...(v.momentos || [])].sort((D, T) =>
                (D.horario || "").localeCompare(T.horario || ""),
              );
              return React.createElement(
                Card,
                {
                  key: v.id,
                  onClick: () => onAbrirPlano(v, dataKey),
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
                      justifyContent: "space-between",
                    },
                  },
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 14.5,
                        fontWeight: 700,
                        color: colors.dark,
                      },
                    },
                    v.tituloTema || "Plano sem Tema",
                  ),
                  React.createElement(Vp, {
                    status: v.status,
                  }),
                ),
                E.length === 0
                  ? React.createElement(
                      "div",
                      {
                        style: {
                          fontSize: 14,
                          color: colors.gray,
                        },
                      },
                      "Nenhum momento adicionado ainda.",
                    )
                  : E.slice(0, 3).map((D) =>
                      React.createElement(
                        "div",
                        {
                          key: D.id,
                          style: {
                            fontSize: 14,
                            color: colors.gray,
                          },
                        },
                        D.horario ? `${D.horario} · ` : "",
                        D.titulo,
                      ),
                    ),
                E.length > 3 &&
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 12,
                        color: colors.primary,
                      },
                    },
                    "+ ",
                    E.length - 3,
                    " ",
                    E.length - 3 === 1 ? "momento" : "momentos",
                  ),
                !!(
                  (_ = (b = v.bncc) == null ? void 0 : b.habilidades) != null &&
                  _.length
                ) &&
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 12,
                        color: colors.primary,
                      },
                    },
                    v.bncc.habilidades.length,
                    " ",
                    v.bncc.habilidades.length === 1
                      ? "objetivo BNCC"
                      : "objetivos BNCC",
                  ),
              );
            }),
            React.createElement(
              "div",
              {
                "data-tour": "novo-plano-dia",
              },
              React.createElement(
                Button,
                {
                  onClick: () => onAbrirPlano(null, dataKey),
                  style: {
                    marginTop: 2,
                  },
                },
                "+ Novo plano para este dia",
              ),
            ),
          )
  );
}
export { O0 };
