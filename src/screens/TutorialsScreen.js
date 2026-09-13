// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import { Play as Mp } from "lucide-react";
import * as ReactHooks from "react";
import { ScreenHeader } from "../core/recovered.js";
import { Up } from "../core/recovered.js";
import { ChevronRight as Xt } from "lucide-react";
import { Check as Zr } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
import { storage } from "../core/recovered.js";
function TutorialsScreen({
  onBack: onBack,
  onIniciarTutorial: onIniciarTutorial,
}) {
  const f = [
      {
        grupo: "PRIMEIROS PASSOS",
        itens: [
          {
            id: "conhecendo",
            titulo: "Conhecendo o Aplicativo",
            desc: "Arquivos, Planejamento, Início, Turma e Mais.",
          },
          {
            id: "primeira-turma",
            titulo: "Criando sua Primeira Turma",
            desc: "Prepare sua turma e entenda onde cada informação fica.",
          },
          {
            id: "primeiro-plano",
            titulo: "Criando seu Primeiro Plano",
            desc: "Crie um plano completo e associe-o ao calendário.",
          },
          {
            id: "primeira-chamada",
            titulo: "Fazendo sua Primeira Chamada",
            desc: "Marque presença e falta e consulte o histórico.",
          },
        ],
      },
      {
        grupo: "PLANEJAMENTO",
        itens: [
          {
            id: "calendario",
            titulo: "Usando o Calendário",
            desc: "Veja planejamentos anteriores e organize as próximas datas.",
          },
          {
            id: "bncc-plano",
            titulo: "Adicionando BNCC",
            desc: "Relacione objetivos da Base ao plano de aula.",
          },
        ],
      },
      {
        grupo: "SALA DE AULA",
        itens: [
          {
            id: "registro",
            titulo: "Criando Registros",
            desc: "Construa o histórico pedagógico de cada aluno.",
          },
          {
            id: "frequencia",
            titulo: "Consultando Frequência",
            desc: "Entenda os indicadores da turma e do aluno.",
          },
        ],
      },
    ],
    [y, v] = ReactHooks.useState({});
  return (
    ReactHooks.useEffect(() => {
      (async () => {
        try {
          const E = await storage.get("tutorial:progresso:v2");
          v(JSON.parse(E.value) || {});
        } catch {}
      })();
    }, []),
    React.createElement(
      "div",
      {
        style: {
          paddingBottom: 30,
        },
      },
      React.createElement(ScreenHeader, {
        title: "Ajuda e Tutoriais",
        subtitle: "Aprenda fazendo, no seu ritmo",
        onBack: onBack,
      }),
      React.createElement(
        "div",
        {
          style: {
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
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
                fontSize: 16,
                fontWeight: 800,
                color: colors.primaryDark,
              },
            },
            "Tutorial interativo",
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
            "Os tutoriais disponíveis destacam o botão certo e acompanham você durante a tarefa.",
          ),
        ),
        f.map((E) =>
          React.createElement(
            "div",
            {
              key: E.grupo,
            },
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 12,
                  fontWeight: 800,
                  color: colors.gray,
                  letterSpacing: 0.6,
                  padding: "0 4px 8px",
                },
              },
              E.grupo,
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                },
              },
              E.itens.map((b) => {
                var T;
                const _ = y[b.id],
                  D = !!((T = Up[b.id]) != null && T.length);
                return React.createElement(
                  Card,
                  {
                    key: b.id,
                    onClick: D
                      ? () =>
                          onIniciarTutorial == null
                            ? void 0
                            : onIniciarTutorial(b.id)
                      : void 0,
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      opacity: 1,
                    },
                  },
                  React.createElement(
                    "div",
                    {
                      style: {
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background:
                          _ != null && _.concluido
                            ? colors.green + "22"
                            : colors.primaryLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      },
                    },
                    _ != null && _.concluido
                      ? React.createElement(Zr, {
                          size: 17,
                          color: colors.green,
                        })
                      : React.createElement(Mp, {
                          size: 16,
                          color: D ? colors.primary : colors.gray,
                        }),
                  ),
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
                          fontSize: 14,
                          fontWeight: 700,
                          color: colors.dark,
                        },
                      },
                      b.titulo,
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          fontSize: 12,
                          color: colors.gray,
                          marginTop: 2,
                          lineHeight: 1.35,
                        },
                      },
                      b.desc,
                    ),
                    (_ == null ? void 0 : _.etapa) > 0 &&
                      !(_ != null && _.concluido) &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            fontSize: 12,
                            color: colors.primary,
                            marginTop: 4,
                          },
                        },
                        "Continuar da etapa ",
                        _.etapa + 1,
                      ),
                  ),
                  D
                    ? React.createElement(Xt, {
                        size: 16,
                        color: colors.gray,
                      })
                    : null,
                );
              }),
            ),
          ),
        ),
      ),
    )
  );
}
export { TutorialsScreen };
