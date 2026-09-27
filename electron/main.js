import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { sanitizePdfName, toPdfBuffer } from "./pdf-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PDF_SAVE_CHANNEL = "assemblyflow:save-pdf";

let mainWindow = null;

const availableDownloadPath = async (fileName) => {
  const parsed = path.parse(fileName);
  const downloadsDirectory = app.getPath("downloads");

  for (let index = 0; index < 100; index += 1) {
    const suffix = index ? `-${index + 1}` : "";
    const candidate = path.join(downloadsDirectory, `${parsed.name}${suffix}${parsed.ext}`);
    try {
      await fs.access(candidate);
    } catch {
      return candidate;
    }
  }

  return path.join(downloadsDirectory, `${parsed.name}-${Date.now()}${parsed.ext}`);
};

const registerPdfSaveHandler = () => {
  ipcMain.handle(PDF_SAVE_CHANNEL, async (event, payload = {}) => {
    if (!mainWindow || BrowserWindow.fromWebContents(event.sender) !== mainWindow) {
      throw new Error("Origem não autorizada.");
    }

    const pdfBuffer = toPdfBuffer(payload);
    const fileName = sanitizePdfName(payload.fileName);

    try {
      const result = await dialog.showSaveDialog(mainWindow, {
        title: "Salvar PDF",
        defaultPath: path.join(app.getPath("documents"), fileName),
        buttonLabel: "Salvar",
        filters: [{ name: "Documento PDF", extensions: ["pdf"] }],
        properties: ["showOverwriteConfirmation"],
      });

      if (result.canceled || !result.filePath) return { saved: false, canceled: true };

      const targetPath = result.filePath.toLowerCase().endsWith(".pdf")
        ? result.filePath
        : `${result.filePath}.pdf`;
      await fs.writeFile(targetPath, pdfBuffer, { flag: "w" });
      return { saved: true, canceled: false, fallback: false };
    } catch (error) {
      console.error("assemblyflow:save-pdf", error);
      const fallbackPath = await availableDownloadPath(fileName);
      await fs.writeFile(fallbackPath, pdfBuffer, { flag: "wx" });
      return {
        saved: true,
        canceled: false,
        fallback: true,
        location: "Downloads",
        fileName: path.basename(fallbackPath),
      };
    }
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
