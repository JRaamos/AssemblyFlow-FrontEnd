import { useEffect, useState, useCallback } from "react";
import { ReadStorage, SaveStorage } from "services/storage";

const STORAGE_KEY = "pioneers_program";

// Helpers
const toMinutes = (hhmm) => {
    if (!hhmm) return 0;
    const [h = "0", m = "0"] = String(hhmm).split(":");
    return parseInt(h, 10) * 60 + parseInt(m, 10);
};
const toHHMM = (mins) => {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}`;
};
const parseDuration = (v) => {
    if (v == null) return 0;
    if (typeof v === "number") return Math.max(0, Math.floor(v));
    const num = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? 0 : num;
};
const makeId = () => {
    try {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    } catch (e) { }
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
};

const defaultProgram = {
    meta: {
        code: "BA-033",
        title:
            "REUNIÃO ESPECIAL COM PIONEIROS REGULARES, ESPECIAIS E MISSIONÁRIOS",
        date: "14 de março de 2025",
        theme: "“Eu os reanimarei” — Mat. 11:28",
        start: "08:30",
    },
    rows: [
        { id: makeId(), type: "part", title: "", durationMin: 15, speaker: "", congregation: "" },
    ],
};

function recalcTimes(program) {
    const next = JSON.parse(JSON.stringify(program));
    let cursor = toMinutes(next.meta.start || "00:00");
    next.rows = next.rows.map((row) => {
        const id = row.id || makeId();
        if (row.type === "header") return { ...row, id };
        const dur = parseDuration(row.durationMin);
        const time = toHHMM(cursor);
        const end = toHHMM(cursor + dur);
        cursor += dur;
        return { ...row, id, time, end, durationMin: dur };
    });
    return next;
}

const createRow = (type = "part") => {
    if (type === "interval") {
        return { id: makeId(), type: "interval", title: "INTERVALO", durationMin: 20 };
    }
    return { id: makeId(), type: "part", title: "", durationMin: 15, speaker: "", congregation: "" };
};

export default function useController() {
    const [program, setProgram] = useState(defaultProgram);

    useEffect(() => {
        const savedStr = ReadStorage(STORAGE_KEY);
        if (savedStr) {
            try {
                const parsed = JSON.parse(savedStr);
                if (parsed && parsed.meta && parsed.rows) setProgram(recalcTimes(parsed));
                else setProgram(recalcTimes(defaultProgram));
            } catch {
                setProgram(recalcTimes(defaultProgram));
            }
        } else {
            setProgram(recalcTimes(defaultProgram));
        }
    }, []);

    const save = useCallback((next) => {
        const withTimes = recalcTimes(next);
        setProgram(withTimes);
        try {
            SaveStorage(STORAGE_KEY, JSON.stringify(withTimes));
        } catch {
            SaveStorage(STORAGE_KEY, withTimes);
        }
    }, []);

    const setMeta = useCallback(
        (key, value) => {
            save({ ...program, meta: { ...program.meta, [key]: value } });
        },
        [program, save]
    );

    const setCell = useCallback(
        (index, field, value) => {
            const rows = [...program.rows];
            const row = { ...rows[index] };
            if (field === "durationMin") row.durationMin = parseDuration(value);
            else row[field] = value;
            rows[index] = row;
            save({ ...program, rows });
        },
        [program, save]
    );

    const addRow = useCallback(
        (afterIndex = program.rows.length - 1) => {
            const rows = [...program.rows];
            const intervalIndex = rows.findIndex((r) => r.type === "interval");
            // se existir intervalo, adiciona APÓS o intervalo
            if (intervalIndex !== -1) afterIndex = intervalIndex;
            rows.splice(afterIndex + 1, 0, createRow("part"));
            save({ ...program, rows });
        },
        [program, save]
    );

    const toggleInterval = useCallback(() => {
        const rows = [...program.rows];
        const idx = rows.findIndex((r) => r.type === "interval");
        if (idx !== -1) {
            rows.splice(idx, 1);
        } else {
            rows.push(createRow("interval"));
        }
        save({ ...program, rows });
    }, [program, save]);

    const removeRow = useCallback(
        (index) => {
            const rows = [...program.rows];
            if (rows.length <= 1) return;
            rows.splice(index, 1);
            save({ ...program, rows });
        },
        [program, save]
    );

    const reset = useCallback(() => {
        save(defaultProgram);
    }, [save]);

    return {
        program,
        setMeta,
        setCell,
        addRow,
        toggleInterval,
        removeRow,
        reset,
        save: (next) => save(next),
        saveCurrent: () => {
            const data = recalcTimes(program);
            try {
                SaveStorage(STORAGE_KEY, JSON.stringify(data));
            } catch {
                SaveStorage(STORAGE_KEY, data);
            }
        },
    };
}