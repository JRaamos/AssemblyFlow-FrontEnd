const ALLOWED_TAGS = new Set([
  "A",
  "ARTICLE",
  "B",
  "BLOCKQUOTE",
  "BR",
  "DD",
  "DIV",
  "DL",
  "DT",
  "EM",
  "FOOTER",
  "H1",
  "H2",
  "H3",
  "HEADER",
  "I",
  "LI",
  "OL",
  "P",
  "SECTION",
  "STRONG",
  "U",
  "UL",
]);

const ALIGNMENT_CLASS = /^ql-align-(center|right|justify)$/;
const DOCUMENT_CLASS = /^(document-(letterhead|date|recipient|facts|outline-note|section|signature|rehearsal-details|rehearsal-note)|keep-together|pioneer-assignment|pioneer-guidance)$/;

const fallbackSanitize = (html = "") =>
  String(html)
    .replace(/<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/\son\w+\s*=\s*(["']).*?\1/gi, "")
    .replace(/\sstyle\s*=\s*(["']).*?\1/gi, "")
    .trim();

export const sanitizeDocumentHtml = (html = "") => {
  if (typeof DOMParser === "undefined") return fallbackSanitize(html);

  const documentNode = new DOMParser().parseFromString(String(html), "text/html");
  const elements = [...documentNode.body.querySelectorAll("*")];

  elements.forEach((element) => {
    if (!ALLOWED_TAGS.has(element.tagName)) {
      element.replaceWith(...element.childNodes);
      return;
    }

    const sourceClass = element.getAttribute("class") || "";
    const sourceHref = element.getAttribute("href") || "";
    [...element.attributes].forEach((attribute) => element.removeAttribute(attribute.name));

    const safeClasses = sourceClass
      .split(/\s+/)
      .filter((className) => ALIGNMENT_CLASS.test(className) || DOCUMENT_CLASS.test(className));
    if (safeClasses.length) element.setAttribute("class", safeClasses.join(" "));

    if (element.tagName === "A") {
      if (/^(https?:|mailto:)/i.test(sourceHref)) {
        element.setAttribute("href", sourceHref);
        element.setAttribute("rel", "noopener noreferrer");
      }
    }
  });

  return documentNode.body.innerHTML.trim();
};

export const htmlToPlainText = (html = "") =>
  fallbackSanitize(html)
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
