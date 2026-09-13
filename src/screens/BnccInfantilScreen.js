// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import { Chip } from "../core/recovered.js";
import { EmptyState } from "../core/recovered.js";
import { IconTile } from "../core/recovered.js";
import { Ki } from "../core/recovered.js";
import { LoadingState } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { Tu } from "../core/recovered.js";
import { ChevronRight as Xt } from "lucide-react";
import { _u } from "../core/recovered.js";
import { colors } from "../core/recovered.js";
import { GraduationCap as gi } from "lucide-react";
import { lp } from "../screens/lp.js";
import React from "react";
import { Search as ro } from "lucide-react";
import { storage } from "../core/recovered.js";
function BnccInfantilScreen({ onBack: onBack }) {
  const [u, f] = ReactHooks.useState("campos"),
    [y, v] = ReactHooks.useState(null),
    [E, b] = ReactHooks.useState(null),
    [_, D] = ReactHooks.useState(""),
    [T, U] = ReactHooks.useState("todos"),
    [R, X] = ReactHooks.useState([]),
    [ce, J] = ReactHooks.useState([]),
    [pe, ge] = ReactHooks.useState(null),
    [ue, Se] = ReactHooks.useState(!0);
  ReactHooks.useEffect(() => {
    (async () => {
      try {
        const te = await storage.get("bncc:favoritos");
        te && X(JSON.parse(te.value));
      } catch {}
      try {
        const te = await storage.get("bncc:historico");
        te && J(JSON.parse(te.value));
      } catch {}
      Se(!1);
    })();
  }, []);
  const Ce = async (te) => {
      const Le = R.includes(te) ? R.filter((xe) => xe !== te) : [...R, te];
      (X(Le), Rt(680));
      try {
        await storage.set("bncc:favoritos", JSON.stringify(Le));
      } catch (xe) {
        console.error(xe);
      }
    },
    ke = async (te) => {
      const Le = pe === te ? null : te;
      if ((ge(Le), !Le)) return;
      const xe = [te, ...ce.filter((Me) => Me !== te)].slice(0, 10);
      J(xe);
      try {
        await storage.set("bncc:historico", JSON.stringify(xe));
      } catch (Me) {
        console.error(Me);
      }
    },
    ye = _.trim() !== "" || T !== "todos";
  let Ee = [];
  ye &&
    ((Ee = Ki.filter((te) =>
      (te.texto + te.campo + te.codigo).toLowerCase().includes(_.toLowerCase()),
    )),
    T === "favoritos" && (Ee = Ee.filter((te) => R.includes(te.codigo))),
    T === "historico" &&
      (Ee = ce.map((te) => Ki.find((Le) => Le.codigo === te)).filter(Boolean)));
  const Ie = y && E ? Ki.filter((te) => te.campo === y && te.faixa === E) : [],
    Oe = () => {
      if (ye) {
        (D(""), U("todos"));
        return;
      }
      if (u === "habilidades") {
        (f("faixas"), b(null));
        return;
      }
      if (u === "faixas") {
        (f("campos"), v(null));
        return;
      }
      onBack();
    },
    ze = ye
      ? "Resultado da busca"
      : u === "campos"
        ? "Educação Infantil · Campos de Experiência"
        : u === "faixas"
          ? y
          : E;
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "BNCC",
      subtitle: ze,
      onBack: Oe,
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: colors.white,
            borderRadius: 14,
            padding: "10px 12px",
            boxShadow: colors.cardShadow,
          },
        },
        React.createElement(ro, {
          size: 16,
          color: colors.gray,
        }),
        React.createElement("input", {
          value: _,
          onChange: (te) => D(te.target.value),
          placeholder: "Pesquisar por palavra-chave ou código...",
          style: {
            border: "none",
            outline: "none",
            fontSize: 14,
            flex: 1,
            background: "transparent",
            color: colors.dark,
          },
        }),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
          },
        },
        React.createElement(Chip, {
          label: "Navegar",
          active: T === "todos" && !_,
          onClick: () => {
            (U("todos"), D(""));
          },
        }),
        React.createElement(Chip, {
          label: `Favoritos (${R.length})`,
          active: T === "favoritos",
          onClick: () => U("favoritos"),
        }),
        React.createElement(Chip, {
          label: "Histórico",
          active: T === "historico",
          onClick: () => U("historico"),
        }),
      ),
      ue &&
        React.createElement(LoadingState, {
          label: "Carregando BNCC...",
        }),
      !ue &&
        ye &&
        React.createElement(
          React.Fragment,
          null,
          Ee.length === 0 &&
            React.createElement(EmptyState, {
              compact: !0,
              icon: ro,
              title:
                T === "favoritos"
                  ? "Nenhuma habilidade favoritada"
                  : T === "historico"
                    ? "Nenhuma consulta recente"
                    : "Nenhuma habilidade encontrada",
              description:
                T === "favoritos"
                  ? "Marque uma habilidade com estrela para encontrá-la aqui."
                  : "Ajuste a busca ou navegue pelos campos de experiência.",
              onAction: () => {
                (U("todos"), D(""));
              },
            }),
          Ee.map((te) =>
            React.createElement(lp, {
              key: te.codigo,
              h: te,
              favorito: R.includes(te.codigo),
              onFavoritar: () => Ce(te.codigo),
              expandido: pe === te.codigo,
              onExpandir: () => ke(te.codigo),
            }),
          ),
        ),
      !ue &&
        !ye &&
        u === "campos" &&
        _u.map((te) => {
          const Le = Ki.filter((xe) => xe.campo === te.nome).length;
          return React.createElement(
            Card,
            {
              key: te.nome,
              onClick: () => {
                (v(te.nome), f("faixas"));
              },
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
              },
            },
            React.createElement(IconTile, {
              color: te.color,
              Icon: te.icon,
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
                te.nome,
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 14,
                    color: colors.gray,
                  },
                },
                Le,
                " habilidade",
                Le !== 1 ? "s" : "",
                " cadastrada",
                Le !== 1 ? "s" : "",
              ),
            ),
            React.createElement(Xt, {
              size: 17,
              color: colors.gray,
            }),
          );
        }),
      !ue &&
        !ye &&
        u === "faixas" &&
        Tu.map((te) => {
          const Le = Ki.filter(
            (xe) => xe.campo === y && xe.faixa === te,
          ).length;
          return React.createElement(
            Card,
            {
              key: te,
              onClick: () => {
                (b(te), f("habilidades"));
              },
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
                te,
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 14,
                    color: colors.gray,
                  },
                },
                Le,
                " habilidade",
                Le !== 1 ? "s" : "",
              ),
            ),
            React.createElement(Xt, {
              size: 17,
              color: colors.gray,
            }),
          );
        }),
      !ue &&
        !ye &&
        u === "habilidades" &&
        (Ie.length === 0
          ? React.createElement(EmptyState, {
              compact: !0,
              icon: gi,
              title: "Nenhuma habilidade nesta faixa etária",
              description: "Escolha outra faixa para continuar a consulta.",
              onAction: () => f("faixas"),
            })
          : Ie.map((te) =>
              React.createElement(lp, {
                key: te.codigo,
                h: te,
                favorito: R.includes(te.codigo),
                onFavoritar: () => Ce(te.codigo),
                expandido: pe === te.codigo,
                onExpandir: () => ke(te.codigo),
              }),
            )),
    ),
  );
}
export { BnccInfantilScreen };
