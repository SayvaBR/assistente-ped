// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Users as Jl } from "lucide-react";
import { Ellipsis as Kh } from "lucide-react";
import { House as Zh } from "lucide-react";
import { colors } from "../core/recovered.js";
import { FolderOpen as jo } from "lucide-react";
import React from "react";
import { Calendar as pi } from "lucide-react";
function BottomNavigation({ tab: tab, setTab: setTab }) {
  const f = [
      {
        key: "biblioteca",
        label: "Arquivos",
        Icon: jo,
      },
      {
        key: "plano",
        label: "Plano",
        accessibilityLabel: "Planejamento",
        Icon: pi,
      },
      {
        key: "inicio",
        label: "Início",
        Icon: Zh,
      },
      {
        key: "turma",
        label: "Turma",
        Icon: Jl,
      },
      {
        key: "mais",
        label: "Mais",
        Icon: Kh,
      },
    ],
    y = ({ item: v }) => {
      const E = tab === v.key;
      return React.createElement(
        "button",
        {
          type: "button",
          "data-tour": `nav-${v.key}`,
          "aria-label": v.accessibilityLabel || v.label,
          "aria-current": E ? "page" : void 0,
          className: `press-fx nav-button${E ? " nav-button-active" : ""}`,
          onClick: () => setTab(v.key),
          style: {
            color: E ? colors.primary : colors.gray,
          },
        },
        React.createElement(
          "span",
          {
            className: `nav-icon-shell${E ? " nav-icon-shell-active" : ""}`,
          },
          React.createElement(v.Icon, {
            size: 22,
            color: E ? colors.primaryDark : colors.gray,
            strokeWidth: E ? 2.5 : 2,
          }),
        ),
        React.createElement(
            "span",
            {
              className: "nav-label",
            },
            v.label,
          ),
      );
    };
  return React.createElement(
    "nav",
    {
      className: "bottom-nav",
      role: "navigation",
      "aria-label": "Navegação principal",
      style: {
        background: colors.white,
        borderColor: colors.border,
      },
    },
    f.map((v) =>
      React.createElement(y, {
        key: v.key,
        item: v,
      }),
    ),
  );
}
export { BottomNavigation };
