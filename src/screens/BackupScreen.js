// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { FileText as Bn } from "lucide-react";
import { Button } from "../core/recovered.js";
import { Card } from "../core/recovered.js";
import { ErrorState } from "../core/recovered.js";
import { Input } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Ps } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { SuccessState } from "../core/recovered.js";
import { Share as Uf } from "@capacitor/share";
import { clearData } from "../data/backup.js";
import { colors } from "../core/recovered.js";
import { createBackup } from "../data/backup.js";
import { dateKey } from "../core/recovered.js";
import { Filesystem as hn } from "@capacitor/filesystem";
import { Directory as jn } from "@capacitor/filesystem";
import { Capacitor as ka } from "@capacitor/core";
import React from "react";
import { parseBackup } from "../data/backup.js";
import { restoreBackup } from "../data/backup.js";
import { serializeBackup } from "../data/backup.js";
import { storage } from "../core/recovered.js";
import { Encoding as wu } from "@capacitor/filesystem";
import { decryptBackup, encryptBackup, isEncryptedBackup } from "../data/secureBackup";
function BackupScreen({ onBack: onBack }) {
  const [u, f] = ReactHooks.useState(!1),
    [y, v] = ReactHooks.useState(""),
    [E, b] = ReactHooks.useState(""),
    [_, D] = ReactHooks.useState(null),
    [T, U] = ReactHooks.useState(!1),
    [R, X] = ReactHooks.useState(""),
    [backupPassword, setBackupPassword] = ReactHooks.useState(""),
    [pendingEncryptedBackup, setPendingEncryptedBackup] = ReactHooks.useState(""),
    ce = async () => {
      var ue;
      if (backupPassword.length < 8) {
        b("Crie uma senha com pelo menos 8 caracteres para proteger o backup.");
        return;
      }
      (f(!0), b(""), v(""));
      try {
        const Se = await createBackup(storage, {
            appVersion: Ps,
            filesystem: hn,
            directory: jn.Data,
          }),
          Ce = await encryptBackup(serializeBackup(Se), backupPassword),
          ke = `assistente-pedagogico-backup-${dateKey()}.json`;
        let ye = "";
        if (ka.isNativePlatform()) {
          if (!(await Uf.canShare()).value)
            throw new Error(
              "O compartilhamento de arquivos não está disponível neste aparelho.",
            );
          const Ie = await hn.writeFile({
            path: ke,
            data: Ce,
            directory: jn.Cache,
            encoding: wu.UTF8,
          });
          ye = (
            await Uf.share({
              title: "Backup do Assistente Pedagógico",
              text: "Cópia manual dos dados locais do aplicativo.",
              files: [Ie.uri],
              dialogTitle: "Salvar ou compartilhar backup",
            })
            ).activityType
            ? `Backup protegido enviado com ${Se.registros.length} registro(s) e ${Se.arquivos.length} arquivo(s). Confirme que foi salvo em local seguro.`
            : "O arquivo foi preparado no menu de compartilhamento, mas o Android não confirmou o destino. Verifique se a cópia foi realmente salva antes de depender deste backup.";
        } else {
          const Ee = new File([Ce], ke, {
            type: "application/json",
          });
          if (
            navigator.share &&
            (ue = navigator.canShare) != null &&
            ue.call(navigator, {
              files: [Ee],
            })
          ) {
            try {
              await navigator.share({
                title: "Backup do Assistente Pedagógico",
                files: [Ee],
              });
            } catch (Ie) {
              if ((Ie == null ? void 0 : Ie.name) === "AbortError") return;
              throw Ie;
            }
            ye = `Backup protegido enviado com ${Se.registros.length} registro(s) e ${Se.arquivos.length} arquivo(s). Confirme que foi salvo em local seguro.`;
          } else {
            const Ie = URL.createObjectURL(Ee),
              Oe = document.createElement("a");
            ((Oe.href = Ie),
              (Oe.download = ke),
              Oe.click(),
              setTimeout(() => URL.revokeObjectURL(Ie), 1e3),
              (ye = `Backup protegido baixado com ${Se.registros.length} registro(s) e ${Se.arquivos.length} arquivo(s). Confirme que apareceu na pasta de downloads.`));
          }
        }
        (v(ye), setBackupPassword(""));
      } catch (Se) {
        (console.error("Erro ao exportar backup:", Se),
          b("Não foi possível criar o backup. Tente novamente."));
      } finally {
        f(!1);
      }
    },
    J = async (ue) => {
      var Ce;
      const Se = (Ce = ue.target.files) == null ? void 0 : Ce[0];
      if (((ue.target.value = ""), !!Se)) {
        (b(""), v(""));
        try {
          if (Se.size > 105 * 1024 * 1024)
            throw new Error("Arquivo muito grande.");
          const raw = await Se.text();
          if (isEncryptedBackup(raw)) {
            (setPendingEncryptedBackup(raw), D(null), v("Backup protegido encontrado. Digite a senha para desbloqueá-lo."));
          } else {
            const ke = parseBackup(raw);
            (setPendingEncryptedBackup(""), setBackupPassword(""), D(ke));
          }
        } catch (ke) {
          (console.error("Backup inválido:", ke),
            b(
              (ke == null ? void 0 : ke.message) ||
                "Este arquivo não é um backup válido.",
            ));
        }
      }
    },
    unlockBackup = async () => {
      if (!pendingEncryptedBackup) return;
      if (backupPassword.length < 8) {
        b("Informe a senha usada para criar este backup.");
        return;
      }
      (f(!0), b(""));
      try {
        const plain = await decryptBackup(pendingEncryptedBackup, backupPassword);
        (D(parseBackup(plain)), setPendingEncryptedBackup(""), setBackupPassword(""), v("Backup protegido desbloqueado e validado."));
      } catch (ue) {
        (console.error("Não foi possível desbloquear backup:", ue), b((ue == null ? void 0 : ue.message) || "Não foi possível desbloquear o backup."));
      } finally {
        f(!1);
      }
    },
    pe = async () => {
      (f(!0), b(""));
      try {
        const ue = await restoreBackup(storage, _, {
          substituir: !0,
          filesystem: hn,
          directory: jn.Data,
        });
        (D(null), setPendingEncryptedBackup(""), setBackupPassword(""),
          v(
            `${ue.restaurados} registro(s) e ${ue.arquivosRestaurados} arquivo(s) restaurado(s). Reiniciando o aplicativo...`,
          ),
          setTimeout(() => window.location.reload(), 650));
      } catch (ue) {
        (console.error("Erro ao restaurar backup:", ue),
          b(
            (ue == null ? void 0 : ue.message) ||
              "Não foi possível restaurar o backup.",
          ),
          D(null),
          f(!1));
      }
    },
    ge = async () => {
      if (R === "APAGAR") {
        (f(!0), b(""));
        try {
          (await clearData(storage, {
            filesystem: hn,
            directory: jn.Data,
          }),
            v("Dados e arquivos locais apagados. Reiniciando o aplicativo..."),
            U(!1),
            setTimeout(() => window.location.reload(), 650));
        } catch (ue) {
          (console.error("Erro ao apagar dados locais:", ue),
            b("Não foi possível apagar todos os dados. Tente novamente."),
            f(!1));
        }
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
      title: "Backup e dados",
      subtitle: "Cópias manuais, sem nuvem",
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
              color: colors.dark,
            },
          },
          "Importante",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.primaryDark,
              lineHeight: 1.5,
              marginTop: 4,
            },
          },
          "O backup inclui registros, fotos, áudios e documentos deste aparelho. Ele pode conter informações sensíveis; guarde-o em local seguro.",
        ),
      ),
      React.createElement(
        Card,
        null,
        React.createElement(
          "div",
          {
            style: {
              fontSize: 16,
              fontWeight: 750,
              color: colors.dark,
            },
          },
          "Exportar cópia",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.gray,
              lineHeight: 1.45,
              margin: "4px 0 12px",
            },
          },
          "Cria um arquivo protegido por senha para compartilhar ou salvar.",
        ),
        React.createElement(Input, {
          type: "password",
          label: "Senha do backup",
          placeholder: "Pelo menos 8 caracteres",
          value: backupPassword,
          onChange: (ue) => setBackupPassword(ue.target.value),
          autoComplete: "new-password",
          disabled: u,
          style: {
            marginBottom: 10,
          },
        }),
        React.createElement(
          "div",
          {
            style: {
              color: colors.gray,
              fontSize: 12,
              lineHeight: 1.45,
              margin: "-3px 0 12px",
            },
          },
          "A senha é necessária para restaurar esta cópia. O aplicativo não a guarda; se você perdê-la, não será possível recuperar o backup.",
        ),
        React.createElement(
          Button,
          {
            onClick: ce,
            disabled: u,
          },
          u ? "Aguarde..." : "Criar arquivo de backup",
        ),
      ),
      React.createElement(
        Card,
        null,
        React.createElement(
          "div",
          {
            style: {
              fontSize: 16,
              fontWeight: 750,
              color: colors.dark,
            },
          },
          "Restaurar cópia",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.gray,
              lineHeight: 1.45,
              margin: "4px 0 12px",
            },
          },
          "Valida o arquivo antes de substituir os dados atuais. Backups antigos sem senha continuam compatíveis.",
        ),
        React.createElement(
          "label",
          {
            className: "press-fx touch-target",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1.5px solid ${colors.primary}`,
              borderRadius: 16,
              color: colors.primary,
              fontWeight: 700,
              fontSize: 14,
              cursor: u ? "default" : "pointer",
              opacity: u ? 0.6 : 1,
            },
          },
          React.createElement(Bn, {
            size: 16,
          }),
          " ",
          React.createElement(
            "span",
            {
              style: {
                marginLeft: 7,
              },
          },
          "Escolher backup",
          ),
          React.createElement("input", {
            type: "file",
            accept: "application/json,.json",
            disabled: u,
            onChange: J,
            style: {
              display: "none",
            },
          }),
        ),
        pendingEncryptedBackup &&
          React.createElement(
            "div",
            {
              style: {
                marginTop: 12,
                padding: 12,
                borderRadius: 14,
                background: colors.primaryLight,
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  color: colors.primaryDark,
                  fontSize: 13,
                  lineHeight: 1.45,
                  marginBottom: 10,
                },
              },
              "Este arquivo está protegido por senha. Desbloqueie-o para validar o conteúdo antes de substituir os dados atuais.",
            ),
            React.createElement(Input, {
              type: "password",
              label: "Senha para desbloquear",
              placeholder: "Digite a senha do backup",
              value: backupPassword,
              onChange: (ue) => setBackupPassword(ue.target.value),
              autoComplete: "current-password",
              disabled: u,
              style: {
                marginBottom: 10,
              },
            }),
            React.createElement(
              Button,
              {
                onClick: unlockBackup,
                disabled: u,
              },
              u ? "Desbloqueando..." : "Desbloquear backup",
            ),
          ),
      ),
      React.createElement(
        Card,
        {
          style: {
            border: `1px solid ${colors.red}33`,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 16,
              fontWeight: 750,
              color: colors.red,
            },
          },
          "Apagar dados deste aparelho",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              color: colors.gray,
              lineHeight: 1.45,
              margin: "4px 0 12px",
            },
          },
          "Remove perfil, turmas, planejamentos, registros, fotos e preferências locais.",
        ),
        React.createElement(
          "button",
          {
            className: "press-fx touch-target",
            disabled: u,
            onClick: () => {
              (X(""), U(!0));
            },
            style: {
              width: "100%",
              border: "none",
              borderRadius: 14,
              background: colors.red + "15",
              color: colors.red,
              fontWeight: 750,
            },
          },
          "Apagar todos os dados",
        ),
      ),
      y &&
        React.createElement(SuccessState, {
          message: y,
        }),
      E &&
        React.createElement(ErrorState, {
          message: E,
        }),
    ),
    _ &&
      React.createElement(
        "div",
        {
          className: "modal-overlay",
          role: "presentation",
          onClick: () => D(null),
        },
        React.createElement(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "titulo-restaurar",
            onClick: (ue) => ue.stopPropagation(),
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
              id: "titulo-restaurar",
              style: {
                fontSize: 16,
                fontWeight: 800,
                color: colors.dark,
              },
            },
            "Substituir dados atuais?",
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
            "O backup tem ",
            _.registros.length,
            " registro(s). A restauração substituirá todos os dados locais atuais.",
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
                onClick: () => D(null),
                style: {
                  flex: 1,
                  border: `1px solid ${colors.border}`,
                  background: colors.white,
                  borderRadius: 14,
                },
              },
              "Cancelar",
            ),
            React.createElement(
              "button",
              {
                className: "touch-target",
                autoFocus: !0,
                onClick: pe,
                disabled: u,
                style: {
                  flex: 1,
                  border: "none",
                  background: colors.primary,
                  color: colors.onPrimary,
                  borderRadius: 14,
                  fontWeight: 700,
                },
              },
              "Restaurar",
            ),
          ),
        ),
      ),
    T &&
      React.createElement(
        "div",
        {
          className: "modal-overlay",
          role: "presentation",
          onClick: () => U(!1),
        },
        React.createElement(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "titulo-apagar",
            onClick: (ue) => ue.stopPropagation(),
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
              id: "titulo-apagar",
              style: {
                fontSize: 16,
                fontWeight: 800,
                color: colors.red,
              },
            },
            "Apagar tudo definitivamente?",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                color: colors.gray,
                lineHeight: 1.5,
                margin: "6px 0 12px",
              },
            },
            "Esta ação não pode ser desfeita sem um backup. Digite ",
            React.createElement("strong", null, "APAGAR"),
            " para confirmar.",
          ),
          React.createElement(Input, {
            autoFocus: !0,
            value: R,
            onChange: (ue) => X(ue.target.value.toUpperCase()),
            placeholder: "Digite APAGAR",
          }),
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
                className: "touch-target",
                onClick: () => U(!1),
                style: {
                  flex: 1,
                  border: `1px solid ${colors.border}`,
                  background: colors.white,
                  borderRadius: 14,
                },
              },
              "Cancelar",
            ),
            React.createElement(
              "button",
              {
                className: "touch-target",
                onClick: ge,
                disabled: R !== "APAGAR" || u,
                style: {
                  flex: 1,
                  border: "none",
                  background: R === "APAGAR" ? colors.red : "#D8D5DD",
                  color: "#fff",
                  borderRadius: 14,
                  fontWeight: 700,
                },
              },
              "Apagar tudo",
            ),
          ),
        ),
      ),
  );
}
export { BackupScreen };
