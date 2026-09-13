import { validateBirthDate } from "../data/classes.js";
export interface ImportRow {
  line: number;
  nome: string;
  dataNascimento: string;
  error: string;
}
export function parseStudentList(text: string): ImportRow[] {
  const lines = text
    .replace(/^\ufeff/, "")
    .split(/\r?\n/)
    .filter((line) => line.trim());
  if (lines.length > 1001)
    throw new Error("Importe no máximo 1.000 alunos por vez.");
  const delimiter = lines[0]?.includes(";")
    ? ";"
    : lines[0]?.includes("\t")
      ? "\t"
      : ",";
  const split = (line: string) => {
    const cells: string[] = [];
    let value = "",
      quoted = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (quoted && line[i + 1] === '"') {
          value += '"';
          i++;
        } else quoted = !quoted;
      } else if (c === delimiter && !quoted) {
        cells.push(value.trim());
        value = "";
      } else value += c;
    }
    if (quoted) throw new Error("Há aspas não fechadas no CSV.");
    cells.push(value.trim());
    return cells;
  };
  const header = lines[0]
    ? split(lines[0]).map((c) =>
        c
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      )
    : [];
  const hasHeader = header.includes("nome") || header.includes("aluno");
  const nameIndex = hasHeader
    ? Math.max(header.indexOf("nome"), header.indexOf("aluno"))
    : 0;
  const birthIndex = header.findIndex((h) =>
    ["nascimento", "data de nascimento", "datanascimento"].includes(h),
  );
  return lines.slice(hasHeader ? 1 : 0).map((line, index) => {
    const cells = split(line);
    const nome = cells[nameIndex] || "";
    let birth = birthIndex < 0 ? "" : cells[birthIndex] || "";
    let error = "";
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(birth))
      birth = birth.split("/").reverse().join("-");
    if (nome.length < 2 || nome.length > 150)
      error = "O nome deve ter de 2 a 150 caracteres.";
    if (birth)
      try {
        validateBirthDate(birth);
      } catch {
        error = "Data de nascimento inválida.";
      }
    return {
      line: index + (hasHeader ? 2 : 1),
      nome,
      dataNascimento: birth,
      error,
    };
  });
}
