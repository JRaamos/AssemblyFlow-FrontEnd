import jsPDF from "jspdf";

import { savePdf } from "./downloads";

const HEADER_FILL = [222, 220, 200];
const BLACK = [12, 12, 12];

const drawCell = (pdf, {
  x,
  y,
  width,
  height,
  text = "",
  align = "left",
  bold = false,
  fill = null,
  fontSize = 8,
  padding = 1.4,
}) => {
  if (fill) {
    pdf.setFillColor(...fill);
    pdf.rect(x, y, width, height, "F");
  }
  pdf.setDrawColor(...BLACK);
  pdf.setLineWidth(0.22);
  pdf.rect(x, y, width, height);
  pdf.setFont("helvetica", bold ? "bold" : "normal");
  pdf.setFontSize(fontSize);
  pdf.setTextColor(...BLACK);

  const lines = pdf.splitTextToSize(String(text || ""), Math.max(1, width - padding * 2));
  const lineHeight = fontSize * 0.36;
  const blockHeight = lines.length * lineHeight;
  const textY = y + Math.max(padding, (height - blockHeight) / 2 + 0.35);
  const textX = align === "center" ? x + width / 2 : align === "right" ? x + width - padding : x + padding;
  pdf.text(lines, textX, textY, { align, baseline: "top" });
};

const drawCells = (pdf, columns, left, y, height, values) => {
  let x = left;
  columns.forEach((width, index) => {
    drawCell(pdf, { x, y, width, height, ...(values[index] || {}) });
    x += width;
  });
};

const rowHeightFor = (pdf, columns, row) => {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  const values = [row.time, row.title, row.durationMin, row.speaker, row.congregation];
  const lines = values.map((value, index) =>
    pdf.splitTextToSize(String(value || ""), columns[index] - 2.8).length
  );
  return Math.max(7, Math.max(...lines) * 3 + 1.8);
};

export const createPioneerProgramPdf = ({ program, event = {} }) => {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const left = 8;
  const columns = [20, 86, 16, 39, 33];
  const tableWidth = columns.reduce((total, width) => total + width, 0);
  let y = 8;

  drawCells(pdf, [tableWidth / 2, tableWidth / 2], left, y, 7, [
    { text: program?.meta?.code, bold: true },
    { text: program?.meta?.date, align: "right" },
  ]);
  y += 7;
  drawCell(pdf, {
    x: left,
    y,
    width: tableWidth,
    height: 12,
    text: program?.meta?.title,
    align: "center",
    bold: true,
    fill: HEADER_FILL,
    fontSize: 11,
  });
  y += 12;
  drawCell(pdf, {
    x: left,
    y,
    width: tableWidth,
    height: 9,
    text: `TEMA: ${program?.meta?.theme || ""}`,
    align: "center",
    bold: true,
    fontSize: 8.5,
  });
  y += 9;

  drawCells(pdf, columns, left, y, 8, [
    { text: "Hora", align: "center", bold: true, fill: HEADER_FILL },
    { text: "PROGRAMA ESPIRITUAL", align: "center", bold: true, fill: HEADER_FILL },
    { text: "Tempo", align: "center", bold: true, fill: HEADER_FILL },
    { text: "Nome", align: "center", bold: true, fill: HEADER_FILL },
    { text: "Congregação", align: "center", bold: true, fill: HEADER_FILL },
  ]);
  y += 8;

  (program?.rows || []).forEach((row) => {
    const height = rowHeightFor(pdf, columns, row);
    drawCells(pdf, columns, left, y, height, [
      { text: row.type === "interval" ? "" : row.time, align: "center" },
      { text: row.title, bold: row.type === "interval" },
      { text: row.durationMin || "", align: "center" },
      { text: row.speaker },
      { text: row.congregation },
    ]);
    y += height;
  });

  const finalTime = (program?.rows || []).at(-1)?.end || "";
  drawCells(pdf, columns, left, y, 7, [
    { text: finalTime, align: "center" },
    { text: "TÉRMINO", bold: true },
    {},
    {},
    {},
  ]);
  y += 16;

  drawCells(pdf, [48, tableWidth - 48], left, y, 8, [
    { text: "LOCAL", bold: true, fill: HEADER_FILL },
    { text: event.venue },
  ]);
  y += 8;
  drawCells(pdf, [48, tableWidth - 48], left, y, 15, [
    { text: "ENSAIO DE CENAS / ENTREVISTAS", bold: true, fill: HEADER_FILL, fontSize: 7.2 },
    {
      text: [event.rehearsalVenue, event.rehearsalAddress, event.rehearsalDateTime]
        .filter(Boolean)
        .join(" — "),
    },
  ]);

  pdf.setProperties({
    title: `Programa da reunião com pioneiros - ${program?.meta?.code || ""}`,
    subject: "Programa espiritual da reunião com pioneiros",
    author: "AssemblyFlow",
    creator: "AssemblyFlow",
  });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text("AssemblyFlow", pageWidth - 8, 291, { align: "right" });

  return pdf;
};

export const downloadPioneerProgramPdf = async (options, fileName) => {
  try {
    const pdf = createPioneerProgramPdf(options);
    return await savePdf(pdf, fileName);
  } catch (error) {
    console.error("downloadPioneerProgramPdf", error);
    return false;
  }
};
