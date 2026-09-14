// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Avatar } from "../core/recovered.js";
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { Chip } from "../core/recovered.js";
import { Dp } from "../core/recovered.js";
import { EmptyState } from "../core/recovered.js";
import { Clock as Hl } from "lucide-react";
import { LoadingState } from "../core/recovered.js";
import * as ReactHooks from "react";
import { ScreenHeader } from "../core/recovered.js";
import { Y0 } from "../screens/Y0.js";
import { Check as Zr } from "lucide-react";
import { colors } from "../core/recovered.js";
import { dateKey } from "../core/recovered.js";
import { X as hi } from "lucide-react";
import React from "react";
import { repository } from "../core/recovered.js";
import { confirmAction } from "../core/recovered.js";
import { Search as ro } from "lucide-react";
function AttendanceScreen({
  alunos: alunos,
  dataKey: dataKey,
  onBack: onBack,
  onSalvo: onSalvo,
}) {
  const [v, E] = ReactHooks.useState({}),
    [b, _] = ReactHooks.useState({}),
    [D, T] = ReactHooks.useState(!0),
    [U, R] = ReactHooks.useState(null),
    [X, ce] = ReactHooks.useState(null),
    [J, pe] = ReactHooks.useState("todos"),
    [ge, ue] = ReactHooks.useState(null),
    [loadError, setLoadError] = ReactHooks.useState(null),
    [offline, setOffline] = ReactHooks.useState(
      typeof navigator !== "undefined" && !navigator.onLine,
    ),
    [reloadKey, setReloadKey] = ReactHooks.useState(0),
    Se = dateKey();
  ReactHooks.useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  ReactHooks.useEffect(() => {
    let te = !1;
    setLoadError(null);
    return (
      T(!0),
      (async () => {
        try {
          const [Le, xe] = await Promise.all([
            repository.carregarChamadaPorData(dataKey),
            repository.carregarJustificativasPorData(dataKey),
          ]);
          te || (E(Le || {}), _(xe || {}));
        } catch (Le) {
          !te &&
            setLoadError(
              (Le == null ? void 0 : Le.message) ||
                "Não foi possível carregar a chamada.",
            );
        } finally {
          !te && T(!1);
        }
      })(),
      () => {
        te = !0;
      }
    );
  }, [dataKey, reloadKey]);
  const Ce = async (te, Le) => {
      const xe = {
        ...v,
        [te]: v[te] === Le ? void 0 : Le,
      };
      (xe[te] === void 0 && delete xe[te], R(te), ce(null));
      try {
        (await onSalvo(xe), E(xe));
      } catch (Me) {
        (console.error("Erro ao salvar chamada:", Me),
          ce({
            id: te,
            valor: Le,
          }));
      } finally {
        R(null);
      }
    },
    ke = alunos.filter((te) => v[te.id]).length,
    ye = alunos.filter((te) => v[te.id] === "presente").length,
    Ee = alunos.filter((te) => v[te.id] === "falta").length,
    Ie = alunos.filter((te) => v[te.id] === "atrasado").length,
    Je = alunos.filter((te) => v[te.id] === "falta_justificada").length,
    Pe = alunos.filter((te) => v[te.id] === "saida_antecipada").length,
    Oe = alunos.length > 0 && ke === alunos.length,
    ze = alunos.filter((te) =>
      J === "presentes"
        ? v[te.id] === "presente"
        : J === "faltas"
          ? v[te.id] === "falta"
          : J === "atrasos"
            ? v[te.id] === "atrasado"
            : J === "justificadas"
              ? v[te.id] === "falta_justificada"
                : J === "saidas"
                  ? v[te.id] === "saida_antecipada"
                  : !0,
    );
  const saveBatch = async (status) => {
    const next =
      status === null
        ? {}
        : Object.fromEntries(alunos.map((aluno) => [aluno.id, status]));
    R("__batch__");
    ce(null);
    try {
      await onSalvo(next);
      E(next);
    } catch (error) {
      console.error("Erro ao salvar chamada em lote:", error);
      ce({ id: "__batch__", valor: status });
    } finally {
      R(null);
    }
  };
  const clearAttendance = async () => {
    if (
      await confirmAction({
        title: "Limpar chamada?",
        message:
          "As marcações deste dia serão removidas, mas os alunos continuarão na turma.",
        confirmLabel: "Limpar chamada",
        destructive: true,
      })
    )
      await saveBatch(null);
  };
  return D
    ? React.createElement(
        "div",
        {
          style: {
            paddingBottom: 30,
          },
        },
        React.createElement(ScreenHeader, {
          title: "Chamada",
          onBack: onBack,
        }),
        React.createElement(LoadingState, {
          label: "Carregando chamada...",
        }),
      )
    : loadError
      ? React.createElement(
          "div",
          { style: { paddingBottom: 30 } },
          React.createElement(ScreenHeader, {
            title: "Chamada",
            subtitle: Dp(dataKey),
            onBack: onBack,
          }),
          React.createElement(
            "div",
            { style: { padding: 16 } },
            React.createElement(
              Card,
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                },
              },
              React.createElement(
                "strong",
                null,
                "Não foi possível carregar a chamada",
              ),
              React.createElement(
                "p",
                { style: { margin: 0, color: colors.gray } },
                loadError,
              ),
              React.createElement(
                Button,
                { onClick: () => setReloadKey((value) => value + 1) },
                "Tentar novamente",
              ),
            ),
          ),
        )
    : React.createElement(
        "div",
        {
          style: {
            paddingBottom: 30,
          },
        },
        React.createElement(ScreenHeader, {
          title: dataKey === Se ? "Chamada de Hoje" : "Chamada",
          subtitle: Dp(dataKey),
          onBack: onBack,
        }),
        React.createElement(
          "div",
          {
            style: {
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            },
          },
          React.createElement(
            Card,
            {
              style: {
                background: Oe ? colors.green + "18" : colors.primaryLight,
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
            },
            React.createElement(
              "span",
              {
                style: {
                  fontSize: 14,
                  fontWeight: 600,
                  color: Oe ? colors.green : colors.primaryDark,
                },
              },
              ke,
              " de ",
              alunos.length,
              " marcados",
            ),
            React.createElement(
              "span",
              {
                style: {
                  fontSize: 12,
                  color: colors.gray,
                },
              },
              U ? "Salvando..." : "Salvo a cada toque",
            ),
          ),
          offline &&
            React.createElement(
              Card,
              {
                style: {
                  background: colors.orange + "18",
                  boxShadow: "none",
                },
              },
              "Offline: a chamada será salva neste dispositivo.",
            ),
          React.createElement(
            "div",
            { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
            React.createElement(
              "button",
              {
                className: "secondary-button press-fx touch-target",
                disabled: !!U || !alunos.length,
                onClick: () => saveBatch("presente"),
              },
              "Marcar todos presentes",
            ),
            ke > 0 &&
              React.createElement(
                "button",
                {
                  className: "text-button",
                  disabled: !!U,
                  onClick: clearAttendance,
                },
                "Limpar marcações",
              ),
          ),
          X &&
            React.createElement(
              Card,
              {
                style: {
                  background: colors.red + "12",
                  boxShadow: "none",
                  border: `1px solid ${colors.red}33`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                },
              },
              React.createElement(
                "div",
                {
                  role: "alert",
                  style: {
                    flex: 1,
                    fontSize: 14,
                    color: colors.red,
                    lineHeight: 1.4,
                  },
                },
                "A marcação não foi salva. Verifique o armazenamento e tente novamente.",
              ),
              React.createElement(
                "button",
                {
                  className: "touch-target",
                  onClick: () =>
                    X.id === "__batch__"
                      ? saveBatch(X.valor)
                      : Ce(X.id, X.valor),
                  style: {
                    border: "none",
                    borderRadius: 12,
                    background: colors.red,
                    color: "#fff",
                    fontWeight: 700,
                    padding: "0 12px",
                  },
                },
                "Tentar novamente",
              ),
            ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 8,
                overflowX: "auto",
              },
            },
            React.createElement(Chip, {
              label: `Todos ${alunos.length}`,
              active: J === "todos",
              onClick: () => pe("todos"),
            }),
            React.createElement(Chip, {
              label: `Presentes ${ye}`,
              active: J === "presentes",
              onClick: () => pe("presentes"),
            }),
            React.createElement(Chip, {
              label: `Faltas ${Ee}`,
              active: J === "faltas",
              onClick: () => pe("faltas"),
            }),
            React.createElement(Chip, {
              label: `Atrasos ${Ie}`,
              active: J === "atrasos",
              onClick: () => pe("atrasos"),
            }),
            React.createElement(Chip, {
              label: `Justificadas ${Je}`,
              active: J === "justificadas",
              onClick: () => pe("justificadas"),
            }),
            React.createElement(Chip, {
              label: `Saídas ${Pe}`,
              active: J === "saidas",
              onClick: () => pe("saidas"),
            }),
          ),
          ze.length === 0 &&
            React.createElement(EmptyState, {
              compact: !0,
              icon: ro,
              title: "Nenhum aluno neste filtro",
              description:
                "Escolha outro filtro para ver os registros da turma.",
              onAction: () => pe("todos"),
            }),
          ze.map((te) =>
            React.createElement(
              Card,
              {
                key: te.id,
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  opacity: U === te.id ? 0.7 : 1,
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  },
                },
                React.createElement(Avatar, {
                  nome: te.nome,
                  cor: te.cor,
                }),
                React.createElement(
                  "div",
                  {
                    style: {
                      flex: 1,
                      fontSize: 14,
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
                      display: "flex",
                      gap: 6,
                    },
                  },
                  React.createElement(
                    "button",
                    {
                      className: "press-fx touch-target",
                      "aria-label": `Marcar ${te.nome} como presente`,
                      disabled: !!U,
                      onClick: () => Ce(te.id, "presente"),
                      style: {
                        border: "none",
                        borderRadius: 12,
                        padding: "7px 10px",
                        background:
                          v[te.id] === "presente"
                            ? colors.green + "22"
                            : colors.bg,
                        color:
                          v[te.id] === "presente" ? colors.green : colors.gray,
                      },
                    },
                    React.createElement(Zr, {
                      size: 16,
                    }),
                  ),
                  React.createElement(
                    "button",
                    {
                      className: "press-fx touch-target",
                      "aria-label": `Marcar ${te.nome} com atraso`,
                      disabled: !!U,
                      onClick: () => Ce(te.id, "atrasado"),
                      style: {
                        border: "none",
                        borderRadius: 12,
                        padding: "7px 10px",
                        background:
                          v[te.id] === "atrasado"
                            ? colors.orange + "22"
                            : colors.bg,
                        color:
                          v[te.id] === "atrasado" ? colors.orange : colors.gray,
                      },
                    },
                    React.createElement(Hl, {
                      size: 16,
                    }),
                  ),
                  React.createElement(
                    "button",
                    {
                      className: "press-fx touch-target",
                      "aria-label": `Marcar falta para ${te.nome}`,
                      disabled: !!U,
                      onClick: () => Ce(te.id, "falta"),
                      style: {
                        border: "none",
                        borderRadius: 12,
                        padding: "7px 10px",
                        background:
                          v[te.id] === "falta" ? colors.red + "22" : colors.bg,
                        color: v[te.id] === "falta" ? colors.red : colors.gray,
                      },
                    },
                    React.createElement(hi, {
                      size: 16,
                    }),
                  ),
                  React.createElement(
                    "button",
                    {
                      className: "press-fx touch-target",
                      "aria-label": `Marcar falta justificada para ${te.nome}`,
                      disabled: !!U,
                      onClick: () => Ce(te.id, "falta_justificada"),
                      style: {
                        border: "none",
                        borderRadius: 12,
                        padding: "7px 10px",
                        background:
                          v[te.id] === "falta_justificada"
                            ? colors.primary + "22"
                            : colors.bg,
                        color:
                          v[te.id] === "falta_justificada"
                            ? colors.primary
                            : colors.gray,
                      },
                    },
                    "FJ",
                  ),
                  React.createElement(
                    "button",
                    {
                      className: "press-fx touch-target",
                      "aria-label": `Marcar saída antecipada para ${te.nome}`,
                      disabled: !!U,
                      onClick: () => Ce(te.id, "saida_antecipada"),
                      style: {
                        border: "none",
                        borderRadius: 12,
                        padding: "7px 10px",
                        background:
                          v[te.id] === "saida_antecipada"
                            ? colors.orange + "22"
                            : colors.bg,
                        color:
                          v[te.id] === "saida_antecipada"
                            ? colors.orange
                            : colors.gray,
                      },
                    },
                    "SA",
                  ),
                ),
              ),
              (v[te.id] === "falta" || v[te.id] === "falta_justificada") &&
                (b[te.id]
                  ? React.createElement(
                      "div",
                      {
                        onClick: () => ue(te),
                        className: "press-fx",
                        style: {
                          fontSize: 12,
                          color: colors.primaryDark,
                          background: colors.primaryLight,
                          borderRadius: 10,
                          padding: "6px 10px",
                          cursor: "pointer",
                        },
                      },
                      "Justificada: ",
                      b[te.id].motivo,
                    )
                  : React.createElement(
                      "button",
                      {
                        className: "press-fx",
                        onClick: () => ue(te),
                        style: {
                          alignSelf: "flex-start",
                          border: "none",
                          background: "none",
                          color: colors.primary,
                          fontSize: 12,
                          fontWeight: 700,
                          padding: 0,
                        },
                      },
                      "+ Justificar ausência",
                    )),
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                marginTop: 8,
              },
            },
            React.createElement(
              Button,
              {
                onClick: onBack,
              },
              Oe
                ? "Concluir chamada"
                : `Voltar (${alunos.length - ke} sem marcação)`,
            ),
          ),
        ),
        ge &&
          React.createElement(Y0, {
            aluno: ge,
            dataKey: dataKey,
            atual: b[ge.id],
            onClose: () => ue(null),
            onSalvo: (te) => {
              (_(te), ue(null));
            },
          }),
      );
}
export { AttendanceScreen };
