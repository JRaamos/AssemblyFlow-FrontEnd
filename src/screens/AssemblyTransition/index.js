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
  BlockCard,
  BlockList,
  PreviewContent,
  ScreenCard,
  ScreenText,
  ScreenTitle,
  SectionTab,
  SectionTabs,
  SmallLabel,
  StatusText,
  StickyActions,
  TwoColumns,
} from "screens/AssemblyShared/styled";

export default function AssemblyTransition({ documentId }) {
  const { project, setProject, resetSection } = useAssemblyProject();
  const registry = DOCUMENT_REGISTRY_BY_ID[documentId];
  const assemblyDocument = project.documents[documentId];
  const [activePart, setActivePart] = useState("partA");
  const [exportStatus, setExportStatus] = useState("");

  const blocks = useMemo(
    () => buildDocumentPreview(documentId, project, { part: activePart }).blocks,
    [activePart, documentId, project]
  );

  const updateBlock = (blockId, content) => {
    setProject((current) => ({
      ...current,
      documents: {
        ...current.documents,
        [documentId]: {
          ...current.documents[documentId],
          records: {
            ...current.documents[documentId].records,
            [activePart]: current.documents[documentId].records[activePart].map((item) =>
              item.id === blockId ? { ...item, content } : item
            ),
          },
        },
      },
    }));
  };

  const handleReset = () => {
    if (!window.confirm(`Restaurar os textos oficiais de ${registry.menuLabel}? As edições deste documento serão substituídas.`)) return;
    resetSection(documentId);
    setExportStatus("Textos oficiais restaurados.");
  };

  const handleDownload = async () => {
    setExportStatus("Gerando PDF...");
    const fileName = buildDocumentFileName({
      documentId,
      date: assemblyDocument.meta.sourceDate,
      part: registry.supportsParts ? (activePart === "partA" ? "parte-a" : "parte-b") : "",
    });
    const success = await downloadAsPDF(`print-${documentId}`, fileName);
    setExportStatus(success ? "PDF gerado." : "Não foi possível gerar o PDF.");
  };

  return (
    <ContainerAuthenticated keep>
      <ScreenTitle>{assemblyDocument.meta.title}</ScreenTitle>
      <ScreenCard>
        <ScreenText>Transições e falas-base editáveis, separadas por parte e prontas para impressão em PDF.</ScreenText>
      </ScreenCard>

      {registry.supportsParts ? (
        <SectionTabs>
          <SectionTab type="button" active={activePart === "partA"} onClick={() => setActivePart("partA")}>
            Parte A
          </SectionTab>
          <SectionTab type="button" active={activePart === "partB"} onClick={() => setActivePart("partB")}>
            Parte B
          </SectionTab>
        </SectionTabs>
      ) : null}

      <TwoColumns>
        <BlockList>
          {blocks.map((block) => (
            <BlockCard key={block.id}>
              <SmallLabel>
                {block.time} · {block.title}
              </SmallLabel>
              <LetterEditor value={`<p>${String(block.content || "").replace(/\n/g, "</p><p>")}</p>`} onChange={(html) => updateBlock(block.id, html.replace(/<\/p><p>/g, "\n").replace(/<[^>]+>/g, ""))} />
            </BlockCard>
          ))}
        </BlockList>
        <ScreenCard id={`print-${documentId}`}>
          <SmallLabel data-pdf-exclude="true">Visualização A4</SmallLabel>
          <PreviewContent>
            {assemblyDocument.meta.sourceDate ? (
              <header className="keep-together">
                <p><strong>{assemblyDocument.meta.title}</strong></p>
                <p>{assemblyDocument.meta.sourceDate}</p>
                <p>{assemblyDocument.meta.president}</p>
              </header>
            ) : null}
            {blocks.map((block) => (
              <div key={block.id} style={{ marginBottom: 24 }}>
                <strong>{block.time} · {block.title}</strong>
                <p style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{block.content}</p>
              </div>
            ))}
          </PreviewContent>
        </ScreenCard>
      </TwoColumns>

      <FormSpacer extraLarge />
      <StickyActions>
        <ButtonContainer end space>
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
