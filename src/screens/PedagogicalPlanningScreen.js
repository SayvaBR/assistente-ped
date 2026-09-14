// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { ClipboardList as Ap } from "lucide-react";
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { EmptyState } from "../core/recovered.js";
import { Input } from "../core/recovered.js";
import { LoadingState } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { colors } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import React from "react";
import { nowISO } from "../core/recovered.js";
import { repository } from "../core/recovered.js";
function PedagogicalPlanningScreen({ onBack: onBack }) {
  const [u, f] = ReactHooks.useState(null),
    [y, v] = ReactHooks.useState(!1),
    [E, b] = ReactHooks.useState(""),
    [_, D] = ReactHooks.useState(""),
    [T, U] = ReactHooks.useState(""),
    [R, X] = ReactHooks.useState(!1);
  ReactHooks.useEffect(() => {
    (async () => f(await repository.carregarTemasPlanejamento()))();
  }, []);
  const ce = async () => {
    if (E.trim()) {
      X(!0);
      try {
        const pe = [
          {
            id: createId("tema"),
            titulo: E.trim(),
            periodo: _.trim() || "Período não definido",
            objetivo: T.trim(),
            criadoEm: nowISO(),
          },
          ...(u || []),
        ];
        (f(pe),
          await repository.salvarTemasPlanejamento(pe),
          Rt(700),
          b(""),
          D(""),
          U(""),
          v(!1));
      } catch (J) {
        console.error("Erro ao salvar tema de planejamento:", J);
      } finally {
        X(!1);
      }
    }
  };
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "Planejamento",
      subtitle: "Temas e objetivos do período",
      onBack: onBack,
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        },
      },
      React.createElement(
        Card,
        {
          style: {
            background: colors.primaryLight,
            boxShadow: "none",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.primaryDark,
              lineHeight: 1.5,
            },
          },
          "Aqui fica o planejamento pedagógico do período — temas, projetos e objetivos gerais. A rotina do dia a dia (horários e atividades) fica em ",
          React.createElement("strong", null, "Plano de Aula"),
          ".",
        ),
      ),
      !y &&
        React.createElement(
          Button,
          {
            onClick: () => v(!0),
          },
          "Novo tema ou projeto",
        ),
      y &&
        React.createElement(
          Card,
          null,
          React.createElement(Input, {
            placeholder: "Título do tema ou projeto",
            value: E,
            onChange: (J) => b(J.target.value),
          }),
          React.createElement(Input, {
            placeholder: "Período (ex: 3º bimestre, Agosto)",
            value: _,
            onChange: (J) => D(J.target.value),
          }),
          React.createElement(Input, {
            placeholder: "Objetivo geral (opcional)",
            value: T,
            onChange: (J) => U(J.target.value),
          }),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 8,
                marginTop: 4,
              },
            },
            React.createElement(
              "button",
              {
                onClick: () => v(!1),
                style: {
                  flex: 1,
                  background: "none",
                  border: `1.5px solid ${colors.border}`,
                  color: colors.gray,
                  borderRadius: 14,
                  padding: 12,
                  fontSize: 14,
                  fontWeight: 600,
                },
              },
              "Cancelar",
            ),
            React.createElement(
              Button,
              {
                onClick: ce,
                disabled: !E.trim() || R,
                style: {
                  flex: 1,
                },
              },
              R ? "Salvando..." : "Salvar",
            ),
          ),
        ),
      u === null &&
        React.createElement(LoadingState, {
          label: "Carregando planejamento...",
        }),
      (u == null ? void 0 : u.length) === 0 &&
        !y &&
        React.createElement(EmptyState, {
          compact: !0,
          icon: Ap,
          title: "Nenhum tema cadastrado",
          description:
            "Crie um tema ou projeto para organizar os objetivos do período.",
          actionLabel: "Criar primeiro tema",
          onAction: () => v(!0),
        }),
      u == null
        ? void 0
        : u.map((J) =>
            React.createElement(
              Card,
              {
                key: J.id,
              },
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
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
                  J.titulo,
                ),
                React.createElement(
                  "span",
                  {
                    style: {
                      fontSize: 12,
                      fontWeight: 700,
                      color: colors.primary,
                      background: colors.primaryLight,
                      borderRadius: 8,
                      padding: "3px 7px",
                      whiteSpace: "nowrap",
                    },
                  },
                  J.periodo,
                ),
              ),
              J.objetivo &&
                React.createElement(
                  "div",
                  {
                    style: {
                      fontSize: 14,
                      color: colors.gray,
                      marginTop: 6,
                      lineHeight: 1.4,
                    },
                  },
                  J.objetivo,
                ),
            ),
          ),
    ),
  );
}
export { PedagogicalPlanningScreen };
