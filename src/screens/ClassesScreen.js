// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Archive as Bu } from "lucide-react";
import { Card } from "../core/recovered.js";
import { Pencil as Gl } from "lucide-react";
import { IconTile } from "../core/recovered.js";
import { Input } from "../core/recovered.js";
import * as ReactHooks from "react";
import { ScreenHeader } from "../core/recovered.js";
import { Plus as Ts } from "lucide-react";
import { colors } from "../core/recovered.js";
import { confirmAction } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { mh } from "../data/classes.js";
import React from "react";
import { normalizeClass } from "../data/classes.js";
import { saveClasses } from "../data/classes.js";
import { storage } from "../core/recovered.js";
import { School as to } from "lucide-react";
function ClassesScreen({
  onBack: onBack,
  turmas: turmas,
  turmaAtiva: turmaAtiva,
  onAtualizar: onAtualizar,
  onAtivar: onAtivar,
  onDirtyChange: onDirtyChange,
}) {
  const [b, _] = ReactHooks.useState(null),
    [D, T] = ReactHooks.useState(""),
    [U, R] = ReactHooks.useState(!1);
  ReactHooks.useEffect(
    () => (
      onDirtyChange == null || onDirtyChange(!!b),
      () => (onDirtyChange == null ? void 0 : onDirtyChange(!1))
    ),
    [b, onDirtyChange],
  );
  const X = async () => {
      (R(!0), T(""));
      try {
        const J = normalizeClass(b, {
            id: b.id || createId("turma"),
            professorId: turmaAtiva == null ? void 0 : turmaAtiva.professorId,
          }),
          pe = b.id
            ? turmas.map((ge) => (ge.id === J.id ? J : ge))
            : [...turmas, J];
        (onAtualizar(
          await saveClasses(
            storage,
            pe,
            (turmaAtiva == null ? void 0 : turmaAtiva.id) || J.id,
          ),
        ),
          _(null));
      } catch (J) {
        T(
          (J == null ? void 0 : J.message) ||
            "Não foi possível salvar a turma.",
        );
      } finally {
        R(!1);
      }
    },
    ce = async (J) => {
      if (
        await confirmAction({
          title: "Arquivar turma?",
          message: `“${J.nome}” deixará de aparecer entre as turmas ativas. Os registros continuarão guardados.`,
          confirmLabel: "Arquivar",
          destructive: !1,
        })
      )
        try {
          onAtualizar(
            await mh(
              storage,
              turmas,
              J.id,
              turmaAtiva == null ? void 0 : turmaAtiva.id,
            ),
          );
        } catch (pe) {
          T(
            (pe == null ? void 0 : pe.message) ||
              "Não foi possível arquivar a turma.",
          );
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
      title: "Minhas turmas",
      subtitle: "Separe alunos e registros por turma",
      onBack: onBack,
      action: React.createElement(
        "button",
        {
          className: "touch-target",
          "aria-label": "Criar turma",
          onClick: () =>
            _({
              nome: "",
              nivel: "",
              turno: "",
            }),
          style: {
            border: "none",
            borderRadius: 14,
            background: colors.primaryLight,
            color: colors.primary,
          },
        },
        React.createElement(Ts, {
          size: 20,
        }),
      ),
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
      D &&
        React.createElement(
          "div",
          {
            role: "alert",
            style: {
              color: colors.red,
              fontSize: 14,
            },
          },
          D,
        ),
      b &&
        React.createElement(
          Card,
          null,
          React.createElement(
            "div",
            {
              style: {
                fontWeight: 800,
                color: colors.dark,
                marginBottom: 10,
              },
            },
            b.id ? "Editar Turma" : "Nova Turma",
          ),
          React.createElement(Input, {
            placeholder: "Nome da turma",
            value: b.nome,
            onChange: (J) =>
              _({
                ...b,
                nome: J.target.value,
              }),
          }),
          React.createElement(Input, {
            placeholder: "Nível, série ou ano",
            value: b.nivel,
            onChange: (J) =>
              _({
                ...b,
                nivel: J.target.value,
              }),
          }),
          React.createElement(
            "select",
            {
              "aria-label": "Turno",
              value: b.turno,
              onChange: (J) =>
                _({
                  ...b,
                  turno: J.target.value,
                }),
              style: {
                width: "100%",
                minHeight: 48,
                border: `1px solid ${colors.border}`,
                borderRadius: 13,
                padding: "0 12px",
                background: colors.white,
                color: colors.dark,
              },
            },
            React.createElement(
              "option",
              {
                value: "",
              },
              "Escolha o turno",
            ),
            React.createElement("option", null, "Manhã"),
            React.createElement("option", null, "Tarde"),
            React.createElement("option", null, "Noite"),
            React.createElement("option", null, "Integral"),
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 8,
                marginTop: 10,
              },
            },
            React.createElement(
              "button",
              {
                className: "touch-target",
                onClick: () => _(null),
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
                disabled: U,
                onClick: X,
                style: {
                  flex: 1,
                  border: "none",
                  borderRadius: 13,
                  background: colors.primary,
                  color: colors.onPrimary,
                  fontWeight: 700,
                },
              },
              U ? "Salvando..." : "Salvar",
            ),
          ),
        ),
      turmas
        .filter((J) => !J.arquivadaEm)
        .map((J) =>
          React.createElement(
            Card,
            {
              key: J.id,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 11,
                border:
                  J.id === (turmaAtiva == null ? void 0 : turmaAtiva.id)
                    ? `1.5px solid ${colors.primary}`
                    : "none",
              },
            },
            React.createElement(IconTile, {
              color: colors.primary,
              Icon: to,
            }),
            React.createElement(
              "button",
              {
                onClick: () =>
                  J.id !== (turmaAtiva == null ? void 0 : turmaAtiva.id) &&
                  onAtivar(J.id),
                style: {
                  flex: 1,
                  textAlign: "left",
                  border: "none",
                  background: "none",
                  padding: 0,
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
                J.nome,
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 12,
                    color: colors.gray,
                  },
                },
                J.nivel,
                " · ",
                J.turno,
                J.id === (turmaAtiva == null ? void 0 : turmaAtiva.id)
                  ? " · ativa"
                  : "",
              ),
            ),
            React.createElement(
              "button",
              {
                className: "touch-target",
                "aria-label": `Editar ${J.nome}`,
                onClick: () =>
                  _({
                    ...J,
                  }),
                style: {
                  border: "none",
                  background: "none",
                  color: colors.primary,
                },
              },
              React.createElement(Gl, {
                size: 16,
              }),
            ),
            React.createElement(
              "button",
              {
                className: "touch-target",
                "aria-label": `Arquivar ${J.nome}`,
                onClick: () => ce(J),
                style: {
                  border: "none",
                  background: "none",
                  color: colors.gray,
                },
              },
              React.createElement(Bu, {
                size: 16,
              }),
            ),
          ),
        ),
    ),
  );
}
export { ClassesScreen };
