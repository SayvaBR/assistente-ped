// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Avatar } from "../core/recovered.js";
import { Button } from "../core/recovered.js";
import { Pencil as Gl } from "lucide-react";
import { Input } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { colors } from "../core/recovered.js";
import { X as hi } from "lucide-react";
import React from "react";
function $0({
  aluno: aluno,
  onClose: onClose,
  onRenomear: onRenomear,
  onExcluir: onExcluir,
}) {
  const [v, E] = ReactHooks.useState("menu"),
    [b, _] = ReactHooks.useState(aluno.nome),
    [D, T] = ReactHooks.useState(!1),
    U = async () => {
      if (b.trim()) {
        T(!0);
        try {
          (await onRenomear(aluno, b.trim()), Rt(700), onClose());
        } finally {
          T(!1);
        }
      }
    },
    R = async () => {
      T(!0);
      try {
        (await onExcluir(aluno), onClose());
      } finally {
        T(!1);
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
      v === "menu" &&
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              },
            },
            React.createElement(Avatar, {
              nome: aluno.nome,
              cor: aluno.cor,
              foto: aluno.foto,
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
              aluno.nome,
            ),
          ),
          React.createElement(
            "button",
            {
              className: "press-fx",
              onClick: () => E("renomear"),
              style: {
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "none",
                background: colors.bg,
                borderRadius: 14,
                padding: 13,
                marginBottom: 8,
                fontSize: 16,
                fontWeight: 600,
                color: colors.dark,
              },
            },
            React.createElement(Gl, {
              size: 16,
              color: colors.primary,
            }),
            " Renomear",
          ),
          React.createElement(
            "button",
            {
              className: "press-fx",
              onClick: () => E("excluir"),
              style: {
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "none",
                background: colors.red + "15",
                borderRadius: 14,
                padding: 13,
                fontSize: 16,
                fontWeight: 600,
                color: colors.red,
              },
            },
            React.createElement(hi, {
              size: 16,
            }),
            " Excluir aluno",
          ),
        ),
      v === "renomear" &&
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            {
              style: {
                fontSize: 16,
                fontWeight: 700,
                color: colors.dark,
                marginBottom: 10,
              },
            },
            "Renomear aluno",
          ),
          React.createElement(Input, {
            value: b,
            onChange: (X) => _(X.target.value),
            placeholder: "Nome do aluno",
            autoFocus: !0,
          }),
          React.createElement(
            Button,
            {
              onClick: U,
              disabled: !b.trim() || D,
            },
            D ? "Salvando..." : "Salvar novo nome",
          ),
        ),
      v === "excluir" &&
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            {
              style: {
                fontSize: 16,
                fontWeight: 700,
                color: colors.dark,
                marginBottom: 6,
              },
            },
            "Excluir ",
            aluno.nome,
            "?",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
                marginBottom: 14,
                lineHeight: 1.5,
              },
            },
            "O aluno sai da turma, mas o histórico continua guardado — dá pra restaurar pela Lixeira (Mais → Configurações).",
          ),
          React.createElement(
            "button",
            {
              className: "press-fx",
              onClick: R,
              disabled: D,
              style: {
                width: "100%",
                border: "none",
                background: colors.red,
                color: "#fff",
                borderRadius: 14,
                padding: 13,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 8,
              },
            },
            D ? "Excluindo..." : "Excluir",
          ),
          React.createElement(
            "button",
            {
              className: "press-fx",
              onClick: () => E("menu"),
              style: {
                width: "100%",
                border: "none",
                background: colors.bg,
                color: colors.gray,
                borderRadius: 14,
                padding: 13,
                fontSize: 16,
                fontWeight: 600,
              },
            },
            "Cancelar",
          ),
        ),
    ),
  );
}
export { $0 };
