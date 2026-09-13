// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { $l } from "../data/files.js";
import { Ah } from "../data/files.js";
import { FileText as Bn } from "lucide-react";
import { Card } from "../core/recovered.js";
import { Ch } from "../data/files.js";
import { Chip } from "../core/recovered.js";
import { Ea } from "../data/files.js";
import { EmptyState } from "../core/recovered.js";
import { ErrorState } from "../core/recovered.js";
import { IconTile } from "../core/recovered.js";
import { Input } from "../core/recovered.js";
import { Jf } from "../data/files.js";
import { LoadingState } from "../core/recovered.js";
import * as ReactHooks from "react";
import { Ph } from "../data/files.js";
import { Rt } from "../core/recovered.js";
import { ScreenHeader } from "../core/recovered.js";
import { Plus as Ts } from "lucide-react";
import { Star as Vu } from "lucide-react";
import { ChevronRight as Xt } from "lucide-react";
import { Yu } from "../core/recovered.js";
import { bs } from "../data/files.js";
import { colors } from "../core/recovered.js";
import { confirmAction } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { gp } from "../data/files.js";
import { X as hi } from "lucide-react";
import { Filesystem as hn } from "@capacitor/filesystem";
import { FolderOpen as jo } from "lucide-react";
import { Trash2 as mi } from "lucide-react";
import React from "react";
import { normalizeFolder } from "../data/files.js";
import { nowISO } from "../core/recovered.js";
import { Search as ro } from "lucide-react";
import { storage } from "../core/recovered.js";
import { vp } from "../data/files.js";
import { yp } from "../data/files.js";
function LibraryScreen({
  onBack: onBack,
  onDirtyChange: onDirtyChange,
  setBackHandler: setBackHandler,
  onRequestLocalBack: onRequestLocalBack,
}) {
  var st;
  const v = React.useRef(null),
    [E, b] = ReactHooks.useState(null),
    [_, D] = ReactHooks.useState(null),
    [T, U] = ReactHooks.useState(Ea),
    [R, X] = ReactHooks.useState(""),
    [ce, J] = ReactHooks.useState(!1),
    [pe, ge] = ReactHooks.useState(!1),
    [ue, Se] = ReactHooks.useState(""),
    [Ce, ke] = ReactHooks.useState(!1),
    [ye, Ee] = ReactHooks.useState(""),
    [Ie, Oe] = ReactHooks.useState(!1),
    ze = async () => {
      (Ee(""), Oe(!1));
      try {
        const [we, Ue] = await Promise.all([Ch(storage), bs(storage)]);
        (b(we), D(Ue), T !== Ea && !we.some((be) => be.id === T) && U(Ea));
      } catch (we) {
        (b(null),
          D(null),
          Oe(!0),
          Ee(
            `${(we == null ? void 0 : we.message) || "Não foi possível abrir sua biblioteca."} Seus dados não foram alterados. Tente novamente ou crie um backup antes de continuar.`,
          ));
      }
    };
  (ReactHooks.useEffect(() => {
    ze();
  }, []),
    ReactHooks.useEffect(
      () => (
        onDirtyChange == null || onDirtyChange(pe && !!ue.trim()),
        () => (onDirtyChange == null ? void 0 : onDirtyChange(!1))
      ),
      [pe, ue, onDirtyChange],
    ));
  const te =
      T === Ea
        ? null
        : ((st = (E || []).find((we) => we.id === T)) == null
            ? void 0
            : st.pastaPaiId) || Ea,
    Le = !!(R || te);
  ReactHooks.useEffect(() => {
    if (!setBackHandler) return;
    const we = R ? () => X("") : te ? () => U(te) : null;
    return (setBackHandler(we ? () => we : null), () => setBackHandler(null));
  }, [R, te, setBackHandler]);
  const xe = () => {
      (ge(!1), Se(""), Ee(""));
    },
    Me = async () => {
      (ke(!0), Ee(""));
      try {
        const we = normalizeFolder(
            {
              nome: ue,
              pastaPaiId: T,
            },
            {
              id: createId("pasta"),
            },
          ),
          Ue = await Jf(storage, [...(E || []), we]);
        (b(Ue), xe(), Rt(700));
      } catch (we) {
        Ee(
          (we == null ? void 0 : we.message) ||
            "Não foi possível criar a pasta.",
        );
      } finally {
        ke(!1);
      }
    },
    tt = async (we) => {
      const Ue = Array.from(we.target.files || []);
      if (((we.target.value = ""), !Ue.length)) return;
      (ke(!0), Ee(""));
      let be = 0;
      try {
        for (const ft of Ue) {
          if (ft.size > 25 * 1024 * 1024)
            throw new Error(`${ft.name}: o limite por arquivo é 25 MB.`);
          (await gp(
            {
              dataUrl: await Yu(ft),
              nome: ft.name,
              tamanho: ft.size,
              id: createId("doc"),
              pastaId: T,
            },
            {
              storage: storage,
              filesystem: hn,
            },
          ),
            (be += 1));
        }
        (D(await bs(storage)), Rt(700));
      } catch (ft) {
        D(await bs(storage).catch(() => _ || []));
        const He =
          (ft == null ? void 0 : ft.message) ||
          "Não foi possível adicionar o arquivo.";
        Ee(
          be
            ? `${be} arquivo${be === 1 ? " foi adicionado" : "s foram adicionados"}; os demais não foram adicionados. ${He}`
            : He,
        );
      } finally {
        ke(!1);
      }
    },
    yt = async (we) => {
      Ee("");
      try {
        await vp(we);
      } catch (Ue) {
        Ee(
          (Ue == null ? void 0 : Ue.message) ||
            "Não foi possível abrir este arquivo.",
        );
      }
    },
    Be = async (we) => {
      Ee("");
      try {
        const Ue = (_ || []).map((be) =>
          be.id === we.id
            ? {
                ...be,
                favorito: !be.favorito,
                atualizadoEm: nowISO(),
              }
            : be,
        );
        D(await $l(storage, Ue));
      } catch (Ue) {
        Ee(
          (Ue == null ? void 0 : Ue.message) ||
            "Não foi possível atualizar o favorito.",
        );
      }
    },
    dt = async (we) => {
      if (
        await confirmAction({
          title: "Excluir arquivo?",
          message: `“${we.nome}” será removido da sua biblioteca e do aparelho.`,
          confirmLabel: "Excluir",
        })
      ) {
        (ke(!0), Ee(""));
        try {
          D(
            await yp(we, _ || [], {
              storage: storage,
              filesystem: hn,
            }),
          );
        } catch (Ue) {
          Ee(
            (Ue == null ? void 0 : Ue.message) ||
              "Não foi possível excluir o arquivo.",
          );
        } finally {
          ke(!1);
        }
      }
    },
    me = async (we) => {
      if (
        await confirmAction({
          title: "Excluir pasta?",
          message: `A pasta “${we.nome}” será removida.`,
          confirmLabel: "Excluir",
        })
      ) {
        Ee("");
        try {
          b(await Jf(storage, Ah(E || [], _ || [], we.id)));
        } catch (Ue) {
          Ee(
            (Ue == null ? void 0 : Ue.message) ||
              "Não foi possível excluir a pasta.",
          );
        }
      }
    },
    se = R.trim().toLocaleLowerCase("pt-BR"),
    O = (E || []).filter(
      (we) =>
        we.pastaPaiId === T &&
        (!se || we.nome.toLocaleLowerCase("pt-BR").includes(se)),
    ),
    M = (_ || []).filter(
      (we) =>
        (!ce || we.favorito) &&
        (se
          ? we.nome.toLocaleLowerCase("pt-BR").includes(se)
          : we.pastaId === T),
    ),
    ne = Ph(E || [], T),
    We = (we) => {
      const Ue = we.nome.includes(".")
        ? we.nome.split(".").pop().toUpperCase()
        : "ARQUIVO";
      return Ue === "PDF" || we.mime === "application/pdf" ? "PDF" : Ue;
    },
    rt = (we) =>
      we >= 1024 * 1024
        ? `${(we / 1024 / 1024).toFixed(1)} MB`
        : `${Math.max(1, Math.round(we / 1024))} KB`,
    mt = E === null || _ === null;
  return React.createElement(
    "div",
    {
      style: {
        paddingBottom: 110,
      },
    },
    React.createElement(ScreenHeader, {
      title: "Arquivos",
      subtitle: "Seus materiais pedagógicos, sempre organizados",
      onBack: Le ? onRequestLocalBack : onBack,
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
        "div",
        null,
        React.createElement(
          "div",
          {
            style: {
              fontSize: 18,
              fontWeight: 850,
              color: colors.dark,
            },
          },
          "Meus Arquivos",
        ),
        React.createElement(
          "div",
          {
            style: {
              color: colors.gray,
              fontSize: 14,
              lineHeight: 1.45,
              marginTop: 3,
            },
          },
          "Seu espaço pessoal para organizar materiais de aula.",
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: colors.white,
            borderRadius: 14,
            padding: "8px 11px",
            boxShadow: colors.cardShadow,
          },
        },
        React.createElement(ro, {
          size: 17,
          color: colors.gray,
        }),
        React.createElement("input", {
          "aria-label": "Buscar arquivos",
          value: R,
          onChange: (we) => X(we.target.value),
          placeholder: "Buscar arquivos",
          style: {
            minHeight: 32,
            border: "none",
            outline: "none",
            flex: 1,
            background: "transparent",
            color: colors.dark,
            fontSize: 16,
          },
        }),
        R &&
          React.createElement(
            "button",
            {
              className: "press-fx touch-target",
              "aria-label": "Limpar busca",
              onClick: () => X(""),
              style: {
                border: "none",
                background: "transparent",
                color: colors.gray,
              },
            },
            React.createElement(hi, {
              size: 17,
            }),
          ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(Chip, {
          label: "Favoritos",
          active: ce,
          onClick: () => J((we) => !we),
        }),
      ),
      !se &&
        React.createElement(
          "div",
          {
            "aria-label": "Caminho da pasta",
            style: {
              display: "flex",
              gap: 3,
              alignItems: "center",
              overflowX: "auto",
            },
          },
          React.createElement(
            "button",
            {
              onClick: () => U(Ea),
              style: {
                border: "none",
                background: "transparent",
                color: T === Ea ? colors.primary : colors.gray,
                fontWeight: 750,
                padding: "8px 4px",
              },
            },
            "Meus Arquivos",
          ),
          ne.map((we) =>
            React.createElement(
              React.Fragment,
              {
                key: we.id,
              },
              React.createElement(Xt, {
                size: 14,
                color: colors.gray,
              }),
              React.createElement(
                "button",
                {
                  onClick: () => U(we.id),
                  style: {
                    border: "none",
                    background: "transparent",
                    color: we.id === T ? colors.primary : colors.gray,
                    fontWeight: 750,
                    padding: "8px 4px",
                    whiteSpace: "nowrap",
                  },
                },
                we.nome,
              ),
            ),
          ),
        ),
      React.createElement("input", {
        ref: v,
        type: "file",
        multiple: !0,
        accept: "application/pdf,.pdf,*/*",
        onChange: tt,
        style: {
          display: "none",
        },
      }),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 9,
          },
        },
        React.createElement(
          "button",
          {
            className: "press-fx touch-target",
            disabled: Ce || Ie,
            onClick: () => {
              var we;
              return (we = v.current) == null ? void 0 : we.click();
            },
            style: {
              border: "none",
              borderRadius: 15,
              background: colors.primary,
              color: colors.onPrimary,
              fontSize: 14,
              fontWeight: 800,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              opacity: Ie ? 0.5 : 1,
            },
          },
          React.createElement(Ts, {
            size: 17,
          }),
          Ce ? "Aguarde..." : "Adicionar arquivo",
        ),
        React.createElement(
          "button",
          {
            className: "press-fx touch-target",
            disabled: Ie,
            onClick: () => {
              (ge(!0), X(""));
            },
            style: {
              border: `1px solid ${colors.border}`,
              borderRadius: 15,
              background: colors.white,
              color: colors.dark,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              opacity: Ie ? 0.5 : 1,
            },
          },
          React.createElement(jo, {
            size: 18,
            color: colors.primary,
          }),
          "Nova pasta",
        ),
      ),
      pe &&
        React.createElement(
          Card,
          {
            style: {
              border: `1.5px solid ${colors.primary}55`,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontWeight: 800,
                color: colors.dark,
                marginBottom: 9,
              },
            },
            "Criar pasta aqui",
          ),
          React.createElement(Input, {
            autoFocus: !0,
            "aria-label": "Nome da pasta",
            placeholder: "Ex.: Projetos de leitura",
            value: ue,
            onChange: (we) => Se(we.target.value),
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
                className: "press-fx touch-target",
                onClick: xe,
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
                className: "press-fx touch-target",
                disabled: Ce || !ue.trim(),
                onClick: Me,
                style: {
                  flex: 1,
                  border: "none",
                  borderRadius: 13,
                  background: colors.primary,
                  color: colors.onPrimary,
                  fontWeight: 700,
                },
              },
              "Criar",
            ),
          ),
        ),
      ye &&
        React.createElement(ErrorState, {
          message: ye,
          onRetry: ze,
        }),
      mt &&
        React.createElement(LoadingState, {
          label: "Abrindo sua biblioteca...",
        }),
      !mt &&
        O.length > 0 &&
        React.createElement(
          "section",
          {
            "aria-label": "Pastas",
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                fontWeight: 800,
                color: colors.gray,
                marginBottom: 7,
              },
            },
            "PASTAS",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(2,minmax(0,1fr))",
                gap: 9,
              },
            },
            O.map((we) =>
              React.createElement(
                Card,
                {
                  key: we.id,
                  style: {
                    padding: 12,
                    minWidth: 0,
                  },
                },
                React.createElement(
                  "button",
                  {
                    onClick: () => {
                      (U(we.id), X(""));
                    },
                    style: {
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      textAlign: "left",
                      padding: 0,
                      color: colors.dark,
                    },
                  },
                  React.createElement(jo, {
                    size: 25,
                    color: colors.primary,
                  }),
                  React.createElement(
                    "div",
                    {
                      style: {
                        marginTop: 7,
                        fontWeight: 780,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    },
                    we.nome,
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 12,
                        color: colors.gray,
                        marginTop: 2,
                      },
                    },
                    "Abrir pasta",
                  ),
                ),
                React.createElement(
                  "button",
                  {
                    className: "press-fx touch-target",
                    "aria-label": `Excluir pasta ${we.nome}`,
                    onClick: () => me(we),
                    style: {
                      border: "none",
                      background: "transparent",
                      color: colors.gray,
                      marginTop: 3,
                      marginLeft: -10,
                    },
                  },
                  React.createElement(mi, {
                    size: 15,
                  }),
                ),
              ),
            ),
          ),
        ),
      !mt &&
        M.length > 0 &&
        React.createElement(
          "section",
          {
            "aria-label": "Arquivos",
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                fontWeight: 800,
                color: colors.gray,
                marginBottom: 7,
              },
            },
            se ? "RESULTADOS" : "ARQUIVOS",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 9,
              },
            },
            M.map((we) =>
              React.createElement(
                Card,
                {
                  key: we.id,
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    padding: 12,
                  },
                },
                React.createElement(
                  "button",
                  {
                    "aria-label": `Abrir ${we.nome}`,
                    onClick: () => yt(we),
                    style: {
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      flexShrink: 0,
                    },
                  },
                  React.createElement(IconTile, {
                    color: We(we) === "PDF" ? colors.red : colors.primary,
                    Icon: Bn,
                  }),
                ),
                React.createElement(
                  "button",
                  {
                    onClick: () => yt(we),
                    style: {
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      flex: 1,
                      minWidth: 0,
                      textAlign: "left",
                    },
                  },
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontWeight: 780,
                        color: colors.dark,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    },
                    we.nome,
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 12,
                        color: colors.gray,
                        marginTop: 3,
                      },
                    },
                    We(we),
                    " · ",
                    rt(we.tamanho),
                  ),
                ),
                React.createElement(
                  "button",
                  {
                    className: "press-fx touch-target",
                    "aria-label": we.favorito
                      ? `Remover ${we.nome} dos favoritos`
                      : `Favoritar ${we.nome}`,
                    onClick: () => Be(we),
                    style: {
                      border: "none",
                      background: "transparent",
                      color: we.favorito ? colors.orange : colors.gray,
                    },
                  },
                  React.createElement(Vu, {
                    size: 18,
                    fill: we.favorito ? colors.orange : "none",
                  }),
                ),
                React.createElement(
                  "button",
                  {
                    className: "press-fx touch-target",
                    "aria-label": `Excluir ${we.nome}`,
                    onClick: () => dt(we),
                    style: {
                      border: "none",
                      background: "transparent",
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
        ),
      !mt &&
        !pe &&
        O.length === 0 &&
        M.length === 0 &&
        React.createElement(EmptyState, {
          icon: jo,
          illustration: "files",
          title: se ? "Nenhum arquivo encontrado" : "Este espaço é seu",
          description: se
            ? "Tente buscar por outro nome."
            : "Use os botões acima para criar uma pasta ou adicionar seus PDFs e materiais.",
        }),
    ),
  );
}
export { LibraryScreen };
