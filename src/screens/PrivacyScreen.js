// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { Shield as Wu } from "lucide-react";
import { colors } from "../core/recovered.js";
import { setAnalyticsEnabled } from "../core/recovered.js";
import * as ReactHooks from "react";
import React from "react";
function PrivacyScreen({ onBack: onBack, goTo: goTo }) {
  const [analytics, setAnalytics] = ReactHooks.useState(() => {
    try {
      return (
        JSON.parse(
          window.localStorage.getItem("config:analytics") || "false",
        ) === true
      );
    } catch {
      return false;
    }
  });
  const toggleAnalytics = (value) => {
    setAnalytics(value);
    setAnalyticsEnabled(value);
  };
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "Privacidade",
      subtitle: "Seus dados pedagógicos sob seu controle",
      onBack: onBack,
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
        Card,
        {
          style: {
            background: colors.primaryLight,
            boxShadow: "none",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            },
          },
          React.createElement(Wu, {
            size: 20,
            color: colors.primary,
          }),
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 16,
                  fontWeight: 800,
                  color: colors.dark,
                },
              },
              "Armazenamento local",
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 14,
                  color: colors.primaryDark,
                  lineHeight: 1.5,
                  marginTop: 4,
                },
              },
              "Perfil, turmas, planejamentos e registros ficam neste aparelho. Esta versão ainda não envia seus dados para uma conta ou nuvem.",
            ),
          ),
        ),
      ),
      React.createElement(
        Card,
        null,
        React.createElement(
          "div",
          { style: { fontSize: 14, fontWeight: 750, color: colors.dark } },
          "Dados de uso",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.gray,
              lineHeight: 1.55,
              marginTop: 6,
            },
          },
          "Por padrão, o aplicativo não envia dados de uso. Ative esta opção apenas se quiser manter registros técnicos locais para ajudar a diagnosticar problemas; o conteúdo de alunos não é incluído.",
        ),
        React.createElement(
          "label",
          { className: "check-row", style: { marginTop: 8 } },
          React.createElement("input", {
            type: "checkbox",
            checked: analytics,
            onChange: (event) => toggleAnalytics(event.target.checked),
          }),
          "Permitir registros técnicos locais",
        ),
      ),
      React.createElement(
        Card,
        null,
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 750,
              color: colors.dark,
            },
          },
          "O que isso significa",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.gray,
              lineHeight: 1.55,
              marginTop: 6,
            },
          },
          "Desinstalar o aplicativo, limpar seus dados pelo Android ou perder o aparelho pode apagar as informações. Fotos, áudios e dados de alunos devem ser registrados somente quando houver finalidade pedagógica e autorização adequada.",
        ),
      ),
      React.createElement(
        Card,
        null,
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 750,
              color: colors.dark,
            },
          },
          "Você decide",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.gray,
              lineHeight: 1.55,
              margin: "6px 0 12px",
            },
          },
          "Exporte uma cópia ou apague todos os dados locais quando precisar.",
        ),
        React.createElement(
          Button,
          {
            onClick: () => goTo("backup"),
          },
          "Gerenciar backup e dados",
        ),
      ),
    ),
  );
}
export { PrivacyScreen };
