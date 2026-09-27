import jsPDF from "jspdf";

const COLORS = {
  black: [0, 0, 0],
  blue: [0, 112, 192],
  red: [255, 0, 0],
};

const compactText = (value = "") => String(value).replace(/\s+/g, " ").trim();

const textWithLineBreaks = (element) => {
  if (!element) return "";
  const clone = element.cloneNode(true);
  clone.querySelectorAll("br").forEach((node) => node.replaceWith("\n"));
  return String(clone.textContent || "")
    .split("\n")
    .map(compactText)
    .filter(Boolean)
    .join("\n");
};

const shortDate = (value = "") => {
  const months = {
    janeiro: "01",
    fevereiro: "02",
    marco: "03",
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
  const match = String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .match(/(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})/);

  if (!match || !months[match[2]]) return compactText(value);
  return `${match[1].padStart(2, "0")}/${months[match[2]]}/${match[3].slice(-2)}`;
};

const fontStyle = ({ bold, italic }) => {
  if (bold && italic) return "bolditalic";
  if (bold) return "bold";
  if (italic) return "italic";
  return "normal";
};

const inlineSegments = (element, inherited = {}) => {
  const segments = [];

  const visit = (node, style) => {
    if (node.nodeType === 3) {
      if (node.textContent) segments.push({ ...style, text: node.textContent });
      return;
    }
    if (node.nodeType !== 1) return;

    const tagName = node.tagName;
    if (tagName === "BR") {
      segments.push({ ...style, text: "\n" });
      return;
    }

    const nextStyle = {
      ...style,
      bold: style.bold || ["B", "STRONG"].includes(tagName),
      italic: style.italic || ["EM", "I"].includes(tagName),
      underline: style.underline || tagName === "U",
    };
    node.childNodes.forEach((child) => visit(child, nextStyle));
  };

  visit(element, inherited);
  return segments;
};

const createRenderer = (pdf, scale) => {
  const page = {
    left: 8,
    right: 202,
    top: 5,
    bottom: 290,
  };
  const cursor = { y: page.top };

  const setColor = (color = COLORS.black) => pdf.setTextColor(...color);
  const setFont = (style, size) => {
    pdf.setFont("helvetica", fontStyle(style));
    pdf.setFontSize(size * scale);
  };

  const nextPage = () => {
    pdf.addPage();
    cursor.y = page.top;
  };

  const ensureSpace = (height) => {
    if (cursor.y + height > page.bottom) nextPage();
  };

  const richParagraph = (
    segments,
    {
      align = "left",
      color = COLORS.black,
      fontSize = 7.45,
      lineHeight = 3.18,
      left = page.left,
      right = page.right,
      after = 1.15,
      underlineBold = false,
    } = {}
  ) => {
    const normalized = segments.flatMap((segment) => {
      const chunks = String(segment.text || "").split(/(\n|\s+)/);
      return chunks
        .filter(Boolean)
        .map((text) => ({ ...segment, text }));
    });

    if (align !== "left") {
      const text = compactText(normalized.map(({ text }) => text).join(""));
      if (!text) return;
      const style = normalized.find(({ text: value }) => compactText(value)) || {};
      setFont(style, fontSize);
      setColor(color);
      ensureSpace(lineHeight * scale + after);
      pdf.text(text, align === "right" ? right : (left + right) / 2, cursor.y, {
        align,
        baseline: "top",
      });
      cursor.y += lineHeight * scale + after;
      return;
    }

    let x = left;
    let y = cursor.y;
    let hasContent = false;
    const availableWidth = right - left;

    const lineBreak = () => {
      y += lineHeight * scale;
      x = left;
      hasContent = false;
      if (y + lineHeight * scale > page.bottom) {
        nextPage();
        y = cursor.y;
      }
    };

    normalized.forEach((token) => {
      if (token.text === "\n") {
        lineBreak();
        return;
      }

      const isSpace = /^\s+$/.test(token.text);
      if (isSpace && !hasContent) return;

      const style = {
        ...token,
        underline: token.underline || (underlineBold && token.bold),
      };
      setFont(style, fontSize);
      const tokenText = isSpace ? " " : token.text;
      const width = pdf.getTextWidth(tokenText);

      if (!isSpace && hasContent && x + width > right) lineBreak();
      if (width > availableWidth && !isSpace) {
        const lines = pdf.splitTextToSize(tokenText, availableWidth);
        lines.forEach((line, index) => {
          if (index > 0) lineBreak();
          setColor(token.color || color);
          pdf.text(line, x, y, { baseline: "top" });
          x += pdf.getTextWidth(line);
          hasContent = true;
        });
        return;
      }

      setColor(token.color || color);
      pdf.text(tokenText, x, y, { baseline: "top" });
      if (style.underline && !isSpace) {
        pdf.setDrawColor(...(token.color || color));
        pdf.setLineWidth(0.15);
        pdf.line(x, y + 2.45 * scale, x + width, y + 2.45 * scale);
      }
      x += width;
      hasContent = hasContent || !isSpace;
    });

    cursor.y = y + lineHeight * scale + after;
  };

  const plainLine = (
    text,
    {
      align = "left",
      bold = false,
      italic = false,
      color = COLORS.black,
      fontSize = 7.6,
      left = page.left,
      right = page.right,
      after = 1,
      underline = false,
    } = {}
  ) => {
    const value = compactText(text);
    if (!value) return;
    ensureSpace(3.2 * scale + after);
    setFont({ bold, italic }, fontSize);
    setColor(color);
    const x = align === "right" ? right : align === "center" ? (left + right) / 2 : left;
    pdf.text(value, x, cursor.y, { align, baseline: "top" });
    if (underline) {
      const width = pdf.getTextWidth(value);
      const start = align === "right" ? right - width : align === "center" ? x - width / 2 : left;
      pdf.setDrawColor(...color);
      pdf.setLineWidth(0.15);
      pdf.line(start, cursor.y + 2.55 * scale, start + width, cursor.y + 2.55 * scale);
    }
    cursor.y += 3.2 * scale + after;
  };

  const fact = (label, value, options = {}) => {
    const labelWidth = options.labelWidth || 46;
    const valueLeft = options.valueLeft || page.left + labelWidth;
    const fontSize = 7.45;
    const lineHeight = 3.15 * scale;
    const lines = pdf.splitTextToSize(compactText(value), page.right - valueLeft);
    const height = Math.max(lines.length, 1) * lineHeight + 0.35;
    ensureSpace(height);

    setFont({ bold: true }, fontSize);
    setColor(COLORS.blue);
    pdf.text(compactText(label), page.left, cursor.y, { baseline: "top" });
    setFont({ bold: true, italic: Boolean(options.italic) }, fontSize);
    setColor(COLORS.red);
    pdf.text(lines, valueLeft, cursor.y, { baseline: "top" });
    cursor.y += height;
  };

  const combinedFacts = (entries) => {
    const byLabel = Object.fromEntries(
      entries.map(({ label, value }) => [label.replace(/:$/, "").toUpperCase(), value])
    );
    const designation = byLabel.DESIGNAÇÃO;
    const duration = byLabel.TEMPO;
    const start = byLabel["INÍCIO"];
    if (!designation && !duration && !start) return false;

    ensureSpace(3.5 * scale);
    const pieces = [
      { x: page.left, text: "DESIGNAÇÃO:", color: COLORS.blue },
      { x: page.left + 35, text: designation || "", color: COLORS.red },
      { x: page.left + 78, text: "TEMPO:", color: COLORS.blue },
      { x: page.left + 98, text: duration || "", color: COLORS.red },
      { x: page.left + 126, text: "INÍCIO:", color: COLORS.blue },
      { x: page.left + 147, text: start || "", color: COLORS.red },
    ];
    pieces.forEach(({ x, text, color }) => {
      setFont({ bold: true }, 7.45);
      setColor(color);
      pdf.text(compactText(text), x, cursor.y, { baseline: "top" });
    });
    cursor.y += 3.55 * scale;
    return true;
  };

  return {
    COLORS,
    combinedFacts,
    cursor,
    fact,
    page,
    plainLine,
    richParagraph,
  };
};

const renderDocument = (node, scale) => {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const renderer = createRenderer(pdf, scale);
  const { COLORS, combinedFacts, cursor, fact, page, plainLine, richParagraph } = renderer;
  const root =
    node.querySelector(".pioneer-assignment") ||
    node.querySelector(".document-letterhead")?.parentElement ||
    node;
  const isPioneer = root.matches(".pioneer-assignment");
  const children = [...root.children].filter(
    (element) => !element.matches("[data-pdf-exclude='true'], .no-print")
  );

  children.forEach((element) => {
    if (element.matches(".document-letterhead")) {
      const paragraphs = [...element.querySelectorAll(":scope > p")];
      const contact = compactText(paragraphs[0]?.textContent);
      const date = shortDate(paragraphs[1]?.textContent);
      plainLine(contact, { align: "right", italic: true, fontSize: 7.8, after: 0.4 });
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.2);
      pdf.line(page.left + 72, cursor.y - 0.25, page.right, cursor.y - 0.25);
      plainLine(date, { align: "right", bold: true, fontSize: 7.4, after: 0.85 });
      return;
    }

    if (element.matches(".document-recipient")) {
      const paragraphs = [...element.querySelectorAll(":scope > p")];
      const recipientLines = textWithLineBreaks(paragraphs.shift()).split("\n");
      recipientLines.forEach((line, index) =>
        plainLine(line, {
          bold: true,
          italic: index > 0,
          color: COLORS.red,
          fontSize: 7.55,
          after: index === recipientLines.length - 1 ? 0.8 : 0.1,
        })
      );
      paragraphs.forEach((paragraph) =>
        richParagraph(inlineSegments(paragraph), { after: 1.05 })
      );
      return;
    }

    if (element.matches(".document-facts")) {
      const entries = [...element.querySelectorAll(":scope > div")].map((row) => ({
        label: compactText(row.querySelector("dt")?.textContent),
        value: textWithLineBreaks(row.querySelector("dd")),
      }));
      if (isPioneer) {
        entries.forEach(({ label, value }) => fact(label, value));
      } else {
        const groupedLabels = new Set(["DESIGNAÇÃO:", "TEMPO:", "INÍCIO:"]);
        const speechTheme = entries.find(({ label }) =>
          label.toUpperCase().includes("TEMA DO DISCURSO")
        );
        entries
          .filter(
            ({ label }) =>
              !groupedLabels.has(label.toUpperCase()) &&
              !label.toUpperCase().includes("TEMA DO DISCURSO")
          )
          .forEach(({ label, value }) => fact(label, value));
        combinedFacts(entries);
        if (speechTheme) fact(speechTheme.label, speechTheme.value, { italic: true });
      }
      cursor.y += 1.6;
      return;
    }

    if (element.matches(".document-outline-note")) {
      richParagraph(inlineSegments(element), {
        align: "center",
        fontSize: 7.7,
        after: 2,
      });
      return;
    }

    if (element.matches(".document-section")) {
      [...element.children].forEach((child) => {
        if (["H1", "H2", "H3"].includes(child.tagName)) {
          plainLine(child.textContent, {
            bold: true,
            underline: true,
            fontSize: 7.35,
            after: 0.9,
          });
        } else {
          richParagraph(inlineSegments(child), {
            fontSize: 7.2,
            lineHeight: 2.92,
            after: 0.75,
            underlineBold: true,
          });
        }
      });
      return;
    }

    if (element.matches(".document-rehearsal-details")) {
      [...element.querySelectorAll(":scope > p")].forEach((paragraph) =>
        plainLine(paragraph.textContent, {
          align: "center",
          bold: true,
          fontSize: 7.1,
          after: 0.15,
        })
      );
      cursor.y += 0.7;
      return;
    }

    if (element.matches(".document-signature")) {
      const signatureLeft = page.left + 105;
      [...element.querySelectorAll(":scope > p")].forEach((paragraph, index) =>
        richParagraph(inlineSegments(paragraph), {
          align: "center",
          left: signatureLeft,
          right: page.right,
          fontSize: 7.55,
          after: index === 0 ? 0.2 : 0.7,
        })
      );
      return;
    }

    if (element.tagName === "P") {
      richParagraph(inlineSegments(element), {
        fontSize: 7.2,
        lineHeight: 2.95,
        after: 0.8,
      });
    }
  });

  pdf.setProperties({ title: "Carta de designação" });
  return pdf;
};

export const createAssignmentLetterPdf = (node) => {
  if (!node) throw new Error("Assignment print target not found");
  if (
    !node.querySelector(".document-letterhead") ||
    !node.querySelector(".document-recipient") ||
    !node.querySelector(".document-facts")
  ) {
    throw new Error("Assignment print structure is incomplete");
  }

  const scales = [1, 0.96, 0.92, 0.88, 0.84, 0.8];
  let pdf = null;
  for (const scale of scales) {
    pdf = renderDocument(node, scale);
    if (pdf.getNumberOfPages() === 1) return pdf;
  }
  return pdf;
};
