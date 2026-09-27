import React, { useMemo, useState } from "react";

import Button from "components/Form/Button";
import LetterEditor from "components/LetterEditor";
import ContainerAuthenticated from "containers/Authenticated";
import useAssemblyProject from "hooks/useAssemblyProject";
import { buildDocumentPreview } from "services/assembly/templates";
import { DOCUMENT_REGISTRY_BY_ID } from "services/assembly/registry";
import { buildDocumentFileName, downloadAsPDF } from "utils/downloads";
import { ButtonContainer, FormSpacer } from "ui/styled";

import {
  PreviewCard,
  PreviewContent,
  ScreenCard,
  ScreenText,
  ScreenTitle,
  StatusText,
  StickyActions,
  TwoColumns,
} from "screens/AssemblyShared/styled";

export default function AssemblyLetter({ documentId }) {
  const { project, setProject, resetSection } = useAssemblyProject();
  const registry = DOCUMENT_REGISTRY_BY_ID[documentId];
  const [exportStatus, setExportStatus] = useState("");

  const preview = useMemo(
    () => buildDocumentPreview(documentId, project),
    [documentId, project]
  );

  const document = project.documents[documentId];

  const handleChange = (templateHtml) => {
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

  const handleDownload = async () => {
    setExportStatus("Gerando PDF...");
    const fileName = buildDocumentFileName({
      documentId,
      date: project.events[registry.variant]?.partA?.date,
    });
    const success = await downloadAsPDF(`print-${documentId}`, fileName);
    setExportStatus(success ? "PDF gerado." : "Não foi possível gerar o PDF.");
  };

  const handleReset = () => {
    if (!window.confirm(`Restaurar os textos oficiais de ${registry.menuLabel}? As edições deste documento serão substituídas.`)) return;
    resetSection(documentId);
    setExportStatus("Textos oficiais restaurados.");
  };

  return (
    <ContainerAuthenticated keep>
      <ScreenTitle>{document.meta.title}</ScreenTitle>
      <ScreenCard>
        <ScreenText>{document.meta.description || "Template editável baseado no Excel."}</ScreenText>
      </ScreenCard>

      <TwoColumns>
        <ScreenCard>
          <LetterEditor value={document.templateHtml} onChange={handleChange} />
        </ScreenCard>
        <PreviewCard id={`print-${documentId}`}>
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
