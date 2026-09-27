const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "assemblyflowDesktop",
  Object.freeze({
    isDesktop: true,
    savePdf: ({ bytes, fileName }) =>
      ipcRenderer.invoke("assemblyflow:save-pdf", { bytes, fileName }),
  })
);
