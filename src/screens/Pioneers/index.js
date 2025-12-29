import React, { useEffect, useState, useRef } from "react";
import {
    DashboardTitle,
    DashboardText,
    ProgramWrap,
    ProgramHeader,
    Meta,
    MetaItem,
    ProgramTable,
    EditableCell,
    IntervalBar
} from "./styled";
import ContainerAuthenticated from "containers/Authenticated";
import Button from "components/Form/Button";
import { ButtonContainer, FormSpacer } from "ui/styled";
import useController from "./controller";

export default function Pioneers() {
    const {
        program,
        setMeta,
        setCell,
        addRow,
        removeRow,
        toggleInterval,
        reset,
        save,
        saveCurrent,
    } = useController();

    const [activeRow, setActiveRow] = useState(null);

    // Refs para drag “manual”
    const rowRefs = useRef([]);
    const draggingRef = useRef({ id: null });
    const bodyPrevSelect = useRef("");
    const bodyPrevCursor = useRef("");

    const attachRowRef = (el, idx) => {
        rowRefs.current[idx] = el;
    };

    const sanitize = (s) => String(s || "").replace(/<[^>]*>?/gm, "").trim();

    const reorder = (from, to) => {
        if (from == null || to == null) return;

        // impede mover além dos limites
        const last = program.rows.length - 1;
        if (to < 0 || to > last) return;

        const rows = [...program.rows];
        const [moved] = rows.splice(from, 1);
        rows.splice(to, 0, moved);

        save({ ...program, rows });
        setActiveRow(to);
    };

    const indexFromY = (y) => {
        for (let i = 0; i < rowRefs.current.length; i++) {
            const row = rowRefs.current[i];
            if (!row) continue;
            const rect = row.getBoundingClientRect();
            if (y >= rect.top && y <= rect.bottom) return i;
        }
        return null;
    };

    const onHandleMouseDown = (idx, e) => {
        e.preventDefault();
        e.stopPropagation();
        const draggedId = String(program.rows[idx].id);
        setActiveRow(idx);
        draggingRef.current = { id: draggedId };

        bodyPrevSelect.current = document.body.style.userSelect;
        bodyPrevCursor.current = document.body.style.cursor;
        document.body.style.userSelect = "none";
        document.body.style.cursor = "grabbing";

        window.addEventListener("mousemove", onMouseMove, { passive: false });
        window.addEventListener("mouseup", onMouseUp, { passive: false });
    };

    const onMouseMove = (e) => {
        if (e.buttons === 0) return onMouseUp();
        e.preventDefault();

        const draggedId = draggingRef.current.id;
        if (!draggedId) return;

        const from = program.rows.findIndex(r => String(r.id) === String(draggedId));
        if (from === -1) return;

        let over = indexFromY(e.clientY);
        const table = document.getElementById("program-table");
        if (!table) return;

        const rect = table.getBoundingClientRect();
        if (over == null) {
            if (e.clientY < rect.top) over = 0;
            else if (e.clientY > rect.bottom) over = program.rows.length - 1;
        }

        if (over == null || over === from) return;

        reorder(from, over);
        setActiveRow(over);
    };

    const onMouseUp = () => {
        draggingRef.current = { id: null };
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        document.body.style.userSelect = bodyPrevSelect.current || "";
        document.body.style.cursor = bodyPrevCursor.current || "";
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activeRow === null) return;
            // não mover se o usuário estiver editando um campo
            const activeEl = document.activeElement;
            if (
                activeEl &&
                (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable)
            ) {
                return;
            }
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
                const rows = [...program.rows];
                const targetIndex = e.key === "ArrowUp" ? activeRow - 1 : activeRow + 1;
                if (targetIndex < 0 || targetIndex >= rows.length) return;
                const [moved] = rows.splice(activeRow, 1);
                rows.splice(targetIndex, 0, moved);
                save({ ...program, rows });
                setActiveRow(targetIndex);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeRow, program, save]);

    return (
        <ContainerAuthenticated keep>
            <DashboardTitle>Programa — Reunião com Pioneiros</DashboardTitle>
            <ProgramWrap>
                <ProgramHeader>
                    <div>
                        <DashboardText>
                            <strong>{program.meta.code}</strong>
                        </DashboardText>
                        <DashboardText>{program.meta.title}</DashboardText>
                    </div>
                    <div>
                        <DashboardText>
                            <strong>DATA:</strong> {program.meta.date}
                        </DashboardText>
                        <DashboardText>
                            <strong>Tema:</strong> {program.meta.theme}
                        </DashboardText>
                    </div>
                </ProgramHeader>

                <Meta>
                    <MetaItem>
                        <label>Código</label>
                        <input
                            value={program.meta.code}
                            onChange={(e) => setMeta("code", e.target.value)}
                        />
                    </MetaItem>
                    <MetaItem style={{ gridColumn: "span 2" }}>
                        <label>Título</label>
                        <input
                            value={program.meta.title}
                            onChange={(e) => setMeta("title", e.target.value)}
                        />
                    </MetaItem>
                    <MetaItem>
                        <label>Data</label>
                        <input
                            value={program.meta.date}
                            onChange={(e) => setMeta("date", e.target.value)}
                        />
                    </MetaItem>
                    <MetaItem>
                        <label>Início</label>
                        <input
                            value={program.meta.start}
                            onChange={(e) => setMeta("start", e.target.value)}
                            placeholder="08:30"
                        />
                    </MetaItem>
                    <MetaItem style={{ gridColumn: "span 4" }}>
                        <label>Tema</label>
                        <input
                            value={program.meta.theme}
                            onChange={(e) => setMeta("theme", e.target.value)}
                        />
                    </MetaItem>
                </Meta>
            </ProgramWrap>

            <FormSpacer />
            <ButtonContainer end space>
                <Button nospace onClick={() => addRow(program.rows.length - 1)}>
                    + Adicionar parte
                </Button>
                <Button nospace onClick={toggleInterval}>
                    {program.rows.some((r) => r.type === "interval")
                        ? "Remover intervalo"
                        : "Adicionar intervalo"}
                </Button>
                <Button color="secondary" nospace onClick={reset}>
                    Resetar
                </Button>
                <Button color="primary" nospace onClick={saveCurrent}>
                    Salvar
                </Button>
            </ButtonContainer>
            <FormSpacer />

            <ProgramWrap>
                <ProgramTable id="program-table">
                    <thead>
                        <tr>
                            <th style={{ width: 40 }}>⇅</th>
                            <th style={{ width: 90 }}>Hora</th>
                            <th>Discurso / Tema</th>
                            <th style={{ width: 90 }}>Tempo (min)</th>
                            <th style={{ width: 90 }}>Termina</th>
                            <th style={{ width: 220 }}>Nome</th>
                            <th style={{ width: 200 }}>Congregação</th>
                            <th style={{ width: 100 }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {program.rows.map((row, idx) => (
                            <tr
                                key={String(row.id)}
                                ref={(el) => attachRowRef(el, idx)}
                                className={activeRow === idx ? "active-row" : ""}
                                style={
                                    activeRow === idx
                                        ? { background: "rgba(0,0,0,0.04)" }
                                        : undefined
                                }
                            >
                                <td>
                                    <div
                                        role="button"
                                        aria-label={`Mover linha ${idx + 1}`}
                                        tabIndex={0}
                                        title="Clique e arraste para mover (ou use ↑/↓)"
                                        onMouseDown={(e) => onHandleMouseDown(idx, e)}
                                        onDragStart={(e) => e.preventDefault()}
                                        style={{
                                            cursor: "grab",
                                            textAlign: "center",
                                            userSelect: "none",
                                        }}
                                    >
                                        ☰
                                    </div>
                                </td>
                                <EditableCell>
                                    <div>{row.time || ""}</div>
                                </EditableCell>
                                <EditableCell>
                                    <div
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) =>
                                            setCell(idx, "title", sanitize(e.currentTarget.textContent || ""))
                                        }
                                    >
                                        {row.title || ""}
                                    </div>
                                </EditableCell>
                                <EditableCell>
                                    <input
                                        type="number"
                                        min={0}
                                        value={row.durationMin ?? ""}
                                        onChange={(e) => setCell(idx, "durationMin", e.target.value)}
                                        style={{ width: "80px" }}
                                        aria-label={`Tempo da parte ${idx + 1} em minutos`}
                                    />
                                </EditableCell>
                                <EditableCell>
                                    <div>{row.end || ""}</div>
                                </EditableCell>
                                <EditableCell>
                                    <div
                                        contentEditable={row.type !== "interval"}
                                        suppressContentEditableWarning
                                        onBlur={(e) =>
                                            setCell(
                                                idx,
                                                "speaker",
                                                sanitize(e.currentTarget.textContent || "")
                                            )
                                        }
                                    >
                                        {row.speaker || ""}
                                    </div>
                                </EditableCell>
                                <EditableCell>
                                    <div
                                        contentEditable={row.type !== "interval"}
                                        suppressContentEditableWarning
                                        onBlur={(e) =>
                                            setCell(
                                                idx,
                                                "congregation",
                                                sanitize(e.currentTarget.textContent || "")
                                            )
                                        }
                                    >
                                        {row.congregation || ""}
                                    </div>
                                </EditableCell>
                                <td>
                                    <ButtonContainer center space>
                                        <button
                                            type="button"
                                            onClick={() => addRow(idx)}
                                            style={{ cursor: "pointer" }}
                                            aria-label={`Adicionar parte após a linha ${idx + 1}`}
                                        >
                                            +
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeRow(idx)}
                                            disabled={program.rows.length <= 1}
                                            style={{
                                                cursor:
                                                    program.rows.length <= 1 ? "not-allowed" : "pointer",
                                            }}
                                            aria-label={`Remover linha ${idx + 1}`}
                                        >
                                            -
                                        </button>
                                    </ButtonContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </ProgramTable>
            </ProgramWrap>
            <FormSpacer />
        </ContainerAuthenticated>
    );
}