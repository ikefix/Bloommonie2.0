import { contextBridge, ipcRenderer } from "electron";

// expose safe APIs to renderer via `window.electron` object
contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => {
    // whitelist channels
    const validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});

// you can export additional helpers here (e.g. openDevTools)
