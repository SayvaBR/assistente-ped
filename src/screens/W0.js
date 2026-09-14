// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Avatar } from "../core/recovered.js";
import { Button } from "../core/recovered.js";
import { Chip } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { TextArea } from "../screens/TextArea.js";
import { colors } from "../core/recovered.js";
import React from "react";
import { repository } from "../core/recovered.js";
function W0({
  aluno: aluno,
  dataKey: dataKey,
  atual: atual,
  onClose: onClose,
  onSalvo: onSalvo,
}) {
  const [E, b] = ReactHooks.useState({
      alimentacao: (atual == null ? void 0 : atual.alimentacao) || "",
      comportamento: (atual == null ? void 0 : atual.comportamento) || "",
      sono: (atual == null ? void 0 : atual.sono) || "",
      texto: (atual == null ? void 0 : atual.texto) || "",
    }),
    [_, D] = ReactHooks.useState(!1),
    T = async () => {
      D(!0);
      try {
        const U = await repository.salvarRotinaDoAluno(dataKey, aluno.id, E);
        (Rt(700), onSalvo(U));
      } catch (U) {
        console.error("Erro ao salvar rotina:", U);
      } finally {
        D(!1);
      }
    };
  return React.createElement(
    "div",
    {
      className: "sheet-overlay",
      role: "presentation",
      onClick: onClose,
    },
    React.createElement(
      "div",
      {
        className: "bottom-sheet-panel",
        role: "dialog",
        "aria-modal": "true",
        onClick: (U) => U.stopPropagation(),
        style: {
          maxHeight: "85%",
          background: colors.white,
        },
      },
      React.createElement("div", {
        style: {
          width: 36,
          height: 4,
          borderRadius: 2,
          background: colors.border,
          margin: "0 auto 16px",
        },
      }),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          },
        },
        React.createElement(Avatar, {
          nome: aluno.nome,
          cor: aluno.cor,
        }),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 15,
              fontWeight: 700,
              color: colors.dark,
            },
          },
          "Rotina de ",
          aluno.nome,
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            fontWeight: 700,
            color: colors.gray,
            marginBottom: 6,
          },
        },
        "ALIMENTAÇÃO",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 12,
          },
        },
        ["Comeu bem", "Comeu pouco", "Não quis comer"].map((U) =>
          React.createElement(Chip, {
            key: U,
            label: U,
            active: E.alimentacao === U,
            onClick: () =>
              b((R) => ({
                ...R,
                alimentacao: R.alimentacao === U ? "" : U,
              })),
          }),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            fontWeight: 700,
            color: colors.gray,
            marginBottom: 6,
          },
        },
        "COMPORTAMENTO",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 12,
          },
        },
        [
          "Tranquilo(a)",
          "Agitado(a)",
          "Choroso(a)",
          "Sociável",
          "Precisou de colo",
        ].map((U) =>
          React.createElement(Chip, {
            key: U,
            label: U,
            active: E.comportamento === U,
            onClick: () =>
              b((R) => ({
                ...R,
                comportamento: R.comportamento === U ? "" : U,
              })),
          }),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            fontWeight: 700,
            color: colors.gray,
            marginBottom: 6,
          },
        },
        "SONO / DESCANSO",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 12,
          },
        },
        ["Dormiu bem", "Dormiu pouco", "Não dormiu"].map((U) =>
          React.createElement(Chip, {
            key: U,
            label: U,
            active: E.sono === U,
            onClick: () =>
              b((R) => ({
                ...R,
                sono: R.sono === U ? "" : U,
              })),
          }),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            fontWeight: 700,
            color: colors.gray,
            margin: "4px 0 6px",
          },
        },
        "OBSERVAÇÃO ADICIONAL (OPCIONAL)",
      ),
      React.createElement(TextArea, {
        placeholder: "Algo mais sobre o dia do aluno...",
        value: E.texto,
        onChange: (U) =>
          b((R) => ({
            ...R,
            texto: U.target.value,
          })),
      }),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
            marginTop: 12,
          },
        },
        React.createElement(
          "button",
          {
            className: "press-fx",
            onClick: onClose,
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
            onClick: T,
            disabled: _,
            style: {
              flex: 1,
            },
          },
          _ ? "Salvando..." : "Salvar",
        ),
      ),
    ),
  );
}
export { W0 };
