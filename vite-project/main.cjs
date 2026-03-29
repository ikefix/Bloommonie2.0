const { app, BrowserWindow, ipcMain, Notification, dialog, systemPreferences } = require('electron');
const path = require('path');
const fs = require('fs/promises');

// In CommonJS, __dirname is available globally
let mainWindow;

const createWindow = () => {
  // main application window is created hidden initially
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "electron", "preload.cjs"),
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
};

// IPC Handlers for AI Mode functionality
ipcMain.handle('get-system-info', async () => {
  return {
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.versions.node,
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
    appVersion: app.getVersion(),
    appPath: app.getAppPath(),
    userDataPath: app.getPath('userData')
  };
});

ipcMain.handle('start-speech-recognition', async () => {
  // This would integrate with system speech recognition
  // For now, we'll return a mock response
  return {
    success: true,
    message: 'Speech recognition started',
    sessionId: Date.now()
  };
});

ipcMain.handle('stop-speech-recognition', async () => {
  return {
    success: true,
    message: 'Speech recognition stopped'
  };
});

ipcMain.handle('text-to-speech', async (text, options = {}) => {
  // In a real implementation, this would use system TTS
  // For now, we'll just log it
  console.log('TTS:', text, options);
  return {
    success: true,
    message: 'Text-to-speech completed',
    text,
    options
  };
});

ipcMain.handle('save-command-history', async (commands) => {
  try {
    const userDataPath = app.getPath('userData');
    const historyPath = path.join(userDataPath, 'ai-command-history.json');
    await fs.writeFile(historyPath, JSON.stringify(commands, null, 2));
    return {
      success: true,
      message: 'Command history saved',
      path: historyPath
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save command history',
      error: error.message
    };
  }
});

ipcMain.handle('load-command-history', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const historyPath = path.join(userDataPath, 'ai-command-history.json');
    const data = await fs.readFile(historyPath, 'utf8');
    return {
      success: true,
      commands: JSON.parse(data)
    };
  } catch (error) {
    return {
      success: false,
      message: 'No command history found',
      commands: []
    };
  }
});

ipcMain.handle('show-notification', async (title, body, options = {}) => {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title,
      body,
      icon: options.icon || path.join(__dirname, 'assets', 'icon.png'),
      silent: options.silent || false,
      urgency: options.urgency || 'normal'
    });
    
    notification.show();
    
    return {
      success: true,
      message: 'Notification shown'
    };
  } else {
    return {
      success: false,
      message: 'Notifications not supported'
    };
  }
});

// App control handlers
ipcMain.on('minimize-app', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('maximize-app', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('close-app', () => {
  app.quit();
});

ipcMain.on('open-dev-tools', () => {
  if (mainWindow) {
    mainWindow.webContents.openDevTools();
  }
});

ipcMain.on('reload-app', () => {
  if (mainWindow) {
    mainWindow.reload();
  }
});

// Handle AI command events
ipcMain.on('ai-command', (event, command) => {
  console.log('AI Command received:', command);
  // Process the command and send back response
  event.reply('ai-response', {
    status: 'processed',
    command,
    timestamp: Date.now()
  });
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});

// Handle certificate errors (for development)
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (process.env.NODE_ENV === 'development') {
    // Ignore certificate errors in development
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});