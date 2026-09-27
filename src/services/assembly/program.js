const pad = (value) => String(value).padStart(2, "0");

export const normalizeTime = (value = "00:00") => {
  if (!value) return "00:00";

  if (String(value).includes(":")) {
    const [hours = "0", minutes = "0"] = String(value).split(":");
    return `${pad(Number(hours) || 0)}:${pad(Number(minutes) || 0)}`;
  }

  const decimal = Number(value);
  if (!Number.isNaN(decimal) && decimal > 0 && decimal < 1) {
    const totalMinutes = Math.round(decimal * 24 * 60);
    return `${pad(Math.floor(totalMinutes / 60))}:${pad(totalMinutes % 60)}`;
  }

  return String(value);
};

export const timeToMinutes = (value = "00:00") => {
  const normalized = normalizeTime(value);
  if (!normalized.includes(":")) return 0;
  const [hours = "0", minutes = "0"] = normalized.split(":");
  return (Number(hours) || 0) * 60 + (Number(minutes) || 0);
};

export const minutesToTime = (minutes = 0) => {
  const total = Number(minutes) || 0;
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`;
};

export const parseDuration = (value) => {
  if (typeof value === "number") return Math.max(0, Math.floor(value));
  const parsed = parseInt(String(value || "").replace(/[^0-9]/g, ""), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const clone = (value) => JSON.parse(JSON.stringify(value));

export const recalculateProgram = (programSection) => {
  const next = clone(programSection);
  let cursor = timeToMinutes(next?.meta?.start || "00:00");

  next.rows = (next.rows || []).map((row, index) => {
    const durationMin = parseDuration(row.durationMin);
    const time = minutesToTime(cursor);
    const end = minutesToTime(cursor + durationMin);
    cursor += durationMin;

    return {
      id: row.id || `row-${index + 1}`,
      type: row.type || "part",
      title: row.title || "",
      speaker: row.speaker || "",
      congregation: row.congregation || "",
      confirmation: !!row.confirmation,
      notes: row.notes || "",
      durationMin,
      time,
      end,
      session: row.session || "",
    };
  });

  return next;
};

export const createProgramRow = (rows = []) => ({
  id: `row-${Date.now()}-${rows.length + 1}`,
  type: "part",
  title: "",
  durationMin: 15,
  speaker: "",
  congregation: "",
  confirmation: false,
  notes: "",
});

export const toggleIntervalRow = (rows = []) => {
  const next = clone(rows);
  const intervalIndex = next.findIndex((row) => row.type === "interval");

  if (intervalIndex >= 0) {
    next.splice(intervalIndex, 1);
    return next;
  }

  next.push({
    id: `interval-${Date.now()}`,
    type: "interval",
    title: "INTERVALO",
    durationMin: 20,
    speaker: "",
    congregation: "",
    confirmation: false,
    notes: "",
  });

  return next;
};

export const reorderRows = (rows = [], fromIndex, toIndex) => {
  const next = clone(rows);
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= next.length || toIndex >= next.length) {
    return next;
  }

  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};
