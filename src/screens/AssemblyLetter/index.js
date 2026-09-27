import React, { useMemo, useState } from "react";

import Button from "components/Form/Button";
import LetterEditor from "components/LetterEditor";
import ContainerAuthenticated from "containers/Authenticated";
import useAssemblyProject from "hooks/useAssemblyProject";
import { buildDocumentPreview } from "services/assembly/templates";
import { DOCUMENT_REGISTRY_BY_ID } from "services/assembly/registry";
import { buildDocumentFileName, savePdf } from "utils/downloads";
import { createPreviewPdf } from "utils/previewPdf";
import { ButtonContainer, FormSpacer } from "ui/styled";

import {
  PreviewCard,
  PreviewContent,
  ScreenCard,
  ScreenText,
  ScreenTitle,
  SectionTab,
  StatusText,
  StickyActions,
  TwoColumns,
} from "screens/AssemblyShared/styled";
import { LetterModelCard, LetterModelTabs } from "./styled";

export default function AssemblyLetter({ documentId }) {
  const { project, setProject, resetSection } = useAssemblyProject();
  const registry = DOCUMENT_REGISTRY_BY_ID[documentId];
  const [exportStatus, setExportStatus] = useState("");

  const preview = useMemo(
    () => buildDocumentPreview(documentId, project),
    [documentId, project]
  );

  const assemblyDocument = project.documents[documentId];
  const supportsAssemblyVariant = documentId === "cg";
  const activeVariant = assemblyDocument.meta?.eventVariant === "co" ? "co" : "br";

  const selectAssemblyVariant = (eventVariant) => {
    setProject((current) => ({
      ...current,
      documents: {
        ...current.documents,
        [documentId]: {
          ...current.documents[documentId],
          meta: {
            ...current.documents[documentId].meta,
            eventVariant,
          },
        },
      },
    }));
    setExportStatus("");
  };

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
      date: project.events[supportsAssemblyVariant ? activeVariant : registry.variant]?.partA?.date,
    });
    let success = false;
    try {
      const printNode = document.getElementById(`print-${documentId}`);
      success = await savePdf(await createPreviewPdf(printNode), fileName);
    } catch (error) {
      console.error("downloadLetterPDF", error);
    }
    setExportStatus(success ? "PDF gerado." : "Não foi possível gerar o PDF.");
  };

  const handleReset = () => {
    if (!window.confirm(`Restaurar os textos oficiais de ${registry.menuLabel}? As edições deste documento serão substituídas.`)) return;
    resetSection(documentId);
    setExportStatus("Textos oficiais restaurados.");
  };

  return (
    <ContainerAuthenticated keep>
      <ScreenTitle>{assemblyDocument.meta.title}</ScreenTitle>
      <LetterModelCard>
        <ScreenText>{assemblyDocument.meta.description || "Template editável baseado no Excel."}</ScreenText>
        {supportsAssemblyVariant ? (
          <LetterModelTabs aria-label="Modelo da Carta Geral">
            <SectionTab
              type="button"
              active={activeVariant === "co"}
              aria-pressed={activeVariant === "co"}
              onClick={() => selectAssemblyVariant("co")}
            >
              Ass Co
            </SectionTab>
            <SectionTab
              type="button"
              active={activeVariant === "br"}
              aria-pressed={activeVariant === "br"}
              onClick={() => selectAssemblyVariant("br")}
            >
              Ass Br
            </SectionTab>
          </LetterModelTabs>
        ) : null}
      </LetterModelCard>

      <TwoColumns>
        <ScreenCard>
          <LetterEditor value={assemblyDocument.templateHtml} onChange={handleChange} />
        </ScreenCard>
        <PreviewCard>
          <PreviewContent
            id={`print-${documentId}`}
            data-pdf-page="true"
            dangerouslySetInnerHTML={{ __html: preview.html }}
          />
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
