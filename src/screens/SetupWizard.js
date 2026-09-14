import { educationStages, levelsFor } from "../domain/education";
// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { User as Cs } from "lucide-react";
import { Pencil as Gl } from "lucide-react";
import { Clock as Hl } from "lucide-react";
import { Input } from "../core/recovered.js";
import { LoadingState } from "../core/recovered.js";
import { MotionIllustration } from "../core/recovered.js";
import * as ReactHooks from "react";
import { BookOpen as Vh } from "lucide-react";
import { Check as Zr } from "lucide-react";
import { colors } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { g0 } from "../core/recovered.js";
import { GraduationCap as gi } from "lucide-react";
import React from "react";
import { ChevronLeft as qo } from "lucide-react";
import { storage } from "../core/recovered.js";
import { School as to } from "lucide-react";
import { v0 } from "../core/recovered.js";
import { ws } from "../core/recovered.js";
function SetupWizard({
  onDone: onDone,
  onBack: onBack,
  onFinish: onFinish,
  backSignal = 0,
}) {
  const [v, E] = ReactHooks.useState(0),
    [b, _] = ReactHooks.useState(() => ({
      perfilId: createId("prof"),
      turmaId: createId("turma"),
      tratamento: "",
      nome: "",
      etapaEnsino: "Educação Infantil",
      escola: "",
      cidade: "",
      uf: "",
      ibgeCode: null,
      turma: "",
      nivel: "",
      turno: "",
    })),
    D = (Be) => (dt) =>
      _((me) => ({
        ...me,
        [Be]: dt.target.value,
      })),
    [T, U] = ReactHooks.useState(!1),
    [R, X] = ReactHooks.useState(""),
    [ce, J] = ReactHooks.useState(!1),
    [pe, ge] = ReactHooks.useState(null),
    ue = React.useRef(null),
    [Se, Ce] = ReactHooks.useState(!1),
    [ke, ye] = ReactHooks.useState(() => {
      var Be;
      return (
        ((Be = window.visualViewport) == null ? void 0 : Be.height) || null
      );
    });
  (ReactHooks.useEffect(() => {
    const Be = window.visualViewport;
    if (!Be) return;
    const dt = () => ye(Be.height);
    return (
      dt(),
      Be.addEventListener("resize", dt),
      () => Be.removeEventListener("resize", dt)
    );
  }, []),
    ReactHooks.useEffect(() => {
      let Be = !0;
      return (
        (async () => {
          try {
            const dt = await storage.get(ws),
              me = JSON.parse(dt.value);
            Be &&
              me != null &&
              me.dados &&
              (_((se) => ({
                ...se,
                ...me.dados,
                etapaEnsino: me.dados.etapaEnsino || "Educação Infantil",
                perfilId: me.dados.perfilId || se.perfilId,
                turmaId: me.dados.turmaId || se.turmaId,
              })),
              E(Math.max(0, Math.min(5, Number(me.passo) || 0))));
          } catch {
          } finally {
            Be && J(!0);
          }
        })(),
        () => {
          Be = !1;
        }
      );
    }, []),
    ReactHooks.useEffect(() => {
      if (!ce || pe) return;
      const Be = setTimeout(
        () =>
          storage
            .set(
              ws,
              JSON.stringify({
                passo: v,
                dados: b,
              }),
            )
            .catch(() => {}),
        120,
      );
      return () => clearTimeout(Be);
    }, [b, v, ce, pe]),
    ReactHooks.useEffect(() => {
      var Be;
      (Be = ue.current) == null || Be.focus();
    }, [v]));
  const Ee = ({ valor: Be, label: dt, campo: me }) => {
      const se = b[me] === Be;
      return React.createElement(
        "button",
        {
          type: "button",
          className: `guided-choice press-fx touch-target${se ? " guided-choice-selected" : ""}`,
          "aria-pressed": se,
          onClick: () =>
            _((O) => ({
              ...O,
              [me]: Be,
            })),
          style: {
            borderColor: se ? colors.primary : colors.border,
            background: se ? colors.primaryLight : colors.white,
            color: se ? colors.primaryDark : colors.dark,
            boxShadow: se ? `0 5px 16px ${colors.primary}1F` : "none",
          },
        },
        React.createElement("span", null, dt),
        React.createElement(
          "span",
          {
            className: "guided-choice-check",
            style: {
              borderColor: se ? colors.primary : colors.border,
              background: se ? colors.primary : "transparent",
            },
          },
          se &&
            React.createElement(Zr, {
              size: 16,
              color: colors.onPrimary,
            }),
        ),
      );
    },
    Ie = [
      {
        icone: Cs,
        titulo: "Como você prefere ser chamado?",
        apoio: "Isso personaliza as mensagens do aplicativo.",
        obrigatorio: !b.tratamento,
        body: React.createElement(
          "div",
          {
            className: "guided-options",
          },
          React.createElement(Ee, {
            campo: "tratamento",
            valor: "professora",
            label: "Professora",
          }),
          React.createElement(Ee, {
            campo: "tratamento",
            valor: "professor",
            label: "Professor",
          }),
          React.createElement(Ee, {
            campo: "tratamento",
            valor: "docente",
            label: "Docente",
          }),
        ),
      },
      {
        icone: Gl,
        titulo: "Qual nome devemos usar?",
        apoio: "Você poderá alterar essa informação depois.",
        obrigatorio: !b.nome.trim(),
        body: React.createElement(Input, {
          icon: Cs,
          "aria-label": "Seu nome",
          autoComplete: "name",
          placeholder: "Seu nome",
          value: b.nome,
          onChange: D("nome"),
        }),
      },
      {
        icone: gi,
        titulo: "Em qual etapa você trabalha?",
        apoio: "Os planejamentos e a BNCC acompanham sua etapa de ensino.",
        obrigatorio: !b.etapaEnsino,
        body: React.createElement(
          "div",
          {
            className: "guided-options",
          },
          educationStages.map((stage) =>
            React.createElement(Ee, {
              key: stage,
              campo: "etapaEnsino",
              valor: stage,
              label: stage,
            }),
          ),
        ),
      },
      {
        icone: to,
        titulo: "Qual é o nome da sua primeira turma?",
        apoio: "Use o mesmo nome que você usa na escola.",
        obrigatorio: !b.turma.trim(),
        body: React.createElement(Input, {
          icon: to,
          "aria-label": "Nome da primeira turma",
          placeholder: "Ex.: Nível I A",
          value: b.turma,
          onChange: D("turma"),
        }),
      },
      {
        icone: Vh,
        titulo: "Qual é o nível da turma?",
        apoio: "Escolha a nomenclatura adotada pela sua escola.",
        obrigatorio: !b.nivel,
        body: React.createElement(
          "div",
          {
            className: "guided-options",
          },
          levelsFor(b.etapaEnsino).map((Be) =>
            React.createElement(Ee, {
              key: Be,
              campo: "nivel",
              valor: Be,
              label: Be,
            }),
          ),
        ),
      },
      {
        icone: Hl,
        titulo: "Qual é o turno da turma?",
        apoio: "O turno aparecerá junto ao nome da turma.",
        obrigatorio: !b.turno,
        body: React.createElement(
          "div",
          {
            className: "guided-options",
          },
          v0.map((Be) =>
            React.createElement(Ee, {
              key: Be,
              campo: "turno",
              valor: Be,
              label: Be,
            }),
          ),
        ),
      },
    ],
    Oe = Ie.length,
    ze = Ie[v],
    te = v === Oe - 1,
    Le = !!ze.obrigatorio,
    xe = async () => {
      if ((X(""), !te)) {
        const Be = v + 1;
        (await storage
          .set(
            ws,
            JSON.stringify({
              passo: Be,
              dados: b,
            }),
          )
          .catch(() => {}),
          E(Be));
        return;
      }
      U(!0);
      try {
        (await onDone(b),
          await storage.delete(ws).catch(() => {}),
          ge({
            nome: b.nome.trim(),
            turma: b.turma.trim(),
            nivel: b.nivel,
            turno: b.turno,
          }));
      } catch (Be) {
        (console.error("Erro ao concluir configuração local:", Be),
          X(
            "Não foi possível salvar seu perfil. Suas respostas continuam aqui; tente novamente.",
          ));
      } finally {
        U(!1);
      }
    },
    Me = [b.tratamento, b.nome, b.turma, b.nivel, b.turno].some((Be) =>
      String(Be || "").trim(),
    ),
    tt = () => {
      (X(""),
        v > 0 ? E((Be) => Be - 1) : Me ? Ce(!0) : onBack == null || onBack());
    },
    yt = React.useRef(backSignal);
  if (
    (ReactHooks.useEffect(() => {
      backSignal !== yt.current &&
        ((yt.current = backSignal),
        pe ? onFinish == null || onFinish("inicio") : tt());
    }, [backSignal, pe]),
    !ce)
  )
    return React.createElement(
      "div",
      {
        className: "first-run-screen first-run-content guided-wizard",
        style: {
          height: "100%",
          background: colors.bg,
        },
      },
      React.createElement(LoadingState, {
        label: "Preparando sua configuração...",
      }),
    );
  if (pe) {
    const Be = pe.nome.split(" ")[0];
    return React.createElement(
      "div",
      {
        className: "first-run-screen first-run-content guided-success",
        style: {
          height: ke ? `${ke}px` : "100%",
          maxHeight: "100%",
          background: colors.bg,
        },
      },
      React.createElement(
        "main",
        {
          className: "guided-success-main",
          role: "status",
          "aria-live": "polite",
        },
        React.createElement(MotionIllustration, {
          variant: "success",
          loop: !1,
          className: "guided-success-lottie",
          label: "Cadastro concluído",
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
            className: "guided-success-eyebrow",
            style: {
              color: colors.primaryDark,
            },
          },
          "CONFIGURAÇÃO CONCLUÍDA",
        ),
        React.createElement(
          "h1",
          {
            style: {
              color: colors.dark,
            },
          },
          "Tudo pronto, ",
          Be,
          "!",
        ),
        React.createElement(
          "p",
          {
            style: {
              color: colors.gray,
            },
          },
          "Seu perfil e sua primeira turma foram criados neste aparelho.",
        ),
        React.createElement(
          "div",
          {
            className: "guided-success-summary",
            style: {
              background: colors.white,
              borderColor: colors.border,
            },
          },
          React.createElement(
            "div",
            {
              className: "guided-success-summary-icon",
              style: {
                color: colors.primaryDark,
                background: colors.primaryLight,
              },
            },
            React.createElement(to, {
              size: 23,
              "aria-hidden": "true",
            }),
          ),
          React.createElement(
            "div",
            {
              className: "guided-success-summary-copy",
            },
            React.createElement(
              "span",
              {
                style: {
                  color: colors.gray,
                },
              },
              "SUA PRIMEIRA TURMA",
            ),
            React.createElement(
              "strong",
              {
                style: {
                  color: colors.dark,
                },
              },
              pe.turma,
            ),
            React.createElement(
              "small",
              {
                style: {
                  color: colors.gray,
                },
              },
              [pe.nivel, pe.turno].filter(Boolean).join(" · "),
            ),
          ),
          React.createElement(Zr, {
            size: 20,
            color: colors.primary,
            "aria-hidden": "true",
          }),
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
            onClick: () => (onFinish == null ? void 0 : onFinish("aluno")),
          },
          "Cadastrar primeiro aluno",
        ),
        React.createElement(
          "button",
          {
            className: "guided-secondary-button press-fx touch-target",
            onClick: () => (onFinish == null ? void 0 : onFinish("inicio")),
            style: {
              color: colors.primaryDark,
              background: colors.white,
              borderColor: colors.border,
            },
          },
          "Ir para o início",
        ),
      ),
    );
  }
  return React.createElement(
    "div",
    {
      className: "first-run-screen first-run-content guided-wizard",
      style: {
        height: ke ? `${ke}px` : "100%",
        maxHeight: "100%",
        background: colors.bg,
      },
    },
    React.createElement(
      "div",
      {
        className: "guided-progress-row",
      },
      React.createElement(
        "button",
        {
          className: "guided-back press-fx touch-target",
          "aria-label": "Voltar uma etapa",
          onClick: tt,
          disabled: T,
          style: {
            color: colors.dark,
            background: colors.white,
            borderColor: colors.border,
          },
        },
        React.createElement(qo, {
          size: 21,
        }),
      ),
      React.createElement(
        "div",
        {
          className: "guided-progress",
          role: "progressbar",
          "aria-label": `Etapa ${v + 1} de ${Oe}`,
          "aria-valuemin": 1,
          "aria-valuemax": Oe,
          "aria-valuenow": v + 1,
        },
        React.createElement("span", {
          style: {
            background: colors.primary,
            transform: `scaleX(${(v + 1) / Oe})`,
          },
        }),
      ),
      React.createElement(
        "span",
        {
          className: "guided-progress-count",
          "aria-hidden": "true",
          style: {
            color: colors.gray,
          },
        },
        v + 1,
        " de ",
        Oe,
      ),
    ),
    React.createElement(
      "main",
      {
        key: v,
        className: "guided-step",
      },
      React.createElement(
        "div",
        {
          className: "guided-step-icon",
          style: {
            background: colors.primaryLight,
            borderColor: `${colors.primary}40`,
            color: colors.primaryDark,
            boxShadow: "none",
          },
          "aria-hidden": "true",
        },
        React.createElement(ze.icone, {
          size: 25,
          strokeWidth: 2.2,
        }),
      ),
      React.createElement(
        "h1",
        {
          ref: ue,
          tabIndex: -1,
          style: {
            color: colors.dark,
          },
        },
        ze.titulo,
      ),
      ze.apoio &&
        React.createElement(
          "p",
          {
            style: {
              color: colors.gray,
            },
          },
          ze.apoio,
        ),
      React.createElement(
        "div",
        {
          className: "guided-step-body",
        },
        ze.body,
      ),
    ),
    R &&
      React.createElement(
        "div",
        {
          role: "alert",
          style: {
            color: colors.red,
            fontSize: 14,
            lineHeight: 1.4,
            margin: "12px 2px",
          },
        },
        R,
      ),
    React.createElement(
      "div",
      {
        className: "guided-footer",
      },
      React.createElement(
        Button,
        {
          disabled: Le || T,
          onClick: xe,
        },
        T
          ? "Salvando..."
          : R
            ? "Tentar novamente"
            : ze.cta || (te ? "Concluir configuração" : "Continuar"),
      ),
    ),
    Se &&
      React.createElement(
        "div",
        {
          className: "modal-overlay",
          role: "presentation",
          onClick: () => Ce(!1),
        },
        React.createElement(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "titulo-sair-configuracao",
            onClick: (Be) => Be.stopPropagation(),
            style: {
              width: "calc(100% - 32px)",
              maxWidth: 360,
              background: colors.white,
              borderRadius: 20,
              padding: 18,
            },
          },
          React.createElement(
            "div",
            {
              id: "titulo-sair-configuracao",
              style: {
                fontSize: 16,
                fontWeight: 800,
                color: colors.dark,
              },
            },
            "Sair da configuração?",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
                lineHeight: 1.5,
                marginTop: 6,
              },
            },
            "Seu progresso será mantido. Você poderá continuar de onde parou.",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 8,
                marginTop: 16,
              },
            },
            React.createElement(
              "button",
              {
                className: "touch-target",
                autoFocus: !0,
                onClick: () => Ce(!1),
                style: {
                  flex: 1,
                  border: `1px solid ${colors.border}`,
                  background: colors.white,
                  borderRadius: 14,
                  color: colors.dark,
                  fontWeight: 700,
                },
              },
              "Continuar",
            ),
            React.createElement(
              "button",
              {
                className: "touch-target",
                onClick: () => {
                  (Ce(!1), onBack == null || onBack());
                },
                style: {
                  flex: 1,
                  border: "none",
                  background: colors.primary,
                  borderRadius: 14,
                  color: colors.onPrimary,
                  fontWeight: 700,
                },
              },
              "Sair",
            ),
          ),
        ),
      ),
  );
}
export { SetupWizard };
