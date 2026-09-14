// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import { attendanceSummary } from '../domain/attendance';
import { User as Cs } from "lucide-react";
import { EmptyState } from "../core/recovered.js";
import { IconTile } from "../core/recovered.js";
import { Users as Jl } from "lucide-react";
import * as ReactHooks from "react";
import { ScreenHeader } from "../core/recovered.js";
import { UserPlus as Vo } from "lucide-react";
import { ChevronRight as Xt } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
import { Calendar as pi } from "lucide-react";
function ReportsScreen({
  onBack: onBack,
  alunos = [],
  goTo: goTo,
  embutido: embutido,
}) {
  const [v, E] = ReactHooks.useState(null),
    b = (T) => (T >= 90 ? colors.green : T >= 75 ? colors.orange : colors.red),
    _ = (T) => {
      return attendanceSummary(T).percentage;
    },
    D = React.createElement(
      "div",
      {
        style: {
          padding: embutido ? 0 : 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        },
      },
      React.createElement(
        Card,
        {
          onClick: () => E(v === "turma" ? null : "turma"),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
          },
        },
        React.createElement(IconTile, {
          color: colors.primary,
          Icon: Jl,
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
            "Relatório da turma",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
              },
            },
            "Frequência de todos os alunos, com base nas chamadas registradas",
          ),
        ),
        React.createElement(Xt, {
          size: 16,
          color: colors.gray,
          style: {
            transform: v === "turma" ? "rotate(90deg)" : "none",
            transition: "transform 0.2s",
          },
        }),
      ),
      v === "turma" &&
        React.createElement(
          Card,
          null,
          alunos.length === 0 &&
            React.createElement(EmptyState, {
              compact: !0,
              icon: Vo,
              title: "Nenhum aluno cadastrado",
              description:
                "Cadastre um aluno para acompanhar a frequência da turma.",
              onAction: () => (goTo == null ? void 0 : goTo("novo-aluno")),
            }),
          alunos.map((T) => {
            const U = _(T);
            return React.createElement(
              "div",
              {
                key: T.id,
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "7px 0",
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: 14,
                    color: colors.dark,
                    flex: 1,
                  },
                },
                T.nome,
              ),
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: 14,
                    fontWeight: 700,
                    color: U === null ? colors.gray : b(U),
                  },
                },
                U === null ? "sem registros" : `${U}%`,
              ),
            );
          }),
        ),
      React.createElement(
        Card,
        {
          onClick: () => E(v === "individual" ? null : "individual"),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
          },
        },
        React.createElement(IconTile, {
          color: colors.primary,
          Icon: Cs,
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
            "Relatório individual",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
              },
            },
            "Escolha um aluno para ver o resumo individual",
          ),
        ),
        React.createElement(Xt, {
          size: 16,
          color: colors.gray,
          style: {
            transform: v === "individual" ? "rotate(90deg)" : "none",
            transition: "transform 0.2s",
          },
        }),
      ),
      v === "individual" &&
        React.createElement(
          Card,
          null,
          alunos.length === 0 &&
            React.createElement(EmptyState, {
              compact: !0,
              icon: Vo,
              title: "Nenhum aluno cadastrado",
              description: "Cadastre um aluno para gerar um resumo individual.",
              onAction: () => (goTo == null ? void 0 : goTo("novo-aluno")),
            }),
          alunos.map((T) =>
            React.createElement(
              "div",
              {
                key: T.id,
                onClick: () => goTo && goTo("perfil", T),
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  cursor: goTo ? "pointer" : "default",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    background: T.cor + "33",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: T.cor,
                    fontSize: 14,
                  },
                },
                T.nome[0],
              ),
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: 14,
                    color: colors.dark,
                    flex: 1,
                  },
                },
                T.nome,
              ),
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: 12,
                    color: colors.gray,
                  },
                },
                T.presencas,
                "P · ",
                T.faltas,
                "F",
              ),
            ),
          ),
        ),
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
          Icon: pi,
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
            "Relatório por período",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
              },
            },
            "Use o relatório completo para escolher o período.",
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
          "Disponível em Relatórios",
        ),
      ),
    );
  return embutido
    ? D
    : React.createElement(
        "div",
        {
          style: {
            paddingBottom: 30,
          },
        },
        React.createElement(ScreenHeader, {
          title: "Relatórios",
          onBack: onBack,
        }),
        D,
      );
}
export { ReportsScreen };
