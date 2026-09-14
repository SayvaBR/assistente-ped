// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { colors } from "../core/recovered.js";
import React from "react";
function TextArea(o) {
  return React.createElement("textarea", {
    ...o,
    style: {
      width: "100%",
      minHeight: 74,
      border: `1px solid ${colors.border}`,
      borderRadius: 14,
      padding: "10px 12px",
      fontSize: 14,
      color: colors.dark,
      background: colors.white,
      outline: "none",
      resize: "vertical",
      fontFamily: "Nunito Sans, system-ui, sans-serif",
      boxSizing: "border-box",
      ...o.style,
    },
  });
}
export { TextArea };
