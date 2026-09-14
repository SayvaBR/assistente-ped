import { capabilitiesFor } from "../domain/education";
// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { $0 } from "../screens/$0.js";
import { Avatar } from "../core/recovered.js";
import { B0 } from "../screens/B0.js";
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { Chip } from "../core/recovered.js";
import { EmptyState } from "../core/recovered.js";
import { H0 } from "../screens/H0.js";
import { LoadingState } from "../core/recovered.js";
import * as ReactHooks from "react";
import { No } from "../core/recovered.js";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { U0 } from "../screens/U0.js";
import { UserPlus as Vo } from "lucide-react";
import { ChevronRight as Xt } from "lucide-react";
import { colors } from "../core/recovered.js";
import React from "react";
import { Search as ro } from "lucide-react";
import { ClipboardList as ClipboardListIcon } from "lucide-react";
import { FileSpreadsheet as FileSpreadsheetIcon } from "lucide-react";
import { UserRoundPlus as UserRoundPlusIcon } from "lucide-react";
import { Settings2 as Settings2Icon } from "lucide-react";
import { BookOpen as BookOpenIcon } from "lucide-react";
function ClassScreen({
  goTo: goTo,
  alunos: alunos,
  carregando: carregando,
  turma: turma,
  onRenomear: onRenomear,
  onExcluir: onExcluir,
  aba: aba,
  setAba: setAba,
  dataKey: dataKey,
  setDataKey: setDataKey,
  pulso: pulso,
}) {
  const [R, X] = ReactHooks.useState(null),
    [studentQuery, setStudentQuery] = ReactHooks.useState(""),
    [ce, J] = ReactHooks.useState(1),
    pe = React.useRef(null),
    ge = (ke) => {
      if (ke === aba) return;
      const ye = No.indexOf(aba),
        Ee = No.indexOf(ke);
      (J(Ee > ye ? 1 : -1), setAba(ke));
    },
    ue = (ke) => {
      (setDataKey(ke), ge("dia"));
    },
    Se = (ke) => {
      pe.current = ke.touches[0].clientX;
    },
    Ce = (ke) => {
      if (pe.current == null) return;
      const ye = ke.changedTouches[0].clientX - pe.current;
      if (((pe.current = null), Math.abs(ye) < 55)) return;
      const Ee = No.indexOf(aba);
      (ye < 0 && Ee < No.length - 1 && (J(1), setAba(No[Ee + 1]), Rt(620)),
        ye > 0 && Ee > 0 && (J(-1), setAba(No[Ee - 1]), Rt(620)));
    };
  const visibleAlunos = alunos.filter((aluno) =>
    String(aluno.nome || "")
      .toLocaleLowerCase()
      .includes(studentQuery.trim().toLocaleLowerCase()),
  );
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 100,
      },
    },
    React.createElement(ScreenHeader, {
      title: (turma == null ? void 0 : turma.nome) || "Sala de Aula",
      subtitle:
        turma != null && turma.nivel
          ? `${turma.nivel}${turma.turno ? " · " + turma.turno : ""}`
          : "Sua turma",
    }),
    React.createElement(
      "div",
      {
        style: {
          padding: 16,
          overflow: "hidden",
        },
        onTouchStart: Se,
        onTouchEnd: Ce,
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 12,
          },
        },
        React.createElement(Chip, {
          label: "Dia",
          active: aba === "dia",
          onClick: () => ge("dia"),
        }),
        React.createElement(Chip, {
          label: "Alunos",
          active: aba === "criancas",
          onClick: () => ge("criancas"),
        }),
        React.createElement(Chip, {
          label: "Registros",
          active: aba === "registros",
          onClick: () => ge("registros"),
        }),
        React.createElement(Chip, {
          label: "Histórico",
          active: aba === "historico",
          onClick: () => ge("historico"),
        }),
        React.createElement(Chip, {
          label: "Gestão",
          active: aba === "gestao",
          onClick: () => ge("gestao"),
        }),
      ),
      React.createElement(
        "div",
        {
          key: aba,
          className: ce > 0 ? "aba-slide-next" : "aba-slide-prev",
        },
        carregando &&
          React.createElement(LoadingState, {
            label: "Carregando turma...",
          }),
        !carregando &&
          aba === "gestao" &&
          React.createElement(
            "div",
            { className: "module-content class-management" },
            React.createElement(
              "div",
              { className: "class-management-heading" },
              React.createElement("h2", null, "Gestão da turma"),
              React.createElement(
                "p",
                { className: "helper-text" },
                "Cadastros, notas e relatórios ficam organizados aqui.",
              ),
            ),
            capabilitiesFor(turma).needsStage &&
              React.createElement(
                "div",
                { className: "notice" },
                React.createElement(
                  "strong",
                  null,
                  "Complete a configuração da turma",
                ),
                React.createElement(
                  "p",
                  { className: "helper-text" },
                  "Escolha a etapa de ensino para ajustar os recursos. Seus registros serão preservados.",
                ),
                React.createElement(
                  "button",
                  {
                    className: "text-button",
                    type: "button",
                    onClick: () => goTo("gerenciar-turmas"),
                  },
                  React.createElement(Settings2Icon, {
                    size: 18,
                    "aria-hidden": "true",
                  }),
                  " Configurar turma",
                ),
              ),
            React.createElement(
              "div",
              { className: "management-grid" },
              React.createElement(
                "button",
                {
                  className: "menu-card",
                  type: "button",
                  onClick: () => goTo("importar-alunos"),
                },
                React.createElement(
                  "span",
                  { className: "menu-icon" },
                  React.createElement(UserRoundPlusIcon, {
                    size: 24,
                    "aria-hidden": "true",
                  }),
                ),
                React.createElement(
                  "span",
                  null,
                  React.createElement("strong", null, "Importar alunos"),
                  React.createElement(
                    "small",
                    null,
                    "Adicione vários alunos por lista ou arquivo.",
                  ),
                ),
                React.createElement(Xt, { size: 20, "aria-hidden": "true" }),
              ),
              capabilitiesFor(turma).notas &&
                React.createElement(
                  "button",
                  {
                    className: "menu-card",
                    type: "button",
                    onClick: () => goTo("academico"),
                  },
                  React.createElement(
                    "span",
                    { className: "menu-icon" },
                    React.createElement(FileSpreadsheetIcon, {
                      size: 24,
                      "aria-hidden": "true",
                    }),
                  ),
                  React.createElement(
                    "span",
                    null,
                    React.createElement("strong", null, "Notas e avaliações"),
                    React.createElement(
                      "small",
                      null,
                      "Lance resultados e acompanhe o desempenho.",
                    ),
                  ),
                  React.createElement(Xt, { size: 20, "aria-hidden": "true" }),
                ),
              React.createElement(
                "button",
                {
                  className: "menu-card",
                  type: "button",
                  onClick: () => goTo("relatorios"),
                },
                React.createElement(
                  "span",
                  { className: "menu-icon" },
                  React.createElement(ClipboardListIcon, {
                    size: 24,
                    "aria-hidden": "true",
                  }),
                ),
                React.createElement(
                  "span",
                  null,
                  React.createElement("strong", null, "Relatórios"),
                  React.createElement(
                    "small",
                    null,
                    "Consulte frequência, registros e resultados.",
                  ),
                ),
                React.createElement(Xt, { size: 20, "aria-hidden": "true" }),
              ),
              React.createElement(
                "button",
                {
                  className: "menu-card",
                  type: "button",
                  onClick: () => goTo("caderno"),
                },
                React.createElement(
                  "span",
                  { className: "menu-icon" },
                  React.createElement(BookOpenIcon, {
                    size: 24,
                    "aria-hidden": "true",
                  }),
                ),
                React.createElement(
                  "span",
                  null,
                  React.createElement("strong", null, "Caderno pedagógico"),
                  React.createElement(
                    "small",
                    null,
                    "Notas, tarefas e observações vinculadas à turma.",
                  ),
                ),
                React.createElement(Xt, { size: 20, "aria-hidden": "true" }),
              ),
              React.createElement(
                "button",
                {
                  className: "menu-card",
                  type: "button",
                  onClick: () => goTo("sequencias"),
                },
                React.createElement(
                  "span",
                  { className: "menu-icon" },
                  React.createElement(BookOpenIcon, {
                    size: 24,
                    "aria-hidden": "true",
                  }),
                ),
                React.createElement(
                  "span",
                  null,
                  React.createElement("strong", null, "Sequências didáticas"),
                  React.createElement(
                    "small",
                    null,
                    "Organize aulas em uma progressão e acompanhe o avanço.",
                  ),
                ),
                React.createElement(Xt, { size: 20, "aria-hidden": "true" }),
              ),
            ),
          ),
        !carregando &&
          aba === "dia" &&
          React.createElement(U0, {
            turma: turma,
            alunos: alunos,
            goTo: goTo,
            dataKey: dataKey,
            setDataKey: setDataKey,
            pulso: pulso,
          }),
        !carregando &&
          aba === "criancas" &&
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 10,
              },
            },
            alunos.length === 0
              ? React.createElement(EmptyState, {
                  icon: Vo,
                  title: "Nenhum aluno cadastrado",
                  description:
                    "Adicione o primeiro aluno para começar os registros da turma.",
                  actionLabel: "Adicionar primeiro aluno",
                  onAction: () => goTo("novo-aluno"),
                })
              : React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(
                    Button,
                    {
                      onClick: () => goTo("novo-aluno"),
                    },
                    React.createElement(
                      "span",
                      {
                        style: {
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        },
                      },
                      React.createElement(Vo, {
                        size: 19,
                        "aria-hidden": "true",
                      }),
                      "Adicionar Aluno",
                    ),
                  ),
                  React.createElement(
                    "label",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: colors.white,
                        borderRadius: 14,
                        padding: "10px 12px",
                      },
                    },
                    React.createElement(ro, {
                      size: 16,
                      color: colors.gray,
                      "aria-hidden": "true",
                    }),
                    React.createElement("input", {
                      type: "search",
                      value: studentQuery,
                      onChange: (event) => setStudentQuery(event.target.value),
                      placeholder: "Buscar aluno",
                      "aria-label": "Buscar aluno na turma",
                      style: {
                        flex: 1,
                        minWidth: 0,
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        color: colors.dark,
                        font: "inherit",
                      },
                    }),
                  ),
                  visibleAlunos.length === 0
                    ? React.createElement(EmptyState, {
                        compact: !0,
                        icon: ro,
                        title: "Nenhum aluno encontrado",
                        description: "Tente buscar por outro nome.",
                        onAction: () => setStudentQuery(""),
                      })
                    : visibleAlunos.map((ke) =>
                        React.createElement(B0, {
                          key: ke.id,
                          aluno: ke,
                          onAbrir: (ye) => goTo("perfil", ye),
                          onLongPress: (ye) => {
                            (Rt(680), X(ye));
                          },
                        }),
                      ),
                ),
          ),
        !carregando &&
          aba === "registros" &&
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 10,
              },
            },
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
                "Registros da turma",
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 14,
                    color: colors.primaryDark,
                    marginTop: 4,
                    lineHeight: 1.45,
                  },
                },
                "Os registros pertencem ao histórico de cada aluno. Escolha um aluno para registrar uma observação pedagógica.",
              ),
            ),
            React.createElement(
              Button,
              {
                onClick: () => goTo("registro-rapido"),
              },
              "+ Novo registro",
            ),
            alunos.map((ke) =>
              React.createElement(
                Card,
                {
                  key: ke.id,
                  onClick: () => goTo("perfil", ke),
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  },
                },
                React.createElement(Avatar, {
                  nome: ke.nome,
                  cor: ke.cor,
                }),
                React.createElement(
                  "div",
                  {
                    style: {
                      flex: 1,
                      fontSize: 14,
                      fontWeight: 650,
                      color: colors.dark,
                    },
                  },
                  ke.nome,
                ),
                React.createElement(Xt, {
                  size: 16,
                  color: colors.gray,
                }),
              ),
            ),
          ),
        !carregando &&
          aba === "historico" &&
          React.createElement(H0, {
            alunos: alunos,
            goTo: goTo,
            onAbrirDia: ue,
            dataKey: dataKey,
          }),
      ),
    ),
    R &&
      React.createElement($0, {
        aluno: R,
        onClose: () => X(null),
        onRenomear: onRenomear,
        onExcluir: onExcluir,
      }),
  );
}
export { ClassScreen };
