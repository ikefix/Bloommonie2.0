import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;


const createWindow = () => {
  // main application window is created hidden initially
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "electron", "preload.js"),
      contextIsolation: true, // run preload with isolated context for security
      nodeIntegration: false, // disable direct node access in renderer
    },
  });

  mainWindow.loadURL("http://localhost:5173");


  // open dev tools to debug any errors
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});