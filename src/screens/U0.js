import { capabilitiesFor } from '../domain/education';
// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Accordion } from "../screens/Accordion.js";
import { ClipboardList as Ap } from "lucide-react";
import { Avatar } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { EmptyState } from "../core/recovered.js";
import { IconTile } from "../core/recovered.js";
import { LoadingState } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { TextArea } from "../screens/TextArea.js";
import { Plus as Ts } from "lucide-react";
import { V0 } from "../screens/V0.js";
import { W0 } from "../screens/W0.js";
import { ChevronRight as Xt } from "lucide-react";
import { Check as Zr } from "lucide-react";
import { colors } from "../core/recovered.js";
import { dateKey } from "../core/recovered.js";
import React from "react";
import { q0 } from "../screens/q0.js";
import { repository } from "../core/recovered.js";
function U0({
  alunos: alunos,
  turma,
  goTo: goTo,
  dataKey: dataKey,
  setDataKey: setDataKey,
  pulso: pulso,
}) {
  const E = dateKey(),
    [b, _] = ReactHooks.useState(null),
    [D, T] = ReactHooks.useState(null),
    [U, R] = ReactHooks.useState({}),
    [X, ce] = ReactHooks.useState(null),
    [J, pe] = ReactHooks.useState(null),
    [ge, ue] = ReactHooks.useState(null),
    [Se, Ce] = ReactHooks.useState(""),
    [ke, ye] = ReactHooks.useState(!1),
    [Ee, Ie] = ReactHooks.useState(null),
    [Oe, ze] = ReactHooks.useState(!1);
  (ReactHooks.useEffect(() => {
    let me = !1;
    return (
      (async () => {
        const [se, O, M, ne, We] = await Promise.all([
          repository.carregarChamadaPorData(dataKey),
          repository.carregarJustificativasPorData(dataKey),
          repository.carregarRotinaPorData(dataKey),
          repository.carregarOcorrenciasPorData(dataKey),
          repository.carregarDiarioPorData(dataKey),
        ]);
        me ||
          (T(se || {}),
          R(O || {}),
          ce(M || {}),
          pe(ne || []),
          ue(We),
          Ce((We == null ? void 0 : We.texto) || ""));
      })(),
      () => {
        me = !0;
      }
    );
  }, [dataKey, pulso]),
    ReactHooks.useEffect(() => {
      (async () => {
        const [me, se, O, M] = await Promise.all([
            repository.listarTodasAsChamadas(),
            repository.listarTodasAsRotinas(),
            repository.listarTodasAsOcorrencias(),
            repository.listarTodosOsDiarios(),
          ]),
          ne = new Set([
            ...Object.keys(me),
            ...Object.keys(se),
            ...Object.keys(O),
            ...Object.keys(M),
          ]),
          We = {};
        (ne.forEach((rt) => {
          We[rt] = colors.primary;
        }),
          _(We));
      })();
    }, [pulso]));
  const te = D ? Object.keys(D).length : 0,
    Le = alunos.filter(
      (me) => (D == null ? void 0 : D[me.id]) === "presente",
    ).length,
    xe = alunos.filter(
      (me) => (D == null ? void 0 : D[me.id]) === "falta",
    ).length,
    Me = alunos.filter(
      (me) => (D == null ? void 0 : D[me.id]) === "atrasado",
    ).length,
    tt = Object.keys(U || {}).length,
    yt = X !== null ? alunos.filter((me) => !X[me.id]).length : 0,
    Be = Se !== ((ge == null ? void 0 : ge.texto) || ""),
    dt = async () => {
      ye(!0);
      try {
        (await repository.salvarDiarioPorData(dataKey, {
          texto: Se,
        }),
          ue({
            texto: Se,
          }),
          Rt(700));
      } catch (me) {
        console.error("Erro ao salvar diário:", me);
      } finally {
        ye(!1);
      }
    };
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
      },
    },
    React.createElement(V0, {
      dataKey: dataKey,
      setDataKey: setDataKey,
      marcadores: b,
    }),
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
            fontSize: 14,
            fontWeight: 800,
            color: colors.primaryDark,
            letterSpacing: 0.5,
            marginBottom: 8,
          },
        },
        "RESUMO ",
        dataKey === E ? "DO DIA" : "DESSE DIA",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              flex: 1,
              textAlign: "center",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 20,
                fontWeight: 800,
                color: colors.dark,
              },
            },
            alunos.length,
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                color: colors.primaryDark,
              },
            },
            "alunos",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              flex: 1,
              textAlign: "center",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 20,
                fontWeight: 800,
                color: colors.green,
              },
            },
            Le,
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                color: colors.primaryDark,
              },
            },
            "presentes",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              flex: 1,
              textAlign: "center",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 20,
                fontWeight: 800,
                color: colors.red,
              },
            },
            xe,
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                color: colors.primaryDark,
              },
            },
            "faltas",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              flex: 1,
              textAlign: "center",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 20,
                fontWeight: 800,
                color: colors.orange,
              },
            },
            Me,
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                color: colors.primaryDark,
              },
            },
            "atrasos",
          ),
        ),
      ),
      (tt > 0 || yt > 0) &&
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 3,
              marginTop: 8,
              paddingTop: 8,
              borderTop: `1px solid ${colors.primary}22`,
            },
          },
          tt > 0 &&
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 12,
                  color: colors.primaryDark,
                },
              },
              tt,
              " ausência",
              tt > 1 ? "s" : "",
              " justificada",
              tt > 1 ? "s" : "",
            ),
          capabilitiesFor(turma).rotina && yt > 0 &&
            alunos.length > 0 &&
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 12,
                  color: colors.primaryDark,
                },
              },
              yt,
              " registro",
              yt > 1 ? "s" : "",
              " de rotina pendente",
              yt > 1 ? "s" : "",
            ),
        ),
    ),
    React.createElement(
      Card,
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
        },
      },
      React.createElement(IconTile, {
        color: colors.orange,
        Icon: Zr,
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
          "Frequência",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.gray,
            },
          },
          D === null
            ? "Carregando..."
            : alunos.length === 0
              ? "Nenhum aluno cadastrado"
              : `${te} de ${alunos.length} · ${te > 0 ? "chamada registrada" : "chamada ainda não feita"}`,
        ),
      ),
      React.createElement(
        "button",
        {
          className: "press-fx",
          onClick: (me) => {
            goTo("chamada", {
              dataKey: dataKey,
            });
          },
          style: {
            border: "none",
            borderRadius: 12,
            background: te > 0 ? colors.bg : colors.primary,
            color: te > 0 ? colors.dark : colors.onPrimary,
            padding: "8px 12px",
            fontSize: 14,
            fontWeight: 700,
            whiteSpace: "nowrap",
          },
        },
        te > 0 ? "Ver chamada" : "Fazer chamada",
      ),
    ),
    capabilitiesFor(turma).rotina && React.createElement(
      Accordion,
      {
        titulo: "Rotina do Dia",
        subtitulo:
          X === null
            ? "Carregando..."
            : alunos.length === 0
              ? "Nenhum aluno cadastrado"
              : `${alunos.filter((me) => X[me.id]).length} de ${alunos.length} alunos registrados`,
        defaultAberta: !0,
      },
      X === null &&
        React.createElement(LoadingState, {
          label: "Carregando rotina...",
        }),
      X !== null &&
        alunos.length === 0 &&
        React.createElement(
          "div",
          {
            style: {
              textAlign: "center",
              padding: 10,
              color: colors.gray,
              fontSize: 14,
            },
          },
          "Cadastre alunos para registrar a rotina da turma.",
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
        X !== null &&
          alunos.map((me) => {
            const se = X[me.id];
            return React.createElement(
              Card,
              {
                key: me.id,
                onClick: () => Ie(me),
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "none",
                  border: `1px solid ${colors.border}`,
                },
              },
              React.createElement(Avatar, {
                nome: me.nome,
                cor: me.cor,
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
                      fontSize: 14,
                      fontWeight: 700,
                      color: colors.dark,
                    },
                  },
                  me.nome,
                ),
                se
                  ? React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 5,
                          marginTop: 3,
                        },
                      },
                      se.alimentacao &&
                        React.createElement(
                          "span",
                          {
                            style: {
                              fontSize: 12,
                              color: colors.primaryDark,
                              background: colors.primaryLight,
                              borderRadius: 7,
                              padding: "2px 6px",
                            },
                          },
                          "🍽 ",
                          se.alimentacao,
                        ),
                      se.comportamento &&
                        React.createElement(
                          "span",
                          {
                            style: {
                              fontSize: 12,
                              color: colors.primaryDark,
                              background: colors.primaryLight,
                              borderRadius: 7,
                              padding: "2px 6px",
                            },
                          },
                          "🙂 ",
                          se.comportamento,
                        ),
                      se.sono &&
                        React.createElement(
                          "span",
                          {
                            style: {
                              fontSize: 12,
                              color: colors.primaryDark,
                              background: colors.primaryLight,
                              borderRadius: 7,
                              padding: "2px 6px",
                            },
                          },
                          "😴 ",
                          se.sono,
                        ),
                    )
                  : React.createElement(
                      "div",
                      {
                        style: {
                          fontSize: 14,
                          color: colors.gray,
                          marginTop: 2,
                        },
                      },
                      dataKey === E
                        ? "Ainda não registrada hoje"
                        : "Sem registro nesse dia",
                    ),
              ),
              React.createElement(Xt, {
                size: 16,
                color: colors.gray,
              }),
            );
          }),
      ),
    ),
    React.createElement(
      Accordion,
      {
        titulo: dataKey === E ? "Ocorrências de Hoje" : "Ocorrências",
        subtitulo:
          J === null
            ? "Carregando..."
            : J.length === 0
              ? "Nenhuma ocorrência"
              : `${J.length} ocorrência${J.length > 1 ? "s" : ""}`,
      },
      React.createElement(
        "button",
        {
          className: "press-fx",
          onClick: () => ze(!0),
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            border: "none",
            borderRadius: 12,
            background: colors.primaryLight,
            color: colors.primary,
            padding: 10,
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 10,
          },
        },
        React.createElement(Ts, {
          size: 14,
        }),
        " Registrar ocorrência",
      ),
      J === null &&
        React.createElement(LoadingState, {
          label: "Carregando ocorrências...",
        }),
      J !== null &&
        J.length === 0 &&
        React.createElement(EmptyState, {
          compact: !0,
          icon: Ap,
          title: "Nenhuma ocorrência neste dia",
          description: "Registre uma ocorrência usando a ação acima.",
          onAction: () => ze(!0),
        }),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 8,
          },
        },
        J !== null &&
          J.map((me) =>
            React.createElement(
              Card,
              {
                key: me.id,
                style: {
                  borderLeft: `3px solid ${colors.red}`,
                  boxShadow: "none",
                  border: `1px solid ${colors.border}`,
                  borderLeftWidth: 3,
                  borderLeftColor: colors.red,
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  },
                },
                React.createElement(
                  "span",
                  {
                    style: {
                      fontSize: 14,
                      fontWeight: 700,
                      color: colors.dark,
                    },
                  },
                  me.alunoNome,
                ),
                me.hora &&
                  React.createElement(
                    "span",
                    {
                      style: {
                        fontSize: 12,
                        color: colors.gray,
                      },
                    },
                    me.hora,
                  ),
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 14,
                    color: colors.dark,
                  },
                },
                me.descricao,
              ),
            ),
          ),
      ),
    ),
    React.createElement(
      Accordion,
      {
        titulo: "Diário",
        subtitulo: Se
          ? Se.slice(0, 44) + (Se.length > 44 ? "…" : "")
          : "Como foi o dia da turma como um todo?",
      },
      React.createElement(TextArea, {
        placeholder: "Como foi o dia da turma como um todo?",
        value: Se,
        onChange: (me) => Ce(me.target.value),
      }),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 8,
          },
        },
        React.createElement(
          "button",
          {
            className: "press-fx",
            onClick: dt,
            disabled: ke || !Be,
            style: {
              border: "none",
              borderRadius: 12,
              background: Be ? colors.primary : colors.bg,
              color: Be ? colors.onPrimary : colors.gray,
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 700,
            },
          },
          ke ? "Salvando..." : "Salvar",
        ),
      ),
    ),
    Ee &&
      React.createElement(W0, {
        aluno: Ee,
        dataKey: dataKey,
        atual: X == null ? void 0 : X[Ee.id],
        onClose: () => Ie(null),
        onSalvo: (me) => {
          (ce(me), Ie(null));
        },
      }),
    Oe &&
      React.createElement(q0, {
        alunos: alunos,
        dataKey: dataKey,
        onClose: () => ze(!1),
        onSalvo: (me) => {
          (pe(me), ze(!1));
        },
      }),
  );
}
export { U0 };
