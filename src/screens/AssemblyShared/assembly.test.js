import { buildDocumentPreview } from "services/assembly/templates";
import {
  getAssignmentView,
  updateLinkedAssignment,
} from "services/assembly/assignments";
import { cloneAssemblyProject, defaultAssemblyProject } from "services/assembly/defaults";
import {
  DASHBOARD_MENU_ITEMS,
  DOCUMENT_REGISTRY,
  getDashboardMenuItems,
} from "services/assembly/registry";
import { recalculateProgram, reorderRows, toggleIntervalRow } from "services/assembly/program";
import {
  getDocumentStorageKey,
  loadAssemblyProject,
  resetAssemblyProjectSection,
  saveAssemblyProject,
} from "services/assembly/store";
import {
  buildDocumentFileName,
  createPdfFromElement,
  sanitizeWindowsFileName,
} from "utils/downloads";
import { createPdfFromPreviewCanvas } from "utils/previewPdf";
import { sanitizeDocumentHtml } from "services/assembly/sanitize";
import { createAssemblyProgramPdf } from "utils/programPdf";
import { createPioneerProgramPdf } from "utils/pioneerProgramPdf";

const createMemoryStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
};

it("hydrates the default general letter with project data", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const preview = buildDocumentPreview("cg", project);

  expect(preview.html).to.contain(project.traveler.name);
  expect(preview.html).to.contain(`<strong>TEMA:</strong> ${project.events.br.partA.theme}`);
  expect(preview.html).to.contain(`<strong>LOCAL:</strong> ${project.events.br.partA.venue}`);
  expect(preview.html).to.contain(`<strong>DATA:</strong> ${project.events.br.partA.date}`);
  expect(preview.html).not.to.contain("{{event.");
});

it("switches the general letter between Ass Co and Ass Br using the same model", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const template = project.documents.cg.templateHtml;

  expect(project.documents.cg.meta.eventVariant).to.equal("br");
  expect(buildDocumentPreview("cg", project).html).to.contain(
    project.events.br.partA.theme
  );

  project.documents.cg.meta.eventVariant = "co";
  const coPreview = buildDocumentPreview("cg", project);
  expect(coPreview.html).to.contain(project.events.co.partA.theme);
  expect(coPreview.html).to.contain(project.events.co.partA.date);
  expect(coPreview.html).to.contain(project.events.co.partA.venue);
  expect(project.documents.cg.templateHtml).to.equal(template);
});

it("uses the requested default theme for each assembly everywhere", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const expected = {
    co: "Feliz É Aquele Que Confia em Jeová",
    br: "Encontre a mais plena alegria em Jeová",
  };

  ["partA", "partB"].forEach((part) => {
    expect(project.events.co[part].theme).to.equal(expected.co);
    expect(project.events.br[part].theme).to.equal(expected.br);
    expect(project.documents["ass-co"].meta.sections[part].theme).to.equal(expected.co);
    expect(project.documents["ass-br"].meta.sections[part].theme).to.equal(expected.br);
  });
});

it("recalculates program rows and interval toggling", () => {
  const section = recalculateProgram({
    meta: {
      start: "08:30",
    },
    rows: [
      {
        id: "row-1",
        type: "part",
        title: "Abertura",
        durationMin: 10,
      },
    ],
  });

  expect(section.rows[0].time).to.equal("08:30");
  expect(section.rows[0].end).to.equal("08:40");

  const withInterval = toggleIntervalRow(section.rows);
  expect(withInterval.some((row) => row.type === "interval")).to.equal(true);
});

it("reorders rows and keeps registry routes unique", () => {
  const rows = [
    { id: "a" },
    { id: "b" },
    { id: "c" },
  ];

  const reordered = reorderRows(rows, 0, 2);
  expect(reordered.map((row) => row.id)).to.deep.equal(["b", "c", "a"]);

  const routes = DOCUMENT_REGISTRY.map((item) => item.route);
  expect(new Set(routes).size).to.equal(routes.length);
  expect(DASHBOARD_MENU_ITEMS.length).to.be.greaterThan(5);
});

it("hides Part B navigation only while Circuito Único is active", () => {
  const singlePaths = getDashboardMenuItems("single").map(({ path }) => path);
  const partsPaths = getDashboardMenuItems("parts").map(({ path }) => path);

  expect(singlePaths).not.to.include.members([
    "discb-co",
    "pr-or-b-co",
    "discb-br",
    "pr-or-b-br",
  ]);
  expect(partsPaths).to.include.members([
    "discb-co",
    "pr-or-b-co",
    "discb-br",
    "pr-or-b-br",
  ]);
});

it("keeps T-T and T-T-br as different official documents", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const co = buildDocumentPreview("t-t", project, { part: "partA" }).blocks;
  const br = buildDocumentPreview("t-t-br", project, { part: "partA" }).blocks;

  expect(co[0].id).to.not.equal(br[0].id);
  expect(co.map(({ content }) => content).join(" ")).to.not.equal(
    br.map(({ content }) => content).join(" ")
  );
  expect(project.documents["t-t"].meta.sourceDate).to.equal("28 de fevereiro de 2027");
  expect(project.documents["t-t-br"].meta.sourceDate).to.equal("06 de dezembro de 2026");
});

it("uses an exact versioned storage key for every document", () => {
  const keys = DOCUMENT_REGISTRY.map(({ id }) => getDocumentStorageKey(id));
  expect(new Set(keys).size).to.equal(DOCUMENT_REGISTRY.length);
  expect(getDocumentStorageKey("t-t")).to.equal("assemblyflow:document:t-t:v3");
  expect(getDocumentStorageKey("t-t-br")).to.equal("assemblyflow:document:t-t-br:v3");
});

it("loads the current Ass-br workbook program and rehearsal details", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const program = recalculateProgram({
    meta: project.documents["ass-br"].meta.sections.partA,
    rows: project.documents["ass-br"].records.partA,
  });

  expect(program.rows[0]).to.include({ time: "09:40", title: "Música gravada" });
  expect(program.rows[1]).to.include({
    time: "09:50",
    speaker: "Gustavo",
    congregation: "Salgadália",
  });
  expect(program.rows.find(({ speaker }) => speaker === "Isaque Cunha Santos")).to.include({
    time: "11:35",
    congregation: "Valente",
  });
  expect(program.rows.at(-1)).to.include({ time: "15:45", end: "15:55" });
  expect(project.settings.circuitMode).to.equal("single");
  expect(project.events.br.partA).to.include({
    date: "06 de dezembro de 2026",
    rehearsalDateTime: "09 de novembro 2026, às 19:30",
    rehearsalVenue: "Salão do Reino das Congregações Norte/Central de Conceição do Coité",
  });
});

it("links every Disc-br letter to the speakers selected by the workbook program", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const view = getAssignmentView(project, "disc-br", "partA");

  expect(view.programId).to.equal("ass-br");
  expect(view.records).to.have.length(7);
  expect(view.records.map(({ speaker }) => speaker)).to.deep.equal([
    "Brandon Stephenson",
    "Celso Gandarela",
    "Isaque Cunha Santos",
    "Caio Diego",
    "Givanildo",
    "Hítalo Silva",
    "Josmar",
  ]);
  expect(view.records.at(-1)).to.include({
    title: "Bons amigos",
    congregation: "Barreiros",
    time: "14:30",
    durationMin: 14,
  });
});

it("applies the workbook linkage to the other discourse and presidency areas", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const discourseCo = getAssignmentView(project, "disc-co", "partA");
  const presidencyCo = getAssignmentView(project, "pr-or-co", "partA");
  const presidencyBr = getAssignmentView(project, "pr-or-br", "partA");

  expect(discourseCo.records).to.have.length(10);
  expect(discourseCo.records.map(({ speaker }) => speaker)).to.include.members([
    "Adelson Zucateli",
    "Oderlan Sodré",
    "Nemias",
    "Flávio Ferreira",
  ]);
  expect(presidencyCo.records.map(({ speaker }) => speaker)).to.deep.equal([
    "Caio Diego de Jesus",
    "Jackson Rodrigues",
  ]);
  expect(presidencyBr.records.map(({ speaker }) => speaker)).to.deep.equal([
    "Gustavo",
    "Ronivaldo Silva Ramos",
    "Jackson Rodrigues",
  ]);
});

it("creates one pioneer assignment letter for every speaker in the Pio program", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const view = getAssignmentView(project, "disc-pio", "partA");

  expect(view.programId).to.equal("pio");
  expect(view.supportsParts).to.equal(false);
  expect(view.records).to.have.length(10);
  expect(view.records.map(({ speaker }) => speaker)).to.deep.equal([
    "Ronivaldo S. Ramos",
    "Elenilson Cunha",
    "Daniel Oliveira",
    "André Cunha",
    "Lucas Rogério",
    "Hítalo Silva",
    "Ítalo Almeida",
    "Jonathan Febraio",
    "Marcos Lima",
    "Ronivaldo S. Ramos",
  ]);
  expect(view.records[1]).to.include({
    title: "‘Sou de temperamento brando e humilde de coração’",
    congregation: "Norte de Coité",
    time: "08:50",
    durationMin: 15,
  });

  const preview = buildDocumentPreview("disc-pio", project, {
    part: "partA",
    recordIndex: 1,
  });
  expect(preview.html).to.contain("Elenilson Cunha");
  expect(preview.html).to.contain("ORIENTAÇÕES GERAIS");
});

it("writes pioneer assignment edits back to the Pio program", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const view = getAssignmentView(project, "disc-pio", "partA");
  const record = view.records[2];
  const updated = updateLinkedAssignment(
    project,
    "disc-pio",
    "partA",
    record,
    "speaker",
    "Orador pioneiro atualizado"
  );

  expect(
    updated.documents.pio.records.partA.find(
      ({ id }) => id === record.sourceProgramRowId
    ).speaker
  ).to.equal("Orador pioneiro atualizado");
  expect(getAssignmentView(updated, "disc-pio", "partA").records[2].speaker).to.equal(
    "Orador pioneiro atualizado"
  );
});

it("writes assignment edits back to the linked assembly program", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const view = getAssignmentView(project, "disc-br", "partA");
  const record = view.records[0];
  const updated = updateLinkedAssignment(
    project,
    "disc-br",
    "partA",
    record,
    "speaker",
    "Orador atualizado"
  );
  const refreshed = getAssignmentView(updated, "disc-br", "partA");

  expect(
    updated.documents["ass-br"].records.partA.find(
      ({ id }) => id === record.sourceProgramRowId
    ).speaker
  ).to.equal("Orador atualizado");
  expect(refreshed.records[0].speaker).to.equal("Orador atualizado");
});

it("uses the global circuit mode for linked Part B assignments", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  expect(getAssignmentView(project, "discb-br", "partB").activePart).to.equal(
    "partA"
  );

  project.settings.circuitMode = "parts";
  const partB = getAssignmentView(project, "discb-br", "partB");
  expect(partB.activePart).to.equal("partB");
  expect(partB.records).to.have.length(0);
});

it("persists, reloads and restores only the selected document", () => {
  const storage = createMemoryStorage();
  const project = loadAssemblyProject(storage);
  const originalBr = project.documents["t-t-br"].records.partA[0].content;

  project.documents["t-t"].records.partA[0].content = "Edição exclusiva de T-T";
  saveAssemblyProject(project, storage);

  const reloaded = loadAssemblyProject(storage);
  expect(reloaded.documents["t-t"].records.partA[0].content).to.equal(
    "Edição exclusiva de T-T"
  );
  expect(reloaded.documents["t-t-br"].records.partA[0].content).to.equal(originalBr);

  const restored = resetAssemblyProjectSection("t-t", storage);
  expect(restored.documents["t-t"].records.partA[0].content).to.not.equal(
    "Edição exclusiva de T-T"
  );
  expect(restored.documents["t-t-br"].records.partA[0].content).to.equal(originalBr);
});

it("maps every official workbook sheet to its print area", () => {
  const official = DOCUMENT_REGISTRY.filter(({ sourceStatus }) => sourceStatus === "official");
  expect(official).to.have.length(16);
  official.forEach((document) => {
    expect(document.sourceSheet).to.be.a("string").and.not.be.empty;
    expect(document.printArea).to.match(/^[A-Z]+\d+:[A-Z]+\d+$/);
    expect(document.paper).to.equal("A4");
    expect(document.orientation).to.equal("portrait");
  });
});

it("creates predictable Windows-safe PDF file names", () => {
  expect(sanitizeWindowsFileName('Disc-br: Josmar/06*12?.pdf')).to.equal(
    "Disc-br-_Josmar-06-12-.pdf"
  );
  expect(
    buildDocumentFileName({
      documentId: "disc-br",
      speaker: "Josmar",
      date: "06 de dezembro de 2026",
    })
  ).to.equal("disc-br_Josmar_2026-12-06");
  expect(sanitizeWindowsFileName("Ronivaldo S. Ramos")).to.equal("Ronivaldo_S._Ramos");
});

it("preserves the safe document structure used by previews and PDF export", () => {
  const sanitized = sanitizeDocumentHtml(`
    <header class="document-letterhead keep-together" onclick="bad()">
      <p class="document-date"><span class="text-size-large ql-size-large">19 de setembro de 2026</span></p>
    </header>
    <dl class="document-facts"><div><dt>TEMA:</dt><dd>Exemplo</dd></div></dl>
    <script>bad()</script>
  `);

  expect(sanitized).to.contain('class="document-letterhead keep-together"');
  expect(sanitized).to.contain('class="document-date"');
  expect(sanitized).to.contain('class="document-facts"');
  expect(sanitized).to.contain("text-size-large");
  expect(sanitized).to.contain("ql-size-large");
  expect(sanitized).not.to.contain("onclick");
  expect(sanitized).not.to.contain("script");
});

it("creates an Excel-style assignment letter without a project footer", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const view = getAssignmentView(project, "disc-br", "partA");
  const recordIndex = view.records.findIndex(({ speaker }) => speaker === "Josmar");
  const preview = buildDocumentPreview("disc-br", project, { recordIndex });
  const canvas = document.createElement("canvas");
  canvas.width = 794;
  canvas.height = 1123;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#172033";
  context.fillText("Prévia fiel", 40, 40);

  const pdf = createPdfFromPreviewCanvas(canvas);
  const rawPdf = pdf.output();

  expect(pdf.getNumberOfPages()).to.equal(1);
  expect(rawPdf).not.to.contain("AssemblyFlow");
  expect(preview.html).to.contain("TEMA DO EVENTO:");
  expect(preview.html).to.contain(project.events.br.partA.rehearsalDateTime);
});

it("uses the same one-page PDF standard for pioneer assignments", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const preview = buildDocumentPreview("disc-pio", project, { recordIndex: 0 });
  const canvas = document.createElement("canvas");
  canvas.width = 794;
  canvas.height = 1123;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const pdf = createPdfFromPreviewCanvas(canvas);

  expect(pdf.getNumberOfPages()).to.equal(1);
  expect(pdf.output()).not.to.contain("AssemblyFlow");
  expect(preview.html).to.contain("ORIENTAÇÕES GERAIS:");
});

it("creates a real A4 PDF with selectable text", () => {
  const printRoot = document.createElement("article");
  printRoot.innerHTML = `
    <h1>AssemblyFlow — PDF de validação</h1>
    <p>Texto selecionável preservado no documento.</p>
    <table><tbody><tr><th>Horário</th><th>Parte</th></tr><tr><td>13:18</td><td>Prelúdio musical</td></tr></tbody></table>
  `;

  const pdf = createPdfFromElement(printRoot);
  const base64 = pdf.output("datauristring").split(",")[1];
  cy.writeFile("cypress/downloads/assemblyflow-pdf-smoke.pdf", base64, "base64");

  expect(pdf.internal.pageSize.getWidth()).to.be.closeTo(210, 0.1);
  expect(pdf.internal.pageSize.getHeight()).to.be.closeTo(297, 0.1);
  expect(pdf.getNumberOfPages()).to.equal(1);
});

it("creates the Ass-br single-circuit program as a selectable landscape A4 PDF", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const program = recalculateProgram({
    meta: project.documents["ass-br"].meta.sections.partA,
    rows: project.documents["ass-br"].records.partA,
  });
  const event = project.events.br.partA;
  const pdf = createAssemblyProgramPdf({
    program,
    partLabel: "",
    variantLabel: "CA-BR",
    footerVariantLabel: "CA-br",
    singleProgram: true,
    rehearsalDateTime: event.rehearsalDateTime,
    rehearsalVenue: event.rehearsalVenue,
  });
  const base64 = pdf.output("datauristring").split(",")[1];

  cy.writeFile(
    "output/pdf/assemblyflow-programa-ass-br-unico.pdf",
    base64,
    "base64"
  );

  expect(pdf.internal.pageSize.getWidth()).to.be.closeTo(297, 0.1);
  expect(pdf.internal.pageSize.getHeight()).to.be.closeTo(210, 0.1);
  expect(pdf.getNumberOfPages()).to.equal(1);
  const pageCommands = pdf.internal.pages.flat().join(" ");
  expect(pageCommands).not.to.contain("PARTE A");
  expect(pageCommands).to.contain("ENSAIO DO PROGRAMA DA ASSEMBLEIA");
});

it("creates the pioneer program as a selectable portrait A4 PDF", () => {
  const project = cloneAssemblyProject(defaultAssemblyProject);
  const program = recalculateProgram({
    meta: project.documents.pio.meta.sections.partA,
    rows: project.documents.pio.records.partA,
  });
  const pdf = createPioneerProgramPdf({
    program,
    event: project.events.pioneers.partA,
  });
  const base64 = pdf.output("datauristring").split(",")[1];

  cy.writeFile(
    "output/pdf/assemblyflow-programa-pioneiros.pdf",
    base64,
    "base64"
  );

  expect(pdf.internal.pageSize.getWidth()).to.be.closeTo(210, 0.1);
  expect(pdf.internal.pageSize.getHeight()).to.be.closeTo(297, 0.1);
  expect(pdf.getNumberOfPages()).to.equal(1);
  const pageCommands = pdf.internal.pages.flat().join(" ");
  expect(pageCommands).to.contain("PROGRAMA ESPIRITUAL");
  expect(pageCommands).to.contain("ENSAIO DE CENAS / ENTREVISTAS");
});
