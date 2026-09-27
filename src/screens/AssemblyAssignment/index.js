import React, { useEffect, useMemo, useState } from "react";

import Button from "components/Form/Button";
import LetterEditor from "components/LetterEditor";
import ContainerAuthenticated from "containers/Authenticated";
import useAssemblyProject from "hooks/useAssemblyProject";
import {
  getAssignmentView,
  getCircuitMode,
  updateLinkedAssignment,
} from "services/assembly/assignments";
import { DOCUMENT_REGISTRY_BY_ID } from "services/assembly/registry";
import { buildDocumentPreview } from "services/assembly/templates";
import { buildDocumentFileName, downloadAsPDF } from "utils/downloads";
import { ButtonContainer, FormSpacer } from "ui/styled";

import {
  PreviewCard,
  PreviewContent,
  ScreenCard,
  ScreenText,
  ScreenTitle,
  SectionTab,
  SectionTabs,
  SimpleTable,
  SmallLabel,
  StatusText,
  StickyActions,
  TableWrap,
  TwoColumns,
} from "screens/AssemblyShared/styled";

export default function AssemblyAssignment({ documentId }) {
  const { project, setProject, resetSection } = useAssemblyProject();
  const registry = DOCUMENT_REGISTRY_BY_ID[documentId];
  const [activePart, setActivePart] = useState(() =>
    registry.part === "B" ? "partB" : "partA"
  );
  const [activeRecordIndex, setActiveRecordIndex] = useState(0);
  const [exportStatus, setExportStatus] = useState("");
  const circuitMode = getCircuitMode(project);
  const assignmentView = useMemo(
    () => getAssignmentView(project, documentId, activePart),
    [activePart, documentId, project]
  );
  const assemblyDocument = assignmentView.document;
  const records = assignmentView.records;

  const preview = useMemo(
    () => buildDocumentPreview(documentId, project, {
      part: assignmentView.activePart,
      recordIndex: activeRecordIndex,
    }),
    [activeRecordIndex, assignmentView.activePart, documentId, project]
  );

  const updateRecord = (index, field, value) => {
    const record = records[index];
    if (!record) return;
    setProject((current) =>
      updateLinkedAssignment(current, documentId, activePart, record, field, value)
    );
  };

  const updateTemplate = (templateHtml) => {
    setProject((current) => {
      const view = getAssignmentView(current, documentId, activePart);
      return {
        ...current,
        documents: {
          ...current.documents,
          [view.assignmentDocumentId]: {
            ...current.documents[view.assignmentDocumentId],
            templateHtml,
          },
        },
      };
    });
  };

  const currentRecord = records[activeRecordIndex];

  useEffect(() => {
    if (activeRecordIndex >= records.length) {
      setActiveRecordIndex(Math.max(0, records.length - 1));
    }
  }, [activeRecordIndex, records.length]);

  useEffect(() => {
    if (circuitMode === "single") setActivePart("partA");
  }, [circuitMode]);

  const handleReset = () => {
    if (!window.confirm(`Restaurar os textos oficiais de ${registry.menuLabel}? As edições deste documento serão substituídas.`)) return;
    resetSection(assignmentView.assignmentDocumentId);
    setExportStatus("Textos oficiais restaurados.");
  };

  const handleDownload = async () => {
    setExportStatus("Gerando PDF...");
    const event = project.events[registry.variant]?.[assignmentView.activePart];
    const fileName = buildDocumentFileName({
      documentId: assignmentView.assignmentDocumentId,
      speaker: currentRecord?.speaker,
      date: event?.date,
      part: circuitMode === "parts"
        ? assignmentView.activePart === "partA" ? "parte-a" : "parte-b"
        : "unico",
    });
    const success = await downloadAsPDF(`print-${documentId}`, fileName);
    setExportStatus(success ? "PDF gerado." : "Não foi possível gerar o PDF.");
  };

  return (
    <ContainerAuthenticated keep>
      <ScreenTitle>{assemblyDocument.meta.title}</ScreenTitle>
      <ScreenCard>
        <ScreenText>
          Sincronizado com <strong>{assignmentView.programId}</strong>. Nomes, congregações,
          temas, tempos e horários vêm diretamente da programação atual do projeto.
        </ScreenText>
      </ScreenCard>

      {circuitMode === "parts" ? (
        <SectionTabs aria-label="Parte das designações">
          <SectionTab
            type="button"
            active={assignmentView.activePart === "partA"}
            onClick={() => {
              setActivePart("partA");
              setActiveRecordIndex(0);
            }}
          >
            Parte A
          </SectionTab>
          <SectionTab
            type="button"
            active={assignmentView.activePart === "partB"}
            onClick={() => {
              setActivePart("partB");
              setActiveRecordIndex(0);
            }}
          >
            Parte B
          </SectionTab>
        </SectionTabs>
      ) : null}

      <TwoColumns>
        <div>
          <TableWrap>
            <SmallLabel>Registros</SmallLabel>
            <SimpleTable style={{ minWidth: 920 }}>
              <thead>
                <tr>
                  <th style={{ width: 48 }}>#</th>
                  <th style={{ width: 300 }}>Tema</th>
                  <th style={{ width: 180 }}>Nome</th>
                  <th style={{ width: 180 }}>Congregação</th>
                  <th style={{ width: 100 }}>Tempo</th>
                  <th style={{ width: 100 }}>Início</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={record.id}
                    className={index === activeRecordIndex ? "active" : ""}
                    onClick={() => setActiveRecordIndex(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <input
                        value={record.title}
                        onChange={(event) => updateRecord(index, "title", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={record.speaker}
                        onChange={(event) => updateRecord(index, "speaker", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={record.congregation}
                        onChange={(event) => updateRecord(index, "congregation", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={record.durationMin}
                        onChange={(event) => updateRecord(index, "durationMin", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={record.time}
                        onChange={(event) => updateRecord(index, "time", event.target.value)}
                      />
                    </td>
                  </tr>
                ))}
                {!records.length ? (
                  <tr>
                    <td colSpan={6}>
                      Nenhum orador foi preenchido nas partes vinculadas da programação.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </SimpleTable>
            {currentRecord ? (
              <FormSpacer />
            ) : null}
            {currentRecord ? (
              <SimpleTable>
                <tbody>
                  <tr>
                    <th style={{ width: 160 }}>Observações</th>
                    <td>
                      <textarea
                        value={currentRecord.notes || ""}
                        onChange={(event) => updateRecord(activeRecordIndex, "notes", event.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </SimpleTable>
            ) : null}
          </TableWrap>
          <ScreenCard>
            <SmallLabel>Modelo base</SmallLabel>
            <LetterEditor value={assemblyDocument.templateHtml} onChange={updateTemplate} />
          </ScreenCard>
        </div>
        <PreviewCard id={`print-${documentId}`}>
          <SmallLabel data-pdf-exclude="true">Pré-visualização A4</SmallLabel>
          <PreviewContent dangerouslySetInnerHTML={{ __html: preview.html }} />
        </PreviewCard>
      </TwoColumns>

      <FormSpacer extraLarge />
      <StickyActions>
        <ButtonContainer end space>
          {exportStatus ? <StatusText error={exportStatus.startsWith("Não")}>{exportStatus}</StatusText> : null}
          <Button color="secondary" nospace onClick={handleReset}>
            Restaurar textos
          </Button>
          <Button color="primary" nospace onClick={handleDownload}>
            Baixar PDF
          </Button>
        </ButtonContainer>
      </StickyActions>
      <FormSpacer extraLarge />
    </ContainerAuthenticated>
  );
}
