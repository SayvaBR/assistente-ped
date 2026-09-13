export type AssessmentSystem =
  "nota_numerica" | "conceito" | "qualitativa" | "mista";
export type AverageMethod = "simples" | "ponderada" | "soma" | "personalizada";
export type RecoveryPolicy = "menor" | "especifica" | "somar" | "separada";
export interface Period {
  id: string;
  nome: string;
  inicio: string;
  fim: string;
  arquivado?: boolean;
}
export interface GradeSettings {
  sistema: AssessmentSystem;
  escala: number;
  limite: number | null;
  metodo: AverageMethod;
  /** Expressão opcional usando A1, A2... na ordem das avaliações (ex.: A1 * 0.4 + A2 * 0.6). */
  formula?: string;
  conceitos: string[];
  periodos: Period[];
}
export interface Grade {
  valor: number | null;
  conceito: string;
  parecer: string;
  status: "avaliado" | "ausente" | "nao_entregue" | "pendente";
}
export interface Assessment {
  id: string;
  titulo: string;
  componente: string;
  data: string;
  periodoId: string;
  tipo: string;
  maximo: number;
  peso: number;
  descricao: string;
  notas: Record<string, Grade>;
  recuperacao?: { politica: RecoveryPolicy; avaliacaoId?: string };
  arquivadaEm?: string | null;
}
export interface AcademicData {
  versao: 1;
  config: GradeSettings;
  avaliacoes: Assessment[];
}
export function emptyAcademic(): AcademicData {
  return {
    versao: 1,
    config: {
      sistema: "nota_numerica",
      escala: 10,
      limite: null,
      metodo: "ponderada",
      formula: "",
      conceitos: ["A", "B", "C", "D"],
      periodos: [],
    },
    avaliacoes: [],
  };
}
export function parseGrade(value: string, max: number): number | null {
  if (!value.trim()) return null;
  const normalized = value.trim().replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(normalized))
    throw new Error("Informe uma nota válida.");
  const number = Number(normalized);
  if (!Number.isFinite(number) || number < 0 || number > max)
    throw new Error(`A nota deve estar entre 0 e ${max}.`);
  return number;
}
/** Merge a field edit with the latest result, preserving concurrently edited fields. */
export function patchGrade(
  current: Grade,
  patch: Partial<Grade>,
  system: AssessmentSystem,
): Grade {
  const next = { ...current, ...patch };
  if (patch.status === undefined) {
    const hasResult =
      system === "nota_numerica"
        ? next.valor !== null
        : system === "conceito"
          ? !!next.conceito.trim()
          : system === "qualitativa"
            ? !!next.parecer.trim()
            : next.valor !== null ||
              !!next.conceito.trim() ||
              !!next.parecer.trim();
    const editsResult =
      patch.valor !== undefined ||
      patch.conceito !== undefined ||
      system === "qualitativa";
    if (editsResult) next.status = hasResult ? "avaliado" : "pendente";
  }
  return next;
}
export function validateAcademic(data: AcademicData) {
  if (
    !data ||
    data.versao !== 1 ||
    !data.config ||
    !Array.isArray(data.avaliacoes)
  )
    throw new Error(
      "Os dados de avaliação estão incompletos ou incompatíveis.",
    );
  const { config } = data;
  if (
    !Array.isArray(config.periodos) ||
    !Array.isArray(config.conceitos) ||
    !["nota_numerica", "conceito", "qualitativa", "mista"].includes(
      config.sistema,
    ) ||
    !["simples", "ponderada", "soma", "personalizada"].includes(config.metodo)
  )
    throw new Error("Confira o sistema de avaliação e o cálculo das médias.");
  if (config.metodo === "personalizada" && !config.formula?.trim())
    throw new Error("Informe a fórmula personalizada da média.");
  if (
    ["conceito", "mista"].includes(config.sistema) &&
    (!config.conceitos.length ||
      config.conceitos.some((c) => typeof c !== "string" || !c.trim()) ||
      new Set(config.conceitos.map((c) => c.trim())).size !==
        config.conceitos.length)
  )
    throw new Error("Informe conceitos diferentes e sem opções vazias.");
  if (!Number.isFinite(config.escala) || config.escala <= 0)
    throw new Error("Informe uma escala maior que zero.");
  if (
    config.limite !== null &&
    (!Number.isFinite(config.limite) ||
      config.limite < 0 ||
      config.limite > config.escala)
  )
    throw new Error("O limite deve estar dentro da escala.");
  if (new Set(config.periodos.map((p) => p.id)).size !== config.periodos.length)
    throw new Error("Há períodos duplicados.");
  for (const period of config.periodos)
    if (
      !period.id ||
      !period.nome?.trim() ||
      (period.inicio && !validDate(period.inicio)) ||
      (period.fim && !validDate(period.fim)) ||
      (period.inicio && period.fim && period.inicio > period.fim)
    )
      throw new Error("Confira o nome e as datas dos períodos.");
  if (new Set(data.avaliacoes.map((a) => a.id)).size !== data.avaliacoes.length)
    throw new Error("Há avaliações com identificadores duplicados.");
  for (const assessment of data.avaliacoes) {
    if (
      !assessment.id ||
      !assessment.titulo?.trim() ||
      !assessment.componente?.trim() ||
      !validDate(assessment.data) ||
      !config.periodos.some((p) => p.id === assessment.periodoId)
    )
      throw new Error(
        "Preencha título, componente, data e período da avaliação.",
      );
    if (
      !Number.isFinite(assessment.maximo) ||
      assessment.maximo <= 0 ||
      !Number.isFinite(assessment.peso) ||
      assessment.peso <= 0
    )
      throw new Error("Valor e peso devem ser maiores que zero.");
    if (
      !assessment.notas ||
      typeof assessment.notas !== "object" ||
      Array.isArray(assessment.notas)
    )
      throw new Error("Confira os resultados da avaliação.");
    for (const grade of Object.values(assessment.notas)) {
      if (
        !grade ||
        !["avaliado", "ausente", "nao_entregue", "pendente"].includes(
          grade.status,
        ) ||
        typeof grade.parecer !== "string" ||
        typeof grade.conceito !== "string"
      )
        throw new Error("Confira a situação e os campos dos resultados.");
      if (grade.valor !== null)
        parseGrade(String(grade.valor), assessment.maximo);
    }
    if (
      assessment.recuperacao &&
      !["menor", "especifica", "somar", "separada"].includes(
        assessment.recuperacao.politica,
      )
    )
      throw new Error("Escolha uma regra de recuperação válida.");
    if (
      assessment.recuperacao?.politica === "especifica" &&
      !data.avaliacoes.some(
        (a) =>
          a.id === assessment.recuperacao?.avaliacaoId &&
          !a.recuperacao &&
          a.periodoId === assessment.periodoId &&
          a.componente === assessment.componente,
      )
    )
      throw new Error(
        "Escolha uma avaliação do mesmo componente e período para recuperar.",
      );
  }
}
function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}
export function calculateAverage(
  studentId: string,
  assessments: Assessment[],
  config: GradeSettings,
) {
  const active = assessments.filter((a) => !a.arquivadaEm);
  const entries = active
    .filter((a) => !a.recuperacao)
    .flatMap((a) => {
      const grade = a.notas[studentId];
      return grade?.status === "avaliado" && grade.valor !== null
        ? [
            {
              id: a.id,
              title: a.titulo,
              value: (grade.valor / a.maximo) * config.escala,
              raw: grade.valor,
              max: a.maximo,
              weight: a.peso,
            },
          ]
        : [];
    });
  const notes: string[] = [];
  let extra = 0;
  for (const recovery of active.filter((a) => a.recuperacao)) {
    const grade = recovery.notas[studentId];
    if (!grade || grade.status !== "avaliado" || grade.valor === null) continue;
    const normalized = (grade.valor / recovery.maximo) * config.escala;
    if (recovery.recuperacao!.politica === "somar") {
      extra += config.metodo === "soma" ? grade.valor : normalized;
      notes.push(`${recovery.titulo}: +${grade.valor}`);
      continue;
    }
    const target =
      recovery.recuperacao!.politica === "menor"
        ? [...entries].sort((a, b) => a.value - b.value)[0]
        : entries.find((e) => e.id === recovery.recuperacao!.avaliacaoId);
    if (recovery.recuperacao!.politica !== "separada" && target) {
      target.value = normalized;
      target.raw = (grade.valor / recovery.maximo) * target.max;
      notes.push(`${target.title} substituída por ${recovery.titulo}`);
    }
  }
  if (!entries.length)
    return {
      value: null,
      formula: "Nenhuma nota numérica avaliada neste período.",
      notes,
    };
  if (config.metodo === "personalizada") {
    const formulaValues = active
      .filter((assessment) => !assessment.recuperacao)
      .map(
        (assessment) =>
          entries.find((entry) => entry.id === assessment.id)?.value ?? null,
      );
    const value = evaluateFormula(config.formula || "", formulaValues);
    return {
      value: Math.round(value * 100) / 100,
      formula: `${config.formula} · avaliações convertidas para a escala ${config.escala}.`,
      notes,
    };
  }
  const weight = entries.reduce(
    (sum, e) => sum + (config.metodo === "ponderada" ? e.weight : 1),
    0,
  );
  const sum = entries.reduce(
    (sum, e) =>
      sum +
      (config.metodo === "soma"
        ? e.raw
        : e.value * (config.metodo === "ponderada" ? e.weight : 1)),
    0,
  );
  const result = (config.metodo === "soma" ? sum : sum / weight) + extra;
  return {
    value: Math.round(result * 100) / 100,
    formula:
      config.metodo === "soma"
        ? `Soma dos pontos lançados (${sum}) + recuperação (${extra}).`
        : `(${entries.map((e) => `${e.value.toFixed(2)}${config.metodo === "ponderada" ? ` × ${e.weight}` : ""}`).join(" + ")}) ÷ ${weight}${extra ? ` + ${extra}` : ""}. Notas convertidas para a escala ${config.escala}.`,
    notes,
  };
}

/** Avalia apenas números, A1..A99, parênteses e + - * /. Não usa eval. */
function evaluateFormula(source: string, values: Array<number | null>) {
  const tokens = source
    .replace(/,/g, ".")
    .match(/A\d+|\d+(?:\.\d+)?|[()+\-*/]/g);
  if (
    !tokens ||
    tokens.join("") !== source.replace(/\s+/g, "").replace(/,/g, ".")
  )
    throw new Error("Use uma fórmula como A1 * 0,4 + A2 * 0,6.");
  const precedence: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2 };
  const output: string[] = [],
    ops: string[] = [];
  for (const token of tokens) {
    if (/^A\d+$/.test(token) || /^\d/.test(token)) output.push(token);
    else if (token === "(") ops.push(token);
    else if (token === ")") {
      while (ops.length && ops.at(-1) !== "(") output.push(ops.pop()!);
      if (ops.pop() !== "(")
        throw new Error("Confira os parênteses da fórmula.");
    } else {
      while (
        ops.length &&
        ops.at(-1) !== "(" &&
        precedence[ops[ops.length - 1]] >= precedence[token]
      )
        output.push(ops.pop()!);
      ops.push(token);
    }
  }
  while (ops.length) {
    const op = ops.pop()!;
    if (op === "(") throw new Error("Confira os parênteses da fórmula.");
    output.push(op);
  }
  const stack: number[] = [];
  for (const token of output) {
    if (/^A\d+$/.test(token)) {
      const index = Number(token.slice(1)) - 1;
      if (
        !Number.isInteger(index) ||
        values[index] === undefined ||
        values[index] === null
      )
        throw new Error(`${token} não corresponde a uma avaliação preenchida.`);
      stack.push(values[index]);
    } else if (/^\d/.test(token)) stack.push(Number(token));
    else {
      const b = stack.pop(),
        a = stack.pop();
      if (a === undefined || b === undefined || (token === "/" && b === 0))
        throw new Error("A fórmula não pôde ser calculada.");
      stack.push(
        token === "+"
          ? a + b
          : token === "-"
            ? a - b
            : token === "*"
              ? a * b
              : a / b,
      );
    }
  }
  if (stack.length !== 1 || !Number.isFinite(stack[0]))
    throw new Error("A fórmula não pôde ser calculada.");
  return stack[0];
}
