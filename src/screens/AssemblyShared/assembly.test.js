import { buildDocumentPreview } from "services/assembly/templates";
import { cloneAssemblyProject, defaultAssemblyProject } from "services/assembly/defaults";
import { DASHBOARD_MENU_ITEMS, DOCUMENT_REGISTRY } from "services/assembly/registry";
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
import { createAssemblyProgramPdf } from "utils/programPdf";

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
  expect(preview.html).to.contain(project.events.br.partA.theme);
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
  expect(project.documents["ass-br"].meta.circuitMode).to.equal("single");
  expect(project.documents["ass-co"].meta.circuitMode).to.equal("parts");
  expect(project.events.br.partA).to.include({
    date: "06 de dezembro de 2026",
    rehearsalDateTime: "09 de novembro 2026, às 19:30",
    rehearsalVenue: "Salão do Reino das Congregações Norte/Central de Conceição do Coité",
  });
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
  expect(official).to.have.length(15);
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
