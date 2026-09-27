import { DOCUMENT_REGISTRY_BY_ID } from "./registry";
import { getAssignmentView } from "./assignments";

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
        documentMeta: document.meta || {},
      }),
      blocks: [],
      meta: clone(document.meta || {}),
      record: null,
    };
  }

  if (registry.kind === "assignment") {
    const assignment = getAssignmentView(projectState, documentId, options.part);
    const activeDocument = assignment.document || document;
    const records = assignment.records;
    const record = records[options.recordIndex || 0] || null;

    return {
      html: hydrateTemplate(activeDocument.templateHtml, {
        ...projectState,
        event: projectState.events,
        documentMeta: activeDocument.meta || {},
        record,
      }),
      blocks: [],
      meta: clone(activeDocument.meta || {}),
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
