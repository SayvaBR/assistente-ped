// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Card } from "../core/recovered.js";
import { IconTile } from "../core/recovered.js";
import { Input } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { Plus as Ts } from "lucide-react";
import { Xf } from "../data/agenda-camera.js";
import { colors } from "../core/recovered.js";
import { confirmAction } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { Trash2 as mi } from "lucide-react";
import React from "react";
import { normalizeEvent } from "../data/agenda-camera.js";
import { Calendar as pi } from "lucide-react";
import { storage } from "../core/recovered.js";
function D0({
  turmaId: turmaId,
  dataKey: dataKey,
  eventos: eventos,
  onAtualizar: onAtualizar,
  onDirtyChange: onDirtyChange,
}) {
  const [E, b] = ReactHooks.useState(!1),
    [_, D] = ReactHooks.useState(null),
    [T, U] = ReactHooks.useState({
      titulo: "",
      tipo: "reuniao",
      data: dataKey,
      hora: "",
      observacoes: "",
    }),
    [R, X] = ReactHooks.useState(""),
    [ce, J] = ReactHooks.useState(!1);
  (ReactHooks.useEffect(
    () => (
      onDirtyChange == null || onDirtyChange(E),
      () => (onDirtyChange == null ? void 0 : onDirtyChange(!1))
    ),
    [E, onDirtyChange],
  ),
    ReactHooks.useEffect(() => {
      E ||
        U((ye) => ({
          ...ye,
          data: dataKey,
        }));
    }, [dataKey, E]));
  const pe = eventos
      .filter((ye) => ye.data === dataKey)
      .sort((ye, Ee) => (ye.hora || "99:99").localeCompare(Ee.hora || "99:99")),
    ge = () => {
      (D(null),
        U({
          titulo: "",
          tipo: "reuniao",
          data: dataKey,
          hora: "",
          observacoes: "",
        }),
        X(""),
        b(!0));
    },
    ue = (ye) => {
      (D(ye),
        U({
          titulo: ye.titulo,
          tipo: ye.tipo,
          data: ye.data,
          hora: ye.hora || "",
          observacoes: ye.observacoes || "",
        }),
        X(""),
        b(!0));
    },
    Se = async () => {
      (J(!0), X(""));
      try {
        const ye = normalizeEvent(
            {
              ...T,
              id: _ == null ? void 0 : _.id,
              criadoEm: _ == null ? void 0 : _.criadoEm,
            },
            {
              id: (_ == null ? void 0 : _.id) || createId("evento"),
              turmaId: turmaId,
            },
          ),
          Ee = _
            ? eventos.map((Ie) => (Ie.id === ye.id ? ye : Ie))
            : [...eventos, ye];
        (onAtualizar(await Xf(storage, turmaId, Ee)),
          onDirtyChange == null || onDirtyChange(!1),
          b(!1),
          Rt(700));
      } catch (ye) {
        X(
          (ye == null ? void 0 : ye.message) ||
            "Não foi possível salvar o compromisso.",
        );
      } finally {
        J(!1);
      }
    },
    Ce = async (ye) => {
      (await confirmAction({
        title: "Excluir compromisso?",
        message: `“${ye.titulo}” será removido desta data.`,
        confirmLabel: "Excluir",
      })) &&
        onAtualizar(
          await Xf(
            storage,
            turmaId,
            eventos.filter((Ee) => Ee.id !== ye.id),
          ),
        );
    },
    ke = {
      reuniao: "Reunião",
      evento: "Evento escolar",
      feriado: "Feriado/recesso",
      tarefa: "Tarefa",
      lembrete: "Data importante",
    };
  return React.createElement(
    Card,
    {
      style: {
        border: `1px solid ${colors.border}`,
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
        },
      },
      React.createElement(IconTile, {
        color: colors.orange,
        Icon: pi,
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
              fontWeight: 800,
              color: colors.dark,
            },
          },
          "Compromissos",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 12,
              color: colors.gray,
            },
          },
          pe.length
            ? `${pe.length} nesta data`
            : "Reuniões, eventos e datas importantes",
        ),
      ),
      React.createElement(
        "button",
        {
          className: "touch-target",
          "aria-label": "Novo Compromisso",
          onClick: ge,
          style: {
            border: "none",
            borderRadius: 12,
            background: colors.primaryLight,
            color: colors.primary,
          },
        },
        React.createElement(Ts, {
          size: 18,
        }),
      ),
    ),
    pe.map((ye) =>
      React.createElement(
        "div",
        {
          key: ye.id,
          style: {
            display: "flex",
            gap: 9,
            alignItems: "center",
            borderTop: `1px solid ${colors.border}`,
            paddingTop: 10,
            marginTop: 10,
          },
        },
        React.createElement("div", {
          style: {
            width: 7,
            height: 36,
            borderRadius: 6,
            background: ye.tipo === "reuniao" ? colors.orange : colors.blue,
          },
        }),
        React.createElement(
          "button",
          {
            onClick: () => ue(ye),
            style: {
              flex: 1,
              textAlign: "left",
              border: "none",
              background: "none",
              padding: 0,
              color: colors.dark,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontWeight: 700,
                fontSize: 14,
              },
            },
            ye.titulo,
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                color: colors.gray,
              },
            },
            ye.hora || "Dia inteiro",
            " · ",
            ke[ye.tipo],
          ),
        ),
        React.createElement(
          "button",
          {
            className: "touch-target",
            "aria-label": `Excluir ${ye.titulo}`,
            onClick: () => Ce(ye),
            style: {
              border: "none",
              background: "none",
              color: colors.red,
            },
          },
          React.createElement(mi, {
            size: 15,
          }),
        ),
      ),
    ),
    !pe.length &&
      !E &&
      React.createElement(
        "button",
        {
          onClick: ge,
          style: {
            border: "none",
            background: "none",
            color: colors.primary,
            fontWeight: 700,
            fontSize: 14,
            padding: "12px 0 0",
          },
        },
        "+ Marcar uma data importante",
      ),
    E &&
      React.createElement(
        "div",
        {
          style: {
            borderTop: `1px solid ${colors.border}`,
            paddingTop: 12,
            marginTop: 12,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontWeight: 800,
              color: colors.dark,
              marginBottom: 8,
            },
          },
          _ ? "Editar Compromisso" : "Novo Compromisso",
        ),
        React.createElement(Input, {
          placeholder: "Título",
          value: T.titulo,
          onChange: (ye) =>
            U({
              ...T,
              titulo: ye.target.value,
            }),
        }),
        React.createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            },
          },
          React.createElement(
            "select",
            {
              "aria-label": "Tipo de compromisso",
              value: T.tipo,
              onChange: (ye) =>
                U({
                  ...T,
                  tipo: ye.target.value,
                }),
              style: {
                minHeight: 48,
                border: `1px solid ${colors.border}`,
                borderRadius: 13,
                padding: "0 10px",
                background: colors.white,
                color: colors.dark,
              },
            },
            Object.entries(ke).map(([ye, Ee]) =>
              React.createElement(
                "option",
                {
                  key: ye,
                  value: ye,
                },
                Ee,
              ),
            ),
          ),
          React.createElement(Input, {
            type: "time",
            "aria-label": "Horário opcional",
            value: T.hora,
            onChange: (ye) =>
              U({
                ...T,
                hora: ye.target.value,
              }),
          }),
        ),
        React.createElement(Input, {
          type: "date",
          "aria-label": "Data",
          value: T.data,
          onChange: (ye) =>
            U({
              ...T,
              data: ye.target.value,
            }),
        }),
        React.createElement("textarea", {
          "aria-label": "Observações do compromisso",
          placeholder: "Local ou observações (opcional)",
          value: T.observacoes,
          onChange: (ye) =>
            U({
              ...T,
              observacoes: ye.target.value,
            }),
          style: {
            width: "100%",
            boxSizing: "border-box",
            minHeight: 70,
            border: `1px solid ${colors.border}`,
            borderRadius: 13,
            padding: 11,
            background: colors.white,
            color: colors.dark,
          },
        }),
        R &&
          React.createElement(
            "div",
            {
              role: "alert",
              style: {
                color: colors.red,
                fontSize: 14,
                marginTop: 6,
              },
            },
            R,
          ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 8,
              marginTop: 9,
            },
          },
          React.createElement(
            "button",
            {
              className: "touch-target",
              onClick: () => {
                (onDirtyChange == null || onDirtyChange(!1), b(!1));
              },
              style: {
                flex: 1,
                border: `1px solid ${colors.border}`,
                borderRadius: 13,
                background: colors.white,
                color: colors.dark,
                fontWeight: 700,
              },
            },
            "Cancelar",
          ),
          React.createElement(
            "button",
            {
              className: "touch-target",
              disabled: ce,
              onClick: Se,
              style: {
                flex: 1,
                border: "none",
                borderRadius: 13,
                background: colors.primary,
                color: colors.onPrimary,
                fontWeight: 700,
              },
            },
            ce ? "Salvando..." : "Salvar",
          ),
        ),
      ),
  );
}
export { D0 };
