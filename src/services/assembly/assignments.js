import { recalculateProgram } from "./program";

const assignmentLinks = [
  {
    baseId: "disc-co",
    partBId: "discb-co",
    programId: "ass-co",
    kind: "discourse",
    rowIds: {
      partA: [
        "ass-co-a-4",
        "ass-co-a-5",
        "ass-co-a-6",
        "ass-co-a-8",
        "ass-co-a-9",
        "ass-co-a-15",
        "ass-co-a-17",
        "ass-co-a-18",
        "ass-co-a-19",
        "ass-co-a-20",
      ],
      partB: [
        "ass-co-b-5",
        "ass-co-b-6",
        "ass-co-b-7",
        "ass-co-b-9",
        "ass-co-b-10",
        "ass-co-b-16",
        "ass-co-b-18",
        "ass-co-b-19",
        "ass-co-b-20",
        "ass-co-b-21",
      ],
    },
  },
  {
    baseId: "disc-br",
    partBId: "discb-br",
    programId: "ass-br",
    kind: "discourse",
    rowIds: {
      partA: [
        "ass-br-a-4",
        "ass-br-a-5",
        "ass-br-a-9",
        "ass-br-a-14",
        "ass-br-a-15",
        "ass-br-a-16",
        "ass-br-a-17",
      ],
      partB: [
        "ass-br-b-4",
        "ass-br-b-5",
        "ass-br-b-9",
        "ass-br-b-14",
        "ass-br-b-15",
        "ass-br-b-16",
        "ass-br-b-17",
      ],
    },
  },
  {
    baseId: "pr-or-co",
    partBId: "pr-or-b-co",
    programId: "ass-co",
    kind: "presidency-prayer",
    rowIds: {
      partA: ["ass-co-a-2", "ass-co-a-13"],
      partB: ["ass-co-b-2", "ass-co-b-3", "ass-co-b-14"],
    },
  },
  {
    baseId: "pr-or-br",
    partBId: "pr-or-b-br",
    programId: "ass-br",
    kind: "presidency-prayer",
    rowIds: {
      partA: ["ass-br-a-2", "ass-br-a-3", "ass-br-a-13"],
      partB: ["ass-br-b-2", "ass-br-b-3", "ass-br-b-13"],
    },
  },
];

const normalize = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

const findLink = (documentId) =>
  assignmentLinks.find(
    ({ baseId, partBId }) => baseId === documentId || partBId === documentId
  ) || null;

const getRequestedPart = (documentId, part) => {
  const link = findLink(documentId);
  if (!link) return "partA";
  if (part === "partA" || part === "partB") return part;
  return link.partBId === documentId ? "partB" : "partA";
};

const getAssignmentTitle = (row, kind) => {
  if (kind === "discourse") return row.title;

  const title = normalize(row.title);
  if (title.includes("presidencia") && title.includes("oracao")) {
    return "Presidência e oração";
  }
  if (title.includes("presidencia")) return "Presidência";
  if (title.includes("oracao inicial")) return "Oração inicial";
  if (title.includes("oracao final")) return "Oração final";
  if (title.includes("oracao")) return "Oração";
  return row.title;
};

const findStoredRecord = (records, row) =>
  records.find(({ sourceProgramRowId }) => sourceProgramRowId === row.id) ||
  records.find(
    (record) =>
      normalize(record.speaker) === normalize(row.speaker) &&
      normalize(record.title) === normalize(row.title)
  ) ||
  records.find(
    (record) =>
      normalize(record.speaker) === normalize(row.speaker) &&
      normalize(record.time) === normalize(row.time)
  );

export const getCircuitMode = (project) =>
  project?.settings?.circuitMode === "parts" ? "parts" : "single";

export const getAssignmentView = (project, documentId, requestedPart) => {
  const link = findLink(documentId);
  if (!link) {
    const document = project?.documents?.[documentId];
    return {
      activePart: "partA",
      assignmentDocumentId: documentId,
      baseDocumentId: documentId,
      document,
      programId: null,
      records: Array.isArray(document?.records) ? document.records : [],
    };
  }

  const circuitMode = getCircuitMode(project);
  const selectedPart = getRequestedPart(documentId, requestedPart);
  const activePart = circuitMode === "single" ? "partA" : selectedPart;
  const assignmentDocumentId = activePart === "partB" ? link.partBId : link.baseId;
  const document = project?.documents?.[assignmentDocumentId];
  const programDocument = project?.documents?.[link.programId];
  const section = programDocument?.records?.[activePart] || [];
  const meta = programDocument?.meta?.sections?.[activePart] || {};
  const rows = recalculateProgram({ meta, rows: section }).rows;
  const allowedIds = new Set(link.rowIds[activePart] || []);
  const storedRecords = Array.isArray(document?.records) ? document.records : [];

  const records = rows
    .filter((row) => allowedIds.has(row.id) && String(row.speaker || "").trim())
    .map((row) => {
      const stored = findStoredRecord(storedRecords, row);
      return {
        id: `${assignmentDocumentId}-${row.id}`,
        sourceProgramRowId: row.id,
        speaker: row.speaker,
        congregation: row.congregation,
        title: getAssignmentTitle(row, link.kind),
        durationMin: row.durationMin,
        time: row.time,
        session: row.time && row.time < "12:30" ? "Manhã" : "Tarde",
        confirmation: stored?.confirmation ?? row.confirmation ?? false,
        notes:
          stored?.notes ??
          (link.kind === "discourse" ? "Veja esboço, em anexo." : ""),
      };
    });

  return {
    activePart,
    assignmentDocumentId,
    baseDocumentId: link.baseId,
    circuitMode,
    document,
    kind: link.kind,
    programId: link.programId,
    records,
  };
};

export const updateLinkedAssignment = (
  project,
  documentId,
  requestedPart,
  record,
  field,
  rawValue
) => {
  const view = getAssignmentView(project, documentId, requestedPart);
  if (!view.programId || !record?.sourceProgramRowId) return project;

  if (field === "notes" || field === "confirmation") {
    const currentDocument = project.documents[view.assignmentDocumentId];
    const records = Array.isArray(currentDocument.records)
      ? [...currentDocument.records]
      : [];
    const index = records.findIndex(
      ({ sourceProgramRowId }) => sourceProgramRowId === record.sourceProgramRowId
    );
    const nextRecord = {
      ...(index >= 0 ? records[index] : {}),
      id:
        index >= 0
          ? records[index].id
          : `${view.assignmentDocumentId}-${record.sourceProgramRowId}`,
      sourceProgramRowId: record.sourceProgramRowId,
      notes: field === "notes" ? rawValue : record.notes,
      confirmation:
        field === "confirmation" ? Boolean(rawValue) : record.confirmation,
    };

    if (index >= 0) records[index] = nextRecord;
    else records.push(nextRecord);

    return {
      ...project,
      documents: {
        ...project.documents,
        [view.assignmentDocumentId]: {
          ...currentDocument,
          records,
        },
      },
    };
  }

  const value = field === "durationMin" ? Number(rawValue || 0) : rawValue;
  const rows = project.documents[view.programId].records[view.activePart].map((row) => {
    if (row.id !== record.sourceProgramRowId) return row;
    if (field === "time") {
      return { ...row, time: value, scheduledTime: value };
    }
    return { ...row, [field]: value };
  });

  return {
    ...project,
    documents: {
      ...project.documents,
      [view.programId]: {
        ...project.documents[view.programId],
        records: {
          ...project.documents[view.programId].records,
          [view.activePart]: rows,
        },
      },
    },
  };
};

export const ASSIGNMENT_LINKS = assignmentLinks;
