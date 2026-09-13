// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { $l } from "../data/files.js";
import { FileText as Bn } from "lucide-react";
import { Card } from "../core/recovered.js";
import { EmptyState } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { Star as Vu } from "lucide-react";
import { Yu } from "../core/recovered.js";
import { bs } from "../data/files.js";
import { colors } from "../core/recovered.js";
import { confirmAction } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { gp } from "../data/files.js";
import { Filesystem as hn } from "@capacitor/filesystem";
import { Trash2 as mi } from "lucide-react";
import React from "react";
import { nowISO } from "../core/recovered.js";
import { Search as ro } from "lucide-react";
import { storage } from "../core/recovered.js";
import { vp } from "../data/files.js";
import { yp } from "../data/files.js";
function DocumentsScreen({ onBack: onBack, embutido: embutido }) {
  const [f, y] = ReactHooks.useState(null),
    [v, E] = ReactHooks.useState(""),
    [b, _] = ReactHooks.useState(!1),
    [D, T] = ReactHooks.useState(""),
    U = async () => {
      T("");
      try {
        y(await bs(storage));
      } catch (ge) {
        (y([]),
          T(
            (ge == null ? void 0 : ge.message) ||
              "Não foi possível ler seus documentos.",
          ));
      }
    };
  ReactHooks.useEffect(() => {
    U();
  }, []);
  const R = async (ge) => {
      const ue = Array.from(ge.target.files || []);
      if (((ge.target.value = ""), !!ue.length)) {
        (_(!0), T(""));
        try {
          for (const Se of ue) {
            if (Se.size > 25 * 1024 * 1024)
              throw new Error(`${Se.name}: o limite por arquivo é 25 MB.`);
            await gp(
              {
                dataUrl: await Yu(Se),
                nome: Se.name,
                tamanho: Se.size,
                id: createId("doc"),
              },
              {
                storage: storage,
                filesystem: hn,
              },
            );
          }
          (await U(), Rt(700));
        } catch (Se) {
          T(
            (Se == null ? void 0 : Se.message) ||
              "Não foi possível importar o documento.",
          );
        } finally {
          _(!1);
        }
      }
    },
    X = async (ge) => {
      T("");
      try {
        await vp(ge);
      } catch {
        T("Não foi possível abrir este arquivo. Tente importá-lo novamente.");
      }
    },
    ce = async (ge) => {
      if (
        await confirmAction({
          title: "Excluir documento?",
          message: `“${ge.nome}” será removido do aparelho.`,
          confirmLabel: "Excluir",
        })
      ) {
        _(!0);
        try {
          y(
            await yp(ge, f, {
              storage: storage,
              filesystem: hn,
            }),
          );
        } catch {
          T("Não foi possível excluir o documento.");
        } finally {
          _(!1);
        }
      }
    },
    J = async (ge) => {
      const ue = f.map((Se) =>
        Se.id === ge.id
          ? {
              ...Se,
              favorito: !Se.favorito,
              atualizadoEm: nowISO(),
            }
          : Se,
      );
      y(await $l(storage, ue));
    },
    pe = (f || [])
      .filter((ge) =>
        ge.nome
          .toLocaleLowerCase("pt-BR")
          .includes(v.toLocaleLowerCase("pt-BR")),
      )
      .sort((ge, ue) => Number(ue.favorito) - Number(ge.favorito));
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: embutido ? 0 : 30,
      },
    },
    !embutido &&
      React.createElement(ScreenHeader, {
        title: "Documentos e PDFs",
        subtitle: "Arquivos salvos de verdade no aparelho",
        onBack: onBack,
      }),
    React.createElement(
      "div",
      {
        style: {
          padding: embutido ? 0 : 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: colors.white,
            borderRadius: 14,
            padding: "10px 12px",
            boxShadow: colors.cardShadow,
          },
        },
        React.createElement(ro, {
          size: 16,
          color: colors.gray,
        }),
        React.createElement("input", {
          "aria-label": "Pesquisar documentos",
          value: v,
          onChange: (ge) => E(ge.target.value),
          placeholder: "Pesquisar documentos",
          style: {
            border: "none",
            outline: "none",
            fontSize: 16,
            flex: 1,
            background: "transparent",
            color: colors.dark,
          },
        }),
      ),
      React.createElement(
        "label",
        {
          className: "press-fx touch-target",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: colors.primaryLight,
            color: colors.primary,
            borderRadius: 16,
            fontWeight: 750,
            cursor: "pointer",
          },
        },
        React.createElement(Bn, {
          size: 17,
        }),
        b ? "Processando..." : "Importar documento",
        React.createElement("input", {
          type: "file",
          multiple: !0,
          accept:
            ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,image/jpeg,image/png,image/webp",
          style: {
            display: "none",
          },
          onChange: R,
          disabled: b,
        }),
      ),
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
          " ",
          React.createElement(
            "button",
            {
              onClick: U,
              style: {
                border: "none",
                background: "none",
                color: colors.primary,
                fontWeight: 700,
              },
            },
            "Tentar novamente",
          ),
        ),
      f === null &&
        React.createElement(
          Card,
          {
            style: {
              textAlign: "center",
              color: colors.gray,
            },
          },
          "Carregando...",
        ),
      f !== null &&
        !pe.length &&
        React.createElement(EmptyState, {
          compact: !0,
          icon: Bn,
          title: "Nenhum documento importado",
          description:
            "Importe PDFs e outros arquivos para acessá-los mesmo sem internet.",
        }),
      pe.map((ge) =>
        React.createElement(
          Card,
          {
            key: ge.id,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 11,
            },
          },
          React.createElement(Bn, {
            size: 23,
            color: colors.primary,
          }),
          React.createElement(
            "button",
            {
              onClick: () => X(ge),
              style: {
                flex: 1,
                minWidth: 0,
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
                  fontWeight: 700,
                  color: colors.dark,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
              },
              ge.nome,
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 12,
                  color: colors.gray,
                },
              },
              Math.max(1, Math.round(ge.tamanho / 1024)),
              " KB · toque para abrir",
            ),
          ),
          React.createElement(
            "button",
            {
              className: "press-fx touch-target",
              "aria-label": ge.favorito
                ? "Remover dos favoritos"
                : "Favoritar documento",
              onClick: () => J(ge),
              style: {
                border: "none",
                background: "none",
                color: ge.favorito ? colors.orange : colors.gray,
              },
            },
            React.createElement(Vu, {
              size: 17,
              fill: ge.favorito ? colors.orange : "none",
            }),
          ),
          React.createElement(
            "button",
            {
              className: "press-fx touch-target",
              "aria-label": `Excluir ${ge.nome}`,
              onClick: () => ce(ge),
              style: {
                border: "none",
                background: "none",
                color: colors.red,
              },
            },
            React.createElement(mi, {
              size: 17,
            }),
          ),
        ),
      ),
    ),
  );
}
export { DocumentsScreen };
