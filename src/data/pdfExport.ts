import { jsPDF } from "jspdf";
import fonts from "./pdfFonts.json";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import type { LessonPlan } from "../domain/models";
import { bnccCatalog } from "../domain/bncc";
export interface PdfSection {
  title: string;
  paragraphs: string[];
}
export interface PdfDocument {
  title: string;
  subtitle?: string;
  sections: PdfSection[];
}
export function buildPdf(content: PdfDocument) {
  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  pdf.addFileToVFS("Nunito-Regular.ttf", fonts.regular);
  pdf.addFont("Nunito-Regular.ttf", "Nunito", "normal");
  pdf.addFileToVFS("Nunito-Bold.ttf", fonts.bold);
  pdf.addFont("Nunito-Bold.ttf", "Nunito", "bold");
  pdf.setProperties({ title: content.title, creator: "Assistente Pedagógico" });
  let y = 22;
  const clean = (text: string) =>
    String(text).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "");
  const newPage = () => {
    pdf.addPage();
    y = 22;
  };
  const write = (text: string, size: number, bold = false) => {
    pdf.setFont("Nunito", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(16, 42, 86);
    const lines = pdf.splitTextToSize(clean(text), 174) as string[];
    const lineHeight = size * 0.48;
    for (const line of lines) {
      if (y + lineHeight > 276) newPage();
      pdf.text(line, 18, y);
      y += lineHeight;
    }
    y += 3;
  };
  write("ASSISTENTE PEDAGÓGICO", 9, true);
  y += 3;
  write(content.title, 22, true);
  if (content.subtitle) write(content.subtitle, 10);
  y += 5;
  for (const section of content.sections) {
    pdf.setFont("Nunito", "normal");
    pdf.setFontSize(11);
    const height =
      18 +
      section.paragraphs.reduce(
        (sum, p) => sum + pdf.splitTextToSize(clean(p), 174).length * 5.28 + 3,
        0,
      );
    if (y > 247 || (height < 240 && y + height > 276)) newPage();
    pdf.setDrawColor(28, 176, 246);
    pdf.line(18, y - 6, 192, y - 6);
    write(section.title, 13, true);
    for (const paragraph of section.paragraphs) write(paragraph, 11);
    y += 7;
  }
  const pages = pdf.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    pdf.setPage(page);
    pdf.setFont("Nunito", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(100, 110, 125);
    pdf.text("Registro de apoio pedagógico · Assistente Pedagógico", 18, 286);
    pdf.text(`${page} / ${pages}`, 192, 286, { align: "right" });
  }
  return pdf;
}
export async function sharePdf(filename: string, content: PdfDocument) {
  const pdf = buildPdf(content);
  if (Capacitor.isNativePlatform()) {
    const data = pdf.output("datauristring").split(",")[1];
    const file = await Filesystem.writeFile({
      path: filename,
      data,
      directory: Directory.Cache,
    });
    await Share.share({
      title: content.title,
      files: [file.uri],
      dialogTitle: "Salvar ou compartilhar PDF",
    });
  } else {
    pdf.save(filename);
  }
}
export function lessonPdf(plan: LessonPlan): PdfDocument {
  return {
    title: plan.tituloTema || "Plano de aula",
    subtitle: `${plan.dataKey.split("-").reverse().join("/")} · ${plan.horaInicio || ""}${plan.horaFim ? " a " + plan.horaFim : ""} · ${plan.status}`,
    sections: [
      {
        title: "Objetivos",
        paragraphs: [plan.objetivoGeral, ...plan.objetivosEspecificos].filter(
          Boolean,
        ),
      },
      {
        title: "BNCC",
        paragraphs: plan.bncc.habilidades.map((code) => {
          const skill = bnccCatalog.find((s) => s.codigo === code);
          return `${code} - ${skill?.texto || "Código vinculado ao plano"}`;
        }),
      },
      ...plan.momentos.map((moment, i) => ({
        title: `${i + 1}. ${moment.titulo || "Momento da aula"}`,
        paragraphs: [
          moment.horario,
          moment.duracaoMin ? `${moment.duracaoMin} minutos` : "",
          moment.descricao,
        ].filter(Boolean),
      })),
      ...[
        ["Recursos", plan.recursos],
        ["Avaliação", plan.avaliacao],
        ["Inclusão e adaptações", plan.inclusao],
        ["Observações", plan.observacoes],
        [
          "Pós-aula",
          [plan.posAula.comoFoi, plan.posAula.observacoesPosAula]
            .filter(Boolean)
            .join("\n"),
        ],
      ]
        .filter(([, text]) => !!text)
        .map(([title, text]) => ({ title, paragraphs: [text] })),
    ].filter((section) => section.paragraphs.length),
  };
}
