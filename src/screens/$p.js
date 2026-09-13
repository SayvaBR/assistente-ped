// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { As } from "../core/recovered.js";
function $p(o) {
  const [u, f, y] = o.split("-").map(Number);
  return `${y} de ${As[f - 1]} de ${u}`;
}
export { $p };
