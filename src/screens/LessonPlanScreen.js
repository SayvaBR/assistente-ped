import { usePlanAutosave } from "../components/usePlanAutosave";
// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { $p } from "../screens/$p.js";
import { Accordion } from "../screens/Accordion.js";
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { Input } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { SearchInput } from "../core/recovered.js";
import { SkillPicker } from "../screens/BnccCatalogScreen.tsx";
import { TextArea } from "../screens/TextArea.js";
import { Plus as Ts } from "lucide-react";
import { Vp } from "../screens/Vp.js";
import { colors } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { createLessonPlan } from "../core/recovered.js";
import { X as hi } from "lucide-react";
import { m0 } from "../core/recovered.js";
import { Trash2 as mi } from "lucide-react";
import React from "react";
function LessonPlanScreen({
  plano: plano,
  prefill: prefill,
  dataKey: dataKey,
  turmaId: turmaId,
  etapa,
  onBack: onBack,
  onConcluido: onConcluido,
  onDirtyChange: onDirtyChange,
  onSalvar: onSalvar,
  onExcluir: onExcluir,
}) {
  const [T, U] = ReactHooks.useState(
      () =>
        plano || {
          ...createLessonPlan({
            turmaId: turmaId,
            etapa,
            dataKey: dataKey,
          }),
          ...(prefill || {}),
        },
    ),
    [R, X] = ReactHooks.useState(plano?._editorDraft?.objetivo || ""),
    [ce, J] = ReactHooks.useState(
      plano?._editorDraft?.momento || {
        titulo: "",
        horario: "",
        duracaoMin: "",
      },
    ),
    [pe, ge] = ReactHooks.useState(!1),
    [ue, Se] = ReactHooks.useState(!1),
    [Ce, ke] = ReactHooks.useState(!1),
    [ye, Ee] = ReactHooks.useState("");
  const autoSave = usePlanAutosave(
    { ...T, _editorDraft: { objetivo: R, momento: ce } },
    onSalvar,
  );
  const Oe = autoSave.dirty;
  (ReactHooks.useEffect(() => {
    onDirtyChange == null || onDirtyChange(Oe);
  }, [Oe, onDirtyChange]),
    ReactHooks.useEffect(
      () => () => (onDirtyChange == null ? void 0 : onDirtyChange(!1)),
      [onDirtyChange],
    ));
  const ze = !plano,
    te = (se, O) =>
      U((M) => ({
        ...M,
        [se]: O,
      })),
    Le = (se, O) =>
      U((M) => ({
        ...M,
        posAula: {
          ...M.posAula,
          [se]: O,
        },
      })),
    xe = () => {
      R.trim() &&
        (U((se) => ({
          ...se,
          objetivosEspecificos: [...se.objetivosEspecificos, R.trim()],
        })),
        X(""));
    },
    Me = (se) =>
      U((O) => ({
        ...O,
        objetivosEspecificos: O.objetivosEspecificos.filter(
          (M, ne) => ne !== se,
        ),
      })),
    tt = (se) =>
      U((O) => ({
        ...O,
        bncc: {
          habilidades: O.bncc.habilidades.includes(se)
            ? O.bncc.habilidades.filter((M) => M !== se)
            : [...O.bncc.habilidades, se],
        },
      })),
    yt = () => {
      if (!ce.titulo.trim()) return;
      const se = {
        id: createId("momento"),
        titulo: ce.titulo.trim(),
        horario: ce.horario.trim(),
        duracaoMin: ce.duracaoMin ? Number(ce.duracaoMin) : null,
        descricao: "",
      };
      (U((O) => ({
        ...O,
        momentos: [...O.momentos, se].sort((M, ne) =>
          (M.horario || "").localeCompare(ne.horario || ""),
        ),
      })),
        J({
          titulo: "",
          horario: "",
          duracaoMin: "",
        }));
    },
    Be = (se) =>
      U((O) => ({
        ...O,
        momentos: O.momentos.filter((M) => M.id !== se),
      })),
    dt = async (se) => {
      Ee("");
      const O = se === "concluido";
      if (
        !!!(
          T.tituloTema.trim() ||
          T.objetivoGeral.trim() ||
          T.objetivosEspecificos.length ||
          T.momentos.length ||
          T.recursos.trim() ||
          T.avaliacao.trim() ||
          T.inclusao.trim() ||
          T.observacoes.trim() ||
          T.bncc.habilidades.length
        )
      ) {
        Ee("Adicione pelo menos uma informação antes de salvar o rascunho.");
        return;
      }
      if (O && !T.tituloTema.trim()) {
        Ee("Informe o tema ou título para concluir o plano.");
        return;
      }
      if (O && T.momentos.length === 0) {
        Ee(
          "Adicione pelo menos um momento ou atividade para concluir o plano.",
        );
        return;
      }
      ge(!0);
      try {
        (await autoSave.saveNow({
          ...T,
          _editorDraft: { objetivo: R, momento: ce },
          status: se || T.status,
        }),
          Rt(700),
          onDirtyChange == null || onDirtyChange(!1),
          onConcluido());
      } catch (ne) {
        (console.error("Erro ao salvar plano:", ne),
          Ee(
            "Não foi possível salvar o plano. Revise os dados e tente novamente.",
          ));
      } finally {
        ge(!1);
      }
    },
    me = async () => {
      ke(!0);
      try {
        (await autoSave.pause(),
          await onExcluir(T),
          onDirtyChange == null || onDirtyChange(!1),
          onConcluido());
      } catch (se) {
        (autoSave.resume(),
          Ee("Não foi possível excluir o plano. Tente novamente."),
          ke(!1));
      }
    };
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    autoSave.status &&
      React.createElement(
        "p",
        { className: "notice", role: "status", style: { margin: 16 } },
        autoSave.status,
      ),
    autoSave.error &&
      React.createElement(
        "div",
        { className: "module-content" },
        React.createElement("p", { role: "alert" }, autoSave.error),
        React.createElement(
          "button",
          { className: "secondary-button", onClick: autoSave.retry },
          "Tentar salvar novamente",
        ),
      ),
    React.createElement(
      "button",
      {
        className: "secondary-button",
        style: { margin: 16 },
        onClick: async () => {
          try {
            const pdf = await import("../data/pdfExport");
            await pdf.sharePdf("plano-de-aula.pdf", pdf.lessonPdf(T));
          } catch {
            Ee("Não foi possível exportar o PDF.");
          }
        },
      },
      "Exportar plano em PDF",
    ),
    React.createElement(ScreenHeader, {
      title: ze ? "Novo Plano" : "Plano de Aula",
      subtitle: $p(T.dataKey),
      onBack: onBack,
    }),
    React.createElement(
      "fieldset",
      {
        disabled: pe || Ce,
        style: {
          border: 0,
          margin: 0,
          minWidth: 0,
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
            justifyContent: "flex-end",
          },
        },
        React.createElement(Vp, {
          status: T.status,
        }),
      ),
      React.createElement(
        Accordion,
        {
          titulo: "Informações",
          subtitulo: T.tituloTema || "Tema, data e horário",
          defaultAberta: !0,
        },
        React.createElement(Input, {
          placeholder: "Tema do plano (ex: Cores da natureza)",
          value: T.tituloTema,
          onChange: (se) => te("tituloTema", se.target.value),
        }),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 10,
            },
          },
          React.createElement(SearchInput, {
            value: T.horaInicio,
            onChange: (se) => te("horaInicio", se.target.value),
          }),
          React.createElement(SearchInput, {
            value: T.horaFim,
            onChange: (se) => te("horaFim", se.target.value),
          }),
        ),
      ),
      React.createElement(
        Accordion,
        {
          titulo: "Objetivos",
          subtitulo: T.objetivoGeral || "Objetivo geral e específicos",
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 600,
              color: colors.dark,
              marginBottom: 6,
            },
          },
          "Objetivo geral",
        ),
        React.createElement(TextArea, {
          placeholder: "O que se espera alcançar com este plano?",
          value: T.objetivoGeral,
          onChange: (se) => te("objetivoGeral", se.target.value),
          style: {
            marginBottom: 12,
          },
        }),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 600,
              color: colors.dark,
              marginBottom: 6,
            },
          },
          "Objetivos específicos",
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginBottom: 8,
            },
          },
          T.objetivosEspecificos.map((se, O) =>
            React.createElement(
              "div",
              {
                key: O,
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: colors.bg,
                  borderRadius: 12,
                  padding: "8px 10px",
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    flex: 1,
                    fontSize: 14,
                    color: colors.dark,
                  },
                },
                se,
              ),
              React.createElement(
                "button",
                {
                  className: "press-fx",
                  onClick: () => Me(O),
                  style: {
                    border: "none",
                    background: "none",
                  },
                },
                React.createElement(hi, {
                  size: 14,
                  color: colors.gray,
                }),
              ),
            ),
          ),
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
              },
            },
            React.createElement(Input, {
              placeholder: "Adicionar objetivo específico",
              value: R,
              onChange: (se) => X(se.target.value),
              onKeyDown: (se) => se.key === "Enter" && xe(),
            }),
          ),
          React.createElement(
            "button",
            {
              className: "press-fx",
              onClick: xe,
              style: {
                border: "none",
                borderRadius: 14,
                background: colors.primaryLight,
                color: colors.primary,
                padding: "0 14px",
                height: 44,
              },
            },
            React.createElement(Ts, {
              size: 18,
            }),
          ),
        ),
      ),
      React.createElement(
        Accordion,
        {
          titulo: "BNCC",
          subtitulo: T.bncc.habilidades.length
            ? `${T.bncc.habilidades.length} ${T.bncc.habilidades.length === 1 ? "objetivo selecionado" : "objetivos selecionados"}`
            : "Campos de experiência e objetivos",
        },
        React.createElement(SkillPicker, {
          etapa,
          selecionados: T.bncc.habilidades,
          onToggle: tt,
        }),
      ),
      React.createElement(
        Accordion,
        {
          titulo: "Desenvolvimento",
          subtitulo: T.momentos.length
            ? `${T.momentos.length} ${T.momentos.length === 1 ? "momento" : "momentos"}`
            : "Os momentos da aula",
          defaultAberta: !0,
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 10,
            },
          },
          T.momentos.map((se, O) =>
            React.createElement(
              Card,
              {
                key: se.id,
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "none",
                  border: `1px solid ${colors.border}`,
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 24,
                    height: 24,
                    borderRadius: 8,
                    background: colors.primaryLight,
                    color: colors.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  },
                },
                O + 1,
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
                      fontWeight: 600,
                      color: colors.dark,
                    },
                  },
                  se.titulo,
                ),
                React.createElement(
                  "div",
                  {
                    style: {
                      fontSize: 12,
                      color: colors.gray,
                    },
                  },
                  [se.horario, se.duracaoMin ? `${se.duracaoMin} min` : null]
                    .filter(Boolean)
                    .join(" · ") || "Sem horário definido",
                ),
              ),
              React.createElement(
                "button",
                {
                  className: "press-fx",
                  onClick: () => Be(se.id),
                  style: {
                    border: "none",
                    background: "none",
                  },
                },
                React.createElement(hi, {
                  size: 15,
                  color: colors.gray,
                }),
              ),
            ),
          ),
          T.momentos.length === 0 &&
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 14,
                  color: colors.gray,
                },
              },
              "Nenhum momento adicionado ainda.",
            ),
        ),
        React.createElement(
          Card,
          {
            style: {
              boxShadow: "none",
              background: colors.bg,
              padding: 10,
            },
          },
          React.createElement(Input, {
            placeholder: "Título do momento (ex: Roda de conversa)",
            value: ce.titulo,
            onChange: (se) =>
              J((O) => ({
                ...O,
                titulo: se.target.value,
              })),
          }),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 10,
              },
            },
            React.createElement(SearchInput, {
              value: ce.horario,
              onChange: (se) =>
                J((O) => ({
                  ...O,
                  horario: se.target.value,
                })),
            }),
            React.createElement(Input, {
              placeholder: "Duração (min)",
              inputMode: "numeric",
              value: ce.duracaoMin,
              onChange: (se) =>
                J((O) => ({
                  ...O,
                  duracaoMin: se.target.value.replace(/\D/g, ""),
                })),
            }),
          ),
          React.createElement(
            "button",
            {
              className: "press-fx",
              onClick: yt,
              disabled: !ce.titulo.trim(),
              style: {
                width: "100%",
                border: "none",
                borderRadius: 14,
                background: ce.titulo.trim() ? colors.primary : colors.border,
                color: ce.titulo.trim() ? colors.onPrimary : colors.gray,
                padding: 11,
                fontSize: 14,
                fontWeight: 600,
              },
            },
            "+ Adicionar momento",
          ),
        ),
      ),
      React.createElement(
        Accordion,
        {
          titulo: "Recursos",
          subtitulo: T.recursos
            ? T.recursos.slice(0, 40)
            : "Materiais necessários",
        },
        React.createElement(TextArea, {
          placeholder: "Materiais e recursos necessários",
          value: T.recursos,
          onChange: (se) => te("recursos", se.target.value),
        }),
      ),
      React.createElement(
        Accordion,
        {
          titulo: "Avaliação",
          subtitulo: T.avaliacao
            ? T.avaliacao.slice(0, 40)
            : "Como observar o aprendizado",
        },
        React.createElement(TextArea, {
          placeholder: "Como o aprendizado será observado",
          value: T.avaliacao,
          onChange: (se) => te("avaliacao", se.target.value),
        }),
      ),
      React.createElement(
        Accordion,
        {
          titulo: "Inclusão e adaptações",
          subtitulo: T.inclusao
            ? T.inclusao.slice(0, 40)
            : "Estratégias e adaptações",
        },
        React.createElement(TextArea, {
          placeholder: "Estratégias ou adaptações necessárias",
          value: T.inclusao,
          onChange: (se) => te("inclusao", se.target.value),
        }),
      ),
      React.createElement(
        Accordion,
        {
          titulo: "Observações",
          subtitulo: T.observacoes ? T.observacoes.slice(0, 40) : "Campo livre",
        },
        React.createElement(TextArea, {
          placeholder: "Observações livres sobre o plano",
          value: T.observacoes,
          onChange: (se) => te("observacoes", se.target.value),
        }),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            fontWeight: 800,
            color: colors.gray,
            letterSpacing: 0.6,
            padding: "4px 2px 0",
          },
        },
        "DEPOIS DA AULA",
      ),
      React.createElement(
        Card,
        null,
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 700,
              color: colors.dark,
              marginBottom: 10,
            },
          },
          "Como foi esta aula?",
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 8,
              marginBottom: 12,
            },
          },
          m0.map((se) =>
            React.createElement(
              "button",
              {
                key: se.valor,
                className: "press-fx",
                onClick: () => Le("comoFoi", se.valor),
                title: se.label,
                style: {
                  flex: 1,
                  border:
                    T.posAula.comoFoi === se.valor
                      ? `1.5px solid ${colors.primary}`
                      : `1px solid ${colors.border}`,
                  borderRadius: 14,
                  padding: "10px 4px",
                  background:
                    T.posAula.comoFoi === se.valor
                      ? colors.primaryLight
                      : colors.white,
                  fontSize: 20,
                },
              },
              se.emoji,
            ),
          ),
        ),
        React.createElement(TextArea, {
          placeholder: "Observações pós-aula (o que funcionou, o que ajustar)",
          value: T.posAula.observacoesPosAula,
          onChange: (se) => Le("observacoesPosAula", se.target.value),
        }),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 12,
            color: colors.gray,
            lineHeight: 1.4,
          },
        },
        "Para concluir, informe o tema e adicione pelo menos um momento ou atividade.",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 10,
            marginTop: 4,
          },
        },
        React.createElement(
          "button",
          {
            className: "press-fx touch-target",
            onClick: () => dt("rascunho"),
            disabled: pe,
            style: {
              flex: 1,
              border: `1.5px solid ${colors.border}`,
              borderRadius: 16,
              padding: 14,
              background: colors.white,
              color: colors.dark,
              fontWeight: 600,
              fontSize: 14,
            },
          },
          "Salvar rascunho",
        ),
        React.createElement(
          "div",
          {
            style: {
              flex: 1,
            },
          },
          React.createElement(
            Button,
            {
              onClick: () => dt("concluido"),
              disabled: pe || !T.tituloTema.trim() || T.momentos.length === 0,
            },
            pe ? "Salvando..." : "Concluir plano",
          ),
        ),
      ),
      ye &&
        React.createElement(
          "div",
          {
            role: "alert",
            style: {
              color: colors.red,
              fontSize: 14,
              lineHeight: 1.4,
            },
          },
          ye,
        ),
      !ze &&
        React.createElement(
          "div",
          {
            style: {
              marginTop: 10,
              paddingTop: 14,
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
                  "Excluir este plano? Essa ação não pode ser desfeita.",
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
                      onClick: me,
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
                  },
                },
                React.createElement(mi, {
                  size: 15,
                }),
                " Excluir este plano",
              ),
        ),
    ),
  );
}
export { LessonPlanScreen };
