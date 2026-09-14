// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { MotionIllustration } from "../core/recovered.js";
import { Shield as Wu } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
function WelcomeScreen({ onDone: onDone }) {
  return React.createElement(
    "div",
    {
      className: "first-run-screen first-run-content guided-welcome",
      style: {
        height: "100%",
        background: colors.bg,
      },
    },
    React.createElement(
      "main",
      {
        className: "guided-welcome-main",
      },
      React.createElement(MotionIllustration, {
        variant: "onboarding",
        className: "guided-hero-lottie",
        label: "Caderno de planejamento pedagógico",
        colors: {
          primary: colors.primary,
          primaryDark: colors.primaryDark,
          primaryLight: colors.primaryLight,
          surface: colors.white,
        },
      }),
      React.createElement(
        "div",
        {
          className: "guided-eyebrow",
          style: {
            color: colors.primaryDark,
          },
        },
        "Menos tempo organizando, mais tempo ensinando",
      ),
      React.createElement(
        "h1",
        {
          style: {
            color: colors.dark,
          },
        },
        "Vamos organizar sua rotina pedagógica",
      ),
      React.createElement(
        "p",
        {
          style: {
            color: colors.gray,
          },
        },
        "Em poucos passos, vamos criar seu perfil local e sua primeira turma.",
      ),
      React.createElement(
        "div",
        {
          className: "guided-local-note",
          style: {
            background: colors.primaryLight,
            color: colors.primaryDark,
          },
        },
        React.createElement(Wu, {
          size: 20,
          "aria-hidden": "true",
        }),
        React.createElement(
          "span",
          null,
          React.createElement("strong", null, "Perfil local."),
          " Não é necessário criar uma conta para começar.",
        ),
      ),
    ),
    React.createElement(
      "div",
      {
        className: "guided-footer",
      },
      React.createElement(
        Button,
        {
          onClick: onDone,
        },
        "Começar",
      ),
      React.createElement(
        "div",
        {
          className: "guided-footnote",
          style: {
            color: colors.gray,
          },
        },
        "Você poderá alterar essas informações depois.",
      ),
    ),
  );
}
export { WelcomeScreen };
