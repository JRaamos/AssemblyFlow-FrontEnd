import jsPDF from "jspdf";

const convertToCSV = (columns, rows) => {
  const header = columns.map((column) => column.title).join(",");
  const csvRows = rows.map((row) =>
    columns.map((column) => row[column.ref] || "").join(",")
  );

  return [header, ...csvRows].join("\n");
};

export const downloadCSV = (columns, rows) => {
  const csvContent = convertToCSV(columns, rows);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "tabela.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const sanitizeWindowsFileName = (value = "documento") => {
  const sanitized = String(value)
    .normalize("NFC")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "-")
    .replace(/[. ]+$/g, "")
    .slice(0, 120);

  return sanitized || "documento";
};

const monthNumbers = {
  janeiro: "01",
  fevereiro: "02",
  março: "03",
  abril: "04",
  maio: "05",
  junho: "06",
  julho: "07",
  agosto: "08",
  setembro: "09",
  outubro: "10",
  novembro: "11",
  dezembro: "12",
};

const normalizeDateForFileName = (value = "") => {
  const isoMatch = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;

  const portugueseMatch = String(value)
    .toLocaleLowerCase("pt-BR")
    .match(/(\d{1,2})\s+de\s+([a-zç]+)\s+de\s+(\d{4})/i);

  if (!portugueseMatch) return "";
  const month = monthNumbers[portugueseMatch[2]];
  if (!month) return "";
  return `${portugueseMatch[3]}-${month}-${portugueseMatch[1].padStart(2, "0")}`;
};

export const buildDocumentFileName = ({ documentId, speaker, date, part }) =>
  sanitizeWindowsFileName(
    [documentId, speaker, normalizeDateForFileName(date), part]
      .filter(Boolean)
      .join("_")
  );

const makePrintableClone = (node) => {
  const clone = node.cloneNode(true);

  clone
    .querySelectorAll("button, .ql-toolbar, [data-pdf-exclude='true'], .no-print")
    .forEach((element) => element.remove());

  clone.querySelectorAll("input, textarea, select").forEach((element) => {
    const replacement = document.createElement("span");
    replacement.textContent = element.value || element.textContent || "";
    element.replaceWith(replacement);
  });

  clone.querySelectorAll("[contenteditable]").forEach((element) => {
    element.removeAttribute("contenteditable");
  });

  return clone;
};

const isBoldElement = (element) =>
  ["H1", "H2", "H3", "TH", "STRONG", "B", "DT"].includes(element.tagName) ||
  element.querySelector(":scope > strong, :scope > b") !== null;

const collectTextBlocks = (root) => {
  const blocks = [];
  const selector = [
    "h1",
    "h2",
    "h3",
    "p",
    "li",
    "dt",
    "dd",
    ".pdf-text-block",
  ].join(",");

  root.querySelectorAll(selector).forEach((element) => {
    if (element.closest("table")) return;
    if (element.querySelector(selector)) return;

    const text = element.textContent.replace(/\s+/g, " ").trim();
    if (!text) return;

    blocks.push({
      type: "text",
      text: element.tagName === "LI" ? `• ${text}` : text,
      bold: isBoldElement(element),
      italic: ["EM", "I"].includes(element.tagName) || Boolean(element.querySelector("em, i")),
      heading: ["H1", "H2", "H3"].includes(element.tagName),
      keepTogether: Boolean(element.closest(".keep-together")),
    });
  });

  root.querySelectorAll("table").forEach((table) => {
    const rows = [...table.querySelectorAll("tr")].map((row) =>
      [...row.querySelectorAll("th, td")].map((cell) => ({
        text: cell.textContent.replace(/\s+/g, " ").trim(),
        bold: cell.tagName === "TH" || isBoldElement(cell),
      }))
    );
    if (rows.length) blocks.push({ type: "table", rows });
  });

  return blocks;
};

const renderTextBlock = (pdf, block, cursor, page) => {
  const fontSize = block.heading ? 11 : 8.8;
  const lineHeight = block.heading ? 5.2 : 4.25;
  pdf.setFont("helvetica", block.bold ? "bold" : block.italic ? "italic" : "normal");
  pdf.setFontSize(fontSize);
  pdf.setTextColor(block.heading ? 30 : 31, block.heading ? 64 : 41, block.heading ? 175 : 55);

  const lines = pdf.splitTextToSize(block.text, page.contentWidth);
  const requiredHeight = lines.length * lineHeight + (block.heading ? 3 : 2);

  if (cursor.y + requiredHeight > page.bottom) {
    pdf.addPage();
    cursor.y = page.top;
  }

  pdf.text(lines, page.left, cursor.y, { baseline: "top" });
  cursor.y += requiredHeight;
};

const renderTableBlock = (pdf, block, cursor, page) => {
  const columnCount = Math.max(...block.rows.map((row) => row.length), 1);
  const columnWidth = page.contentWidth / columnCount;
  const padding = 1.5;
  const lineHeight = 3.6;

  block.rows.forEach((row) => {
    const prepared = row.map((cell) =>
      pdf.splitTextToSize(cell.text || " ", columnWidth - padding * 2)
    );
    const rowHeight = Math.max(...prepared.map((lines) => lines.length), 1) * lineHeight + padding * 2;

    if (cursor.y + rowHeight > page.bottom) {
      pdf.addPage();
      cursor.y = page.top;
    }

    row.forEach((cell, index) => {
      const x = page.left + index * columnWidth;
      pdf.setDrawColor(203, 213, 225);
      pdf.setLineWidth(0.2);
      pdf.rect(x, cursor.y, columnWidth, rowHeight);
      pdf.setFont("helvetica", cell.bold ? "bold" : "normal");
      pdf.setFontSize(7.2);
      pdf.setTextColor(31, 41, 55);
      pdf.text(prepared[index], x + padding, cursor.y + padding, { baseline: "top" });
    });

    cursor.y += rowHeight;
  });

  cursor.y += 3;
};

export const createPdfFromElement = (node) => {
  const clone = makePrintableClone(node);
    const blocks = collectTextBlocks(clone);
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const page = { left: 16, top: 16, bottom: 281, contentWidth: 178 };
    const cursor = { y: page.top };

    blocks.forEach((block) => {
      if (block.type === "table") renderTableBlock(pdf, block, cursor, page);
      else renderTextBlock(pdf, block, cursor, page);
    });

    return pdf;
};

export const savePdf = async (pdf, fileName) => {
  const safeFileName = `${sanitizeWindowsFileName(fileName)}.pdf`;
  const desktopBridge = globalThis.window?.assemblyflowDesktop;

  if (desktopBridge?.isDesktop && typeof desktopBridge.savePdf === "function") {
    const dataUri = pdf.output("datauristring");
    const separatorIndex = dataUri.indexOf(",");
    const base64 = separatorIndex >= 0 ? dataUri.slice(separatorIndex + 1) : "";
    if (!base64) throw new Error("PDF_SERIALIZATION_FAILED");

    const result = await desktopBridge.savePdf({
      base64,
      fileName: safeFileName,
    });
    return Boolean(result?.saved);
  }

  pdf.save(safeFileName);
  return true;
};

export const downloadAsPDF = async (target, fileName) => {
  const node = document.getElementById(target);
  if (!node) {
    console.error("Print target not found", target);
    return false;
  }

  try {
    return await savePdf(createPdfFromElement(node), fileName);
  } catch (error) {
    console.error("downloadAsPDF", error);
    return false;
  }
};
