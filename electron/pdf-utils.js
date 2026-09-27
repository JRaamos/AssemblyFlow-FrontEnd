const MAX_PDF_BYTES = 50 * 1024 * 1024;
const MAX_BASE64_LENGTH = Math.ceil(MAX_PDF_BYTES / 3) * 4 + 8;

export const sanitizePdfName = (value = "documento.pdf") => {
  const baseName = String(value)
    .normalize("NFC")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
    .replace(/\s+/g, "_")
    .replace(/[. ]+$/g, "")
    .replace(/\.pdf$/i, "")
    .slice(0, 120) || "documento";

  return `${baseName}.pdf`;
};

export const toPdfBuffer = ({ base64, bytes } = {}) => {
  let buffer;

  if (typeof base64 === "string") {
    const normalized = base64.trim();
    if (
      !normalized ||
      normalized.length > MAX_BASE64_LENGTH ||
      !/^[A-Za-z0-9+/]+={0,2}$/.test(normalized)
    ) {
      throw new Error("Conteúdo de PDF inválido.");
    }
    buffer = Buffer.from(normalized, "base64");
  } else if (bytes instanceof ArrayBuffer) {
    buffer = Buffer.from(bytes);
  } else if (ArrayBuffer.isView(bytes)) {
    buffer = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  } else if (Array.isArray(bytes)) {
    buffer = Buffer.from(bytes);
  } else {
    throw new Error("Conteúdo de PDF inválido.");
  }

  if (!buffer.length || buffer.length > MAX_PDF_BYTES) {
    throw new Error("Tamanho de PDF inválido.");
  }
  if (buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    throw new Error("O arquivo informado não é um PDF.");
  }

  return buffer;
};
