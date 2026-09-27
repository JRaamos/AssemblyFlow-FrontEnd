const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "assemblyflowDesktop",
  Object.freeze({
    isDesktop: true,
    savePdf: ({ base64, fileName }) =>
      ipcRenderer.invoke("assemblyflow:save-pdf", { base64, fileName }),
  })
);
