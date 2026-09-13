// Hub de conta, organização e suporte. Os recursos de trabalho ficam nas abas
// Início, Planejamento, Turma e Arquivos para evitar duplicidade na navegação.
import React from "react";
import { ArchiveRestore, Bell as BellIcon, BookOpen, BriefcaseBusiness, ChevronRight, Crown, Database, FileText, GraduationCap, LifeBuoy, Palette, School, Settings, Shield, User, Users } from "lucide-react";
import { Card, IconTile, ScreenHeader, colors, Ju, Ps, Qu } from "../core/recovered.js";

function MenuRow({ icon: Icon, title, description, onClick, color = colors.primary }) {
  const content = React.createElement(
    React.Fragment,
    null,
    React.createElement(IconTile, { color, Icon, size: 34 }),
    React.createElement(
      "div",
      { style: { flex: 1, minWidth: 0 } },
      React.createElement("div", { className: "more-menu-title" }, title),
      description && React.createElement("div", { className: "more-menu-description" }, description),
    ),
    onClick && React.createElement(ChevronRight, { size: 17, color: colors.gray, "aria-hidden": "true" }),
  );

  if (!onClick) {
    return React.createElement(
      Card,
      { className: "more-menu-row", style: { display: "flex", alignItems: "center", gap: 12, padding: 13 } },
      content,
    );
  }

  return React.createElement(
    "button",
    {
      type: "button",
      className: "more-menu-row more-menu-button press-fx touch-target",
      onClick,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: 13,
        border: "1px solid color-mix(in srgb, var(--color-border) 45%, transparent)",
        borderRadius: 16,
        background: "var(--color-surface)",
        boxShadow: "var(--card-shadow)",
        color: "var(--color-text)",
        textAlign: "left",
        font: "inherit",
      },
    },
    content,
  );
}

function Section({ title, children }) {
  const id = `more-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return React.createElement(
    "section",
    { className: "more-section", "aria-labelledby": id },
    React.createElement("h2", { id, className: "more-section-title" }, title),
    children,
  );
}

/*
 * Keep the secondary destinations in one place. This makes the Mais tab a
 * reliable index: every visible item has a real route or opens an existing
 * primary tab, and the labels explain what will happen before the tap.
 */
function MoreScreen({ goTo }) {
  return React.createElement(
    "div",
    { className: "more-screen", style: { paddingBottom: 100 } },
    React.createElement(ScreenHeader, { title: "Mais", subtitle: "Recursos, conta e suporte" }),
    React.createElement(
      "div",
      { className: "more-content" },
      React.createElement(
        Card,
        { className: "more-intro-card" },
        React.createElement(IconTile, { color: colors.primary, Icon: Settings, size: 42 }),
        React.createElement("div", { className: "more-intro-copy" },
          React.createElement("strong", null, "Seu espaço de trabalho"),
          React.createElement("span", null, "Acesse rapidamente recursos de aula, dados, conta e ajuda."),
        ),
      ),

      React.createElement(Section, { title: "Recursos rápidos" },
        React.createElement("div", { className: "more-grid" },
          React.createElement(MenuRow, { icon: BriefcaseBusiness, title: "Ferramentas de sala", description: "Temporizador, cronômetro, calculadora e lanterna", onClick: () => goTo("ferramentas") }),
          React.createElement(MenuRow, { icon: GraduationCap, title: "Relatórios", description: "Frequência da turma ou de um aluno, com exportação", onClick: () => goTo("relatorios") }),
          React.createElement(MenuRow, { icon: BookOpen, title: "BNCC", description: "Consulte habilidades e objetivos da etapa ativa", onClick: () => goTo("bncc") }),
          React.createElement(MenuRow, { icon: FileText, title: "Documentos", description: "Veja documentos pedagógicos salvos no aparelho", onClick: () => goTo("documentos") }),
        ),
      ),

      React.createElement(Section, { title: "Conta" },
        React.createElement("div", { className: "more-grid" },
          React.createElement(MenuRow, { icon: User, title: "Meu perfil", description: "Informações profissionais", onClick: () => goTo("perfil-professor") }),
          React.createElement(MenuRow, { icon: Crown, title: "Seu plano", description: "Gratuito e Pro", color: colors.primary, onClick: () => goTo("assinatura") }),
        ),
      ),

      React.createElement(Section, { title: "Preferências" },
        React.createElement(MenuRow, { icon: Settings, title: "Configurações", description: "Aparência, sons, dados e preferências", onClick: () => goTo("configuracoes") }),
        React.createElement(MenuRow, { icon: Palette, title: "Aparência", description: "Claro, escuro, sistema e cor de destaque", onClick: () => goTo("tema") }),
        React.createElement(MenuRow, { icon: BellIcon, title: "Notificações", description: "Crie e cancele lembretes locais", color: colors.primary, onClick: () => goTo("notificacoes") }),
      ),

      React.createElement(Section, { title: "Organização e dados" },
        React.createElement(MenuRow, { icon: Users, title: "Minhas turmas", description: "Crie, edite, arquive e troque a turma ativa", color: colors.primary, onClick: () => goTo("gerenciar-turmas") }),
        React.createElement(MenuRow, { icon: School, title: "Escolas e anos letivos", description: "Organize seus contextos de trabalho", onClick: () => goTo("organizacao") }),
        React.createElement(MenuRow, { icon: Database, title: "Backup local", description: "Exporte, valide e restaure uma cópia", onClick: () => goTo("backup") }),
        React.createElement(MenuRow, { icon: ArchiveRestore, title: "Lixeira", description: "Recupere itens removidos", color: colors.primary, onClick: () => goTo("lixeira") }),
      ),

      React.createElement(Section, { title: "Ajuda e segurança" },
        React.createElement(MenuRow, { icon: Shield, title: "Privacidade", description: "Controle métricas e dados locais", onClick: () => goTo("privacidade") }),
        React.createElement(MenuRow, { icon: LifeBuoy, title: "Ajuda e feedback", description: "Tire dúvidas ou prepare uma mensagem", onClick: () => goTo("ajuda-feedback") }),
        React.createElement(MenuRow, { icon: BookOpen, title: "Tutoriais", description: "Aprenda usando o próprio aplicativo", onClick: () => goTo("tutoriais") }),
        React.createElement(MenuRow, { icon: FileText, title: "Termos e privacidade", description: "Informações legais do aplicativo", onClick: () => goTo("termos") }),
      ),

      React.createElement(Card, { className: "more-version-card" },
        React.createElement("div", { className: "more-version-name" }, Qu),
        React.createElement("div", { className: "more-version-meta" }, "Versão ", Ps, " · build ", Ju),
      ),
    ),
  );
}

export { MoreScreen };
