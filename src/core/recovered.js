import { savePlan } from "../data/planRepository";
import { purgeStudentData } from "../data/studentCleanup.js";
import { newLessonPlan, normalizeLessonPlans } from "../domain/lessonPlans";
import { storage } from "../data/localStore";
import { Input, TimeInput as SearchInput } from "../components/Fields";
import { ScreenHeader } from "../components/ScreenHeader";
// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { Palette as $u } from "lucide-react";
import { CircleCheckBig as Gh } from "lucide-react";
import { CalendarDays as Hh } from "lucide-react";
import { Clock as Hl } from "lucide-react";
import { Users as Jl } from "lucide-react";
import { Sparkles as Lp } from "lucide-react";
import * as ReactHooks from "react";
import { Info as Tp } from "lucide-react";
import { Bell as Ul } from "lucide-react";
import { Activity as Wh } from "lucide-react";
import { Check as Zr } from "lucide-react";
import { classKey } from "../data/classes.js";
import { classPrefix } from "../data/classes.js";
import { MessageCircle as eg } from "lucide-react";
import { GraduationCap as gi } from "lucide-react";
import { Shapes as ig } from "lucide-react";
import { FolderOpen as jo } from "lucide-react";
import React from "react";
import { BookMarked as qh } from "lucide-react";
import { ChevronLeft as qo } from "lucide-react";
import { Music as zp } from "lucide-react";
const dp = "assistente-pedagogico-backup";
const Su = 2;
const th = 100 * 1024 * 1024;
const Yf = "lembretes-pedagogicos";
const Nh = /cancel|canceled|cancelled|cancelado|user cancelled/i;
const gg = "5.7.4";
const vg = 30;
const yg = 0;
const Eg = 90;
const kg = 240;
const wg = 180;
const Sg = "Boas-vindas pedagógicas";
const bg = 0;
const xg = [];
const Cg = [
  {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "halo",
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            t: 0,
            s: [45],
          },
          {
            t: 35,
            s: [75],
          },
          {
            t: 70,
            s: [45],
          },
          {
            t: 90,
            s: [45],
          },
        ],
      },
      r: {
        a: 0,
        k: 0,
      },
      p: {
        a: 0,
        k: [120, 90, 0],
      },
      a: {
        a: 0,
        k: [0, 0, 0],
      },
      s: {
        a: 1,
        k: [
          {
            t: 0,
            s: [88, 88, 100],
          },
          {
            t: 35,
            s: [104, 104, 100],
          },
          {
            t: 70,
            s: [88, 88, 100],
          },
          {
            t: 90,
            s: [88, 88, 100],
          },
        ],
      },
    },
    ao: 0,
    shapes: [
      {
        ty: "el",
        p: {
          a: 0,
          k: [0, 0],
        },
        s: {
          a: 0,
          k: [142, 142],
        },
        nm: "círculo",
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [0.91, 0.957, 0.988, 1],
        },
        o: {
          a: 0,
          k: 100,
        },
        r: 1,
      },
    ],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0,
  },
  {
    ddd: 0,
    ind: 2,
    ty: 4,
    nm: "caderno",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
      },
      r: {
        a: 1,
        k: [
          {
            t: 0,
            s: [-2],
          },
          {
            t: 42,
            s: [2],
          },
          {
            t: 84,
            s: [-2],
          },
          {
            t: 90,
            s: [-2],
          },
        ],
      },
      p: {
        a: 1,
        k: [
          {
            t: 0,
            s: [120, 94, 0],
          },
          {
            t: 42,
            s: [120, 86, 0],
          },
          {
            t: 84,
            s: [120, 94, 0],
          },
          {
            t: 90,
            s: [120, 94, 0],
          },
        ],
      },
      a: {
        a: 0,
        k: [0, 0, 0],
      },
      s: {
        a: 0,
        k: [100, 100, 100],
      },
    },
    ao: 0,
    shapes: [
      {
        ty: "rc",
        p: {
          a: 0,
          k: [0, 0],
        },
        s: {
          a: 0,
          k: [96, 112],
        },
        r: {
          a: 0,
          k: 18,
        },
        nm: "folha",
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [1, 1, 1, 1],
        },
        o: {
          a: 0,
          k: 100,
        },
        r: 1,
      },
      {
        ty: "st",
        c: {
          a: 0,
          k: [0.31, 0.639, 0.89, 1],
        },
        o: {
          a: 0,
          k: 100,
        },
        w: {
          a: 0,
          k: 6,
        },
        lc: 2,
        lj: 2,
      },
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            p: {
              a: 0,
              k: [0, -28],
            },
            s: {
              a: 0,
              k: [58, 8],
            },
            r: {
              a: 0,
              k: 4,
            },
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [0.31, 0.639, 0.89, 1],
            },
            o: {
              a: 0,
              k: 100,
            },
            r: 1,
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [0, 0],
            },
            a: {
              a: 0,
              k: [0, 0],
            },
            s: {
              a: 0,
              k: [100, 100],
            },
            r: {
              a: 0,
              k: 0,
            },
            o: {
              a: 0,
              k: 100,
            },
            sk: {
              a: 0,
              k: 0,
            },
            sa: {
              a: 0,
              k: 0,
            },
          },
        ],
      },
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            p: {
              a: 0,
              k: [-8, -5],
            },
            s: {
              a: 0,
              k: [42, 6],
            },
            r: {
              a: 0,
              k: 3,
            },
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [0.18, 0.498, 0.757, 1],
            },
            o: {
              a: 0,
              k: 80,
            },
            r: 1,
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [0, 0],
            },
            a: {
              a: 0,
              k: [0, 0],
            },
            s: {
              a: 0,
              k: [100, 100],
            },
            r: {
              a: 0,
              k: 0,
            },
            o: {
              a: 0,
              k: 100,
            },
            sk: {
              a: 0,
              k: 0,
            },
            sa: {
              a: 0,
              k: 0,
            },
          },
        ],
      },
    ],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0,
  },
];
const Pg = {
  v: gg,
  fr: vg,
  ip: yg,
  op: Eg,
  w: kg,
  h: wg,
  nm: Sg,
  ddd: bg,
  assets: xg,
  layers: Cg,
};
const Ag = "5.7.4";
const _g = 30;
const Tg = 0;
const Ig = 55;
const zg = 200;
const Mg = 200;
const Fg = "Cadastro concluído";
const Lg = 0;
const Ng = [];
const Rg = [
  {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "círculo",
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            t: 0,
            s: [0],
          },
          {
            t: 8,
            s: [100],
          },
          {
            t: 55,
            s: [100],
          },
        ],
      },
      r: {
        a: 0,
        k: 0,
      },
      p: {
        a: 0,
        k: [100, 100, 0],
      },
      a: {
        a: 0,
        k: [0, 0, 0],
      },
      s: {
        a: 1,
        k: [
          {
            t: 0,
            s: [20, 20, 100],
          },
          {
            t: 18,
            s: [112, 112, 100],
          },
          {
            t: 27,
            s: [100, 100, 100],
          },
          {
            t: 55,
            s: [100, 100, 100],
          },
        ],
      },
    },
    ao: 0,
    shapes: [
      {
        ty: "el",
        p: {
          a: 0,
          k: [0, 0],
        },
        s: {
          a: 0,
          k: [128, 128],
        },
        nm: "base",
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [0.435, 0.812, 0.592, 1],
        },
        o: {
          a: 0,
          k: 100,
        },
        r: 1,
      },
    ],
    ip: 0,
    op: 55,
    st: 0,
    bm: 0,
  },
  {
    ddd: 0,
    ind: 2,
    ty: 4,
    nm: "check",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
      },
      r: {
        a: 0,
        k: 0,
      },
      p: {
        a: 0,
        k: [100, 103, 0],
      },
      a: {
        a: 0,
        k: [0, 0, 0],
      },
      s: {
        a: 0,
        k: [100, 100, 100],
      },
    },
    ao: 0,
    shapes: [
      {
        ty: "sh",
        ks: {
          a: 0,
          k: {
            i: [
              [0, 0],
              [0, 0],
              [0, 0],
            ],
            o: [
              [0, 0],
              [0, 0],
              [0, 0],
            ],
            v: [
              [-34, -1],
              [-10, 24],
              [38, -27],
            ],
            c: !1,
          },
        },
        nm: "traço",
      },
      {
        ty: "st",
        c: {
          a: 0,
          k: [1, 1, 1, 1],
        },
        o: {
          a: 0,
          k: 100,
        },
        w: {
          a: 0,
          k: 12,
        },
        lc: 2,
        lj: 2,
      },
      {
        ty: "tm",
        s: {
          a: 0,
          k: 0,
        },
        e: {
          a: 1,
          k: [
            {
              t: 16,
              s: [0],
            },
            {
              t: 36,
              s: [100],
            },
            {
              t: 55,
              s: [100],
            },
          ],
        },
        o: {
          a: 0,
          k: 0,
        },
        m: 1,
      },
    ],
    ip: 0,
    op: 55,
    st: 0,
    bm: 0,
  },
];
const Og = {
  v: Ag,
  fr: _g,
  ip: Tg,
  op: Ig,
  w: zg,
  h: Mg,
  nm: Fg,
  ddd: Lg,
  assets: Ng,
  layers: Rg,
};
const Dg = "5.7.4";
const jg = 30;
const Bg = 0;
const $g = 90;
const Wg = 220;
const qg = 180;
const Vg = "Planejamento vazio";
const Ug = 0;
const Hg = [];
const Gg = [
  {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "calendário",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
      },
      r: {
        a: 0,
        k: 0,
      },
      p: {
        a: 1,
        k: [
          {
            t: 0,
            s: [110, 94, 0],
          },
          {
            t: 40,
            s: [110, 86, 0],
          },
          {
            t: 80,
            s: [110, 94, 0],
          },
          {
            t: 90,
            s: [110, 94, 0],
          },
        ],
      },
      a: {
        a: 0,
        k: [0, 0, 0],
      },
      s: {
        a: 0,
        k: [100, 100, 100],
      },
    },
    ao: 0,
    shapes: [
      {
        ty: "rc",
        p: {
          a: 0,
          k: [0, 0],
        },
        s: {
          a: 0,
          k: [138, 112],
        },
        r: {
          a: 0,
          k: 20,
        },
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [1, 1, 1, 1],
        },
        o: {
          a: 0,
          k: 100,
        },
        r: 1,
      },
      {
        ty: "st",
        c: {
          a: 0,
          k: [0.31, 0.639, 0.89, 1],
        },
        o: {
          a: 0,
          k: 100,
        },
        w: {
          a: 0,
          k: 6,
        },
        lc: 2,
        lj: 2,
      },
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            p: {
              a: 0,
              k: [0, -35],
            },
            s: {
              a: 0,
              k: [136, 30],
            },
            r: {
              a: 0,
              k: 13,
            },
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [0.31, 0.639, 0.89, 1],
            },
            o: {
              a: 0,
              k: 100,
            },
            r: 1,
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [0, 0],
            },
            a: {
              a: 0,
              k: [0, 0],
            },
            s: {
              a: 0,
              k: [100, 100],
            },
            r: {
              a: 0,
              k: 0,
            },
            o: {
              a: 0,
              k: 100,
            },
            sk: {
              a: 0,
              k: 0,
            },
            sa: {
              a: 0,
              k: 0,
            },
          },
        ],
      },
      {
        ty: "gr",
        it: [
          {
            ty: "el",
            p: {
              a: 0,
              k: [-36, 7],
            },
            s: {
              a: 0,
              k: [14, 14],
            },
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [0.435, 0.694, 0.91, 1],
            },
            o: {
              a: 1,
              k: [
                {
                  t: 0,
                  s: [30],
                },
                {
                  t: 35,
                  s: [100],
                },
                {
                  t: 70,
                  s: [30],
                },
                {
                  t: 90,
                  s: [30],
                },
              ],
            },
            r: 1,
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [0, 0],
            },
            a: {
              a: 0,
              k: [0, 0],
            },
            s: {
              a: 0,
              k: [100, 100],
            },
            r: {
              a: 0,
              k: 0,
            },
            o: {
              a: 0,
              k: 100,
            },
            sk: {
              a: 0,
              k: 0,
            },
            sa: {
              a: 0,
              k: 0,
            },
          },
        ],
      },
      {
        ty: "gr",
        it: [
          {
            ty: "el",
            p: {
              a: 0,
              k: [0, 7],
            },
            s: {
              a: 0,
              k: [14, 14],
            },
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [0.31, 0.639, 0.89, 1],
            },
            o: {
              a: 1,
              k: [
                {
                  t: 10,
                  s: [30],
                },
                {
                  t: 45,
                  s: [100],
                },
                {
                  t: 80,
                  s: [30],
                },
                {
                  t: 90,
                  s: [30],
                },
              ],
            },
            r: 1,
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [0, 0],
            },
            a: {
              a: 0,
              k: [0, 0],
            },
            s: {
              a: 0,
              k: [100, 100],
            },
            r: {
              a: 0,
              k: 0,
            },
            o: {
              a: 0,
              k: 100,
            },
            sk: {
              a: 0,
              k: 0,
            },
            sa: {
              a: 0,
              k: 0,
            },
          },
        ],
      },
      {
        ty: "gr",
        it: [
          {
            ty: "el",
            p: {
              a: 0,
              k: [36, 7],
            },
            s: {
              a: 0,
              k: [14, 14],
            },
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [0.18, 0.498, 0.757, 1],
            },
            o: {
              a: 1,
              k: [
                {
                  t: 20,
                  s: [30],
                },
                {
                  t: 55,
                  s: [100],
                },
                {
                  t: 90,
                  s: [30],
                },
              ],
            },
            r: 1,
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [0, 0],
            },
            a: {
              a: 0,
              k: [0, 0],
            },
            s: {
              a: 0,
              k: [100, 100],
            },
            r: {
              a: 0,
              k: 0,
            },
            o: {
              a: 0,
              k: 100,
            },
            sk: {
              a: 0,
              k: 0,
            },
            sa: {
              a: 0,
              k: 0,
            },
          },
        ],
      },
    ],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0,
  },
];
const Jg = {
  v: Dg,
  fr: jg,
  ip: Bg,
  op: $g,
  w: Wg,
  h: qg,
  nm: Vg,
  ddd: Ug,
  assets: Hg,
  layers: Gg,
};
const Qg = "5.7.4";
const Yg = 30;
const Xg = 0;
const Kg = 90;
const Zg = 220;
const e0 = 180;
const t0 = "Arquivos vazios";
const r0 = 0;
const a0 = [];
const n0 = [
  {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "pasta",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
      },
      r: {
        a: 1,
        k: [
          {
            t: 0,
            s: [-1],
          },
          {
            t: 42,
            s: [1],
          },
          {
            t: 84,
            s: [-1],
          },
          {
            t: 90,
            s: [-1],
          },
        ],
      },
      p: {
        a: 1,
        k: [
          {
            t: 0,
            s: [110, 100, 0],
          },
          {
            t: 42,
            s: [110, 92, 0],
          },
          {
            t: 84,
            s: [110, 100, 0],
          },
          {
            t: 90,
            s: [110, 100, 0],
          },
        ],
      },
      a: {
        a: 0,
        k: [0, 0, 0],
      },
      s: {
        a: 0,
        k: [100, 100, 100],
      },
    },
    ao: 0,
    shapes: [
      {
        ty: "sh",
        ks: {
          a: 0,
          k: {
            i: [
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
            ],
            o: [
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
            ],
            v: [
              [-72, -42],
              [-14, -42],
              [-2, -26],
              [72, -26],
              [72, 48],
              [-72, 48],
            ],
            c: !0,
          },
        },
        nm: "pasta",
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [0.91, 0.957, 0.988, 1],
        },
        o: {
          a: 0,
          k: 100,
        },
        r: 1,
      },
      {
        ty: "st",
        c: {
          a: 0,
          k: [0.31, 0.639, 0.89, 1],
        },
        o: {
          a: 0,
          k: 100,
        },
        w: {
          a: 0,
          k: 6,
        },
        lc: 2,
        lj: 2,
      },
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            p: {
              a: 0,
              k: [12, 7],
            },
            s: {
              a: 0,
              k: [72, 52],
            },
            r: {
              a: 0,
              k: 8,
            },
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [1, 1, 1, 1],
            },
            o: {
              a: 0,
              k: 100,
            },
            r: 1,
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [0.18, 0.498, 0.757, 1],
            },
            o: {
              a: 0,
              k: 100,
            },
            w: {
              a: 0,
              k: 4,
            },
            lc: 2,
            lj: 2,
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [0, 0],
            },
            a: {
              a: 0,
              k: [0, 0],
            },
            s: {
              a: 1,
              k: [
                {
                  t: 0,
                  s: [92, 92],
                },
                {
                  t: 38,
                  s: [104, 104],
                },
                {
                  t: 76,
                  s: [92, 92],
                },
                {
                  t: 90,
                  s: [92, 92],
                },
              ],
            },
            r: {
              a: 0,
              k: 0,
            },
            o: {
              a: 0,
              k: 100,
            },
            sk: {
              a: 0,
              k: 0,
            },
            sa: {
              a: 0,
              k: 0,
            },
          },
        ],
      },
    ],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0,
  },
];
const i0 = {
  v: Qg,
  fr: Yg,
  ip: Xg,
  op: Kg,
  w: Zg,
  h: e0,
  nm: t0,
  ddd: r0,
  assets: a0,
  layers: n0,
};
const o0 = Object.freeze({
  onboarding: Pg,
  success: Og,
  planning: Jg,
  files: i0,
});
const s0 = Object.freeze({
  onboarding: gi,
  success: Gh,
  planning: Hh,
  files: jo,
});
function Nl(o, u) {
  const f = /^#[0-9a-f]{6}$/i.test(String(o || "")) ? String(o).slice(1) : u;
  return [0, 2, 4].map((y) => Number.parseInt(f.slice(y, y + 2), 16) / 255);
}
function l0(o, u = {}) {
  if (!o) return null;
  const f = [
      {
        from: [0.31, 0.639, 0.89],
        to: Nl(u.primary, "4FA3E3"),
      },
      {
        from: [0.18, 0.498, 0.757],
        to: Nl(u.primaryDark, "2E7FC1"),
      },
      {
        from: [0.91, 0.957, 0.988],
        to: Nl(u.primaryLight, "E8F4FC"),
      },
      {
        from: [1, 1, 1],
        to: Nl(u.surface, "FFFFFF"),
      },
    ],
    y = JSON.parse(JSON.stringify(o)),
    v = (E) => {
      if (Array.isArray(E)) {
        if (E.length >= 3 && E.slice(0, 3).every(Number.isFinite)) {
          const b = f.find(({ from: _ }) =>
            _.every((D, T) => Math.abs(D - E[T]) < 0.006),
          );
          b &&
            b.to.forEach((_, D) => {
              E[D] = _;
            });
        }
        E.forEach(v);
      } else E && typeof E == "object" && Object.values(E).forEach(v);
    };
  return (v(y), y);
}
function MotionIllustration({
  variant: variant,
  loop = !0,
  className = "",
  label = "",
  colors: v,
}) {
  const E = o0[variant],
    b = s0[variant] || gi,
    _ = ReactHooks.useMemo(
      () => l0(E, v),
      [
        E,
        v == null ? void 0 : v.primary,
        v == null ? void 0 : v.primaryDark,
        v == null ? void 0 : v.primaryLight,
        v == null ? void 0 : v.surface,
      ],
    ),
    D = ReactHooks.useRef(null),
    [T, U] = ReactHooks.useState(() => {
      var ce;
      return (
        ((ce = window.matchMedia) == null
          ? void 0
          : ce.call(window, "(prefers-reduced-motion: reduce)").matches) ?? !1
      );
    }),
    [R, X] = ReactHooks.useState("pending");
  return (
    ReactHooks.useEffect(() => {
      var pe, ge;
      const ce =
        (pe = window.matchMedia) == null
          ? void 0
          : pe.call(window, "(prefers-reduced-motion: reduce)");
      if (!ce) return;
      const J = () => U(ce.matches);
      return (
        J(),
        (ge = ce.addEventListener) == null || ge.call(ce, "change", J),
        () => {
          var ue;
          return (ue = ce.removeEventListener) == null
            ? void 0
            : ue.call(ce, "change", J);
        }
      );
    }, []),
    ReactHooks.useEffect(() => {
      const ce = D.current;
      if ((X("pending"), T || !_ || !ce)) {
        X("failed");
        return;
      }
      let J,
        pe = !1,
        ge;
      const ue = () => {
          if (pe) return;
          const ke = ce.getBoundingClientRect(),
            ye = [
              ...ce.querySelectorAll(
                "svg path, svg rect, svg circle, svg ellipse, svg image",
              ),
            ].some((Ee) => {
              const Ie = Ee.getBoundingClientRect();
              return (
                Ie.width > 1 &&
                Ie.height > 1 &&
                Ie.right > ke.left &&
                Ie.left < ke.right &&
                Ie.bottom > ke.top &&
                Ie.top < ke.bottom
              );
            });
          X(ye ? "rendered" : "failed");
        },
        Se = () => {
          (T && (J == null || J.goToAndStop(Math.max(0, (_.op || 1) - 1), !0)),
            window.requestAnimationFrame(() =>
              window.requestAnimationFrame(ue),
            ));
        },
        Ce = () => {
          pe || X("failed");
        };
      const load = async () => {
        try {
          const module = await import("lottie-web");
          if (pe) return;
          const lottie = module.default || module;
          J = lottie.loadAnimation({
            container: ce,
            renderer: "svg",
            animationData: _,
            autoplay: true,
            loop,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid meet",
            },
          });
          J.addEventListener("DOMLoaded", Se);
          J.addEventListener("data_failed", Ce);
          ge = window.setTimeout(ue, 900);
        } catch {
          Ce();
        }
      };
      void load();
      return () => {
        ((pe = !0),
          window.clearTimeout(ge),
          J == null || J.removeEventListener("DOMLoaded", Se),
          J == null || J.removeEventListener("data_failed", Ce),
          J == null || J.destroy());
      };
    }, [_, loop, T]),
    React.createElement(
      "div",
      {
        className: `motion-illustration ${className}`.trim(),
        role: label ? "img" : void 0,
        "aria-label": label || void 0,
        "aria-hidden": label ? void 0 : "true",
      },
      R !== "rendered" &&
        React.createElement(
          "div",
          {
            className: "motion-illustration-fallback",
            "aria-hidden": "true",
            style: {
              color: (v == null ? void 0 : v.primaryDark) || "#1899D6",
              background: (v == null ? void 0 : v.primaryLight) || "#EAF6FD",
              borderColor: `${(v == null ? void 0 : v.primary) || "#1CB0F6"}40`,
            },
          },
          React.createElement(b, null),
        ),
      React.createElement("div", {
        ref: D,
        className: "motion-illustration-canvas",
        "data-rendered": R === "rendered",
        "aria-hidden": "true",
      }),
    )
  );
}
const colors = {
  primary: "#176B61",
  onPrimary: "#FFFFFF",
  primaryDark: "#0F574F",
  primaryLight: "#E4F0EC",
  pink: "#B77A7B",
  green: "#3D876B",
  blue: "#6D8795",
  orange: "#A56B32",
  red: "#B45F5F",
  bg: "#F7F7F4",
  white: "#FFFFFF",
  gray: "#687772",
  dark: "#172522",
  border: "#DDE5E1",
  cardShadow: "0 1px 2px rgba(23,37,34,0.04), 0 10px 24px rgba(23,37,34,0.035)",
};
const Ol = {
  claro: {
  nome: "Claro",
    desc: "Fundo claro e leitura confortável",
    pink: "#B77A7B",
    green: "#3D876B",
    blue: "#6D8795",
    orange: "#A56B32",
    red: "#B45F5F",
    bg: "#F7F7F4",
    white: "#FFFFFF",
    gray: "#687772",
    dark: "#172522",
    border: "#DDE5E1",
    cardShadow: "0 1px 2px rgba(23,37,34,0.04), 0 10px 24px rgba(23,37,34,0.035)",
    colorScheme: "light",
  },
  escuro: {
    nome: "Escuro",
    desc: "Superfícies escuras com contraste suave",
    pink: "#F79CC0",
    green: "#8FE0B3",
    blue: "#8FC6F2",
    orange: "#F5BC80",
    red: "#F58E88",
    bg: "#18171D",
    white: "#24222B",
    gray: "#B4B0BD",
    dark: "#F7F5FA",
    border: "#3A3743",
    cardShadow: "0 2px 12px rgba(0,0,0,0.28)",
    colorScheme: "dark",
  },
  oled: {
    nome: "OLED",
    desc: "Preto puro para telas OLED",
    pink: "#F79CC0",
    green: "#8FE0B3",
    blue: "#8FC6F2",
    orange: "#F5BC80",
    red: "#F58E88",
    bg: "#000000",
    white: "#101014",
    gray: "#B8B4C0",
    dark: "#F7F5FA",
    border: "#232030",
    cardShadow: "0 2px 10px rgba(0,0,0,0.5)",
    colorScheme: "dark",
  },
  sistema: {
    nome: "Seguir sistema",
    desc: "Acompanha o modo claro ou escuro do aparelho",
  },
};
const Bo = "#176B61";
const c0 = "#7C6FE0";
const Rp = Object.freeze([
  {
    nome: "Azul",
    // Azul de ação com contraste suficiente para texto branco em botões preenchidos.
    valor: "#087EA4",
  },
  {
    nome: "Verde",
    valor: "#4BAA84",
  },
  {
    nome: "Coral",
    valor: "#E67873",
  },
]);
const u0 = {
  vermelho: "#E0736F",
  laranja: "#E88A46",
  amarelo: "#D6A73A",
  verde: "#5FBE8A",
  azul: "#5A9FE0",
  anil: "#6C7AE0",
  violeta: c0,
};
function Gu(o) {
  const u = String(o || "").trim();
  return /^#[0-9a-f]{6}$/i.test(u) ? u.toUpperCase() : Bo;
}
function Cu(o) {
  const raw = Gu(o);
  // Migra o azul claro usado em versões anteriores sem quebrar a preferência salva.
  const u = raw === "#1CB0F6" ? "#087EA4" : raw;
  return Rp.some((f) => f.valor === u) ? u : Bo;
}
function Pu(o) {
  const u = Gu(o).slice(1);
  return [0, 2, 4].map((f) => parseInt(u.slice(f, f + 2), 16));
}
function d0(o) {
  return `#${o
    .map((u) =>
      Math.max(0, Math.min(255, Math.round(u)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`.toUpperCase();
}
function Ro(o, u, f) {
  const y = Pu(o),
    v = Pu(u);
  return d0(y.map((E, b) => E + (v[b] - E) * f));
}
function ep(o) {
  const u = Pu(o).map((f) => {
    const y = f / 255;
    return y <= 0.03928 ? y / 12.92 : ((y + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * u[0] + 0.7152 * u[1] + 0.0722 * u[2];
}
function Au(o, u) {
  const [f, y] = [ep(o), ep(u)].sort((v, E) => E - v);
  return (f + 0.05) / (y + 0.05);
}
function f0(o, u, f) {
  let y = Gu(o);
  const v = f ? "#FFFFFF" : "#000000";
  for (let E = 0; E < 24 && Au(y, u) < 4.5; E += 1) y = Ro(y, v, 0.06);
  return y;
}
function p0(o, u) {
  const f = o.colorScheme === "dark",
    y = Gu(u),
    // O azul principal da marca usa texto branco por padrão, como definido no
    // Design System. Para acentos personalizados, mantém-se o contraste automático.
    v = y === Bo
      ? "#FFFFFF"
      : Au(y, "#FFFFFF") >= Au(y, "#15131B")
        ? "#FFFFFF"
        : "#15131B";
  return {
    ...o,
    primary: y,
    onPrimary: v,
    primaryDark: f
      ? Ro(y, "#FFFFFF", 0.18)
      : y === Bo
        ? "#0F574F"
        : Ro(y, "#000000", 0.22),
    primaryLight: f ? Ro(o.white, y, 0.18) : y === Bo ? "#E4F0EC" : Ro(o.white, y, 0.12),
    gradient: y,
  };
}
const tp = {
  acolhida: {
    color: colors.blue,
    icon: Lp,
    label: "Acolhida",
  },
  musica: {
    color: colors.pink,
    icon: zp,
    label: "Música",
  },
  historia: {
    color: colors.orange,
    icon: qh,
    label: "História",
  },
  arte: {
    color: colors.green,
    icon: $u,
    label: "Arte",
  },
};
const _u = [
  {
    nome: "O eu, o outro e o nós",
    icon: Jl,
    color: colors.pink,
  },
  {
    nome: "Corpo, gestos e movimentos",
    icon: Wh,
    color: colors.blue,
  },
  {
    nome: "Traços, sons, cores e formas",
    icon: $u,
    color: colors.green,
  },
  {
    nome: "Escuta, fala, pensamento e imaginação",
    icon: eg,
    color: colors.orange,
  },
  {
    nome: "Espaços, tempos, quantidades, relações e transformações",
    icon: ig,
    color: colors.primary,
  },
];
const Tu = [
  "Bebês (zero a 1 ano e 6 meses)",
  "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
  "Crianças pequenas (4 anos a 5 anos e 11 meses)",
];
const Ki = [
  {
    codigo: "EI01EO01",
    campo: "O eu, o outro e o nós",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Perceber que suas ações afetam as outras crianças e os adultos.",
  },
  {
    codigo: "EI01EO02",
    campo: "O eu, o outro e o nós",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Perceber as possibilidades e limites do próprio corpo nas brincadeiras e interações.",
  },
  {
    codigo: "EI01EO03",
    campo: "O eu, o outro e o nós",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Interagir com crianças da mesma idade e adultos ao explorar espaços, materiais e brinquedos.",
  },
  {
    codigo: "EI01EO04",
    campo: "O eu, o outro e o nós",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Comunicar necessidades, desejos e emoções por meio de gestos, balbucios e palavras.",
  },
  {
    codigo: "EI01EO05",
    campo: "O eu, o outro e o nós",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Reconhecer o próprio corpo e expressar sensações em momentos de alimentação, higiene, brincadeira e descanso.",
  },
  {
    codigo: "EI01EO06",
    campo: "O eu, o outro e o nós",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Interagir com outras crianças e adultos, adaptando-se ao convívio social.",
  },
  {
    codigo: "EI02EO01",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Demonstrar cuidado e solidariedade ao interagir com crianças e adultos.",
  },
  {
    codigo: "EI02EO02",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Demonstrar confiança em si mesma para enfrentar dificuldades e desafios.",
  },
  {
    codigo: "EI02EO03",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Compartilhar objetos e espaços com crianças da mesma idade e adultos.",
  },
  {
    codigo: "EI02EO04",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Comunicar-se com colegas e adultos, buscando compreender e ser compreendida.",
  },
  {
    codigo: "EI02EO05",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Perceber que as pessoas têm características físicas diferentes, respeitando essas diferenças.",
  },
  {
    codigo: "EI02EO06",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Respeitar regras básicas de convívio social nas interações e brincadeiras.",
  },
  {
    codigo: "EI02EO07",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Resolver conflitos nas interações e brincadeiras, com a orientação de um adulto.",
  },
  {
    codigo: "EI03EO01",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Demonstrar empatia, percebendo que as pessoas sentem e pensam de formas diferentes.",
  },
  {
    codigo: "EI03EO02",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Agir com independência e confiança nas próprias capacidades, reconhecendo conquistas e limites.",
  },
  {
    codigo: "EI03EO03",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Ampliar as relações interpessoais, participando e cooperando com o grupo.",
  },
  {
    codigo: "EI03EO04",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto: "Comunicar ideias e sentimentos a diferentes pessoas e grupos.",
  },
  {
    codigo: "EI03EO05",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Valorizar as características do próprio corpo e respeitar as dos outros.",
  },
  {
    codigo: "EI03EO06",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Demonstrar interesse e respeito por diferentes culturas e modos de vida.",
  },
  {
    codigo: "EI03EO07",
    campo: "O eu, o outro e o nós",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto: "Usar o respeito mútuo como estratégia para lidar com conflitos.",
  },
  {
    codigo: "EI01CG01",
    campo: "Corpo, gestos e movimentos",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Movimentar o corpo para expressar emoções, necessidades e desejos.",
  },
  {
    codigo: "EI01CG02",
    campo: "Corpo, gestos e movimentos",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Experimentar as possibilidades do corpo em brincadeiras e interações em ambientes acolhedores.",
  },
  {
    codigo: "EI01CG03",
    campo: "Corpo, gestos e movimentos",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Imitar gestos e movimentos de outras crianças, adultos e animais.",
  },
  {
    codigo: "EI01CG04",
    campo: "Corpo, gestos e movimentos",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Participar do cuidado do próprio corpo e do próprio bem-estar.",
  },
  {
    codigo: "EI01CG05",
    campo: "Corpo, gestos e movimentos",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Usar movimentos de preensão, encaixe e lançamento ao manusear objetos e materiais.",
  },
  {
    codigo: "EI02CG01",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Apropriar-se de gestos e movimentos da própria cultura no cuidado de si e nas brincadeiras.",
  },
  {
    codigo: "EI02CG02",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Deslocar o corpo no espaço usando noções como em frente, atrás, dentro e fora.",
  },
  {
    codigo: "EI02CG03",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Explorar formas de deslocamento no espaço, como pular, saltar e dançar.",
  },
  {
    codigo: "EI02CG04",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto: "Demonstrar independência progressiva no cuidado do próprio corpo.",
  },
  {
    codigo: "EI02CG05",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Desenvolver as habilidades manuais, ganhando controle para desenhar, pintar e rasgar.",
  },
  {
    codigo: "EI03CG01",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Criar com o corpo formas de expressar sentimentos e emoções em brincadeiras, dança, teatro e música.",
  },
  {
    codigo: "EI03CG02",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Demonstrar controle e adequação do corpo em brincadeiras, jogos e atividades artísticas.",
  },
  {
    codigo: "EI03CG03",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Criar movimentos, gestos e mímicas em brincadeiras e atividades artísticas.",
  },
  {
    codigo: "EI03CG04",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Adotar hábitos de autocuidado relacionados a higiene, alimentação e bem-estar.",
  },
  {
    codigo: "EI03CG05",
    campo: "Corpo, gestos e movimentos",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Coordenar as habilidades manuais de acordo com interesses e necessidades.",
  },
  {
    codigo: "EI01TS01",
    campo: "Traços, sons, cores e formas",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Explorar sons produzidos com o próprio corpo e com objetos do ambiente.",
  },
  {
    codigo: "EI01TS02",
    campo: "Traços, sons, cores e formas",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Fazer marcas gráficas em diferentes suportes, usando instrumentos riscantes e tintas.",
  },
  {
    codigo: "EI01TS03",
    campo: "Traços, sons, cores e formas",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Explorar fontes sonoras e materiais para acompanhar músicas e brincadeiras cantadas.",
  },
  {
    codigo: "EI02TS01",
    campo: "Traços, sons, cores e formas",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Criar sons com materiais, objetos e instrumentos musicais para acompanhar ritmos.",
  },
  {
    codigo: "EI02TS02",
    campo: "Traços, sons, cores e formas",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Manipular materiais variados, explorando cores, texturas e formas ao criar objetos tridimensionais.",
  },
  {
    codigo: "EI02TS03",
    campo: "Traços, sons, cores e formas",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Usar diferentes fontes sonoras do ambiente em brincadeiras cantadas e músicas.",
  },
  {
    codigo: "EI03TS01",
    campo: "Traços, sons, cores e formas",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Usar sons de materiais e instrumentos em encenações e criações musicais.",
  },
  {
    codigo: "EI03TS02",
    campo: "Traços, sons, cores e formas",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto: "Expressar-se livremente por desenho, pintura, colagem e escultura.",
  },
  {
    codigo: "EI03TS03",
    campo: "Traços, sons, cores e formas",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Reconhecer qualidades do som (intensidade, duração, altura, timbre) em produções sonoras.",
  },
  {
    codigo: "EI01EF01",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Reconhecer quando é chamado pelo nome e reconhecer os nomes de pessoas próximas.",
  },
  {
    codigo: "EI01EF02",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Demonstrar interesse ao ouvir poemas e músicas.",
  },
  {
    codigo: "EI01EF03",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Demonstrar interesse ao ouvir histórias, observando ilustrações e o modo de leitura do adulto.",
  },
  {
    codigo: "EI01EF04",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Reconhecer elementos das ilustrações de histórias, apontando-os quando solicitado.",
  },
  {
    codigo: "EI01EF05",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Imitar entonações e gestos dos adultos ao ler histórias e cantar.",
  },
  {
    codigo: "EI01EF06",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Comunicar-se com outras pessoas usando movimentos, gestos, balbucios e fala.",
  },
  {
    codigo: "EI01EF07",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Conhecer e manusear materiais impressos e audiovisuais.",
  },
  {
    codigo: "EI01EF08",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Participar de situações de escuta de diferentes tipos de texto.",
  },
  {
    codigo: "EI01EF09",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Conhecer e manusear diferentes instrumentos e suportes de escrita.",
  },
  {
    codigo: "EI02EF01",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Dialogar com crianças e adultos, expressando desejos, necessidades, sentimentos e opiniões.",
  },
  {
    codigo: "EI02EF02",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Identificar e criar sons, reconhecendo rimas em cantigas de roda e textos poéticos.",
  },
  {
    codigo: "EI02EF03",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Demonstrar interesse ao ouvir histórias, diferenciando escrita de ilustrações.",
  },
  {
    codigo: "EI02EF04",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto: "Formular e responder perguntas sobre fatos da história narrada.",
  },
  {
    codigo: "EI02EF05",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Relatar experiências, histórias ouvidas, filmes ou peças assistidas.",
  },
  {
    codigo: "EI02EF06",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Criar e contar histórias oralmente a partir de imagens ou temas sugeridos.",
  },
  {
    codigo: "EI02EF07",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Manusear diferentes portadores textuais, reconhecendo seus usos sociais.",
  },
  {
    codigo: "EI02EF08",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Manusear textos e participar de situações de escuta para ampliar o contato com gêneros textuais.",
  },
  {
    codigo: "EI02EF09",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Manusear instrumentos e suportes de escrita para desenhar e traçar letras.",
  },
  {
    codigo: "EI03EF01",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Expressar ideias, desejos e sentimentos por meio da fala, escrita espontânea, fotos e desenhos.",
  },
  {
    codigo: "EI03EF02",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Inventar brincadeiras cantadas, poemas e canções, criando rimas e ritmos.",
  },
  {
    codigo: "EI03EF03",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto: "Escolher e folhear livros, orientando-se por temas e ilustrações.",
  },
  {
    codigo: "EI03EF04",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Recontar histórias e planejar coletivamente roteiros de vídeos e encenações.",
  },
  {
    codigo: "EI03EF05",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Recontar histórias para produção de reconto escrito, com o professor como escriba.",
  },
  {
    codigo: "EI03EF06",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Produzir histórias orais e escritas próprias, com função social significativa.",
  },
  {
    codigo: "EI03EF07",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Levantar hipóteses sobre gêneros textuais, observando a forma gráfica.",
  },
  {
    codigo: "EI03EF08",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto: "Selecionar livros e textos para leitura própria ou de um adulto.",
  },
  {
    codigo: "EI03EF09",
    campo: "Escuta, fala, pensamento e imaginação",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Levantar hipóteses sobre a escrita, registrando palavras por escrita espontânea.",
  },
  {
    codigo: "EI01ET01",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Explorar propriedades de objetos e materiais, como odor, cor, sabor e temperatura.",
  },
  {
    codigo: "EI01ET02",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Explorar relações de causa e efeito na interação com o mundo físico.",
  },
  {
    codigo: "EI01ET03",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto: "Explorar o ambiente por ação e observação, fazendo descobertas.",
  },
  {
    codigo: "EI01ET04",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Manipular e explorar o espaço por meio de deslocamentos de si e dos objetos.",
  },
  {
    codigo: "EI01ET05",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Manipular materiais variados para comparar diferenças e semelhanças entre eles.",
  },
  {
    codigo: "EI01ET06",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Bebês (zero a 1 ano e 6 meses)",
    texto:
      "Vivenciar diferentes ritmos e velocidades em interações e brincadeiras.",
  },
  {
    codigo: "EI02ET01",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Explorar e descrever semelhanças e diferenças entre propriedades de objetos.",
  },
  {
    codigo: "EI02ET02",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Observar e descrever fenômenos naturais do cotidiano, como luz solar, vento e chuva.",
  },
  {
    codigo: "EI02ET03",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Compartilhar com outras crianças situações de cuidado de plantas e animais.",
  },
  {
    codigo: "EI02ET04",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Identificar relações espaciais (dentro, fora, em cima, embaixo) e temporais (antes, durante, depois).",
  },
  {
    codigo: "EI02ET05",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Classificar objetos considerando um atributo, como tamanho, peso, cor ou forma.",
  },
  {
    codigo: "EI02ET06",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Usar conceitos básicos de tempo, como agora, antes, depois, ontem e hoje.",
  },
  {
    codigo: "EI02ET07",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto:
      "Contar oralmente objetos, pessoas e livros em diferentes contextos.",
  },
  {
    codigo: "EI02ET08",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)",
    texto: "Registrar com números a quantidade de crianças e de objetos.",
  },
  {
    codigo: "EI03ET01",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Estabelecer comparações entre objetos, observando suas propriedades.",
  },
  {
    codigo: "EI03ET02",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Observar e descrever mudanças em materiais resultantes de experimentos.",
  },
  {
    codigo: "EI03ET03",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Identificar e selecionar fontes de informação para responder questões sobre a natureza.",
  },
  {
    codigo: "EI03ET04",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Registrar observações e medidas usando desenho, números ou escrita espontânea.",
  },
  {
    codigo: "EI03ET05",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Classificar objetos e figuras de acordo com semelhanças e diferenças.",
  },
  {
    codigo: "EI03ET06",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Relatar fatos sobre seu nascimento, desenvolvimento e a história da família.",
  },
  {
    codigo: "EI03ET07",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto:
      "Relacionar números a quantidades e identificar o antes, o depois e o entre em uma sequência.",
  },
  {
    codigo: "EI03ET08",
    campo: "Espaços, tempos, quantidades, relações e transformações",
    faixa: "Crianças pequenas (4 anos a 5 anos e 11 meses)",
    texto: "Expressar medidas de peso e altura, construindo gráficos básicos.",
  },
];
const rp = {
  rascunho: {
    label: "Rascunho",
    color: colors.orange,
  },
  concluido: {
    label: "Concluído",
    color: colors.blue,
  },
  realizado: {
    label: "Realizado",
    color: colors.green,
  },
  arquivado: {
    label: "Arquivado",
    color: colors.gray,
  },
};
const m0 = [
  {
    valor: "otimo",
    label: "Funcionou muito bem",
    emoji: "😄",
  },
  {
    valor: "bom",
    label: "Funcionou",
    emoji: "🙂",
  },
  {
    valor: "parcial",
    label: "Parcialmente",
    emoji: "😐",
  },
  {
    valor: "revisar",
    label: "Precisa ser revisto",
    emoji: "🙁",
  },
];
function createLessonPlan({ turmaId: o, dataKey: u } = {}) {
  return newLessonPlan({ turmaId: o, dataKey: u });
}
function migrateLessonPlans(o, { dataKey: u, turmaId: f } = {}) {
  return normalizeLessonPlans(o, { turmaId: f, dataKey: u });
}
function h0(o) {
  return (o || [])
    .flatMap((u) =>
      (u.momentos || []).map((f) => ({
        ...f,
        planoId: u.id,
        planoTitulo: u.tituloTema,
      })),
    )
    .sort((u, f) => (u.horario || "").localeCompare(f.horario || ""));
}
const g0 = [
  "Berçário I",
  "Berçário II",
  "Nível I",
  "Nível II",
  "Nível III",
  "Nível IV",
  "Nível V",
];
const v0 = ["Manhã", "Tarde", "Noite", "Integral"];
const Ps = "0.3.0";
const Ju = 30;
const Qu = "Assistente Pedagógico";
function np(o, u = new Date()) {
  const f = u.getFullYear(),
    y = String(u.getMonth() + 1).padStart(2, "0"),
    v = String(u.getDate()).padStart(2, "0");
  return `${o}:${f}-${y}-${v}`;
}
function createId(o = "id") {
  const u = Math.random().toString(36).slice(2, 9);
  return `${o}_${Date.now().toString(36)}${u}`;
}
function nowISO() {
  return new Date().toISOString();
}
const y0 = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
const As = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
function dateKey(o = new Date()) {
  return `${o.getFullYear()}-${String(o.getMonth() + 1).padStart(2, "0")}-${String(o.getDate()).padStart(2, "0")}`;
}
function E0(o) {
  const u = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(o || "");
  return u ? `${u[3]}-${u[2]}-${u[1]}` : null;
}
function Dp(o) {
  const [u, f, y] = (o || "").split("-").map(Number);
  return u ? jp(new Date(u, f - 1, y)) : o;
}
function jp(o = new Date()) {
  const u = y0[o.getDay()];
  return `${u.charAt(0).toUpperCase() + u.slice(1)}, ${o.getDate()} de ${As[o.getMonth()]}`;
}
function k0(o = new Date()) {
  return `${String(o.getDate()).padStart(2, "0")}/${String(o.getMonth() + 1).padStart(2, "0")}`;
}
function ip(o = new Date()) {
  const u = o.getHours();
  return u >= 5 && u < 12
    ? "Bom dia"
    : u >= 12 && u < 18
      ? "Boa tarde"
      : "Boa noite";
}
function w0(o) {
  return o === "professor"
    ? "Professor"
    : o === "professora"
      ? "Professora"
      : "Docente";
}
function S0(o, u = new Date()) {
  var y, v;
  const f =
    (v = (y = o == null ? void 0 : o.nome) == null ? void 0 : y.trim()) == null
      ? void 0
      : v.split(" ")[0];
  return f ? `${ip(u)}, ${w0(o == null ? void 0 : o.tratamento)} ${f}` : ip(u);
}
const repository = {
  turmaAtivaId: null,
  definirTurmaAtiva(o) {
    this.turmaAtivaId = o || null;
  },
  chaveDaTurma(o) {
    if (!this.turmaAtivaId)
      throw new Error("Selecione uma turma antes de acessar estes dados.");
    return classKey(this.turmaAtivaId, o);
  },
  prefixoDaTurma(o) {
    if (!this.turmaAtivaId)
      throw new Error("Selecione uma turma antes de acessar estes dados.");
    return classPrefix(this.turmaAtivaId, o);
  },
  async carregarPerfil() {
    try {
      const o = await storage.get("perfil:professor");
      return JSON.parse(o.value);
    } catch {
      return null;
    }
  },
  async salvarPerfil(o) {
    await storage.set("perfil:professor", JSON.stringify(o));
  },
  async carregarTurmas() {
    try {
      const o = await storage.get("turmas:lista");
      return JSON.parse(o.value);
    } catch {
      return [];
    }
  },
  async salvarTurmas(o) {
    await storage.set("turmas:lista", JSON.stringify(o));
  },
  async carregarEstudantes() {
    try {
      const o = await storage.get(this.chaveDaTurma("turma:alunos"));
      return JSON.parse(o.value);
    } catch {
      return null;
    }
  },
  async salvarEstudantes(o) {
    await storage.set(this.chaveDaTurma("turma:alunos"), JSON.stringify(o));
  },
  async carregarObservacoes(o) {
    try {
      const u = await storage.get(`obs:${o}`);
      return JSON.parse(u.value);
    } catch {
      return [];
    }
  },
  async salvarObservacoes(o, u) {
    await storage.set(`obs:${o}`, JSON.stringify(u));
  },
  async carregarEvolucao(o) {
    try {
      const u = await storage.get(`evolucao:${o}`);
      return JSON.parse(u.value);
    } catch {
      return [];
    }
  },
  async salvarEvolucao(o, u) {
    await storage.set(`evolucao:${o}`, JSON.stringify(u));
  },
  async carregarRotinaPorData(o) {
    try {
      const u = await storage.get(this.chaveDaTurma(`rotina:${o}`));
      return JSON.parse(u.value);
    } catch {
      return {};
    }
  },
  async salvarRotinaPorData(o, u) {
    await storage.set(this.chaveDaTurma(`rotina:${o}`), JSON.stringify(u));
  },
  async salvarRotinaDoAluno(o, u, f) {
    const v = {
      ...((await this.carregarRotinaPorData(o)) || {}),
      [u]: {
        ...f,
        atualizadoEm: nowISO(),
      },
    };
    return (await this.salvarRotinaPorData(o, v), v);
  },
  async carregarRotinaDoDia() {
    return this.carregarRotinaPorData(dateKey(new Date()));
  },
  async listarTodasAsRotinas() {
    const o = this.prefixoDaTurma("rotina:"),
      u = await storage.list(o),
      f = {};
    for (const y of (u == null ? void 0 : u.keys) || [])
      try {
        const v = await storage.get(y);
        f[y.slice(o.length)] = JSON.parse(v.value);
      } catch {}
    return f;
  },
  async carregarOcorrenciasPorData(o) {
    try {
      const u = await storage.get(this.chaveDaTurma(`ocorrencias:${o}`));
      return JSON.parse(u.value);
    } catch {
      return [];
    }
  },
  async salvarOcorrenciasPorData(o, u) {
    await storage.set(this.chaveDaTurma(`ocorrencias:${o}`), JSON.stringify(u));
  },
  async adicionarOcorrencia(o, u) {
    const f = (await this.carregarOcorrenciasPorData(o)) || [],
      y = [
        {
          id: createId("ocor"),
          criadoEm: nowISO(),
          ...u,
        },
        ...f,
      ];
    return (await this.salvarOcorrenciasPorData(o, y), y);
  },
  async removerOcorrencia(o, u) {
    const y = ((await this.carregarOcorrenciasPorData(o)) || []).filter(
      (v) => v.id !== u,
    );
    return (await this.salvarOcorrenciasPorData(o, y), y);
  },
  async carregarOcorrenciasDoDia() {
    return this.carregarOcorrenciasPorData(dateKey(new Date()));
  },
  async listarTodasAsOcorrencias() {
    const o = this.prefixoDaTurma("ocorrencias:"),
      u = await storage.list(o),
      f = {};
    for (const y of (u == null ? void 0 : u.keys) || [])
      try {
        const v = await storage.get(y);
        f[y.slice(o.length)] = JSON.parse(v.value);
      } catch {}
    return f;
  },
  async carregarDiarioPorData(o) {
    try {
      const u = await storage.get(this.chaveDaTurma(`diario:${o}`));
      return JSON.parse(u.value);
    } catch {
      return null;
    }
  },
  async salvarDiarioPorData(o, u) {
    await storage.set(
      this.chaveDaTurma(`diario:${o}`),
      JSON.stringify({
        ...u,
        atualizadoEm: nowISO(),
      }),
    );
  },
  async carregarDiarioDoDia() {
    return this.carregarDiarioPorData(dateKey(new Date()));
  },
  async listarTodosOsDiarios() {
    const o = this.prefixoDaTurma("diario:"),
      u = await storage.list(o),
      f = {};
    for (const y of (u == null ? void 0 : u.keys) || [])
      try {
        const v = await storage.get(y);
        f[y.slice(o.length)] = JSON.parse(v.value);
      } catch {}
    return f;
  },
  async migrarEvolucaoParaRotina() {
    try {
      if (
        (await storage.get(`migracao:evolucao-rotina:${this.turmaAtivaId}`))
          .value === "feito"
      )
        return;
    } catch {}
    try {
      const o = (await this.carregarEstudantes()) || [];
      for (const u of o) {
        const f = await this.carregarEvolucao(u.id);
        if (!(!f || f.length === 0))
          for (const y of f) {
            const v = E0(y.data) || dateKey(new Date(y.criadoEm || Date.now()));
            (await this.salvarRotinaDoAluno(v, u.id, {
              alimentacao: y.alimentacao || "",
              comportamento: y.comportamento || "",
              sono: y.sono || "",
              texto: y.texto || "",
            }),
              y.machucou &&
                (await this.adicionarOcorrencia(v, {
                  alunoId: u.id,
                  alunoNome: u.nome,
                  descricao: y.machucouDescricao || "Se machucou",
                  hora: y.hora || "",
                })));
          }
      }
      await storage.set(
        `migracao:evolucao-rotina:${this.turmaAtivaId}`,
        "feito",
      );
    } catch (o) {
      console.error("Erro ao migrar evolução para rotina:", o);
    }
  },
  async carregarFotoPerfil(o) {
    try {
      const u = await storage.get(`foto-perfil:${o}`);
      try {
        return JSON.parse(u.value);
      } catch {
        return u.value;
      }
    } catch {
      return null;
    }
  },
  async salvarFotoPerfil(o, u) {
    await storage.set(
      `foto-perfil:${o}`,
      typeof u == "string" ? u : JSON.stringify(u),
    );
  },
  async removerFotoPerfil(o) {
    await storage.delete(`foto-perfil:${o}`).catch(() => {});
  },
  async carregarGaleria(o) {
    try {
      const u = await storage.get(`fotos:${o}`);
      return JSON.parse(u.value);
    } catch {
      return [];
    }
  },
  async salvarGaleria(o, u) {
    await storage.set(`fotos:${o}`, JSON.stringify(u));
  },
  async carregarPlanoPorData(o) {
    try {
      const u = await storage.get(this.chaveDaTurma(`planejamento:${o}`)),
        f = JSON.parse(u.value);
      return migrateLessonPlans(f, {
        dataKey: o,
        turmaId: this.turmaAtivaId,
      });
    } catch {
      return null;
    }
  },
  async salvarPlanoPorData(o, u) {
    await storage.set(
      this.chaveDaTurma(`planejamento:${o}`),
      JSON.stringify(u),
    );
  },
  async listarPlanosPorData() {
    const o = this.prefixoDaTurma("planejamento:"),
      u = await storage.list(o),
      f = {};
    for (const y of (u == null ? void 0 : u.keys) || [])
      if (y !== `${o}temas`)
        try {
          const v = await storage.get(y),
            E = y.slice(o.length);
          f[E] = migrateLessonPlans(JSON.parse(v.value), {
            dataKey: E,
            turmaId: this.turmaAtivaId,
          });
        } catch {}
    return f;
  },
  async carregarPlanoDoDia() {
    return this.carregarPlanoPorData(dateKey(new Date()));
  },
  async salvarPlanoDoDia(o) {
    return this.salvarPlanoPorData(dateKey(new Date()), o);
  },
  async salvarPlano(o) {
    return savePlan({ ...o, turmaId: o.turmaId || this.turmaAtivaId }, storage);
  },
  async removerPlano(o) {
    const f = ((await this.carregarPlanoPorData(o.dataKey)) || []).filter(
      (y) => y.id !== o.id,
    );
    return (await this.salvarPlanoPorData(o.dataKey, f), f);
  },
  async carregarTemasPlanejamento() {
    try {
      const o = await storage.get(this.chaveDaTurma("planejamento:temas"));
      return JSON.parse(o.value);
    } catch {
      return [];
    }
  },
  async salvarTemasPlanejamento(o) {
    await storage.set(
      this.chaveDaTurma("planejamento:temas"),
      JSON.stringify(o),
    );
  },
  async carregarChamadaDoDia() {
    try {
      const o = await storage.get(this.chaveDaTurma(np("chamada")));
      return JSON.parse(o.value);
    } catch {
      return {};
    }
  },
  async carregarChamadaPorData(o) {
    try {
      const u = await storage.get(this.chaveDaTurma(`chamada:${o}`));
      return JSON.parse(u.value);
    } catch {
      return {};
    }
  },
  async salvarChamadaDoDia(o) {
    await storage.set(this.chaveDaTurma(np("chamada")), JSON.stringify(o));
  },
  async salvarChamadaPorData(o, u) {
    await storage.set(this.chaveDaTurma(`chamada:${o}`), JSON.stringify(u));
  },
  async carregarJustificativasPorData(o) {
    try {
      const u = await storage.get(this.chaveDaTurma(`justificativas:${o}`));
      return JSON.parse(u.value);
    } catch {
      return {};
    }
  },
  async salvarJustificativaDoAluno(o, u, f) {
    const v = {
      ...((await this.carregarJustificativasPorData(o)) || {}),
      [u]: {
        ...f,
        criadoEm: nowISO(),
      },
    };
    return (
      await storage.set(
        this.chaveDaTurma(`justificativas:${o}`),
        JSON.stringify(v),
      ),
      v
    );
  },
  async removerJustificativaDoAluno(o, u) {
    const y = {
      ...((await this.carregarJustificativasPorData(o)) || {}),
    };
    return (
      delete y[u],
      await storage.set(
        this.chaveDaTurma(`justificativas:${o}`),
        JSON.stringify(y),
      ),
      y
    );
  },
  async listarTodasAsChamadas() {
    const o = this.prefixoDaTurma("chamada:"),
      u = await storage.list(o),
      f = {};
    for (const y of (u == null ? void 0 : u.keys) || [])
      try {
        const v = await storage.get(y);
        f[y.slice(o.length)] = JSON.parse(v.value);
      } catch {}
    return f;
  },
  async carregarTema() {
    try {
      return (await storage.get("config:theme")).value;
    } catch {
      return null;
    }
  },
  async salvarTema(o) {
    await storage.set("config:theme", o);
  },
  async carregarConfigSons() {
    try {
      return (await storage.get("config:sons")).value !== "0";
    } catch {
      return !0;
    }
  },
  async salvarConfigSons(o) {
    await storage.set("config:sons", o ? "1" : "0");
  },
};
const op = {
  async listarEstudantesExcluidos() {
    return ((await repository.carregarEstudantes()) || []).filter(
      (u) => u.deletedAt,
    );
  },
  async restaurarEstudante(o) {
    const u = await repository.carregarEstudantes();
    if (!u) return u;
    const f = u.map((y) =>
      y.id === o
        ? {
            ...y,
            deletedAt: null,
          }
        : y,
    );
    return (await repository.salvarEstudantes(f), f);
  },
  async excluirEstudanteDefinitivamente(o) {
    const u = await repository.carregarEstudantes();
    if (!u) return u;
    const f = u.filter((y) => y.id !== o);
    return (
      await purgeStudentData(o, repository.turmaAtivaId),
      await repository.salvarEstudantes(f),
      f
    );
  },
};
const b0 = new Set([
  "app_opened",
  "planning_created",
  "class_created",
  "student_created",
  "attendance_registered",
  "bncc_opened",
  "library_opened",
  "theme_changed",
  "profile_created",
]);
const Dn = {
  track(o, u = {}) {
    let enabled = false;
    try {
      enabled =
        JSON.parse(
          window.localStorage.getItem("config:analytics") || "false",
        ) === true;
    } catch {}
    if (!enabled) return;
    if (!b0.has(o)) {
      console.warn(`[analytics] evento não reconhecido, ignorado: "${o}"`);
      return;
    }
    console.debug("[analytics]", o, u);
  },
};
export function setAnalyticsEnabled(enabled) {
  try {
    window.localStorage.setItem(
      "config:analytics",
      JSON.stringify(Boolean(enabled)),
    );
  } catch {}
}
let Lo = null;
let Iu = !0;
export function setSoundEnabled(enabled) {
  Iu = enabled;
}
function Rt(o = 660) {
  if (Iu)
    try {
      Lo = Lo || new (window.AudioContext || window.webkitAudioContext)();
      const u = Lo.currentTime,
        f = Lo.createOscillator(),
        y = Lo.createGain();
      ((f.type = "sine"),
        f.frequency.setValueAtTime(o, u),
        y.gain.setValueAtTime(0, u),
        y.gain.linearRampToValueAtTime(0.06, u + 0.02),
        y.gain.exponentialRampToValueAtTime(0.001, u + 0.28),
        f.connect(y).connect(Lo.destination),
        f.start(u),
        f.stop(u + 0.3));
    } catch {}
}
function x0() {
  var o;
  [0, 260, 520].forEach((u, f) => setTimeout(() => Rt(f === 1 ? 980 : 820), u));
  try {
    (o = navigator.vibrate) == null ||
      o.call(navigator, [180, 90, 180, 90, 260]);
  } catch {}
}
function Yu(o) {
  return new Promise((u, f) => {
    const y = new FileReader();
    ((y.onload = () => u(y.result)), (y.onerror = f), y.readAsDataURL(o));
  });
}
function Avatar({ nome: nome, cor: cor, foto: foto, size = 40 }) {
  return foto
    ? React.createElement("img", {
        src: foto,
        alt: nome,
        style: {
          width: size,
          height: size,
          borderRadius: size / 2,
          objectFit: "cover",
          flexShrink: 0,
        },
      })
    : React.createElement(
        "div",
        {
          style: {
            width: size,
            height: size,
            borderRadius: size / 2,
            background: cor + "33",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: cor,
            fontSize: size * 0.38,
            flexShrink: 0,
          },
        },
        nome[0],
      );
}
const C0 = {
  "Ajuda e Tutoriais": "Ajuda e Tutoriais",
  "Backup e dados": "Backup e Dados",
  "Minhas turmas": "Minhas Turmas",
  "Editar perfil": "Editar Perfil",
  "Ferramentas de sala": "Ferramentas de Sala",
};
function Card({ children: children, style: style, onClick: onClick, className: className }) {
  if (
    !onClick &&
    typeof children == "string" &&
    /^(Carregando|Abrindo)\b/.test(children)
  )
    return React.createElement(LoadingState, {
      label: children,
    });
  if (!onClick && children === "Nenhum lembrete pendente.")
    return React.createElement(EmptyState, {
      compact: !0,
      icon: Ul,
      title: "Nenhum lembrete pendente",
      description:
        "Preencha o formulário acima para agendar o primeiro lembrete.",
    });
  const y = onClick
    ? (v) => {
        var b, _;
        const E =
          (_ = (b = v.target).closest) == null
            ? void 0
            : _.call(b, "button, a, input, select, textarea, [role='button']");
        (E && E !== v.currentTarget) || (Rt(600), onClick(v));
      }
    : void 0;
  return React.createElement(
    "div",
    {
      onClick: y,
      onKeyDown: onClick
        ? (v) => {
            (v.key === "Enter" || v.key === " ") && (v.preventDefault(), y(v));
          }
        : void 0,
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      className: `${className ? `${className} ` : ""}ui-card${onClick ? " ui-card-interactive press-fx touch-target" : ""}`,
      style: {
        background: colors.white,
        cursor: onClick ? "pointer" : "default",
        ...style,
      },
    },
    children,
  );
}
function IconTile({ color: color, Icon: Icon, size = 38 }) {
  return React.createElement(
    "div",
    {
      style: {
        width: size,
        height: size,
        borderRadius: size / 2.6,
        background: color + "22",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      },
    },
    React.createElement(Icon, {
      size: size * 0.5,
      color: color,
      "aria-hidden": "true",
    }),
  );
}
function Chip({ label: label, active: active, onClick: onClick }) {
  return React.createElement(
    "button",
    {
      type: "button",
      className: "ui-chip press-fx touch-target",
      onClick: onClick,
      disabled: !onClick,
      "aria-pressed": onClick ? !!active : void 0,
      style: {
        background: active ? colors.primary : colors.primaryLight,
        color: active ? colors.onPrimary : colors.primaryDark,
        whiteSpace: "nowrap",
        opacity: onClick ? 1 : 0.72,
      },
    },
    label,
  );
}
function Button({
  children: children,
  onClick: onClick,
  style: style,
  disabled: disabled,
  type = "button",
}) {
  return React.createElement(
    "button",
    {
      type: type,
      className: "ui-button ui-button-primary press-fx touch-target",
      onClick: onClick,
      disabled: disabled,
      style: {
        width: "100%",
        background: disabled
          ? colors.border
          : colors.gradient || colors.primary,
        color: disabled ? colors.gray : colors.onPrimary,
        ...style,
      },
    },
    children,
  );
}
function EmptyState({
  icon = Lp,
  title: title,
  description: description,
  actionLabel: actionLabel,
  onAction: onAction,
  compact = !1,
  celebrate = !1,
  illustration: illustration,
}) {
  return React.createElement(
    "div",
    {
      className: `empty-state${compact ? " empty-state-compact" : ""}${celebrate ? " success-celebration" : ""}`,
      role: "status",
    },
    illustration
      ? React.createElement(MotionIllustration, {
          variant: illustration,
          className: "empty-state-lottie",
          colors: {
            primary: colors.primary,
            primaryDark: colors.primaryDark,
            primaryLight: colors.primaryLight,
            surface: colors.white,
          },
        })
      : React.createElement(
          "div",
          {
            className: "empty-state-icon",
            style: {
              background: colors.primaryLight,
              color: colors.primary,
            },
            "aria-hidden": "true",
          },
          React.createElement(icon, {
            size: compact ? 24 : 30,
          }),
        ),
    React.createElement(
      "div",
      {
        className: "empty-state-title",
        style: {
          color: colors.dark,
        },
      },
      title,
    ),
    description &&
      React.createElement(
        "div",
        {
          className: "empty-state-description",
          style: {
            color: colors.gray,
          },
        },
        description,
      ),
    actionLabel &&
      onAction &&
      React.createElement(
        Button,
        {
          onClick: onAction,
          style: {
            width: "auto",
            minWidth: 170,
            marginTop: 4,
          },
        },
        actionLabel,
      ),
  );
}
function LoadingState({ label = "Carregando..." }) {
  return React.createElement(
    "div",
    {
      className: "state-feedback",
      role: "status",
      "aria-live": "polite",
    },
    React.createElement("span", {
      className: "state-spinner",
      "aria-hidden": "true",
    }),
    label,
  );
}
function ErrorState({ message: message, onRetry: onRetry }) {
  return React.createElement(
    "div",
    {
      className: "state-feedback state-feedback-error",
      role: "alert",
    },
    React.createElement(Tp, {
      "aria-hidden": "true",
      size: 22,
    }),
    React.createElement("span", null, message),
    onRetry &&
      React.createElement(
        "button",
        {
          className: "press-fx touch-target",
          onClick: onRetry,
        },
        "Tentar novamente",
      ),
  );
}
function SuccessState({ message: message }) {
  return React.createElement(
    "div",
    {
      className: "state-feedback state-feedback-success success-celebration",
      role: "status",
      "aria-live": "polite",
    },
    React.createElement(Zr, {
      "aria-hidden": "true",
      size: 22,
    }),
    message,
  );
}
let Wl = null;
function confirmAction(o) {
  return Wl
    ? Wl(
        typeof o == "string"
          ? {
              message: o,
            }
          : o,
      )
    : Promise.resolve(!1);
}
function ConfirmationDialog() {
  const [o, u] = ReactHooks.useState(null);
  const dialogRef = ReactHooks.useRef(null);
  const returnFocusRef = ReactHooks.useRef(null);
  const f = (y) => {
    if (!o) return;
    (o.resolve(y), u(null));
  };
  ReactHooks.useEffect(
    () => (
      (Wl = (y) =>
        new Promise((v) =>
          u({
            title: "Confirmar ação",
            confirmLabel: "Confirmar",
            destructive: !0,
            ...y,
            resolve: v,
          }),
        )),
      () => {
        Wl = null;
      }
    ),
    [],
  );
  ReactHooks.useEffect(() => {
    const dialog = dialogRef.current;
    if (!o || !dialog) return undefined;
    returnFocusRef.current = document.activeElement;
    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll(
          "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      );
    const focusFirst = () => {
      const focusable = getFocusable();
      (focusable[0] || dialog).focus();
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        f(!1);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(focusFirst, 0);
    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
      const previous = returnFocusRef.current;
      if (previous && typeof previous.focus === "function") previous.focus();
      returnFocusRef.current = null;
    };
  }, [o]);
  if (!o) return null;
  return React.createElement(
    "div",
    {
      className: "modal-overlay",
      role: "presentation",
      onClick: () => f(!1),
    },
    React.createElement(
      "div",
      {
        className: "ui-dialog",
        ref: dialogRef,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "confirm-dialog-title",
        onClick: (y) => y.stopPropagation(),
        style: {
          background: colors.white,
        },
      },
      React.createElement(
        "div",
        {
          id: "confirm-dialog-title",
          style: {
            fontSize: 17,
            fontWeight: 800,
            color: colors.dark,
          },
        },
        o.title,
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 14,
            color: colors.gray,
            lineHeight: 1.5,
            marginTop: 7,
          },
        },
        o.message,
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
            marginTop: 18,
          },
        },
        React.createElement(
          "button",
          {
            className: "ui-button ui-button-secondary press-fx touch-target",
            autoFocus: !0,
            onClick: () => f(!1),
            style: {
              flex: 1,
              color: colors.dark,
              background: colors.white,
              borderColor: colors.border,
            },
          },
          "Cancelar",
        ),
        React.createElement(
          "button",
          {
            className: "ui-button press-fx touch-target",
            onClick: () => f(!0),
            style: {
              flex: 1,
              border: "none",
              background: o.destructive ? colors.red : colors.primary,
              color: "#fff",
            },
          },
          o.confirmLabel,
        ),
      ),
    ),
  );
}
const ws = "onboarding:rascunho:v2";
const No = ["dia", "criancas", "registros", "historico", "gestao"];
const Q0 = [
  "Atestado médico",
  "Doença / mal-estar",
  "Compromisso familiar",
  "Viagem",
  "Transporte",
  "Motivo informado pela família",
  "Outro",
];
const Up = {
  conhecendo: [
    {
      tab: "inicio",
      target: '[data-tour="nav-inicio"]',
      titulo: "Início",
      texto:
        "Aqui você encontra o que precisa fazer agora: plano, frequência e rotina do dia.",
    },
    {
      tab: "plano",
      target: '[data-tour="nav-plano"]',
      titulo: "Planejamento",
      texto: "Seus planos ficam organizados por dia, semana e calendário.",
    },
    {
      tab: "biblioteca",
      target: '[data-tour="nav-biblioteca"]',
      titulo: "Arquivos",
      texto: "Organize seus materiais pedagógicos em pastas.",
    },
    {
      tab: "turma",
      target: '[data-tour="nav-turma"]',
      titulo: "Turma",
      texto:
        "Alunos, frequência, registros e recursos da turma ficam juntos aqui.",
    },
    {
      tab: "mais",
      target: '[data-tour="nav-mais"]',
      titulo: "Mais",
      texto: "BNCC, documentos, configurações e ajuda ficam aqui.",
    },
  ],
  "primeiro-plano": [
    {
      tab: "plano",
      target: '[data-tour="nav-plano"]',
      titulo: "Abra Planejar",
      texto: "Vamos começar pelo espaço onde seus planos são organizados.",
    },
    {
      tab: "plano",
      target: '[data-tour="novo-plano-dia"]',
      titulo: "Crie o plano",
      texto: "Toque em ‘Novo plano’ para começar.",
    },
  ],
};
export {
  Bo,
  dateKey,
  repository,
  storage,
  nowISO,
  createId,
  E0,
  migrateLessonPlans,
  createLessonPlan,
  np,
  Ol,
  u0,
  c0,
  Cu,
  Gu,
  Rp,
  Dn,
  b0,
  ws,
  colors,
  p0,
  f0,
  Au,
  ep,
  Pu,
  Ro,
  d0,
  Rt,
  Iu,
  Lo,
  Nh,
  confirmAction,
  Wl,
  ScreenHeader,
  C0,
  Avatar,
  Chip,
  Card,
  LoadingState,
  EmptyState,
  MotionIllustration,
  o0,
  Pg,
  gg,
  vg,
  yg,
  Eg,
  kg,
  wg,
  Sg,
  bg,
  xg,
  Cg,
  Og,
  Ag,
  _g,
  Tg,
  Ig,
  zg,
  Mg,
  Fg,
  Lg,
  Ng,
  Rg,
  Jg,
  Dg,
  jg,
  Bg,
  $g,
  Wg,
  qg,
  Vg,
  Ug,
  Hg,
  Gg,
  i0,
  Qg,
  Yg,
  Xg,
  Kg,
  Zg,
  e0,
  t0,
  r0,
  a0,
  n0,
  s0,
  l0,
  Nl,
  Button,
  Input,
  Yu,
  ErrorState,
  IconTile,
  Ki,
  _u,
  Tu,
  Qu,
  Ps,
  Ju,
  dp,
  Su,
  th,
  SuccessState,
  Up,
  op,
  Yf,
  x0,
  As,
  rp,
  SearchInput,
  m0,
  Dp,
  jp,
  y0,
  Q0,
  h0,
  S0,
  ip,
  w0,
  tp,
  k0,
  No,
  g0,
  v0,
  ConfirmationDialog,
};
Object.assign(Up, {
  "primeira-turma": [
    {
      tab: "mais",
      target: '[data-tour="nav-mais"]',
      titulo: "Crie uma turma",
      texto:
        "Abra Mais → Minhas turmas. Toque em Nova turma e preencha nome, nível ou ano e turno. Salve para começar.",
    },
    {
      tab: "turma",
      target: '[data-tour="nav-turma"]',
      titulo: "Cadastre os alunos",
      texto:
        "Na turma ativa, abra Alunos → Adicionar aluno. Informe nome e nascimento; foto e responsável são opcionais.",
    },
  ],
  "primeira-chamada": [
    {
      tab: "turma",
      target: '[data-tour="nav-turma"]',
      titulo: "Escolha o dia",
      texto: "Abra a aba Dia na turma e selecione a data da chamada.",
    },
    {
      tab: "turma",
      target: '[data-tour="nav-turma"]',
      titulo: "Faça a chamada",
      texto:
        "Toque em Fazer chamada. Marque presença, atraso ou falta para cada aluno. Cada toque é salvo automaticamente. Toque na mesma marcação para removê-la.",
    },
    {
      tab: "turma",
      target: '[data-tour="nav-turma"]',
      titulo: "Justifique uma ausência",
      texto:
        "Ao marcar falta, use Justificar ausência para informar o motivo. O histórico mantém a justificativa associada à data.",
    },
  ],
  calendario: [
    {
      tab: "plano",
      target: '[data-tour="nav-plano"]',
      titulo: "Navegue no calendário",
      texto:
        "Alterne Dia, Semana e Calendário. Use as setas para navegar entre datas; toque num dia para consultar os planos.",
    },
    {
      tab: "plano",
      target: '[data-tour="nav-plano"]',
      titulo: "Crie um compromisso",
      texto:
        "Em Compromissos, toque no botão +. Informe título, data e horário. Você pode marcar como concluído ou excluir depois.",
    },
  ],
  "bncc-plano": [
    {
      tab: "plano",
      target: '[data-tour="novo-plano-dia"]',
      titulo: "Abra um plano",
      texto: "Crie ou abra um plano e entre na seção BNCC.",
    },
    {
      tab: "plano",
      target: '[data-tour="nav-plano"]',
      titulo: "Escolha as habilidades",
      texto:
        "Filtre por etapa e componente, procure pelo código ou palavra-chave e selecione as habilidades. Elas ficam vinculadas ao plano quando você salva.",
    },
  ],
  registro: [
    {
      tab: "turma",
      target: '[data-tour="nav-turma"]',
      titulo: "Registre o acompanhamento",
      texto:
        "Na turma, use Registros para escrever o diário ou uma ocorrência. No perfil do aluno, adicione observações, fotos e áudios.",
    },
    {
      tab: "turma",
      target: '[data-tour="nav-turma"]',
      titulo: "Consulte o histórico",
      texto:
        "Os registros ficam associados ao aluno ou ao dia escolhido. Use Histórico para revisar datas anteriores.",
    },
  ],
  frequencia: [
    {
      tab: "turma",
      target: '[data-tour="nav-turma"]',
      titulo: "Veja a frequência",
      texto:
        "Os cartões dos alunos mostram a frequência registrada. Atrasos contam como comparecimento e dias sem marcação não contam como falta.",
    },
    {
      tab: "mais",
      target: '[data-tour="nav-mais"]',
      titulo: "Gere um relatório",
      texto:
        "Abra Mais → Relatórios. Escolha turma, aluno ou período; confira os registros e exporte a cópia.",
    },
  ],
});
