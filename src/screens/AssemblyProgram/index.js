import React, { useEffect, useMemo, useRef, useState } from "react";

import Button from "components/Form/Button";
import PioneerProgramPrintSheet from "components/PioneerProgramPrintSheet";
import ProgramConstruction from "components/ProgramConstruction";
import ProgramPrintSheet from "components/ProgramPrintSheet";
import ContainerAuthenticated from "containers/Authenticated";
import useAssemblyProject from "hooks/useAssemblyProject";
import {
  createProgramRow,
  recalculateProgram,
  reorderRows,
  toggleIntervalRow,
} from "services/assembly/program";
import { getCircuitMode } from "services/assembly/assignments";
import { DOCUMENT_REGISTRY_BY_ID } from "services/assembly/registry";
import { buildDocumentFileName, downloadAsPDF } from "utils/downloads";
import { downloadPioneerProgramPdf } from "utils/pioneerProgramPdf";
import { downloadAssemblyProgramPdf } from "utils/programPdf";
import { ButtonContainer, FormSpacer } from "ui/styled";

import {
  ScreenCard,
  ScreenText,
  ScreenTitle,
  SmallLabel,
  SectionTab,
  SectionTabs,
  StickyActions,
  StatusText,
} from "screens/AssemblyShared/styled";
import {
  Meta,
  MetaItem,
  ProgramHeader,
} from "components/ProgramConstruction/styled";

const sanitize = (value) => String(value || "").replace(/<[^>]*>?/gm, "").trim();

export default function AssemblyProgram({ documentId }) {
  const { project, setProject, resetSection } = useAssemblyProject();
  const registry = DOCUMENT_REGISTRY_BY_ID[documentId];
  const [activePart, setActivePart] = useState("partA");
  const [activeRow, setActiveRow] = useState(null);
  const [exportStatus, setExportStatus] = useState("");
  const rowRefs = useRef([]);
  const draggingRef = useRef({ id: null });
  const bodyPrevSelect = useRef("");
  const bodyPrevCursor = useRef("");

  const assemblyDocument = project.documents[documentId];
  const isAssemblyProgram = documentId === "ass-co" || documentId === "ass-br";
  const isPioneerProgram = documentId === "pio";
  const hasFaithfulPdf = isAssemblyProgram || isPioneerProgram;
  const circuitMode = isAssemblyProgram ? getCircuitMode(project) : "single";
  const activeSection = circuitMode === "single" ? "partA" : activePart;
  const eventScope = registry.variant === "br"
    ? project.events.br
    : registry.variant === "co"
      ? project.events.co
      : project.events.pioneers;
  const currentEvent = eventScope?.[activeSection] || {};
  const partLabel = circuitMode === "single"
    ? ""
    : activeSection === "partA"
      ? "PARTE A"
      : "PARTE B";
  const variantLabel = registry.variant === "br"
    ? "CA-BR"
    : registry.variant === "co"
      ? "CA-CO"
      : "PIONEIROS";
  const footerVariantLabel = registry.variant === "br"
    ? "CA-br"
    : registry.variant === "co"
      ? "CA-co"
      : "Pioneiros";

  const program = useMemo(() => {
    const section = {
      meta: assemblyDocument.meta.sections[activeSection],
      rows: assemblyDocument.records[activeSection],
    };

    return recalculateProgram(section);
  }, [activeSection, assemblyDocument]);

  const persistSection = (nextSection) => {
    const recalculated = recalculateProgram(nextSection);

    setProject((current) => ({
      ...current,
      documents: {
        ...current.documents,
        [documentId]: {
          ...current.documents[documentId],
          meta: {
            ...current.documents[documentId].meta,
            sections: {
              ...current.documents[documentId].meta.sections,
              [activeSection]: recalculated.meta,
            },
          },
          records: {
            ...current.documents[documentId].records,
            [activeSection]: recalculated.rows,
          },
        },
      },
    }));
  };

  useEffect(() => {
    setActivePart("partA");
  }, [documentId]);

  useEffect(() => {
    if (circuitMode === "single") setActivePart("partA");
  }, [circuitMode]);

  const setMeta = (key, value) => {
    persistSection({
      meta: {
        ...program.meta,
        [key]: value,
      },
      rows: program.rows,
    });
  };

  const setCell = (index, field, value) => {
    const rows = [...program.rows];
    rows[index] = {
      ...rows[index],
      [field]: field === "durationMin" ? Number(value || 0) : value,
    };

    if (field === "title") {
      rows[index].title = sanitize(value);
    }

    persistSection({
      meta: program.meta,
      rows,
    });
  };

  const addRow = (afterIndex = program.rows.length - 1) => {
    const rows = [...program.rows];
    rows.splice(afterIndex + 1, 0, createProgramRow(rows));
    persistSection({ meta: program.meta, rows });
  };

  const removeRow = (index) => {
    const rows = [...program.rows];
    if (rows.length <= 1) return;
    rows.splice(index, 1);
    persistSection({ meta: program.meta, rows });
  };

  const handleToggleInterval = () => {
    persistSection({
      meta: program.meta,
      rows: toggleIntervalRow(program.rows),
    });
  };

  const attachRowRef = (element, index) => {
    rowRefs.current[index] = element;
  };

  const indexFromY = (value) => {
    for (let index = 0; index < rowRefs.current.length; index += 1) {
      const row = rowRefs.current[index];
      if (!row) continue;
      const rect = row.getBoundingClientRect();
      if (value >= rect.top && value <= rect.bottom) return index;
    }
    return null;
  };

  const onMouseMove = (event) => {
    if (event.buttons === 0) return onMouseUp();
    event.preventDefault();

    const draggedId = draggingRef.current.id;
    if (!draggedId) return;

    const from = program.rows.findIndex((row) => String(row.id) === String(draggedId));
    if (from === -1) return;

    let over = indexFromY(event.clientY);
    const table = document.getElementById("program-table");
    if (!table) return;

    const rect = table.getBoundingClientRect();
    if (over == null) {
      if (event.clientY < rect.top) over = 0;
      else if (event.clientY > rect.bottom) over = program.rows.length - 1;
    }

    if (over == null || over === from) return;

    persistSection({
      meta: program.meta,
      rows: reorderRows(program.rows, from, over),
    });
    setActiveRow(over);
  };

  const onMouseUp = () => {
    draggingRef.current = { id: null };
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    document.body.style.userSelect = bodyPrevSelect.current || "";
    document.body.style.cursor = bodyPrevCursor.current || "";
  };

  const onHandleMouseDown = (index, event) => {
    event.preventDefault();
    event.stopPropagation();
    draggingRef.current = { id: String(program.rows[index].id) };
    setActiveRow(index);
    bodyPrevSelect.current = document.body.style.userSelect;
    bodyPrevCursor.current = document.body.style.cursor;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    window.addEventListener("mousemove", onMouseMove, { passive: false });
    window.addEventListener("mouseup", onMouseUp, { passive: false });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (activeRow == null) return;
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const targetIndex = event.key === "ArrowUp" ? activeRow - 1 : activeRow + 1;
        if (targetIndex < 0 || targetIndex >= program.rows.length) return;

        persistSection({
          meta: program.meta,
          rows: reorderRows(program.rows, activeRow, targetIndex),
        });
        setActiveRow(targetIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeRow, program]);

  const handleReset = () => {
    if (!window.confirm(`Restaurar os textos oficiais de ${registry.menuLabel}? As edições deste documento serão substituídas.`)) return;
    resetSection(documentId);
    setExportStatus("Textos oficiais restaurados.");
  };

  const handleDownload = async () => {
    setExportStatus("Gerando PDF...");
    const fileName = buildDocumentFileName({
      documentId,
      date: program.meta.date,
      part: registry.supportsParts
        ? circuitMode === "parts"
          ? (activeSection === "partA" ? "parte-a" : "parte-b")
          : "unico"
        : "",
    });
    let success;
    if (isAssemblyProgram) {
      success = await downloadAssemblyProgramPdf(
        {
          program,
          partLabel,
          variantLabel,
          footerVariantLabel,
          singleProgram: circuitMode === "single",
          rehearsalDateTime: currentEvent.rehearsalDateTime,
          rehearsalVenue: currentEvent.rehearsalVenue,
        },
        fileName
      );
    } else if (isPioneerProgram) {
      success = await downloadPioneerProgramPdf(
        { program, event: currentEvent },
        fileName
      );
    } else {
      success = await downloadAsPDF(`print-${documentId}`, fileName);
    }
    setExportStatus(success ? "PDF gerado." : "Não foi possível gerar o PDF.");
  };

  return (
    <ContainerAuthenticated keep>
      <ScreenTitle>{assemblyDocument.meta.title}</ScreenTitle>
      <ScreenCard>
        <ScreenText>
          {isPioneerProgram
            ? "Programa da reunião com pioneiros, editável e pronto para exportação fiel em PDF."
            : circuitMode === "single"
              ? "Programa de circuito único, editável e pronto para exportação em PDF."
              : "Programa editável com Partes A/B e exportação em PDF."}
        </ScreenText>
      </ScreenCard>

      {isAssemblyProgram && registry.supportsParts && circuitMode === "parts" ? (
        <SectionTabs aria-label="Parte do circuito">
          <SectionTab type="button" active={activePart === "partA"} onClick={() => setActivePart("partA")}>
            Parte A
          </SectionTab>
          <SectionTab type="button" active={activePart === "partB"} onClick={() => setActivePart("partB")}>
            Parte B
          </SectionTab>
        </SectionTabs>
      ) : null}

      <ScreenCard id={isAssemblyProgram ? undefined : `print-${documentId}`}>
        <ProgramHeader>
          <div>
            <ScreenText className="pdf-text-block">
              <strong>{program.meta.code}</strong>
            </ScreenText>
            <ScreenText className="pdf-text-block">{program.meta.title}</ScreenText>
          </div>
          <div>
            <ScreenText className="pdf-text-block">
              <strong>DATA:</strong> {program.meta.date}
            </ScreenText>
            <ScreenText className="pdf-text-block">
              <strong>Tema:</strong> {program.meta.theme}
            </ScreenText>
          </div>
        </ProgramHeader>

        <Meta data-pdf-exclude="true">
          <MetaItem>
            <label>Código</label>
            <input value={program.meta.code} onChange={(event) => setMeta("code", event.target.value)} />
          </MetaItem>
          <MetaItem style={{ gridColumn: "span 2" }}>
            <label>Título</label>
            <input value={program.meta.title} onChange={(event) => setMeta("title", event.target.value)} />
          </MetaItem>
          <MetaItem>
            <label>Data</label>
            <input value={program.meta.date} onChange={(event) => setMeta("date", event.target.value)} />
          </MetaItem>
          <MetaItem>
            <label>Início</label>
            <input value={program.meta.start} onChange={(event) => setMeta("start", event.target.value)} />
          </MetaItem>
          <MetaItem style={{ gridColumn: "1 / -1" }}>
            <label>Tema</label>
            <input value={program.meta.theme} onChange={(event) => setMeta("theme", event.target.value)} />
          </MetaItem>
        </Meta>

        <FormSpacer />
        <ProgramConstruction
          program={program}
          activeRow={activeRow}
          attachRowRef={attachRowRef}
          onHandleMouseDown={onHandleMouseDown}
          setCell={setCell}
          addRow={addRow}
          removeRow={removeRow}
        />
      </ScreenCard>

      {hasFaithfulPdf ? (
        <ScreenCard>
          <SmallLabel>Prévia fiel do PDF</SmallLabel>
          {isPioneerProgram ? (
            <PioneerProgramPrintSheet program={program} event={currentEvent} />
          ) : (
            <ProgramPrintSheet
              program={program}
              partLabel={partLabel}
              variantLabel={variantLabel}
              footerVariantLabel={footerVariantLabel}
              singleProgram={circuitMode === "single"}
              rehearsalDateTime={currentEvent.rehearsalDateTime}
              rehearsalVenue={currentEvent.rehearsalVenue}
            />
          )}
        </ScreenCard>
      ) : null}

      <FormSpacer extraLarge />
      <StickyActions>
        <ButtonContainer end space>
          <Button nospace onClick={() => addRow(program.rows.length - 1)}>
            + Adicionar parte
          </Button>
          <Button nospace onClick={handleToggleInterval}>
            {program.rows.some((row) => row.type === "interval") ? "Remover intervalo" : "Adicionar intervalo"}
          </Button>
          {exportStatus ? <StatusText error={exportStatus.startsWith("Não")}>{exportStatus}</StatusText> : null}
          <Button color="secondary" nospace onClick={handleReset}>
            Restaurar textos
          </Button>
          <Button
            color="primary"
            nospace
            onClick={handleDownload}
          >
            Baixar PDF
          </Button>
        </ButtonContainer>
      </StickyActions>
      <FormSpacer extraLarge />
    </ContainerAuthenticated>
  );
}
