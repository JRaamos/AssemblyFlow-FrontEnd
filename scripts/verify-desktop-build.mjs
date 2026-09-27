import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const distDirectory = path.join(projectRoot, "dist");
const indexPath = path.join(distDirectory, "index.html");

const fail = (message) => {
  throw new Error(`[desktop:verify] ${message}`);
};

const indexHtml = await readFile(indexPath, "utf8");
const mainSource = await readFile(path.join(projectRoot, "electron", "main.js"), "utf8");
const preloadSource = await readFile(path.join(projectRoot, "electron", "preload.js"), "utf8");

const assetReferences = [...indexHtml.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
  .map((match) => match[1])
  .filter((value) => !value.startsWith("data:") && !value.startsWith("#"));

for (const reference of assetReferences) {
  if (/^(?:https?:)?\/\//i.test(reference)) {
    fail(`asset remoto encontrado no HTML de produção: ${reference}`);
  }
  if (reference.startsWith("/")) {
    fail(`asset absoluto incompatível com file://: ${reference}`);
  }
  const cleanReference = reference.split(/[?#]/)[0];
  await access(path.resolve(distDirectory, cleanReference));
}

if (!mainSource.includes("app.isPackaged") || !mainSource.includes("loadFile(")) {
  fail("o runtime empacotado não usa loadFile");
}
if (!mainSource.includes("contextIsolation: true")) fail("contextIsolation não está habilitado");
if (!mainSource.includes("nodeIntegration: false")) fail("nodeIntegration não está desabilitado");
if (!mainSource.includes("sandbox: true")) fail("sandbox não está habilitado");
if (!mainSource.includes("requestSingleInstanceLock")) fail("single instance lock ausente");
if (!preloadSource.includes("assemblyflow:save-pdf")) fail("bridge específica de PDF ausente");

try {
  await access(path.join(projectRoot, "electron", "package.json"));
  fail("package.json Electron legado ainda existe");
} catch (error) {
  if (String(error.message).startsWith("[desktop:verify]")) throw error;
}

await access(path.join(projectRoot, "public", "icons", "assemblyflow-windows.ico"));

console.log(`[desktop:verify] OK - ${assetReferences.length} assets relativos, runtime seguro e Electron consolidado.`);
