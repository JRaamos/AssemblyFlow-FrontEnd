import { ReadStorage } from "services/storage";

import {
  ASSEMBLY_STORAGE_KEY,
  cloneAssemblyProject,
  defaultAssemblyProject,
} from "./defaults";
import { DOCUMENT_REGISTRY } from "./registry";

export const ASSEMBLY_PROJECT_STORAGE_KEY = "assemblyflow:project:v2";

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
  traveler: clone(project.traveler),
  events: clone(project.events),
  circuitComposition: clone(project.circuitComposition),
  schemaVersion: 2,
});

export const loadAssemblyProject = (storage) => {
  const defaults = cloneAssemblyProject(defaultAssemblyProject);
  const savedMetadata = parseJson(safeRead(storage, ASSEMBLY_PROJECT_STORAGE_KEY));
  const hasVersionedDocument = DOCUMENT_REGISTRY.some(({ storageKey }) =>
    Boolean(safeRead(storage, storageKey))
  );
  const legacy = hasVersionedDocument ? null : loadLegacyProject();
  const metadataSource = savedMetadata || legacy || {};

  const project = {
    ...defaults,
    traveler: mergeDefaults(defaults.traveler, metadataSource.traveler),
    events: mergeDefaults(defaults.events, metadataSource.events),
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

  if (!savedMetadata || !hasVersionedDocument) {
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
