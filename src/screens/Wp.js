// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { colors } from "../core/recovered.js";
function Wp(o) {
  return o >= 90 ? colors.green : o >= 75 ? colors.orange : colors.red;
}
export { Wp };
