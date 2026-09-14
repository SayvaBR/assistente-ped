// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import React from "react";
import { rp } from "../core/recovered.js";
function Vp({ status: status }) {
  const u = rp[status] || rp.rascunho;
  return React.createElement(
    "span",
    {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: u.color,
        background: u.color + "22",
        borderRadius: 20,
        padding: "3px 9px",
        whiteSpace: "nowrap",
      },
    },
    u.label,
  );
}
export { Vp };
