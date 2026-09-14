import infantil from "../data/bncc.json";
import academic from "../data/bncc-fundamental-medio.json";
import type { EducationStage } from "./education";
const components: Record<string, string> = {
  LP: "Língua Portuguesa",
  MA: "Matemática",
  CI: "Ciências",
  GE: "Geografia",
  HI: "História",
  AR: "Arte",
  EF: "Educação Física",
  LI: "Língua Inglesa",
  ER: "Ensino Religioso",
  LGG: "Linguagens e suas Tecnologias",
  MAT: "Matemática e suas Tecnologias",
  CNT: "Ciências da Natureza e suas Tecnologias",
  CHS: "Ciências Humanas e Sociais Aplicadas",
};
export interface Skill {
  codigo: string;
  texto: string;
  campo: string;
  faixa: string;
  etapas: EducationStage[];
  componente: string;
  area: string;
  anos: number[];
  competencia: string;
  pagina?: number;
}
function metadata(code: string) {
  const middle = code.slice(0, 2) === "EM";
  const part = code.match(/^E[FM]\d{2}([A-Z]+)/)![1];
  const component = components[part] || part;
  const start = Number(code[2]),
    end = Number(code[3]);
  const years = middle
    ? []
    : start === 0
      ? [end]
      : Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const etapas: EducationStage[] = middle
    ? ["ensino_medio"]
    : [
        ...(years.some((y) => y <= 5)
          ? ["fundamental_anos_iniciais" as const]
          : []),
        ...(years.some((y) => y >= 6)
          ? ["fundamental_anos_finais" as const]
          : []),
      ];
  const area = middle
    ? part === "LP"
      ? "Linguagens e suas Tecnologias"
      : component
    : ["LP", "AR", "EF", "LI"].includes(part)
      ? "Linguagens"
      : ["HI", "GE"].includes(part)
        ? "Ciências Humanas"
        : component === "Ciências"
          ? "Ciências da Natureza"
          : component;
  return {
    etapas,
    componente: component,
    area,
    anos: years,
    competencia: middle && part !== "LP" ? code.slice(-3, -2) : "",
  };
}
export const bnccCatalog: Skill[] = [
  ...infantil.map((s) => ({
    ...s,
    texto: s.descricao,
    etapas: ["educacao_infantil" as const],
    componente: "",
    area: "",
    anos: [],
    competencia: "",
  })),
  ...academic.map((s) => ({
    ...s,
    campo: "",
    faixa: "",
    ...metadata(s.codigo),
  })),
];
export function searchSkills({
  stage,
  query = "",
  group = "",
  year = "",
  favorites,
}: {
  stage: EducationStage;
  query?: string;
  group?: string;
  year?: string;
  favorites?: string[];
}) {
  const normalize = (v: string) =>
    v
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const words = normalize(query).split(/\s+/).filter(Boolean);
  return bnccCatalog.filter(
    (s) =>
      s.etapas.includes(stage) &&
      (!group || s.campo === group || s.componente === group) &&
      (!year || s.faixa === year || s.anos.includes(Number(year))) &&
      (!favorites || favorites.includes(s.codigo)) &&
      words.every((word) =>
        normalize(
          `${s.codigo} ${s.texto} ${s.campo} ${s.componente} ${s.area}`,
        ).includes(word),
      ),
  );
}
