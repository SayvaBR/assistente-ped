// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { Camera as Do } from "lucide-react";
import { Input } from "../core/recovered.js";
import * as ReactHooks from "react";
import { PhotoCropper } from "../components/photo.js";
import { ScreenHeader } from "../core/recovered.js";
import { Ss } from "../data/files.js";
import { colors } from "../core/recovered.js";
import { deleteMedia } from "../data/files.js";
import { Capacitor as ka } from "@capacitor/core";
import React from "react";
import { nowISO } from "../core/recovered.js";
import { saveMedia } from "../data/files.js";
function TeacherProfileScreen({
  onBack: onBack,
  onConcluido: onConcluido,
  perfil: perfil,
  onSalvar: onSalvar,
  onDirtyChange: onDirtyChange,
}) {
  const [E, b] = ReactHooks.useState({
      ...perfil,
    }),
    [_, D] = ReactHooks.useState(!1),
    [T, U] = ReactHooks.useState(""),
    [R, X] = ReactHooks.useState(!1),
    ce = React.useRef(JSON.stringify(perfil || {}));
  ReactHooks.useEffect(
    () => (
      onDirtyChange == null || onDirtyChange(JSON.stringify(E) !== ce.current),
      () => (onDirtyChange == null ? void 0 : onDirtyChange(!1))
    ),
    [E, onDirtyChange],
  );
  const J =
      typeof E.foto == "string"
        ? E.foto
        : Ss(E.foto, {
            convertFileSrc: ka.convertFileSrc,
          }),
    pe = async (ue) => {
      b((Se) => ({
        ...Se,
        foto: ue,
      }));
    },
    ge = async () => {
      var Se, Ce, ke, ye;
      if (!((Se = E.nome) != null && Se.trim())) return U("Informe seu nome.");
      (X(!0), U(""));
      let ue = null;
      try {
        const Ee = perfil.foto;
        typeof E.foto == "string" &&
          E.foto.startsWith("data:") &&
          (ue = await saveMedia({
            dataUrl: E.foto,
            tipo: "foto",
            proprietarioId: perfil.id,
            id: "professor",
          }));
        const Ie = {
          ...perfil,
          ...E,
          foto: ue || E.foto,
          nome: E.nome.trim(),
          escola: ((Ce = E.escola) == null ? void 0 : Ce.trim()) || "",
          cidade: ((ke = E.cidade) == null ? void 0 : ke.trim()) || "",
          uf: E.uf || "",
          atualizadoEm: nowISO(),
        };
        (await onSalvar(Ie),
          Ee &&
            typeof Ee == "object" &&
            ((ye = Ie.foto) == null ? void 0 : ye.path) !== Ee.path &&
            (await deleteMedia(Ee).catch(() => {})),
          onDirtyChange == null || onDirtyChange(!1),
          onConcluido == null || onConcluido());
      } catch {
        (ue && (await deleteMedia(ue).catch(() => {})),
          U(
            "Não foi possível salvar o perfil. Seus dados continuam nesta tela.",
          ));
      } finally {
        X(!1);
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
      title: "Editar perfil",
      subtitle: "Informações usadas no trabalho pedagógico",
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
            onClick: () => D(!0),
            "aria-label": "Alterar e enquadrar foto do perfil",
            style: {
              display: "block",
              width: 100,
              height: 100,
              margin: "0 auto 14px",
              borderRadius: "50%",
              border: `2px dashed ${colors.primary}`,
              background: J ? `url(${J}) center/cover` : colors.primaryLight,
              color: colors.primary,
            },
          },
          !J && React.createElement(Do, null),
        ),
        React.createElement(
          "label",
          {
            style: {
              fontSize: 14,
              color: colors.gray,
            },
          },
          "Tratamento",
        ),
        React.createElement(
          "select",
          {
            value: E.tratamento || "",
            onChange: (ue) =>
              b({
                ...E,
                tratamento: ue.target.value,
              }),
            style: {
              width: "100%",
              minHeight: 48,
              border: `1px solid ${colors.border}`,
              borderRadius: 13,
              padding: "0 12px",
              background: colors.white,
              color: colors.dark,
              margin: "5px 0 10px",
            },
          },
          React.createElement(
            "option",
            {
              value: "",
            },
            "Sem preferência",
          ),
          React.createElement(
            "option",
            {
              value: "professora",
            },
            "Professora",
          ),
          React.createElement(
            "option",
            {
              value: "professor",
            },
            "Professor",
          ),
          React.createElement(
            "option",
            {
              value: "docente",
            },
            "Docente",
          ),
        ),
        React.createElement(Input, {
          placeholder: "Nome",
          value: E.nome || "",
          onChange: (ue) =>
            b({
              ...E,
              nome: ue.target.value,
            }),
        }),
        React.createElement(Input, {
          placeholder: "Escola",
          value: E.escola || "",
          onChange: (ue) =>
            b({
              ...E,
              escola: ue.target.value,
            }),
        }),
        React.createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 88px",
              gap: 8,
            },
          },
          React.createElement(Input, {
            placeholder: "Cidade",
            value: E.cidade || "",
            onChange: (ue) =>
              b({
                ...E,
                cidade: ue.target.value,
              }),
          }),
          React.createElement(Input, {
            placeholder: "UF",
            maxLength: 2,
            value: E.uf || "",
            onChange: (ue) =>
              b({
                ...E,
                uf: ue.target.value.toUpperCase(),
              }),
          }),
        ),
        React.createElement(Input, {
          placeholder: "Etapa de ensino",
          value: E.etapaEnsino || "",
          onChange: (ue) =>
            b({
              ...E,
              etapaEnsino: ue.target.value,
            }),
        }),
        T &&
          React.createElement(
            "div",
            {
              role: "alert",
              style: {
                color: colors.red,
                fontSize: 14,
                marginBottom: 8,
              },
            },
            T,
          ),
        React.createElement(
          Button,
          {
            onClick: ge,
            disabled: R,
          },
          R ? "Salvando..." : "Salvar perfil",
        ),
      ),
    ),
    React.createElement(PhotoCropper, {
      open: _,
      onClose: () => D(!1),
      onConfirm: pe,
      initialSrc: J,
      title: "Enquadrar foto do perfil",
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
export { TeacherProfileScreen };
