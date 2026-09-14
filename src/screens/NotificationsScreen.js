// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { confirmAction, ErrorState, LoadingState, SuccessState } from "../core/recovered.js";
import { Fh } from "../data/notifications.js";
import { Input } from "../core/recovered.js";
import { Mh } from "../data/notifications.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { Bell as Ul } from "lucide-react";
import { colors } from "../core/recovered.js";
import { dateKey } from "../core/recovered.js";
import { Trash2 as mi } from "lucide-react";
import React from "react";
import { zh } from "../data/notifications.js";
function NotificationsScreen({ onBack: onBack, onDirtyChange: onDirtyChange }) {
  const [f, y] = ReactHooks.useState([]),
    [v, E] = ReactHooks.useState(""),
    [b, _] = ReactHooks.useState(""),
    [D, T] = ReactHooks.useState(""),
    [U, R] = ReactHooks.useState(""),
    [X, ce] = ReactHooks.useState(""),
    [J, pe] = ReactHooks.useState(!1),
    [Le, xe] = ReactHooks.useState(!0),
    [Me, tt] = ReactHooks.useState(""),
    [yt, Be] = ReactHooks.useState(""),
    [dt, me] = ReactHooks.useState("");
  ReactHooks.useEffect(
    () => (
      onDirtyChange == null || onDirtyChange(!!(v || b || D || U)),
      () => (onDirtyChange == null ? void 0 : onDirtyChange(!1))
    ),
    [v, b, D, U, onDirtyChange],
  );
  const ge = async () => {
    xe(!0);
    tt("");
    try {
      y(await Mh());
    } catch (O) {
      y([]);
      tt(O?.message || "Não foi possível carregar os lembretes locais.");
    } finally {
      xe(!1);
    }
  };
  ReactHooks.useEffect(() => {
    ge();
  }, []);
  const ue = async () => {
      (pe(!0), ce(""));
      try {
        (await zh({
          titulo: v,
          mensagem: b,
          quando: new Date(`${D}T${U}:00`),
        }),
          E(""),
          _(""),
          T(""),
          R(""),
          Be("Lembrete criado neste aparelho."),
          await ge(),
          Rt(700));
      } catch (Ce) {
        ce(
          (Ce == null ? void 0 : Ce.message) ||
            "Não foi possível criar o lembrete.",
        );
      } finally {
        pe(!1);
      }
    },
    Se = async (Ce) => {
      if (!(await confirmAction({
        title: "Cancelar lembrete?",
        message: `O lembrete “${Ce.title}” não será mais enviado.`,
        confirmLabel: "Cancelar lembrete",
        destructive: true,
      }))) return;
      me(String(Ce.id));
      ce("");
      try {
        await Fh(Ce.id);
        Be("Lembrete cancelado.");
        await ge();
      } catch (O) {
        ce(O?.message || "Não foi possível cancelar o lembrete.");
      } finally {
        me("");
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
      title: "Lembretes",
      subtitle: "Notificações locais no horário escolhido",
      onBack: onBack,
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        },
      },
      Me && React.createElement(ErrorState, { message: Me, onRetry: ge }),
      yt && React.createElement(SuccessState, { message: yt }),
      Le && React.createElement(LoadingState, { label: "Carregando lembretes…" }),
      React.createElement(
        Card,
        null,
        React.createElement(Input, {
          placeholder: "Título do lembrete",
          value: v,
          onChange: (Ce) => E(Ce.target.value),
        }),
        React.createElement(Input, {
          placeholder: "Mensagem (opcional)",
          value: b,
          onChange: (Ce) => _(Ce.target.value),
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
          React.createElement(Input, {
            type: "date",
            "aria-label": "Data do lembrete",
            min: dateKey(),
            value: D,
            onChange: (Ce) => T(Ce.target.value),
          }),
          React.createElement(Input, {
            type: "time",
            "aria-label": "Horário do lembrete",
            value: U,
            onChange: (Ce) => R(Ce.target.value),
          }),
        ),
        X &&
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
            X,
          ),
        React.createElement(
          Button,
          {
            disabled: J || !v.trim() || !D || !U,
            onClick: ue,
          },
          J ? "Agendando..." : "Criar lembrete",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 12,
              color: colors.gray,
              marginTop: 8,
            },
          },
          "A permissão será solicitada somente ao criar o primeiro lembrete.",
        ),
      ),
      !Le && !Me && !f.length &&
        React.createElement(
          Card,
          {
            style: {
              textAlign: "center",
              color: colors.gray,
            },
          },
          "Nenhum lembrete pendente.",
        ),
      f.map((Ce) => {
        var ke;
        return React.createElement(
          Card,
          {
            key: Ce.id,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
            },
          },
          React.createElement(Ul, {
            size: 20,
            color: colors.primary,
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
                  fontWeight: 750,
                  color: colors.dark,
                },
              },
              Ce.title,
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 12,
                  color: colors.gray,
                },
              },
              (ke = Ce.schedule) != null && ke.at
                ? new Date(Ce.schedule.at).toLocaleString("pt-BR")
                : "Horário programado",
            ),
          ),
          React.createElement(
            "button",
            {
              className: "touch-target press-fx",
              "aria-label": `Cancelar ${Ce.title}`,
              onClick: () => Se(Ce),
              disabled: dt === String(Ce.id),
              style: {
                border: "none",
                background: "transparent",
                color: colors.red,
                opacity: dt === String(Ce.id) ? 0.5 : 1,
              },
            },
            React.createElement(mi, {
              size: 16,
            }),
          ),
        );
      }),
    ),
  );
}
export { NotificationsScreen };
