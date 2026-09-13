// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import * as ReactHooks from "react";
import { Up } from "../core/recovered.js";
import { colors } from "../core/recovered.js";
import React from "react";
import { storage } from "../core/recovered.js";
function GuidedTour({
  tutorialId: tutorialId,
  onClose: onClose,
  onChangeTab: onChangeTab,
}) {
  const y = Up[tutorialId] || [],
    [v, E] = ReactHooks.useState(0),
    [b, _] = ReactHooks.useState(null);
  ReactHooks.useEffect(() => {
    (async () => {
      var U;
      try {
        const R = await storage.get("tutorial:progresso:v2"),
          X = JSON.parse(R.value) || {};
        E(((U = X[tutorialId]) == null ? void 0 : U.etapa) || 0);
      } catch {}
    })();
  }, [tutorialId]);
  const D = y[v];
  if (
    (ReactHooks.useEffect(() => {
      if (!D) return;
      onChangeTab(D.tab);
      const U = setTimeout(() => {
        const R = document.querySelector(D.target);
        if (R) {
          const X = R.getBoundingClientRect();
          _({
            left: X.left,
            top: X.top,
            width: X.width,
            height: X.height,
          });
        } else _(null);
      }, 120);
      return () => clearTimeout(U);
    }, [v, tutorialId]),
    !D)
  )
    return null;
  const T = async () => {
    let U = {};
    try {
      const X = await storage.get("tutorial:progresso:v2");
      U = JSON.parse(X.value) || {};
    } catch {}
    const R = v >= y.length - 1;
    ((U[tutorialId] = {
      etapa: R ? v : v + 1,
      concluido: R,
    }),
      await storage.set("tutorial:progresso:v2", JSON.stringify(U)),
      R ? onClose() : E(v + 1));
  };
  return React.createElement(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
      },
    },
    b &&
      React.createElement("div", {
        style: {
          position: "fixed",
          left: b.left - 5,
          top: b.top - 5,
          width: b.width + 10,
          height: b.height + 10,
          border: `3px solid ${colors.primary}`,
          borderRadius: 16,
          boxShadow: "0 0 0 9999px rgba(20,18,28,.58)",
          pointerEvents: "none",
        },
      }),
    React.createElement(
      "div",
      {
        className: "tutorial-panel",
        style: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 92,
          background: colors.white,
          borderRadius: 18,
          padding: 16,
          boxShadow: "0 12px 34px rgba(0,0,0,.24)",
          pointerEvents: "auto",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 12,
            fontWeight: 800,
            color: colors.primary,
          },
        },
        "ETAPA ",
        v + 1,
        " DE ",
        y.length,
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 15,
            fontWeight: 800,
            color: colors.dark,
            marginTop: 4,
          },
        },
        D.titulo,
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            color: colors.gray,
            lineHeight: 1.45,
            marginTop: 5,
          },
        },
        D.texto,
      ),
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
            onClick: onClose,
            style: {
              flex: 1,
              border: `1px solid ${colors.border}`,
              background: colors.white,
              borderRadius: 12,
              padding: 10,
              color: colors.gray,
              fontWeight: 700,
            },
          },
          "Sair",
        ),
        React.createElement(
          "button",
          {
            onClick: T,
            style: {
              flex: 1,
              border: "none",
              background: colors.primary,
              borderRadius: 12,
              padding: 10,
              color: colors.onPrimary,
              fontWeight: 700,
            },
          },
          v === y.length - 1 ? "Concluir" : "Próximo",
        ),
      ),
    ),
  );
}
export { GuidedTour };
