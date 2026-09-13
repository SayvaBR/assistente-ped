// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Avatar } from "../core/recovered.js";
import { Button } from "../core/recovered.js";
import { Chip } from "../core/recovered.js";
import { Input } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Q0 } from "../core/recovered.js";
import { Rt } from "../core/recovered.js";
import { TextArea } from "../screens/TextArea.js";
import { colors } from "../core/recovered.js";
import React from "react";
import { repository } from "../core/recovered.js";
function Y0({
  aluno: aluno,
  dataKey: dataKey,
  atual: atual,
  onClose: onClose,
  onSalvo: onSalvo,
}) {
  const [E, b] = ReactHooks.useState(
      (atual == null ? void 0 : atual.motivo) || "",
    ),
    [_, D] = ReactHooks.useState(
      (atual == null ? void 0 : atual.periodoInicio) || "",
    ),
    [T, U] = ReactHooks.useState(
      (atual == null ? void 0 : atual.periodoFim) || "",
    ),
    [R, X] = ReactHooks.useState(
      (atual == null ? void 0 : atual.observacao) || "",
    ),
    [ce, J] = ReactHooks.useState(!1),
    pe = async () => {
      if (E) {
        J(!0);
        try {
          const ue = await repository.salvarJustificativaDoAluno(
            dataKey,
            aluno.id,
            {
              motivo: E,
              periodoInicio: _,
              periodoFim: T,
              observacao: R,
            },
          );
          (Rt(700), onSalvo(ue));
        } catch (ue) {
          console.error("Erro ao salvar justificativa:", ue);
        } finally {
          J(!1);
        }
      }
    },
    ge = async () => {
      const ue = await repository.removerJustificativaDoAluno(
        dataKey,
        aluno.id,
      );
      onSalvo(ue);
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
        onClick: (ue) => ue.stopPropagation(),
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
          null,
          React.createElement(
            "div",
            {
              style: {
                fontSize: 15,
                fontWeight: 700,
                color: colors.dark,
              },
            },
            "Justificativa de ausência",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
              },
            },
            aluno.nome,
          ),
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
        "MOTIVO",
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
        Q0.map((ue) =>
          React.createElement(Chip, {
            key: ue,
            label: ue,
            active: E === ue,
            onClick: () => b(ue),
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
        "PERÍODO (OPCIONAL)",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
          },
        },
        React.createElement(Input, {
          type: "date",
          value: _,
          onChange: (ue) => D(ue.target.value),
        }),
        React.createElement(Input, {
          type: "date",
          value: T,
          onChange: (ue) => U(ue.target.value),
        }),
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
        "OBSERVAÇÃO (OPCIONAL)",
      ),
      React.createElement(TextArea, {
        placeholder: "Ex: responsável informou quadro gripal e febre",
        value: R,
        onChange: (ue) => X(ue.target.value),
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
            onClick: pe,
            disabled: ce || !E,
            style: {
              flex: 1,
            },
          },
          ce ? "Salvando..." : "Salvar",
        ),
      ),
      atual &&
        React.createElement(
          "button",
          {
            className: "press-fx",
            onClick: ge,
            style: {
              width: "100%",
              marginTop: 8,
              border: "none",
              background: "none",
              color: colors.red,
              fontSize: 14,
              fontWeight: 700,
              padding: 6,
            },
          },
          "Remover justificativa",
        ),
    ),
  );
}
export { Y0 };
