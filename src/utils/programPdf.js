import jsPDF from "jspdf";

import { sanitizeWindowsFileName } from "./downloads";

const HEADER_FILL = [222, 220, 200];
const BLACK = [12, 12, 12];

const splitSessions = (rows = []) => {
  const intervalIndex = rows.findIndex((row) => row.type === "interval");
  if (intervalIndex < 0) return { morning: rows, afternoon: [] };
  return {
    morning: rows.slice(0, intervalIndex + 1),
    afternoon: rows.slice(intervalIndex + 1),
  };
};

const sum = (values) => values.reduce((total, value) => total + value, 0);

const drawCell = (pdf, { x, y, width, height, text = "", align = "left", bold = false, italic = false, fill = null, fontSize = 7.2, padding = 1.2 }) => {
  if (fill) {
    pdf.setFillColor(...fill);
    pdf.rect(x, y, width, height, "F");
  }

  pdf.setDrawColor(...BLACK);
  pdf.setLineWidth(0.22);
  pdf.rect(x, y, width, height);
  pdf.setFont("helvetica", bold ? "bold" : italic ? "italic" : "normal");
  pdf.setFontSize(fontSize);
  pdf.setTextColor(...BLACK);

  const available = Math.max(1, width - padding * 2);
  const lines = pdf.splitTextToSize(String(text || ""), available);
  const lineHeight = fontSize * 0.36;
  const blockHeight = lines.length * lineHeight;
  const textY = y + Math.max(padding, (height - blockHeight) / 2 + 0.4);
  const textX = align === "center" ? x + width / 2 : align === "right" ? x + width - padding : x + padding;

  pdf.text(lines, textX, textY, {
    align,
    baseline: "top",
  });
};

const drawCells = (pdf, columns, y, height, values, options = {}) => {
  let x = options.left;
  columns.forEach((width, index) => {
    const cellOptions = values[index] || {};
    drawCell(pdf, {
      x,
      y,
      width,
      height,
      ...cellOptions,
    });
    x += width;
  });
};

const rowHeightFor = (pdf, columns, row) => {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.2);
  const values = [row.time, row.title, row.speaker, row.congregation];
  const widths = [columns[0], columns[1], columns[2], columns[3]];
  const lineCounts = values.map((value, index) =>
    pdf.splitTextToSize(String(value || ""), widths[index] - 2.4).length
  );
  return Math.max(5.1, Math.max(...lineCounts) * 2.65 + 1.6);
};

const drawProgramRow = (pdf, columns, left, y, row) => {
  const height = rowHeightFor(pdf, columns, row);
  drawCells(
    pdf,
    columns,
    y,
    height,
    [
      { text: row.type === "interval" ? "" : row.time, align: "center" },
      { text: row.title, bold: row.type === "interval" },
      { text: row.speaker },
      { text: row.congregation, align: "center" },
      {},
      { text: row.confirmation ? "x" : "", align: "center" },
      { text: row.durationMin || "", align: "center" },
      {},
      {},
      {},
    ],
    { left }
  );
  return y + height;
};

export const createAssemblyProgramPdf = ({
  program,
  partLabel = "PARTE A",
  variantLabel = "CA-BR",
  footerVariantLabel = variantLabel,
  rehearsalDateTime = "",
  rehearsalVenue = "",
}) => {
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const left = 6;
  const columns = [14, 105, 48, 38, 12, 12, 12, 12, 10, 12];
  const tableWidth = sum(columns);
  const { morning, afternoon } = splitSessions(program?.rows || []);
  let y = 6;

  drawCell(pdf, {
    x: left,
    y,
    width: tableWidth,
    height: 8.5,
    text: "PROGRAMA ESPIRITUAL DA ASSEMBLEIA DE CIRCUITO",
    align: "center",
    bold: true,
    fill: HEADER_FILL,
    fontSize: 12.5,
  });
  y += 8.5;

  const firstGroupWidth = sum(columns.slice(0, 6));
  const controlWidth = sum(columns.slice(6, 9));
  drawCell(pdf, { x: left, y, width: firstGroupWidth, height: 8, text: partLabel, bold: true, fill: HEADER_FILL, fontSize: 11.5 });
  pdf.setFont("helvetica", "bolditalic");
  pdf.setFontSize(11.5);
  pdf.text(variantLabel, left + 68, y + 5.4, { align: "center" });
  pdf.setLineWidth(0.25);
  pdf.line(left + 56, y + 6.1, left + 80, y + 6.1);
  drawCell(pdf, { x: left + firstGroupWidth, y, width: controlWidth, height: 8, text: "CONTR. TEMPO", align: "center", bold: true, fill: HEADER_FILL, fontSize: 7.1 });
  drawCell(pdf, { x: left + firstGroupWidth + controlWidth, y, width: columns[9], height: 8, text: "Clas", align: "center", bold: true, fill: HEADER_FILL, fontSize: 7.1 });
  y += 8;

  drawCells(
    pdf,
    columns,
    y,
    6.5,
    [
      { text: "Hora", align: "center", bold: true, fill: HEADER_FILL },
      { text: "PROGRAMA DA MANHÃ", bold: true, fill: HEADER_FILL },
      { text: "DESIGNADO", align: "center", bold: true, fill: HEADER_FILL },
      { text: "CONGREGAÇÃO", align: "center", bold: true, fill: HEADER_FILL },
      { text: "Cena", align: "center", bold: true, fill: HEADER_FILL },
      { text: "Conf", align: "center", bold: true, fill: HEADER_FILL },
      { text: "PREV", align: "center", bold: true, fill: HEADER_FILL },
      { text: "REAL", align: "center", bold: true, fill: HEADER_FILL },
      { text: "DIF", align: "center", bold: true, fill: HEADER_FILL },
      { text: "A...C", align: "center", bold: true, fill: HEADER_FILL },
    ],
    { left }
  );
  y += 6.5;

  morning.forEach((row) => {
    y = drawProgramRow(pdf, columns, left, y, row);
  });

  if (afternoon.length) {
    drawCells(
      pdf,
      columns,
      y,
      6.2,
      [
        { text: "Hora", align: "center", bold: true, fill: HEADER_FILL },
        { text: "PROGRAMA DA TARDE", bold: true, fill: HEADER_FILL },
        {}, {}, {}, {}, {}, {}, {}, {},
      ],
      { left }
    );
    y += 6.2;
    afternoon.forEach((row) => {
      y = drawProgramRow(pdf, columns, left, y, row);
    });
  }

  const finalTime = (program?.rows || []).at(-1)?.end || "";
  drawCells(
    pdf,
    columns,
    y,
    5.2,
    [
      { text: finalTime, align: "center" },
      { text: "TÉRMINO", bold: true },
      {}, {}, {}, {},
      { text: program?.meta?.terminationControl || "", align: "center" },
      {}, {}, {},
    ],
    { left }
  );
  y += 5.2;

  const footerY = Math.min(Math.max(y + 10, pageHeight - 26), pageHeight - 23);
  const footerColumns = [126, 54, tableWidth - 180];
  drawCells(
    pdf,
    footerColumns,
    footerY,
    6.5,
    [
      { text: `ASSEMBLEIA DE CIRCUITO - ${footerVariantLabel}`, bold: true, fill: HEADER_FILL, fontSize: 8.2 },
      { text: "DATA / HORA", align: "center", bold: true, fill: HEADER_FILL, fontSize: 8.2 },
      { text: "S. REINO - Endereço", bold: true, fill: HEADER_FILL, fontSize: 8.2 },
    ],
    { left }
  );
  drawCells(
    pdf,
    footerColumns,
    footerY + 6.5,
    13,
    [
      { text: "ENSAIO DE TODAS AS PARTES DA ASSEMBLEIA", fontSize: 7.8 },
      { text: rehearsalDateTime, align: "center", fontSize: 8.2 },
      { text: rehearsalVenue, fontSize: 7.8 },
    ],
    { left }
  );

  pdf.setProperties({
    title: `${variantLabel} - ${partLabel}`,
    subject: "Programa espiritual da Assembleia de Circuito",
    author: "AssemblyFlow",
    creator: "AssemblyFlow",
  });

  return pdf;
};

export const downloadAssemblyProgramPdf = async (options, fileName) => {
  try {
    const pdf = createAssemblyProgramPdf(options);
    pdf.save(`${sanitizeWindowsFileName(fileName)}.pdf`);
    return true;
  } catch (error) {
    console.error("downloadAssemblyProgramPdf", error);
    return false;
  }
};
