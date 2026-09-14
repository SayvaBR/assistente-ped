// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { dateKey } from "../core/recovered.js";
import { k0 } from "../core/recovered.js";
function R0() {
  const o = new Date(),
    u = o.getDay(),
    f = u === 0 ? -6 : 1 - u,
    y = new Date(o);
  return (
    y.setDate(o.getDate() + f),
    ["Seg", "Ter", "Qua", "Qui", "Sex"].map((v, E) => {
      const b = new Date(y);
      return (
        b.setDate(y.getDate() + E),
        {
          label: v,
          data: k0(b),
          hoje: dateKey(b) === dateKey(o),
        }
      );
    })
  );
}
export { R0 };
