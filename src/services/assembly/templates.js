import { DOCUMENT_REGISTRY_BY_ID } from "./registry";

const clone = (value) => JSON.parse(JSON.stringify(value));

const getByPath = (source, path) =>
  String(path || "")
    .split(".")
    .reduce((acc, key) => (acc == null ? "" : acc[key]), source);

export const hydrateTemplate = (template = "", payload = {}) =>
  String(template).replace(/\{\{([^}]+)\}\}/g, (_, rawPath) => {
    const value = getByPath(payload, rawPath.trim());
    return value == null ? "" : String(value);
  });

export const buildDocumentPreview = (documentId, projectState, options = {}) => {
  const registry = DOCUMENT_REGISTRY_BY_ID[documentId];
  const document = projectState?.documents?.[documentId];

  if (!registry || !document) {
    return {
      html: "",
      blocks: [],
      meta: {},
      record: null,
    };
  }

  if (registry.kind === "letter") {
    return {
      html: hydrateTemplate(document.templateHtml, {
        ...projectState,
        event: projectState.events,
      }),
      blocks: [],
      meta: clone(document.meta || {}),
      record: null,
    };
  }

  if (registry.kind === "assignment") {
    const records = Array.isArray(document.records) ? document.records : [];
    const record = records[options.recordIndex || 0] || null;

    return {
      html: hydrateTemplate(document.templateHtml, {
        ...projectState,
        event: projectState.events,
        record,
      }),
      blocks: [],
      meta: clone(document.meta || {}),
      record,
    };
  }

  const part = options.part || "partA";
  const blocks = Array.isArray(document.records?.[part]) ? document.records[part] : [];

  return {
    html: "",
    blocks: clone(blocks),
    meta: clone(document.meta || {}),
    record: null,
  };
};
