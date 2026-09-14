// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Avatar } from "../core/recovered.js";
import { attendanceSummary } from '../domain/attendance';
import { ChevronRight as Xt } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
function B0({ aluno: aluno, onAbrir: onAbrir, onLongPress: onLongPress }) {
  const y = React.useRef(null),
    v = React.useRef(!1),
    E = () => {
      ((v.current = !1),
        (y.current = setTimeout(() => {
          ((v.current = !0), onLongPress(aluno));
        }, 480)));
    },
    b = () => {
      y.current && (clearTimeout(y.current), (y.current = null));
    },
    _ = () => {
      if (v.current) {
        v.current = !1;
        return;
      }
      onAbrir(aluno);
    };
  return React.createElement(
    "div",
    {
      className: "press-fx",
      onPointerDown: E,
      onPointerUp: b,
      onPointerLeave: b,
      onPointerCancel: b,
      onClick: _,
      role: 'button',
      tabIndex: 0,
      onKeyDown: (event) => { if(event.key === 'Enter' || event.key === ' ') {event.preventDefault(); _();} },
      style: {
        background: colors.white,
        borderRadius: 18,
        padding: 14,
        boxShadow: colors.cardShadow,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 12,
        userSelect: "none",
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
        aluno.nome,
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            color: colors.gray,
          },
        },
        aluno.idade,
        " · ",
        attendanceSummary(aluno).total
          ? attendanceSummary(aluno).percentage + "% frequência"
          : "sem frequência",
      ),
    ),
    React.createElement(Xt, {
      size: 16,
      color: colors.gray,
    }),
  );
}
export { B0 };
