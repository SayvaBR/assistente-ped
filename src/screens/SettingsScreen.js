// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Palette as $u } from "lucide-react";
import { Archive as Bu } from "lucide-react";
import { Card } from "../core/recovered.js";
import { User as Cs } from "lucide-react";
import { IconTile } from "../core/recovered.js";
import { CircleHelp as Jh } from "lucide-react";
import { Ju } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Ps } from "../core/recovered.js";
import { Qu } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { Info as Tp } from "lucide-react";
import { Bell as Ul } from "lucide-react";
import { Shield as Wu } from "lucide-react";
import { ChevronRight as Xt } from "lucide-react";
import { Database as Yh } from "lucide-react";
import { colors } from "../core/recovered.js";
import { ToggleRight as lg } from "lucide-react";
import React from "react";
import { ToggleLeft as sg } from "lucide-react";
import { School as to } from "lucide-react";
import { Music as zp } from "lucide-react";
import { Crown as CrownIcon } from "lucide-react";
import { LifeBuoy as LifeBuoyIcon } from "lucide-react";
import { FileText as FileTextIcon } from "lucide-react";
function SettingsScreen({
  onBack: onBack,
  goTo: goTo,
  sonsAtivados: sonsAtivados,
  setSonsAtivados: setSonsAtivados,
}) {
  const [v, E] = ReactHooks.useState(!1),
    b = ({ titulo: D, children: T }) =>
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: {
              fontSize: 12,
              fontWeight: 800,
              color: colors.gray,
              letterSpacing: 0.7,
              padding: "8px 4px 7px",
            },
          },
          D,
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
          T,
        ),
      ),
    _ = ({
      icon: D,
      titulo: T,
      sub: U,
      onClick: R,
      right: X,
      color: ce = colors.primary,
    }) =>
      React.createElement(
        Card,
        {
          onClick: R,
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 13,
          },
        },
        React.createElement(IconTile, {
          color: ce,
          Icon: D,
          size: 34,
        }),
        React.createElement(
          "div",
          {
            style: {
              flex: 1,
              minWidth: 0,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                fontWeight: 650,
                color: colors.dark,
              },
            },
            T,
          ),
          U &&
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 12,
                  color: colors.gray,
                  marginTop: 2,
                  lineHeight: 1.35,
                },
              },
              U,
            ),
        ),
        X ||
          (R
            ? React.createElement(Xt, {
                size: 16,
                color: colors.gray,
              })
            : null),
      );
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 30,
      },
    },
    React.createElement(ScreenHeader, {
      title: "Configurações",
      subtitle: "Seu aplicativo, do seu jeito",
      onBack: onBack,
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        },
      },
      React.createElement(
        b,
        {
          titulo: "PERFIL E TRABALHO",
        },
        React.createElement(_, {
          icon: Cs,
          titulo: "Editar Perfil",
          sub: "Foto e informações profissionais",
          onClick: () => goTo("perfil-professor"),
        }),
        React.createElement(_, {
          icon: to,
          titulo: "Minhas Turmas",
          sub: "Criar, editar, arquivar e trocar a turma ativa",
          onClick: () => goTo("gerenciar-turmas"),
        }),
        React.createElement(_, {
          icon: CrownIcon,
          titulo: "Seu plano",
          sub: "Compare o Gratuito e o Pro",
          onClick: () => goTo("assinatura"),
        }),
      ),
      React.createElement(
        b,
        {
          titulo: "PREFERÊNCIAS",
        },
        React.createElement(_, {
          icon: $u,
          titulo: "Aparência",
          sub: "Tema e identidade visual",
          onClick: () => goTo("tema"),
        }),
        React.createElement(_, {
          icon: zp,
          titulo: "Sons do Aplicativo",
          sub: sonsAtivados ? "Ativados" : "Desativados",
          onClick: () => setSonsAtivados(!sonsAtivados),
          right: sonsAtivados
            ? React.createElement(lg, {
                size: 26,
                color: colors.primary,
              })
            : React.createElement(sg, {
                size: 26,
                color: colors.gray,
              }),
        }),
        React.createElement(_, {
          icon: Ul,
          titulo: "Notificações",
          sub: "Lembretes locais de reuniões e tarefas",
          onClick: () => goTo("notificacoes"),
        }),
      ),
      React.createElement(
        b,
        {
          titulo: "DADOS E SEGURANÇA",
        },
        React.createElement(_, {
          icon: Yh,
          titulo: "Backup Local",
          sub: "Exporte, valide e restaure uma cópia manual",
          onClick: () => goTo("backup"),
        }),
        React.createElement(_, {
          icon: Bu,
          titulo: "Lixeira",
          sub: "Recupere alunos removidos",
          onClick: () => goTo("lixeira"),
        }),
        React.createElement(_, {
          icon: Wu,
          titulo: "Privacidade",
          sub: "Como seus dados pedagógicos são tratados",
          onClick: () => goTo("privacidade"),
        }),
      ),
      React.createElement(
        b,
        {
          titulo: "AJUDA",
        },
        React.createElement(_, {
          icon: Jh,
          titulo: "Ajuda e Tutoriais",
          sub: "Aprenda usando o próprio aplicativo",
          onClick: () => goTo("tutoriais"),
        }),
        React.createElement(_, {
          icon: LifeBuoyIcon,
          titulo: "Ajuda e feedback",
          sub: "Envie uma mensagem sem dados de alunos",
          onClick: () => goTo("ajuda-feedback"),
        }),
        React.createElement(_, {
          icon: FileTextIcon,
          titulo: "Termos e privacidade",
          sub: "Leia as informações legais do aplicativo",
          onClick: () => goTo("termos"),
        }),
      ),
      React.createElement(
        b,
        {
          titulo: "SOBRE",
        },
        React.createElement(_, {
          icon: Tp,
          titulo: "Sobre o Aplicativo",
          sub: `${Qu} · versão ${Ps}`,
          onClick: () => E(!v),
          right: React.createElement(Xt, {
            size: 16,
            color: colors.gray,
            style: {
              transform: v ? "rotate(90deg)" : "none",
            },
          }),
        }),
        v &&
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
                },
              },
              "Feito para quem ensina.",
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 14,
                  color: colors.primaryDark,
                  marginTop: 6,
                  lineHeight: 1.5,
                },
              },
              "Versão ",
              Ps,
              " (build ",
              Ju,
              ") · Desenvolvido por Sayuri Varela",
            ),
          ),
      ),
    ),
  );
}
export { SettingsScreen };
