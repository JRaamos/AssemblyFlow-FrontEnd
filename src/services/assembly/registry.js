const officialDocument = ({
  id,
  menuLabel,
  title,
  kind,
  variant,
  sourceSheet,
  printArea,
  supportsParts = false,
  part = "none",
}) => ({
  id,
  route: id,
  menuLabel,
  title,
  kind,
  variant,
  part,
  supportsParts,
  sourceSheet,
  printArea,
  paper: "A4",
  orientation: "portrait",
  defaultsVersion: 3,
  storageKey: `assemblyflow:document:${id}:v3`,
  printFileName: id,
  sourceStatus: "official",
});

const legacyDocument = ({ id, menuLabel, title, variant }) => ({
  id,
  route: id,
  menuLabel,
  title,
  kind: "transition",
  variant,
  part: "none",
  supportsParts: true,
  sourceSheet: null,
  printArea: null,
  paper: "A4",
  orientation: "portrait",
  defaultsVersion: 3,
  storageKey: `assemblyflow:document:${id}:v3`,
  printFileName: id,
  sourceStatus: "legacy-unverified",
});

export const DOCUMENT_REGISTRY = [
  officialDocument({ id: "cg", menuLabel: "Carta Geral", title: "Carta Geral", kind: "letter", variant: "co", sourceSheet: "CG", printArea: "D8:S49" }),
  officialDocument({ id: "dm", menuLabel: "Carta Donativos", title: "Carta Donativos", kind: "letter", variant: "co", sourceSheet: "DM", printArea: "B5:J46" }),
  officialDocument({ id: "pio", menuLabel: "Pioneiros", title: "Pioneiros", kind: "program", variant: "pioneers", sourceSheet: "Pio", printArea: "B3:I64" }),
  officialDocument({ id: "ass-co", menuLabel: "Ass-co", title: "Programa da Assembleia - CA-co", kind: "program", variant: "co", sourceSheet: "Ass-co", printArea: "C3:P69", supportsParts: true }),
  officialDocument({ id: "disc-co", menuLabel: "Disc-co", title: "Designação de Discurso - CA-co", kind: "assignment", variant: "co", sourceSheet: "Disc-co", printArea: "D3:U42", part: "A" }),
  officialDocument({ id: "discb-co", menuLabel: "DiscB-co", title: "Designação de Discurso - CA-co Parte B", kind: "assignment", variant: "co", sourceSheet: "DiscB-co", printArea: "D3:U42", part: "B" }),
  officialDocument({ id: "pr-or-co", menuLabel: "Pr-Or-co", title: "Presidência e Oração - CA-co", kind: "assignment", variant: "co", sourceSheet: "Pr-Or-co", printArea: "C2:T55", part: "A" }),
  officialDocument({ id: "pr-or-b-co", menuLabel: "Pr-Or-B-co", title: "Presidência e Oração - CA-co Parte B", kind: "assignment", variant: "co", sourceSheet: "Pr-Or-B-co", printArea: "C2:T55", part: "B" }),
  legacyDocument({ id: "t-m", menuLabel: "T-M", title: "Transição Manhã - CA-co", variant: "co" }),
  officialDocument({ id: "t-t", menuLabel: "T-T", title: "Transição Tarde - CA-co", kind: "transition", variant: "co", sourceSheet: "T-T", printArea: "C3:U61" }),
  officialDocument({ id: "ass-br", menuLabel: "Ass-br", title: "Programa da Assembleia - CA-br", kind: "program", variant: "br", sourceSheet: "Ass-br", printArea: "C3:P57", supportsParts: true }),
  officialDocument({ id: "disc-br", menuLabel: "Disc-br", title: "Designação de Discurso - CA-br", kind: "assignment", variant: "br", sourceSheet: "Disc-br", printArea: "D3:U42", part: "A" }),
  officialDocument({ id: "discb-br", menuLabel: "DiscB-br", title: "Designação de Discurso - CA-br Parte B", kind: "assignment", variant: "br", sourceSheet: "DiscB-br", printArea: "D3:U42", part: "B" }),
  officialDocument({ id: "pr-or-br", menuLabel: "Pr-Or-br", title: "Presidência e Oração - CA-br", kind: "assignment", variant: "br", sourceSheet: "Pr-Or-br", printArea: "C2:T55", part: "A" }),
  officialDocument({ id: "pr-or-b-br", menuLabel: "Pr-Or-B-br", title: "Presidência e Oração - CA-br Parte B", kind: "assignment", variant: "br", sourceSheet: "Pr-Or-B-br", printArea: "C2:T55", part: "B" }),
  legacyDocument({ id: "t-m-br", menuLabel: "T-M-br", title: "Transição Manhã - CA-br", variant: "br" }),
  officialDocument({ id: "t-t-br", menuLabel: "T-T-br", title: "Transição Tarde - CA-br", kind: "transition", variant: "br", sourceSheet: "T-T-br", printArea: "C3:U59" }),
];

export const DOCUMENT_REGISTRY_BY_ID = Object.freeze(
  Object.fromEntries(DOCUMENT_REGISTRY.map((document) => [document.id, document]))
);

export const OFFICIAL_DOCUMENTS = DOCUMENT_REGISTRY.filter(
  ({ sourceStatus }) => sourceStatus === "official"
);

export const DASHBOARD_MENU_ITEMS = [
  { label: "Início", path: "dashboard" },
  ...DOCUMENT_REGISTRY.map(({ menuLabel, route }) => ({ label: menuLabel, path: route })),
];

const PART_B_MENU_PATHS = new Set(
  DOCUMENT_REGISTRY.filter(({ part }) => part === "B").map(({ route }) => route)
);

export const getDashboardMenuItems = (circuitMode = "single") =>
  circuitMode === "single"
    ? DASHBOARD_MENU_ITEMS.filter(({ path }) => !PART_B_MENU_PATHS.has(path))
    : DASHBOARD_MENU_ITEMS;
