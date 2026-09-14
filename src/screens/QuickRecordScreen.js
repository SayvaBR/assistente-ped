// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { ChevronRight as Xt } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
function QuickRecordScreen({ alunos: alunos, onBack: onBack, goTo: goTo }) {
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "Novo Registro",
      subtitle: "Escolha o aluno",
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
              lineHeight: 1.45,
            },
          },
          "O registro ficará ligado ao histórico do aluno escolhido. Assim ele também poderá ser usado futuramente nos relatórios.",
        ),
      ),
      alunos.length === 0
        ? React.createElement(
            Card,
            {
              style: {
                textAlign: "center",
                padding: 28,
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 14,
                  color: colors.gray,
                },
              },
              "Cadastre um aluno antes de criar registros.",
            ),
          )
        : alunos.map((y) =>
            React.createElement(
              Card,
              {
                key: y.id,
                onClick: () => goTo("observacao", y),
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 38,
                    height: 38,
                    borderRadius: 19,
                    background: y.cor + "33",
                    color: y.cor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                  },
                },
                y.nome[0],
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
                      fontWeight: 700,
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
                  "Criar registro pedagógico",
                ),
              ),
              React.createElement(Xt, {
                size: 16,
                color: colors.gray,
              }),
            ),
          ),
    ),
  );
}
export { QuickRecordScreen };
