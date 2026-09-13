import React, { useEffect, useRef, useState } from "react";
import { Ju, Ps, Qu } from "../core/recovered.js";
import "./SplashScreen.css";

export function SplashScreen({ onDone }) {
  const done = useRef(onDone);
  const [progress, setProgress] = useState(0);
  done.current = onDone;
  useEffect(() => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduced ? 450 : 1800;
    const started = performance.now();
    let frame = 0;
    const tick = (now) => {
      const value = Math.min(
        100,
        Math.round(((now - started) / duration) * 100),
      );
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const timer = setTimeout(() => done.current(), duration);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);
  return React.createElement(
    "div",
    {
      className: "first-run-screen animated-splash",
      role: "status",
      "aria-label": "Abrindo Assistente Pedagógico",
    },
    React.createElement(
      "div",
      { className: "splash-scene", "aria-hidden": true },
      React.createElement("div", { className: "splash-halo" }),
      React.createElement("img", {
        className: "splash-professor",
        src: "./reference-art/splash-professor.png",
        alt: "",
        fetchPriority: "high",
      }),
      React.createElement(
        "div",
        { className: "splash-buddy" },
        React.createElement(
          "div",
          { className: "splash-buddy-body" },
          React.createElement("i", {
            className: "splash-hand splash-hand-left",
          }),
          React.createElement("i", {
            className: "splash-hand splash-hand-right",
          }),
          React.createElement(
            "div",
            { className: "splash-face" },
            React.createElement("i", { className: "splash-eye" }),
            React.createElement("i", { className: "splash-eye" }),
          ),
        ),
      ),
      React.createElement("div", { className: "splash-ground" }),
      React.createElement(
        "span",
        { className: "splash-spark splash-spark-one" },
        "✦",
      ),
      React.createElement(
        "span",
        { className: "splash-spark splash-spark-two" },
        "✦",
      ),
    ),
    React.createElement(
      "div",
      { className: "splash-brand" },
      React.createElement("h1", null, Qu),
      React.createElement("p", null, "Mais tempo para ensinar."),
      React.createElement(
        "div",
        {
          className: "splash-loading",
          role: "progressbar",
          "aria-label": "Preparando o aplicativo",
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-valuenow": progress,
        },
        React.createElement("span", { style: { width: `${progress}%` } }),
      ),
      React.createElement(
        "small",
        { className: "splash-status", "aria-live": "polite" },
        progress < 35
          ? "Abrindo seu espaço de trabalho…"
          : progress < 80
            ? "Carregando seus dados locais…"
            : "Tudo pronto para começar…",
      ),
    ),
    React.createElement(
      "footer",
      { className: "splash-signature" },
      React.createElement("span", null, "Desenvolvido por Sayuri Varela"),
      React.createElement("small", null, `v${Ps} · build ${Ju}`),
    ),
  );
}
