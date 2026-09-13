// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Cu } from "../core/recovered.js";
import { Rp } from "../core/recovered.js";
import { Check as Zr } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
function M0({ value: value, onChange: onChange }) {
  const f = Cu(value);
  return React.createElement(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Cor de destaque",
      className: "accent-options",
    },
    Rp.map((y) => {
      const v = f === y.valor;
      return React.createElement(
        "button",
        {
          key: y.valor,
          type: "button",
          role: "radio",
          "aria-checked": v,
          className: "accent-option press-fx touch-target",
          onClick: () => onChange(y.valor),
          style: {
            borderColor: v ? y.valor : colors.border,
            background: v ? colors.primaryLight : colors.white,
            color: colors.dark,
          },
        },
        React.createElement("span", {
          className: "accent-option-swatch",
          "aria-hidden": "true",
          style: {
            background: y.valor,
            boxShadow: v ? `0 0 0 4px ${y.valor}2B` : "none",
          },
        }),
        React.createElement("strong", null, y.nome),
        v &&
          React.createElement(Zr, {
            size: 18,
            color: colors.primary,
            "aria-hidden": "true",
          }),
      );
    }),
  );
}
export { M0 };
