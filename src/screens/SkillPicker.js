// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Ki } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Tu } from "../core/recovered.js";
import { Check as Zr } from "lucide-react";
import { _u } from "../core/recovered.js";
import { colors } from "../core/recovered.js";
import React from "react";
import { Search as ro } from "lucide-react";
function SkillPicker({ selecionados: selecionados, onToggle: onToggle }) {
  const [f, y] = ReactHooks.useState(_u[0].nome),
    [v, E] = ReactHooks.useState(Tu[1]),
    [b, _] = ReactHooks.useState(""),
    D = b.trim().toLocaleLowerCase("pt-BR"),
    T = Ki.filter(
      (R) =>
        R.campo === f &&
        R.faixa === v &&
        (!D || `${R.codigo} ${R.texto}`.toLocaleLowerCase("pt-BR").includes(D)),
    ),
    U = selecionados.map((R) => Ki.find((X) => X.codigo === R)).filter(Boolean);
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
      },
    },
    React.createElement(
      "label",
      {
        htmlFor: "bncc-campo-plano",
        style: {
          fontSize: 14,
          fontWeight: 750,
          color: colors.dark,
        },
      },
      "Campo de experiência",
    ),
    React.createElement(
      "select",
      {
        id: "bncc-campo-plano",
        value: f,
        onChange: (R) => y(R.target.value),
        style: {
          width: "100%",
          minHeight: 48,
          border: `1px solid ${colors.border}`,
          borderRadius: 13,
          padding: "0 12px",
          background: colors.white,
          color: colors.dark,
        },
      },
      _u.map((R) =>
        React.createElement(
          "option",
          {
            key: R.nome,
            value: R.nome,
          },
          R.nome,
        ),
      ),
    ),
    React.createElement(
      "label",
      {
        htmlFor: "bncc-faixa-plano",
        style: {
          fontSize: 14,
          fontWeight: 750,
          color: colors.dark,
        },
      },
      "Faixa etária",
    ),
    React.createElement(
      "select",
      {
        id: "bncc-faixa-plano",
        value: v,
        onChange: (R) => E(R.target.value),
        style: {
          width: "100%",
          minHeight: 48,
          border: `1px solid ${colors.border}`,
          borderRadius: 13,
          padding: "0 12px",
          background: colors.white,
          color: colors.dark,
        },
      },
      Tu.map((R) =>
        React.createElement(
          "option",
          {
            key: R,
            value: R,
          },
          R,
        ),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          border: `1px solid ${colors.border}`,
          borderRadius: 13,
          padding: "0 12px",
          background: colors.white,
        },
      },
      React.createElement(ro, {
        size: 17,
        color: colors.gray,
      }),
      React.createElement("input", {
        "aria-label": "Buscar objetivo da BNCC",
        value: b,
        onChange: (R) => _(R.target.value),
        placeholder: "Buscar por código ou palavra",
        style: {
          width: "100%",
          minHeight: 48,
          border: "none",
          outline: "none",
          background: "transparent",
          color: colors.dark,
        },
      }),
    ),
    !!U.length &&
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 6,
            overflowX: "auto",
            padding: "2px 0 4px",
          },
          "aria-label": "Habilidades selecionadas",
        },
        U.map((R) =>
          React.createElement(
            "button",
            {
              key: R.codigo,
              className: "touch-target",
              "aria-label": `Remover ${R.codigo}`,
              onClick: () => onToggle(R.codigo),
              style: {
                border: `1px solid ${colors.primary}`,
                borderRadius: 12,
                background: colors.primaryLight,
                color: colors.primaryDark,
                fontWeight: 800,
                padding: "0 10px",
                whiteSpace: "nowrap",
              },
            },
            R.codigo,
            " ×",
          ),
        ),
      ),
    React.createElement(
      "div",
      {
        style: {
          fontSize: 14,
          color: colors.gray,
          lineHeight: 1.45,
        },
      },
      "Selecione os objetivos que fazem parte deste plano. A organização é a mesma da consulta BNCC.",
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 8,
        },
      },
      T.map((R) => {
        const X = selecionados.includes(R.codigo);
        return React.createElement(
          "button",
          {
            key: R.codigo,
            type: "button",
            role: "checkbox",
            "aria-checked": X,
            onClick: () => onToggle(R.codigo),
            className: "press-fx touch-target",
            style: {
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              width: "100%",
              textAlign: "left",
              padding: 12,
              borderRadius: 15,
              border: X
                ? `1.5px solid ${colors.primary}`
                : `1px solid ${colors.border}`,
              background: X ? colors.primaryLight : colors.white,
              color: colors.dark,
            },
          },
          React.createElement(
            "span",
            {
              style: {
                background: X ? colors.primary : colors.primaryLight,
                color: X ? colors.onPrimary : colors.primaryDark,
                borderRadius: 8,
                padding: "4px 7px",
                fontSize: 12,
                fontWeight: 800,
                flexShrink: 0,
              },
            },
            R.codigo,
          ),
          React.createElement(
            "span",
            {
              style: {
                flex: 1,
                fontSize: 14,
                lineHeight: 1.48,
              },
            },
            R.texto,
          ),
          React.createElement(
            "span",
            {
              "aria-hidden": "true",
              style: {
                width: 22,
                height: 22,
                borderRadius: 7,
                border: `1.5px solid ${X ? colors.primary : colors.border}`,
                background: X ? colors.primary : colors.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              },
            },
            X &&
              React.createElement(Zr, {
                size: 15,
                color: colors.onPrimary,
              }),
          ),
        );
      }),
    ),
    !T.length &&
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            color: colors.gray,
            textAlign: "center",
            padding: 12,
          },
        },
        "Nenhum objetivo encontrado com estes filtros.",
      ),
    !!selecionados.length &&
      React.createElement(
        "div",
        {
          role: "status",
          style: {
            fontSize: 14,
            color: colors.primary,
            fontWeight: 700,
          },
        },
        selecionados.length,
        " ",
        selecionados.length === 1
          ? "objetivo selecionado"
          : "objetivos selecionados",
        " no total",
      ),
  );
}
export { SkillPicker };
