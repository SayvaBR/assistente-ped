// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { Chip } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { TextArea } from "../screens/TextArea.js";
import { colors } from "../core/recovered.js";
import React from "react";
import { repository } from "../core/recovered.js";
function q0({
  alunos: alunos,
  dataKey: dataKey,
  onClose: onClose,
  onSalvo: onSalvo,
}) {
  var R;
  const [v, E] = ReactHooks.useState(
      ((R = alunos[0]) == null ? void 0 : R.id) || "",
    ),
    [b, _] = ReactHooks.useState(""),
    [D, T] = ReactHooks.useState(!1),
    U = async () => {
      const X = alunos.find((ce) => ce.id === v);
      if (!(!X || !b.trim())) {
        T(!0);
        try {
          const ce = new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            J = await repository.adicionarOcorrencia(dataKey, {
              alunoId: X.id,
              alunoNome: X.nome,
              descricao: b.trim(),
              hora: ce,
            });
          (Rt(700), onSalvo(J));
        } catch (ce) {
          console.error("Erro ao salvar ocorrência:", ce);
        } finally {
          T(!1);
        }
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
        onClick: (X) => X.stopPropagation(),
        style: {
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
            fontSize: 15,
            fontWeight: 700,
            color: colors.dark,
            marginBottom: 12,
          },
        },
        "Nova ocorrência",
      ),
      alunos.length === 0
        ? React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
                marginBottom: 12,
              },
            },
            "Cadastre alunos na turma antes de registrar uma ocorrência.",
          )
        : React.createElement(
            React.Fragment,
            null,
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
              "CRIANÇA",
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
              alunos.map((X) =>
                React.createElement(Chip, {
                  key: X.id,
                  label: X.nome,
                  active: v === X.id,
                  onClick: () => E(X.id),
                }),
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
        "O QUE ACONTECEU",
      ),
      React.createElement(TextArea, {
        placeholder: "Ex: caiu no parquinho, arranhão leve no joelho",
        value: b,
        onChange: (X) => _(X.target.value),
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
            onClick: U,
            disabled: D || !b.trim() || !v,
            style: {
              flex: 1,
            },
          },
          D ? "Salvando..." : "Salvar",
        ),
      ),
    ),
  );
}
export { q0 };
