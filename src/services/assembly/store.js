import { ReadStorage } from "services/storage";

import {
  ASSEMBLY_STORAGE_KEY,
  cloneAssemblyProject,
  defaultAssemblyProject,
} from "./defaults";
import { DOCUMENT_REGISTRY } from "./registry";
import { normalizeGeneralLetterEventFields } from "./templates";

export const ASSEMBLY_PROJECT_STORAGE_KEY = "assemblyflow:project:v3";
export const ASSEMBLY_PROJECT_UPDATED_EVENT = "assemblyflow:project-updated";
const PREVIOUS_PROJECT_STORAGE_KEY = "assemblyflow:project:v2";

const clone = (value) => JSON.parse(JSON.stringify(value));

const getStorage = (storage) => storage || globalThis?.localStorage || null;

const safeRead = (storage, key) => {
  try {
    return getStorage(storage)?.getItem(key) || null;
  } catch (error) {
    console.warn("AssemblyStorageReadError", key, error);
    return null;
  }
};

const safeWrite = (storage, key, value) => {
  try {
    getStorage(storage)?.setItem(key, value);
    return true;
  } catch (error) {
    console.warn("AssemblyStorageWriteError", key, error);
    return false;
  }
};

const parseJson = (value) => {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};

const mergeDefaults = (defaults, incoming) => {
  if (Array.isArray(defaults)) {
    return Array.isArray(incoming) ? clone(incoming) : clone(defaults);
  }

  if (!defaults || typeof defaults !== "object") {
    return incoming ?? defaults;
  }

  if (!incoming || typeof incoming !== "object") {
    return clone(defaults);
  }

  return Object.fromEntries(
    Object.entries(defaults).map(([key, value]) => [
      key,
      key in incoming ? mergeDefaults(value, incoming[key]) : clone(value),
    ])
  );
};

const loadLegacyProject = () => {
  const parsed = parseJson(ReadStorage(ASSEMBLY_STORAGE_KEY));

  if (!parsed?.documents || !parsed?.traveler || !parsed?.events) {
    return null;
  }

  return parsed;
};

const projectMetadata = (project) => ({
  settings: clone(project.settings),
  traveler: clone(project.traveler),
  events: clone(project.events),
  circuitComposition: clone(project.circuitComposition),
  schemaVersion: 13,
});

export const loadAssemblyProject = (storage) => {
  const defaults = cloneAssemblyProject(defaultAssemblyProject);
  const savedMetadata = parseJson(safeRead(storage, ASSEMBLY_PROJECT_STORAGE_KEY));
  const previousMetadata = parseJson(safeRead(storage, PREVIOUS_PROJECT_STORAGE_KEY));
  const hasVersionedDocument = DOCUMENT_REGISTRY.some(({ storageKey }) =>
    Boolean(safeRead(storage, storageKey))
  );
  const legacy = hasVersionedDocument ? null : loadLegacyProject();
  const metadataSource = savedMetadata || previousMetadata || legacy || {};

  const project = {
    ...defaults,
    settings: mergeDefaults(defaults.settings, metadataSource.settings),
    traveler: mergeDefaults(defaults.traveler, metadataSource.traveler),
    events: savedMetadata
      ? mergeDefaults(defaults.events, metadataSource.events)
      : clone(defaults.events),
    circuitComposition: mergeDefaults(
      defaults.circuitComposition,
      metadataSource.circuitComposition
    ),
    documents: {},
  };

  DOCUMENT_REGISTRY.forEach((registry) => {
    const savedDocument = parseJson(safeRead(storage, registry.storageKey));
    const legacyDocument = legacy?.documents?.[registry.id];
    project.documents[registry.id] = mergeDefaults(
      defaults.documents[registry.id],
      savedDocument || legacyDocument
    );
  });

  const savedGeneralLetterTemplate = project.documents.cg.templateHtml;
  project.documents.cg.templateHtml = normalizeGeneralLetterEventFields(
    savedGeneralLetterTemplate
  );
  const generalLetterFieldsWereNormalized =
    project.documents.cg.templateHtml !== savedGeneralLetterTemplate;

  if ((metadataSource.schemaVersion || 0) < 4) {
    project.settings.circuitMode = "single";
  }

  if ((metadataSource.schemaVersion || 0) < 5) {
    project.events.pioneers = clone(defaults.events.pioneers);
  }

  if ((metadataSource.schemaVersion || 0) < 6) {
    project.documents.pio.meta.sections.partA.theme =
      defaults.documents.pio.meta.sections.partA.theme;
  }

  if ((metadataSource.schemaVersion || 0) < 7) {
    ["partA", "partB"].forEach((part) => {
      project.events.co[part].theme = defaults.events.co[part].theme;
      project.events.br[part].theme = defaults.events.br[part].theme;
      project.documents["ass-co"].meta.sections[part].theme =
        defaults.documents["ass-co"].meta.sections[part].theme;
      project.documents["ass-br"].meta.sections[part].theme =
        defaults.documents["ass-br"].meta.sections[part].theme;
    });
  }

  if ((metadataSource.schemaVersion || 0) < 9) {
    project.documents.cg.templateHtml = defaults.documents.cg.templateHtml;
    project.documents.cg.meta.eventVariant = "br";
  }

  if ((metadataSource.schemaVersion || 0) < 12) {
    ["disc-pio", "disc-co", "discb-co", "disc-br", "discb-br"].forEach((id) => {
      project.documents[id].templateHtml = defaults.documents[id].templateHtml;
    });
  }

  if (
    !savedMetadata ||
    !hasVersionedDocument ||
    (metadataSource.schemaVersion || 0) < 13 ||
    generalLetterFieldsWereNormalized
  ) {
    saveAssemblyProject(project, storage);
  }

  return project;
};

export const saveAssemblyProject = (nextProject, storage) => {
  safeWrite(
    storage,
    ASSEMBLY_PROJECT_STORAGE_KEY,
    JSON.stringify(projectMetadata(nextProject))
  );

  DOCUMENT_REGISTRY.forEach(({ id, storageKey }) => {
    if (nextProject.documents?.[id]) {
      safeWrite(storage, storageKey, JSON.stringify(nextProject.documents[id]));
    }
  });

  if (!storage && typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(ASSEMBLY_PROJECT_UPDATED_EVENT, { detail: nextProject })
    );
  }

  return nextProject;
};

export const resetAssemblyProjectSection = (sectionId, storage) => {
  const current = loadAssemblyProject(storage);
  const defaults = cloneAssemblyProject(defaultAssemblyProject);

  if (sectionId === "all") {
    saveAssemblyProject(defaults, storage);
    return defaults;
  }

  if (sectionId === "traveler") {
    current.traveler = defaults.traveler;
  } else if (sectionId === "events") {
    current.events = defaults.events;
  } else if (sectionId === "circuitComposition") {
    current.circuitComposition = defaults.circuitComposition;
  } else if (current.documents?.[sectionId]) {
    current.documents[sectionId] = defaults.documents[sectionId];
  }

  saveAssemblyProject(current, storage);
  return current;
};

export const getDocumentStorageKey = (documentId) =>
  DOCUMENT_REGISTRY.find(({ id }) => id === documentId)?.storageKey || null;
