import React, { useMemo, useState } from "react";

import Button from "components/Form/Button";
import LetterEditor from "components/LetterEditor";
import ContainerAuthenticated from "containers/Authenticated";
import useAssemblyProject from "hooks/useAssemblyProject";
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
  const assemblyDocument = project.documents[documentId];
  const [activeRecordIndex, setActiveRecordIndex] = useState(0);
  const [exportStatus, setExportStatus] = useState("");

  const preview = useMemo(
    () => buildDocumentPreview(documentId, project, { recordIndex: activeRecordIndex }),
    [activeRecordIndex, documentId, project]
  );

  const updateRecord = (index, field, value) => {
    setProject((current) => {
      const records = [...current.documents[documentId].records];
      records[index] = {
        ...records[index],
        [field]: field === "durationMin" ? Number(value || 0) : value,
      };

      return {
        ...current,
        documents: {
          ...current.documents,
          [documentId]: {
            ...current.documents[documentId],
            records,
          },
        },
      };
    });
  };

  const updateTemplate = (templateHtml) => {
    setProject((current) => ({
      ...current,
      documents: {
        ...current.documents,
        [documentId]: {
          ...current.documents[documentId],
          templateHtml,
        },
      },
    }));
  };

  const currentRecord = assemblyDocument.records[activeRecordIndex];

  const handleReset = () => {
    if (!window.confirm(`Restaurar os textos oficiais de ${registry.menuLabel}? As edições deste documento serão substituídas.`)) return;
    resetSection(documentId);
    setExportStatus("Textos oficiais restaurados.");
  };

  const handleDownload = async () => {
    setExportStatus("Gerando PDF...");
    const event = project.events[registry.variant]?.[registry.part === "B" ? "partB" : "partA"];
    const fileName = buildDocumentFileName({
      documentId,
      speaker: currentRecord?.speaker,
      date: event?.date,
    });
    const success = await downloadAsPDF(`print-${documentId}`, fileName);
    setExportStatus(success ? "PDF gerado." : "Não foi possível gerar o PDF.");
  };

  return (
    <ContainerAuthenticated keep>
      <ScreenTitle>{assemblyDocument.meta.title}</ScreenTitle>
      <ScreenCard>
        <ScreenText>Base editável da carta, lista de designações e pré-visualização gerada a partir dos dados atuais do projeto.</ScreenText>
      </ScreenCard>

      <TwoColumns>
        <div>
          <ScreenCard>
            <SmallLabel>Modelo base</SmallLabel>
            <LetterEditor value={assemblyDocument.templateHtml} onChange={updateTemplate} />
          </ScreenCard>
          <TableWrap>
            <SmallLabel>Registros</SmallLabel>
            <SimpleTable>
              <thead>
                <tr>
                  <th style={{ width: 48 }}>#</th>
                  <th>Tema</th>
                  <th style={{ width: 180 }}>Nome</th>
                  <th style={{ width: 180 }}>Congregação</th>
                  <th style={{ width: 100 }}>Tempo</th>
                  <th style={{ width: 100 }}>Início</th>
                </tr>
              </thead>
              <tbody>
                {assemblyDocument.records.map((record, index) => (
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
