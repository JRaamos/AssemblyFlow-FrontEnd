import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const nextPaint = () =>
  new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

const trimTrailingWhitespace = (sourceCanvas, minimumHeight) => {
  if (sourceCanvas.height <= minimumHeight) return sourceCanvas;

  try {
    const context = sourceCanvas.getContext("2d", { willReadFrequently: true });
    const pixels = context.getImageData(
      0,
      0,
      sourceCanvas.width,
      sourceCanvas.height
    ).data;
    let contentBottom = 0;

    for (let y = sourceCanvas.height - 1; y >= 0 && !contentBottom; y -= 2) {
      for (let x = 0; x < sourceCanvas.width; x += 3) {
        const offset = (y * sourceCanvas.width + x) * 4;
        const alpha = pixels[offset + 3];
        if (
          alpha > 16 &&
          (pixels[offset] < 245 || pixels[offset + 1] < 245 || pixels[offset + 2] < 245)
        ) {
          contentBottom = y;
          break;
        }
      }
    }

    const bottomPadding = Math.round(sourceCanvas.width * 0.08);
    const targetHeight = Math.min(
      sourceCanvas.height,
      Math.max(minimumHeight, contentBottom + bottomPadding)
    );
    if (targetHeight >= sourceCanvas.height - 2) return sourceCanvas;

    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = sourceCanvas.width;
    trimmedCanvas.height = targetHeight;
    const trimmedContext = trimmedCanvas.getContext("2d");
    trimmedContext.fillStyle = "#ffffff";
    trimmedContext.fillRect(0, 0, trimmedCanvas.width, trimmedCanvas.height);
    trimmedContext.drawImage(sourceCanvas, 0, 0);
    return trimmedCanvas;
  } catch (error) {
    console.warn("previewPdfWhitespace", error);
    return sourceCanvas;
  }
};

const createPageBreakResolver = (canvas) => {
  try {
    const pixels = canvas
      .getContext("2d", { willReadFrequently: true })
      .getImageData(0, 0, canvas.width, canvas.height).data;
    const isBlankRow = (y) => {
      let ink = 0;
      for (let x = 0; x < canvas.width; x += 3) {
        const offset = (y * canvas.width + x) * 4;
        if (
          pixels[offset + 3] > 16 &&
          (pixels[offset] < 242 || pixels[offset + 1] < 242 || pixels[offset + 2] < 242)
        ) {
          ink += 1;
          if (ink > 2) return false;
        }
      }
      return true;
    };

    return (sourceY, idealEnd) => {
      if (idealEnd >= canvas.height) return canvas.height;
      const searchStart = Math.max(
        sourceY + Math.round((idealEnd - sourceY) * 0.72),
        idealEnd - Math.round(canvas.width * 0.26)
      );

      for (let y = idealEnd - 13; y >= searchStart; y -= 1) {
        const hasParagraphGap = [-12, -8, -4, 0, 4, 8, 12]
          .every((offset) => isBlankRow(y + offset));
        if (hasParagraphGap) {
          return y;
        }
      }
      return idealEnd;
    };
  } catch (error) {
    console.warn("previewPdfPageBreak", error);
    return (_, idealEnd) => idealEnd;
  }
};

export const createPdfFromPreviewCanvas = (canvas) => {
  if (!canvas?.width || !canvas?.height) throw new Error("Preview canvas is empty");

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const a4SliceHeight = Math.max(
    1,
    Math.ceil((canvas.width * A4_HEIGHT_MM) / A4_WIDTH_MM)
  );
  const printableCanvas = trimTrailingWhitespace(canvas, a4SliceHeight);
  const pixelsPerPage =
    printableCanvas.height <= a4SliceHeight * 1.02
      ? Math.max(printableCanvas.height, a4SliceHeight)
      : a4SliceHeight;
  let sourceY = 0;
  let pageIndex = 0;
  const resolvePageBreak = createPageBreakResolver(printableCanvas);

  while (sourceY < printableCanvas.height) {
    const topPadding = pageIndex > 0 ? Math.round(printableCanvas.width * 0.04) : 0;
    const idealEnd = Math.min(
      printableCanvas.height,
      sourceY + pixelsPerPage - topPadding
    );
    const sourceEnd = resolvePageBreak(sourceY, idealEnd);
    const sliceHeight = sourceEnd - sourceY;
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = printableCanvas.width;
    pageCanvas.height = pixelsPerPage;
    const context = pageCanvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    context.drawImage(
      printableCanvas,
      0,
      sourceY,
      printableCanvas.width,
      sliceHeight,
      0,
      topPadding,
      printableCanvas.width,
      sliceHeight
    );

    if (pageIndex > 0) pdf.addPage();
    pdf.addImage(
      pageCanvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      A4_WIDTH_MM,
      A4_HEIGHT_MM,
      undefined,
      "FAST"
    );
    sourceY = sourceEnd;
    pageIndex += 1;
  }

  pdf.setProperties({ title: "Carta de designação" });
  return pdf;
};

export const createPreviewPdf = async (node) => {
  if (!node) throw new Error("Preview print target not found");

  await document.fonts?.ready;
  await nextPaint();

  const captureId = `pdf-preview-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  node.setAttribute("data-pdf-capture-id", captureId);

  try {
    const canvas = await html2canvas(node, {
      scale: Math.max(2, Math.min(3, window.devicePixelRatio || 1)),
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      onclone: (clonedDocument) => {
        const clonedNode = clonedDocument.querySelector(
          `[data-pdf-capture-id="${captureId}"]`
        );
        if (!clonedNode) return;
        clonedNode.style.boxShadow = "none";
        clonedNode.style.border = "0";
        clonedNode.style.margin = "0";
      },
    });

    return createPdfFromPreviewCanvas(canvas);
  } finally {
    node.removeAttribute("data-pdf-capture-id");
  }
};
