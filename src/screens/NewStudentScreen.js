// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { Camera as Do } from "lucide-react";
import { Input } from "../core/recovered.js";
import * as ReactHooks from "react";
import { PhotoCropper } from "../components/photo.js";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { calculateAge } from "../data/classes.js";
import { colors } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { dateKey } from "../core/recovered.js";
import { deleteMedia } from "../data/files.js";
import { formatPhone } from "../data/classes.js";
import React from "react";
import { nowISO } from "../core/recovered.js";
import { repository } from "../core/recovered.js";
import { saveMedia } from "../data/files.js";
import { validatePhone } from "../data/classes.js";
function NewStudentScreen({
  onBack: onBack,
  onConcluido: onConcluido,
  onDirtyChange: onDirtyChange,
  onSalvo: onSalvo,
  turmaId: turmaId,
}) {
  const [E, b] = ReactHooks.useState(""),
    [_, D] = ReactHooks.useState(""),
    [T, U] = ReactHooks.useState(""),
    [R, X] = ReactHooks.useState(""),
    [ce, J] = ReactHooks.useState(""),
    [pe, ge] = ReactHooks.useState(!1),
    [ue, Se] = ReactHooks.useState(!1),
    [Ce, ke] = ReactHooks.useState(""),
    ye = [colors.pink, colors.blue, colors.green, colors.orange];
  let Ee = "",
    Ie = "";
  if (_)
    try {
      Ee = calculateAge(_);
    } catch (Le) {
      Ie =
        (Le == null ? void 0 : Le.message) ||
        "Informe uma data de nascimento válida.";
    }
  let Oe = "";
  if (R)
    try {
      validatePhone(R);
    } catch (Le) {
      Oe =
        (Le == null ? void 0 : Le.message) ||
        "Informe um telefone brasileiro válido, com DDD.";
    }
  const ze = !!(E.trim() || _ || T.trim() || R.trim() || ce);
  (ReactHooks.useEffect(() => {
    onDirtyChange == null || onDirtyChange(ze);
  }, [ze, onDirtyChange]),
    ReactHooks.useEffect(
      () => () => (onDirtyChange == null ? void 0 : onDirtyChange(!1)),
      [onDirtyChange],
    ));
  const te = async () => {
    if (!E.trim() || !_) {
      ke("Informe o nome e a data de nascimento.");
      return;
    }
    if ((ke(""), Ie || Oe)) {
      ke(Ie || Oe);
      return;
    }
    Se(!0);
    try {
      const Le = createId("aluno"),
        xe = {
          id: Le,
          turmaId: turmaId || null,
          nome: E.trim(),
          dataNascimento: _ || null,
          responsavel: T.trim(),
          contato: validatePhone(R),
          cor: ye[Math.floor(Math.random() * ye.length)],
          presencas: 0,
          faltas: 0,
          criadoEm: nowISO(),
          atualizadoEm: nowISO(),
        };
      let Me = null;
      ce &&
        ((Me = await saveMedia({
          dataUrl: ce,
          tipo: "foto",
          proprietarioId: Le,
          id: "perfil",
        })),
        await repository.salvarFotoPerfil(Le, Me));
      try {
        await onSalvo(xe);
      } catch (tt) {
        throw (
          Me &&
            (await deleteMedia(Me).catch(() => {}),
            await repository.removerFotoPerfil(Le)),
          tt
        );
      }
      (Rt(700), onDirtyChange == null || onDirtyChange(!1), onConcluido());
    } catch (Le) {
      (console.error("Erro ao salvar aluno:", Le),
        ke(
          "Não foi possível salvar o aluno. Os dados continuam no formulário; tente novamente.",
        ));
    } finally {
      Se(!1);
    }
  };
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "Novo Aluno",
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
        Card,
        null,
        React.createElement(
          "button",
          {
            className: "press-fx touch-target",
            onClick: () => ge(!0),
            style: {
              width: 92,
              height: 92,
              borderRadius: "50%",
              border: `2px dashed ${colors.primary}`,
              background: ce ? `url(${ce}) center/cover` : colors.primaryLight,
              color: colors.primary,
              display: "block",
              margin: "0 auto 14px",
              fontWeight: 700,
            },
            "aria-label": ce
              ? "Alterar foto do aluno"
              : "Adicionar foto do aluno",
          },
          !ce &&
            React.createElement(
              React.Fragment,
              null,
              React.createElement(Do, {
                size: 22,
              }),
              React.createElement(
                "span",
                {
                  style: {
                    display: "block",
                    fontSize: 12,
                  },
                },
                "Foto",
              ),
            ),
        ),
        React.createElement(Input, {
          placeholder: "Nome do aluno",
          value: E,
          onChange: (Le) => b(Le.target.value),
        }),
        React.createElement(
          "label",
          {
            htmlFor: "data-nascimento-aluno",
            style: {
              display: "block",
              fontSize: 14,
              fontWeight: 650,
              color: colors.gray,
              margin: "2px 2px 6px",
            },
          },
          "Data de nascimento",
        ),
        React.createElement(Input, {
          id: "data-nascimento-aluno",
          type: "date",
          max: dateKey(),
          value: _,
          onChange: (Le) => D(Le.target.value),
          "aria-describedby": "idade-calculada-aluno",
        }),
        React.createElement(
          "div",
          {
            id: "idade-calculada-aluno",
            "aria-live": "polite",
            style: {
              minHeight: 18,
              fontSize: 12,
              color: Ie ? colors.red : Ee ? colors.primary : colors.gray,
              margin: "-4px 2px 0",
            },
          },
          Ie ||
            (Ee
              ? `Idade atual: ${Ee}`
              : "A idade será calculada automaticamente."),
        ),
      ),
      React.createElement(
        Card,
        {
          style: {
            marginTop: 10,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              fontWeight: 600,
              color: colors.gray,
              marginBottom: 8,
            },
          },
          "RESPONSÁVEL (OPCIONAL)",
        ),
        React.createElement(Input, {
          placeholder: "Nome do responsável",
          value: T,
          onChange: (Le) => U(Le.target.value),
        }),
        React.createElement(Input, {
          type: "tel",
          inputMode: "tel",
          autoComplete: "tel",
          placeholder: "Telefone com DDD",
          value: R,
          onChange: (Le) => X(formatPhone(Le.target.value)),
          maxLength: 15,
          "aria-invalid": !!Oe,
          "aria-describedby": "erro-telefone-aluno",
        }),
        React.createElement(
          "div",
          {
            id: "erro-telefone-aluno",
            "aria-live": "polite",
            style: {
              minHeight: 18,
              fontSize: 12,
              color: Oe ? colors.red : colors.gray,
              margin: "-4px 2px 0",
            },
          },
          Oe || "Ex.: (11) 98765-4321",
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 14,
          },
        },
        React.createElement(
          Button,
          {
            onClick: te,
            disabled: !E.trim() || !_ || ue,
          },
          ue ? "Salvando..." : "Salvar aluno",
        ),
      ),
      Ce &&
        React.createElement(
          "div",
          {
            role: "alert",
            style: {
              color: colors.red,
              fontSize: 14,
              lineHeight: 1.4,
              marginTop: 10,
            },
          },
          Ce,
        ),
    ),
    React.createElement(PhotoCropper, {
      open: pe,
      onClose: () => ge(!1),
      onConfirm: J,
      initialSrc: ce,
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
export { NewStudentScreen };
