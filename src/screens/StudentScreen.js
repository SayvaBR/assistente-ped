import { capabilitiesFor, stageLabels } from '../domain/education';
// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Avatar } from "../core/recovered.js";
import { FileText as Bn } from "lucide-react";
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { Chip } from "../core/recovered.js";
import { Camera as Do } from "lucide-react";
import { EmptyState } from "../core/recovered.js";
import { Pencil as Gl } from "lucide-react";
import { Input } from "../core/recovered.js";
import { Meh as Ip } from "lucide-react";
import { LoadingState } from "../core/recovered.js";
import * as ReactHooks from "react";
import { PhotoCropper } from "../components/photo.js";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { Sp } from "../data/agenda-camera.js";
import { Ss } from "../data/files.js";
import { Wp } from "../screens/Wp.js";
import { Frown as _p } from "lucide-react";
import { Phone as ag } from "lucide-react";
import { bp } from "../data/agenda-camera.js";
import { calculateAge } from "../data/classes.js";
import { colors } from "../core/recovered.js";
import { confirmAction } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { dateKey } from "../core/recovered.js";
import { deleteMedia } from "../data/files.js";
import { fh } from "../data/classes.js";
import { formatPhone } from "../data/classes.js";
import { X as hi } from "lucide-react";
import { Capacitor as ka } from "@capacitor/core";
import { Trash2 as mi } from "lucide-react";
import React from "react";
import { Smile as qu } from "lucide-react";
import { repository } from "../core/recovered.js";
import { saveMedia } from "../data/files.js";
import { validatePhone } from "../data/classes.js";
import { wp } from "../data/agenda-camera.js";
function StudentScreen({
  crianca: crianca,
  turma,
  onBack: onBack,
  goTo: goTo,
  onExcluir: onExcluir,
  onEditar: onEditar,
}) {
  const [E, b] = ReactHooks.useState("perfil"),
    [_, D] = ReactHooks.useState(null),
    [T, U] = ReactHooks.useState(null),
    [R, X] = ReactHooks.useState(null),
    [ce, J] = ReactHooks.useState(!1),
    [pe, ge] = ReactHooks.useState(!1),
    [ue, Se] = ReactHooks.useState(!1),
    [Ce, ke] = ReactHooks.useState(!1),
    [ye, Ee] = ReactHooks.useState(!1),
    [Ie, Oe] = ReactHooks.useState(crianca.responsavel || ""),
    [ze, te] = ReactHooks.useState(crianca.contato || ""),
    [Le, xe] = ReactHooks.useState(crianca.nomePreferido || ""),
    [Me, tt] = ReactHooks.useState(crianca.dataNascimento || ""),
    [yt, Be] = ReactHooks.useState(!1),
    [dt, me] = ReactHooks.useState("");
  const capabilities = capabilitiesFor(turma);
  let se = "",
    O = "";
  if (ze)
    try {
      O = fh(ze);
    } catch (be) {
      se =
        (be == null ? void 0 : be.message) ||
        "Informe um telefone brasileiro válido, com DDD.";
    }
  const M = async () => {
      (Be(!0), me(""));
      try {
        Me && calculateAge(Me);
        const be = validatePhone(ze);
        (await onEditar(crianca, {
          responsavel: Ie.trim(),
          contato: be,
          nomePreferido: Le.trim(),
          dataNascimento: Me || null,
        }),
          Rt(700),
          Ee(!1));
      } catch (be) {
        (console.error("Erro ao salvar responsável:", be),
          me(
            (be == null ? void 0 : be.message) ||
              "Não foi possível salvar os dados do perfil.",
          ));
      } finally {
        Be(!1);
      }
    },
    ne = async () => {
      ke(!0);
      try {
        (await onExcluir(crianca), onBack());
      } catch (be) {
        (console.error("Erro ao excluir aluno:", be), ke(!1));
      }
    };
  (ReactHooks.useEffect(() => {
    (async () => {
      const be = await repository.carregarFotoPerfil(crianca.id);
      be && U(be);
    })();
  }, [crianca.id]),
    ReactHooks.useEffect(() => {
      if (E !== "observações") return;
      let be = !1;
      return (
        D(null),
        (async () => {
          const ft = await repository.carregarObservacoes(crianca.id);
          be || D(ft);
        })(),
        () => {
          be = !0;
        }
      );
    }, [E, crianca.id]),
    ReactHooks.useEffect(() => {
      if (E !== "fotos") return;
      let be = !1;
      return (
        X(null),
        (async () => {
          const ft = await repository.carregarGaleria(crianca.id);
          be || X(ft);
        })(),
        () => {
          be = !0;
        }
      );
    }, [E, crianca.id]));
  const We = async () => {
      try {
        (T && typeof T == "object" && (await deleteMedia(T)),
          await repository.removerFotoPerfil(crianca.id),
          U(null),
          Rt(600));
      } catch (be) {
        console.error("Erro ao remover foto de perfil:", be);
      }
    },
    rt = async () => {
      (me(""), J(!0));
      let be = null;
      try {
        const ft = await Sp();
        be = await saveMedia({
          dataUrl: ft.dataUrl,
          tipo: "foto",
          proprietarioId: crianca.id,
          id: createId("foto"),
          nomeOriginal: `foto-${Date.now()}.${ft.format || "jpeg"}`,
        });
        const He = [
          {
            id: be.id,
            arquivo: be,
            data: new Date().toLocaleDateString("pt-BR"),
          },
          ...(R || []),
        ];
        (await repository.salvarGaleria(crianca.id, He), X(He), Rt(700));
      } catch (ft) {
        wp(ft) ||
          (be && (await deleteMedia(be).catch(() => {})),
          console.error("Erro ao adicionar foto:", ft),
          me(
            be
              ? "A foto foi capturada, mas não pôde ser salva. Libere espaço no aparelho e tente novamente."
              : bp(ft),
          ));
      } finally {
        J(!1);
      }
    },
    mt = async (be) => {
      if (
        !(await confirmAction({
          title: "Excluir foto?",
          message: "Esta foto será removida do aparelho.",
          confirmLabel: "Excluir",
        }))
      )
        return;
      const ft = be.arquivo || (be.path ? be : null);
      ft && (await deleteMedia(ft).catch(() => {}));
      const He = (R || []).filter((Sa) => Sa !== be);
      (X(He), await repository.salvarGaleria(crianca.id, He));
    },
    st = [qu, Ip, _p],
    we =
      typeof T == "string"
        ? T
        : Ss(T, {
            convertFileSrc: ka.convertFileSrc,
          }),
    Ue = async (be) => {
      J(!0);
      try {
        const ft = await saveMedia({
            dataUrl: be,
            tipo: "foto",
            proprietarioId: crianca.id,
            id: "perfil",
          }),
          He = T;
        (await repository.salvarFotoPerfil(crianca.id, ft),
          U(ft),
          He &&
            typeof He == "object" &&
            He.path !== ft.path &&
            (await deleteMedia(He).catch(() => {})),
          Rt(700));
      } finally {
        J(!1);
      }
    };
  const stageLabel = stageLabels[turma == null ? "" : turma.etapa] || "esta etapa";
  const profileActions = [
    capabilities.notas && {
      label: "Notas e desempenho",
      route: "academico",
      data: { studentId: crianca.id },
    },
    { label: "Frequência da turma", route: "chamada" },
    capabilities.bncc && { label: "BNCC e habilidades", route: "bncc" },
    {
      label: "Caderno pedagógico",
      route: "caderno",
      data: { studentId: crianca.id },
    },
  ].filter(Boolean);
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: crianca.nome,
      subtitle: crianca.dataNascimento
        ? calculateAge(crianca.dataNascimento)
        : crianca.idade || "Data de nascimento não informada",
      onBack: onBack,
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: 16,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            marginBottom: 14,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              position: "relative",
            },
          },
          React.createElement(Avatar, {
            nome: crianca.nome,
            cor: crianca.cor,
            foto: we,
            size: 84,
          }),
          React.createElement(
            "button",
            {
              "aria-label": "Alterar e enquadrar foto",
              onClick: () => ge(!0),
              className: "press-fx",
              style: {
                position: "absolute",
                bottom: -2,
                right: -2,
                background: colors.primary,
                borderRadius: 14,
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: `2px solid ${colors.bg}`,
              },
            },
            React.createElement(Do, {
              size: 13,
              color: "#fff",
            }),
          ),
          T &&
            React.createElement(
              "button",
              {
                className: "press-fx",
                onClick: We,
                title: "Remover foto",
                style: {
                  position: "absolute",
                  bottom: -2,
                  left: -2,
                  background: colors.red,
                  borderRadius: 14,
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: `2px solid ${colors.bg}`,
                },
              },
              React.createElement(hi, {
                size: 13,
                color: "#fff",
              }),
            ),
        ),
      ),
      ce &&
        React.createElement(
          "div",
          {
            style: {
              textAlign: "center",
              fontSize: 12,
              color: colors.gray,
              marginBottom: 10,
            },
          },
          "Salvando foto...",
        ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
            marginBottom: 14,
          },
        },
        ["perfil", "observações", "fotos"].map((be) =>
          React.createElement(Chip, {
            key: be,
            label: be[0].toUpperCase() + be.slice(1),
            active: E === be,
            onClick: () => b(be),
          }),
        ),
      ),
      E === "perfil" &&
        React.createElement(
          Card,
          {
            style: {
              marginBottom: 12,
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
              },
            },
            `Acompanhamento · ${stageLabel}`,
          ),
          React.createElement(
            "p",
            {
              style: {
                margin: "4px 0 10px",
                color: colors.primaryDark,
                fontSize: 13,
              },
            },
            capabilities.desenvolvimento
              ? "Registros qualitativos e evidências ajudam a acompanhar o desenvolvimento."
              : "Acesse os registros da turma sem perder o contexto deste aluno.",
          ),
          React.createElement(
            "div",
            { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
            profileActions.map((action) =>
              React.createElement(
                "button",
                {
                  key: action.label,
                  className: "secondary-button press-fx touch-target",
                  onClick: () => goTo(action.route, action.data),
                },
                action.label,
              ),
            ),
          ),
        ),
      E === "perfil" &&
        React.createElement(
          React.Fragment,
          null,
          crianca.presencas != null &&
            (() => {
                const be = crianca.presencas + crianca.faltas + (crianca.atrasos || 0),
                  ft = be > 0 ? Math.round(((crianca.presencas + (crianca.atrasos || 0)) / be) * 100) : 0,
                He = Wp(ft);
              return React.createElement(
                Card,
                {
                  style: {
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  },
                },
                React.createElement(
                  "div",
                  {
                    style: {
                      background: He + "22",
                      color: He,
                      borderRadius: 12,
                      padding: "6px 12px",
                      fontSize: 15,
                      fontWeight: 700,
                    },
                  },
                  ft,
                  "%",
                ),
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 14,
                        fontWeight: 600,
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
                    crianca.presencas,
                    " presenças · ",
                    crianca.faltas,
                    " faltas",
                  ),
                ),
              );
            })(),
          React.createElement(
            Card,
            {
              style: {
                marginBottom: 10,
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: ye ? 10 : 6,
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.gray,
                  },
                },
                "DADOS DO PERFIL",
              ),
              !ye &&
                React.createElement(
                  "button",
                  {
                    className: "press-fx",
                    onClick: () => Ee(!0),
                    style: {
                      border: "none",
                      background: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      color: colors.primary,
                      fontSize: 14,
                      fontWeight: 600,
                    },
                  },
                  React.createElement(Gl, {
                    size: 13,
                  }),
                  " Editar",
                ),
            ),
            ye
              ? React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(Input, {
                    placeholder: "Nome pelo qual gosta de ser chamado(a)",
                    value: Le,
                    onChange: (be) => xe(be.target.value),
                  }),
                  React.createElement(
                    "label",
                    {
                      style: {
                        fontSize: 12,
                        color: colors.gray,
                      },
                    },
                    "Data de nascimento",
                  ),
                  React.createElement(Input, {
                    type: "date",
                    max: dateKey(),
                    value: Me,
                    onChange: (be) => tt(be.target.value),
                  }),
                  React.createElement(Input, {
                    placeholder: "Nome do responsável",
                    value: Ie,
                    onChange: (be) => Oe(be.target.value),
                  }),
                  React.createElement(Input, {
                    type: "tel",
                    inputMode: "tel",
                    autoComplete: "tel",
                    placeholder: "Telefone com DDD",
                    value: ze,
                    onChange: (be) => te(formatPhone(be.target.value)),
                    maxLength: 15,
                    "aria-invalid": !!se,
                    "aria-describedby": "erro-telefone-perfil",
                  }),
                  React.createElement(
                    "div",
                    {
                      id: "erro-telefone-perfil",
                      "aria-live": "polite",
                      style: {
                        minHeight: 18,
                        fontSize: 12,
                        color: se ? colors.red : colors.gray,
                        margin: "-4px 2px 0",
                      },
                    },
                    se || "Ex.: (11) 98765-4321",
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        gap: 8,
                        marginTop: 4,
                      },
                    },
                    React.createElement(
                      "button",
                      {
                        className: "press-fx",
                        onClick: () => {
                          (Oe(crianca.responsavel || ""),
                            te(crianca.contato || ""),
                            xe(crianca.nomePreferido || ""),
                            tt(crianca.dataNascimento || ""),
                            Ee(!1));
                        },
                        style: {
                          flex: 1,
                          background: "none",
                          border: `1.5px solid ${colors.border}`,
                          color: colors.gray,
                          borderRadius: 14,
                          padding: 12,
                          fontSize: 14,
                          fontWeight: 600,
                        },
                      },
                      "Cancelar",
                    ),
                    React.createElement(
                      Button,
                      {
                        onClick: M,
                        disabled: yt || !!se,
                        style: {
                          flex: 1,
                        },
                      },
                      yt ? "Salvando..." : "Salvar",
                    ),
                  ),
                )
              : Ie || ze || Le || Me
                ? React.createElement(
                    React.Fragment,
                    null,
                    Le &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            fontSize: 14,
                            color: colors.dark,
                          },
                        },
                        "Prefere ser chamado(a) de ",
                        Le,
                      ),
                    Me &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            fontSize: 14,
                            color: colors.gray,
                            marginTop: 2,
                          },
                        },
                        "Nascimento: ",
                        new Date(`${Me}T12:00:00`).toLocaleDateString("pt-BR"),
                        " · ",
                        calculateAge(Me),
                      ),
                    Ie &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            fontSize: 14,
                            color: colors.dark,
                          },
                        },
                        Ie,
                      ),
                    ze &&
                      (O
                        ? React.createElement(
                            "a",
                            {
                              href: O,
                              "aria-label": `Ligar para ${Ie || "responsável"}`,
                              style: {
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: 14,
                                color: colors.primary,
                                marginTop: 5,
                                fontWeight: 700,
                                textDecoration: "none",
                              },
                            },
                            React.createElement(ag, {
                              size: 16,
                            }),
                            formatPhone(ze),
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
                            ze,
                          )),
                  )
                : React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 14,
                        color: colors.gray,
                      },
                    },
                    "Complete os dados úteis para o acompanhamento deste aluno.",
                  ),
            dt &&
              React.createElement(
                "div",
                {
                  role: "alert",
                  style: {
                    color: colors.red,
                    fontSize: 14,
                    marginTop: 8,
                  },
                },
                dt,
              ),
          ),
        ),
      E === "observações" &&
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            Button,
            {
              onClick: () => goTo("observacao", crianca),
              style: {
                marginBottom: 12,
              },
            },
            "Nova observação",
          ),
          _ === null &&
            React.createElement(LoadingState, {
              label: "Carregando observações...",
            }),
          (_ == null ? void 0 : _.length) === 0 &&
            React.createElement(EmptyState, {
              compact: !0,
              icon: Bn,
              title: "Nenhuma observação registrada",
              description:
                "Use o botão acima para iniciar o histórico pedagógico deste aluno.",
              onAction: () => goTo("observacao", crianca),
            }),
          (_ == null ? void 0 : _.length) > 0 &&
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                },
              },
              _.map((be, ft) => {
                const He = be.humor != null ? st[be.humor] : null;
                return React.createElement(
                  Card,
                  {
                    key: be.id || ft,
                  },
                  React.createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      },
                    },
                    React.createElement(
                      "span",
                      {
                        style: {
                          fontSize: 12,
                          color: colors.gray,
                          fontWeight: 600,
                        },
                      },
                      be.data,
                    ),
                    He &&
                      React.createElement(He, {
                        size: 16,
                        color: colors.primary,
                      }),
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 14,
                        color: colors.dark,
                      },
                    },
                    be.texto ||
                      React.createElement(
                        "em",
                        {
                          style: {
                            color: colors.gray,
                          },
                        },
                        "Sem texto adicional",
                      ),
                  ),
                  be.audio &&
                    React.createElement("audio", {
                      controls: !0,
                      src:
                        typeof be.audio == "string"
                          ? be.audio
                          : Ss(be.audio, {
                              convertFileSrc: ka.convertFileSrc,
                            }),
                      style: {
                        width: "100%",
                        height: 32,
                        marginTop: 8,
                      },
                    }),
                );
              }),
            ),
        ),
      E === "fotos" &&
        React.createElement(
          React.Fragment,
          null,
          R === null &&
            React.createElement(LoadingState, {
              label: "Carregando fotos...",
            }),
          R !== null &&
            React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "button",
                {
                  className: "press-fx touch-target",
                  disabled: ce,
                  "aria-busy": ce,
                  onClick: rt,
                  style: {
                    width: "100%",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: colors.primaryLight,
                    color: colors.primary,
                    borderRadius: 16,
                    padding: 14,
                    marginBottom: 12,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                  },
                },
                React.createElement(Do, {
                  size: 16,
                }),
                " ",
                ce ? "Abrindo câmera..." : "Adicionar foto",
              ),
              dt &&
                React.createElement(
                  "div",
                  {
                    role: "alert",
                    style: {
                      color: colors.red,
                      fontSize: 14,
                      lineHeight: 1.45,
                      margin: "-4px 2px 12px",
                    },
                  },
                  dt,
                ),
              R.length === 0
                ? React.createElement(EmptyState, {
                    compact: !0,
                    icon: Do,
                    title: "Nenhuma foto adicionada",
                    description:
                      "Use a ação acima para guardar o primeiro registro visual.",
                    onAction: rt,
                  })
                : React.createElement(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 8,
                      },
                    },
                    R.map((be, ft) =>
                      React.createElement(
                        "div",
                        {
                          key: be.id || ft,
                          style: {
                            position: "relative",
                          },
                        },
                        React.createElement("img", {
                          src:
                            be.url ||
                            Ss(be.arquivo || be, {
                              convertFileSrc: ka.convertFileSrc,
                            }),
                          alt: `Registro de ${crianca.nome}`,
                          style: {
                            width: "100%",
                            aspectRatio: "1",
                            objectFit: "cover",
                            borderRadius: 12,
                          },
                        }),
                        React.createElement(
                          "button",
                          {
                            "aria-label": "Excluir foto",
                            onClick: () => mt(be),
                            style: {
                              position: "absolute",
                              top: 3,
                              right: 3,
                              width: 30,
                              height: 30,
                              border: "none",
                              borderRadius: 15,
                              background: "rgba(0,0,0,.6)",
                              color: "#fff",
                            },
                          },
                          React.createElement(hi, {
                            size: 14,
                          }),
                        ),
                      ),
                    ),
                  ),
            ),
        ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 28,
            paddingTop: 18,
            borderTop: `1px solid ${colors.border}`,
          },
        },
        ue
          ? React.createElement(
              Card,
              {
                style: {
                  background: colors.red + "11",
                  borderColor: colors.red + "33",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 14,
                    color: colors.dark,
                    marginBottom: 12,
                    textAlign: "center",
                  },
                },
                "Remover ",
                React.createElement("strong", null, crianca.nome),
                " da turma? As observações e fotos já salvas não serão apagadas.",
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
                  "button",
                  {
                    className: "press-fx",
                    onClick: () => Se(!1),
                    disabled: Ce,
                    style: {
                      flex: 1,
                      padding: 12,
                      borderRadius: 14,
                      border: `1.5px solid ${colors.border}`,
                      background: colors.white,
                      color: colors.dark,
                      fontWeight: 600,
                      fontSize: 14,
                    },
                  },
                  "Cancelar",
                ),
                React.createElement(
                  "button",
                  {
                    className: "press-fx",
                    onClick: ne,
                    disabled: Ce,
                    style: {
                      flex: 1,
                      padding: 12,
                      borderRadius: 14,
                      border: "none",
                      background: colors.red,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                    },
                  },
                  Ce ? "Removendo..." : "Confirmar",
                ),
              ),
            )
          : React.createElement(
              "button",
              {
                className: "press-fx",
                onClick: () => Se(!0),
                style: {
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  color: colors.red,
                  fontSize: 14,
                  fontWeight: 600,
                  padding: 10,
                  cursor: "pointer",
                },
              },
              React.createElement(mi, {
                size: 15,
              }),
              " Remover ",
              crianca.nome,
              " da turma",
            ),
      ),
    ),
    React.createElement(PhotoCropper, {
      open: pe,
      onClose: () => ge(!1),
      onConfirm: Ue,
      initialSrc: we,
      title: "Enquadrar foto do aluno",
      colors: {
        surface: colors.white,
        background: colors.bg,
        text: colors.dark,
        muted: colors.gray,
        primary: colors.primary,
        border: colors.border,
        danger: colors.red,
      },
    }),
  );
}
export { StudentScreen };
