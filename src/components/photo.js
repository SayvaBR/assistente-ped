// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Camera as Do } from "lucide-react";
import { RotateCcw as Fp } from "lucide-react";
import * as ReactHooks from "react";
import { Sp } from "../data/agenda-camera.js";
import { Check as Zr } from "lucide-react";
import { bp } from "../data/agenda-camera.js";
import { X as hi } from "lucide-react";
import { Capacitor as ka } from "@capacitor/core";
import React from "react";
import { wp } from "../data/agenda-camera.js";
function cg(o, u, f) {
  if (![o, u, f].every((y) => Number.isFinite(y) && y > 0))
    throw new Error("Dimensões de imagem inválidas.");
  return Math.max(f / o, f / u);
}
function xu({
  offsetX: offsetX,
  offsetY: offsetY,
  zoom: zoom,
  larguraImagem: larguraImagem,
  alturaImagem: alturaImagem,
  tamanhoViewport: tamanhoViewport,
}) {
  const b = Math.min(3, Math.max(1, Number(zoom) || 1)),
    _ = cg(larguraImagem, alturaImagem, tamanhoViewport) * b,
    D = Math.max(0, (larguraImagem * _ - tamanhoViewport) / 2),
    T = Math.max(0, (alturaImagem * _ - tamanhoViewport) / 2);
  return {
    zoom: b,
    offsetX: Math.max(-D, Math.min(D, Number(offsetX) || 0)),
    offsetY: Math.max(-T, Math.min(T, Number(offsetY) || 0)),
    escala: _,
  };
}
function ug({
  offsetX: offsetX,
  offsetY: offsetY,
  zoom: zoom,
  larguraImagem: larguraImagem,
  alturaImagem: alturaImagem,
  tamanhoViewport: tamanhoViewport,
}) {
  const b = xu({
      offsetX: offsetX,
      offsetY: offsetY,
      zoom: zoom,
      larguraImagem: larguraImagem,
      alturaImagem: alturaImagem,
      tamanhoViewport: tamanhoViewport,
    }),
    _ = tamanhoViewport / b.escala;
  return {
    sx: larguraImagem / 2 - _ / 2 - b.offsetX / b.escala,
    sy: alturaImagem / 2 - _ / 2 - b.offsetY / b.escala,
    tamanhoFonte: _,
  };
}
const Es = 280;
function dg(o) {
  return new Promise((u, f) => {
    var v;
    if (!((v = o == null ? void 0 : o.type) != null && v.startsWith("image/")))
      return f(new Error("Escolha uma foto válida."));
    if (o.size > 12 * 1024 * 1024)
      return f(new Error("A foto deve ter no máximo 12 MB."));
    const y = new FileReader();
    ((y.onload = () => u(y.result)),
      (y.onerror = () => f(new Error("Não foi possível ler esta foto."))),
      y.readAsDataURL(o));
  });
}
function PhotoCropper({
  open: open,
  onClose: onClose,
  onConfirm: onConfirm,
  initialSrc = "",
  title = "Ajustar foto",
  colors: E = {},
}) {
  const b = {
      surface: E.surface || "#FFFFFF",
      background: E.background || "#F7F7FB",
      text: E.text || "#102A56",
      muted: E.muted || "#6F7280",
      primary: E.primary || "#1CB0F6",
      border: E.border || "#D9E6EF",
      danger: E.danger || "#EB6A6A",
    },
    [_, D] = ReactHooks.useState(initialSrc),
    [T, U] = ReactHooks.useState(null),
    [R, X] = ReactHooks.useState(1),
    [ce, J] = ReactHooks.useState({
      x: 0,
      y: 0,
    }),
    [pe, ge] = ReactHooks.useState(""),
    [ue, Se] = ReactHooks.useState(!1),
    [Ce, ke] = ReactHooks.useState(!1),
    ye = ReactHooks.useRef(new Map()),
    Ee = ReactHooks.useRef({
      distancia: 0,
      zoom: 1,
      x: 0,
      y: 0,
    }),
    Ie = ReactHooks.useRef(null),
    Oe = ReactHooks.useRef(null);
  (ReactHooks.useEffect(() => {
    open &&
      (D(initialSrc || ""),
      U(null),
      X(1),
      J({
        x: 0,
        y: 0,
      }),
      ge(""),
      ke(!1));
  }, [open, initialSrc]),
    ReactHooks.useEffect(() => {
      if (!_) {
        U(null);
        return;
      }
      const O = new Image();
      ((O.onload = () => {
        (U(O),
          X(1),
          J({
            x: 0,
            y: 0,
          }),
          ge(""));
      }),
        (O.onerror = () => ge("Não foi possível abrir esta foto.")),
        (O.src = _));
    }, [_]));
  const ze = ReactHooks.useMemo(
    () =>
      T
        ? xu({
            offsetX: ce.x,
            offsetY: ce.y,
            zoom: R,
            larguraImagem: T.naturalWidth,
            alturaImagem: T.naturalHeight,
            tamanhoViewport: Es,
          })
        : null,
    [T, ce, R],
  );
  if (!open) return null;
  const te = async (O) => {
      var ne;
      const M = (ne = O.target.files) == null ? void 0 : ne[0];
      if (((O.target.value = ""), !!M))
        try {
          (ge(""), D(await dg(M)));
        } catch (We) {
          ge(We.message);
        }
    },
    Le = async () => {
      var O;
      if ((ge(""), !ka.isNativePlatform())) {
        (O = Oe.current) == null || O.click();
        return;
      }
      ke(!0);
      try {
        const M = await Sp();
        D(M.dataUrl);
      } catch (M) {
        wp(M) || ge(bp(M));
      } finally {
        ke(!1);
      }
    },
    xe = (O, M, ne = R) => {
      if (!T) return;
      const We = xu({
        offsetX: O,
        offsetY: M,
        zoom: ne,
        larguraImagem: T.naturalWidth,
        alturaImagem: T.naturalHeight,
        tamanhoViewport: Es,
      });
      (X(We.zoom),
        J({
          x: We.offsetX,
          y: We.offsetY,
        }));
    },
    Me = () => {
      const [O, M] = [...ye.current.values()];
      return O && M ? Math.hypot(O.x - M.x, O.y - M.y) : 0;
    },
    tt = (O) => {
      (O.currentTarget.setPointerCapture(O.pointerId),
        ye.current.set(O.pointerId, {
          x: O.clientX,
          y: O.clientY,
        }),
        (Ee.current = {
          distancia: Me(),
          zoom: R,
          x: ce.x,
          y: ce.y,
        }));
    },
    yt = (O) => {
      const M = ye.current.get(O.pointerId);
      if (M)
        if (
          (ye.current.set(O.pointerId, {
            x: O.clientX,
            y: O.clientY,
          }),
          ye.current.size >= 2)
        ) {
          const ne = Ee.current.distancia || Me();
          xe(ce.x, ce.y, Ee.current.zoom * (Me() / Math.max(1, ne)));
        } else xe(ce.x + O.clientX - M.x, ce.y + O.clientY - M.y);
    },
    Be = (O) => {
      (ye.current.delete(O.pointerId),
        (Ee.current = {
          distancia: Me(),
          zoom: R,
          x: ce.x,
          y: ce.y,
        }));
    },
    dt = (O) => {
      const M = O.shiftKey ? 10 : 3;
      if (O.key === "ArrowLeft") xe(ce.x - M, ce.y);
      else if (O.key === "ArrowRight") xe(ce.x + M, ce.y);
      else if (O.key === "ArrowUp") xe(ce.x, ce.y - M);
      else if (O.key === "ArrowDown") xe(ce.x, ce.y + M);
      else return;
      O.preventDefault();
    },
    me = async () => {
      if (!T) return ge("Escolha uma foto antes de confirmar.");
      (Se(!0), ge(""));
      try {
        const {
            sx: O,
            sy: M,
            tamanhoFonte: ne,
          } = ug({
            offsetX: ce.x,
            offsetY: ce.y,
            zoom: R,
            larguraImagem: T.naturalWidth,
            alturaImagem: T.naturalHeight,
            tamanhoViewport: Es,
          }),
          We = document.createElement("canvas");
        ((We.width = 512),
          (We.height = 512),
          We.getContext("2d", {
            alpha: !1,
          }).drawImage(T, O, M, ne, ne, 0, 0, 512, 512));
        const mt = We.toDataURL("image/jpeg", 0.9);
        (await (onConfirm == null ? void 0 : onConfirm(mt)),
          onClose == null || onClose());
      } catch (O) {
        ge(
          (O == null ? void 0 : O.message) ||
            "Não foi possível salvar o recorte.",
        );
      } finally {
        Se(!1);
      }
    },
    se = ze
      ? {
          width: T.naturalWidth * ze.escala,
          height: T.naturalHeight * ze.escala,
        }
      : {
          width: 0,
          height: 0,
        };
  return React.createElement(
    "div",
    {
      className: "modal-overlay photo-editor-overlay",
      role: "presentation",
      onClick: onClose,
    },
    React.createElement(
      "div",
      {
        className: "ui-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "photo-editor-title",
        onClick: (O) => O.stopPropagation(),
        style: {
          width: "min(100% - 24px, 420px)",
          background: b.surface,
          color: b.text,
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
        React.createElement(
          "div",
          {
            id: "photo-editor-title",
            style: {
              flex: 1,
              fontSize: 18,
              fontWeight: 800,
            },
          },
          title,
        ),
        React.createElement(
          "button",
          {
            className: "touch-target",
            "aria-label": "Fechar editor de foto",
            onClick: onClose,
            style: {
              border: "none",
              background: "transparent",
              color: b.muted,
            },
          },
          React.createElement(hi, null),
        ),
      ),
      React.createElement(
        "p",
        {
          style: {
            margin: "4px 0 14px",
            color: b.muted,
            fontSize: 14,
            lineHeight: 1.45,
          },
        },
        "Arraste para enquadrar e use dois dedos ou o controle de zoom.",
      ),
      T
        ? React.createElement(
            "div",
            {
              role: "application",
              tabIndex: 0,
              "aria-label": "Área de recorte da foto. Use as setas para mover.",
              onKeyDown: dt,
              onPointerDown: tt,
              onPointerMove: yt,
              onPointerUp: Be,
              onPointerCancel: Be,
              style: {
                width: Es,
                height: Es,
                maxWidth: "100%",
                margin: "0 auto",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                background: "#111",
                touchAction: "none",
                outline: `3px solid ${b.primary}`,
              },
            },
            React.createElement("img", {
              alt: "Prévia do recorte",
              draggable: "false",
              src: _,
              style: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: se.width,
                height: se.height,
                maxWidth: "none",
                transform: `translate(calc(-50% + ${ze.offsetX}px), calc(-50% + ${ze.offsetY}px))`,
                userSelect: "none",
                pointerEvents: "none",
              },
            }),
          )
        : React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              {
                style: {
                  margin: "0 0 10px",
                  color: b.muted,
                  fontSize: 14,
                  lineHeight: 1.45,
                },
              },
              "A câmera será usada apenas para escolher e enquadrar esta foto.",
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                },
              },
              React.createElement(
                "button",
                {
                  className: "touch-target photo-source-button",
                  disabled: Ce,
                  "aria-busy": Ce,
                  onClick: Le,
                  style: {
                    minHeight: 150,
                    border: `1.5px dashed ${b.border}`,
                    borderRadius: 20,
                    background: b.background,
                    color: b.primary,
                    fontWeight: 750,
                  },
                },
                React.createElement(Do, null),
                Ce ? "Abrindo câmera..." : "Tirar foto",
              ),
              React.createElement(
                "button",
                {
                  className: "touch-target photo-source-button",
                  disabled: Ce,
                  onClick: () => {
                    var O;
                    return (O = Ie.current) == null ? void 0 : O.click();
                  },
                  style: {
                    minHeight: 150,
                    border: `1.5px dashed ${b.border}`,
                    borderRadius: 20,
                    background: b.background,
                    color: b.primary,
                    fontWeight: 750,
                  },
                },
                "Galeria",
              ),
            ),
          ),
      React.createElement("input", {
        ref: Ie,
        type: "file",
        accept: "image/jpeg,image/png,image/webp",
        onChange: te,
        style: {
          display: "none",
        },
      }),
      React.createElement("input", {
        ref: Oe,
        type: "file",
        accept: "image/*",
        capture: "environment",
        onChange: te,
        style: {
          display: "none",
        },
      }),
      T &&
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "label",
            {
              htmlFor: "photo-zoom",
              style: {
                display: "block",
                fontSize: 14,
                fontWeight: 700,
                marginTop: 18,
              },
            },
            "Zoom",
          ),
          React.createElement("input", {
            id: "photo-zoom",
            "aria-label": "Zoom da foto",
            type: "range",
            min: "1",
            max: "3",
            step: "0.01",
            value: R,
            onChange: (O) => xe(ce.x, ce.y, Number(O.target.value)),
            style: {
              width: "100%",
              accentColor: b.primary,
            },
          }),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 8,
                marginTop: 12,
              },
            },
            React.createElement(
              "button",
              {
                className: "touch-target",
                onClick: () => {
                  (X(1),
                    J({
                      x: 0,
                      y: 0,
                    }));
                },
                style: {
                  flex: 1,
                  border: `1px solid ${b.border}`,
                  borderRadius: 14,
                  background: b.surface,
                  color: b.text,
                  fontWeight: 700,
                },
              },
              React.createElement(Fp, {
                size: 16,
              }),
              " Recomeçar",
            ),
            React.createElement(
              "button",
              {
                className: "touch-target",
                onClick: () => {
                  var O;
                  return (O = Ie.current) == null ? void 0 : O.click();
                },
                style: {
                  flex: 1,
                  border: `1px solid ${b.border}`,
                  borderRadius: 14,
                  background: b.surface,
                  color: b.text,
                  fontWeight: 700,
                },
              },
              "Trocar foto",
            ),
          ),
        ),
      pe &&
        React.createElement(
          "div",
          {
            role: "alert",
            style: {
              color: b.danger,
              fontSize: 14,
              marginTop: 12,
            },
          },
          pe,
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
            onClick: onClose,
            style: {
              flex: 1,
              border: `1px solid ${b.border}`,
              borderRadius: 14,
              background: b.surface,
              color: b.text,
              fontWeight: 750,
            },
          },
          "Cancelar",
        ),
        React.createElement(
          "button",
          {
            className: "ui-button ui-button-primary press-fx touch-target",
            disabled: !T || ue,
            onClick: me,
            style: {
              flex: 1,
              background: T ? b.primary : b.border,
              color: T ? "#fff" : b.muted,
            },
          },
          React.createElement(Zr, {
            size: 16,
          }),
          " ",
          ue ? "Salvando..." : "Usar foto",
        ),
      ),
    ),
  );
}
export { PhotoCropper, xu, cg, Es, dg, ug };
