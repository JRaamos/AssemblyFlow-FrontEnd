import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PDF_SAVE_CHANNEL = "assemblyflow:save-pdf";
const MAX_PDF_BYTES = 50 * 1024 * 1024;

let mainWindow = null;

const sanitizePdfName = (value = "documento.pdf") => {
  const baseName = String(value)
    .normalize("NFC")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
    .replace(/\s+/g, "_")
    .replace(/[. ]+$/g, "")
    .replace(/\.pdf$/i, "")
    .slice(0, 120) || "documento";

  return `${baseName}.pdf`;
};

const toPdfBuffer = (bytes) => {
  let buffer;
  if (bytes instanceof ArrayBuffer) buffer = Buffer.from(bytes);
  else if (ArrayBuffer.isView(bytes)) buffer = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  else if (Array.isArray(bytes)) buffer = Buffer.from(bytes);
  else throw new Error("Conteúdo de PDF inválido.");

  if (!buffer.length || buffer.length > MAX_PDF_BYTES) {
    throw new Error("Tamanho de PDF inválido.");
  }
  if (buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    throw new Error("O arquivo informado não é um PDF.");
  }
  return buffer;
};

const registerPdfSaveHandler = () => {
  ipcMain.handle(PDF_SAVE_CHANNEL, async (event, payload = {}) => {
    if (!mainWindow || BrowserWindow.fromWebContents(event.sender) !== mainWindow) {
      throw new Error("Origem não autorizada.");
    }

    const pdfBuffer = toPdfBuffer(payload.bytes);
    const fileName = sanitizePdfName(payload.fileName);
    const result = await dialog.showSaveDialog(mainWindow, {
      title: "Salvar PDF",
      defaultPath: path.join(app.getPath("documents"), fileName),
      buttonLabel: "Salvar",
      filters: [{ name: "Documento PDF", extensions: ["pdf"] }],
      properties: ["showOverwriteConfirmation"],
    });

    if (result.canceled || !result.filePath) return { saved: false, canceled: true };

    const targetPath = result.filePath.toLocaleLowerCase().endsWith(".pdf")
      ? result.filePath
      : `${result.filePath}.pdf`;
    await fs.writeFile(targetPath, pdfBuffer, { flag: "w" });
    return { saved: true, canceled: false };
  });
};

const lockDownWebContents = (window) => {
  window.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  window.webContents.on("will-attach-webview", (event) => event.preventDefault());
  window.webContents.on("will-navigate", (event, targetUrl) => {
    if (targetUrl !== window.webContents.getURL()) event.preventDefault();
  });

  if (app.isPackaged) {
    window.webContents.on("devtools-opened", () => window.webContents.closeDevTools());
  }
};

const createWindow = () => {
  const appRoot = app.getAppPath();
  const iconPath = process.platform === "win32"
    ? path.join(appRoot, "public", "icons", "assemblyflow-windows.ico")
    : path.join(appRoot, "public", "icons", "icon-256.png");

  mainWindow = new BrowserWindow({
    title: "AssemblyFlow",
    width: 1280,
    height: 900,
    minWidth: 900,
    minHeight: 640,
    show: false,
    backgroundColor: "#f4f6f8",
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      partition: "persist:assemblyflow",
    },
  });

  lockDownWebContents(mainWindow);
  mainWindow.once("ready-to-show", () => mainWindow?.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (app.isPackaged) {
    void mainWindow.loadFile(path.join(appRoot, "dist", "index.html"));
  } else {
    void mainWindow.loadURL(process.env.ASSEMBLYFLOW_DEV_URL || "http://127.0.0.1:3000");
  }
};

const hasSingleInstanceLock = app.requestSingleInstanceLock();

if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    app.setAppUserModelId("com.assemblyflow.desktop");
    Menu.setApplicationMenu(null);
    registerPdfSaveHandler();
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
}
