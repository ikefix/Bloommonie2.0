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

  // Try common Vite ports in order - this will find the correct port automatically
  const possiblePorts = [5173, 5174, 5175, 3000];
  
  const tryLoadUrl = async (ports, index = 0) => {
    if (index >= ports.length) {
      console.log('All ports failed, showing error page');
      // Show error page if all ports fail
      mainWindow.webContents.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Development Server Not Running</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              margin: 0; 
              background: #f5f5f5;
            }
            .container { 
              text-align: center; 
              background: white; 
              padding: 40px; 
              border-radius: 8px; 
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 { color: #e74c3c; }
            .code { 
              background: #f8f9fa; 
              padding: 15px; 
              border-radius: 4px; 
              font-family: monospace; 
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Development Server Not Running</h1>
            <p>Please start the development server first:</p>
            <div class="code">npm run dev</div>
            <p>Then restart the Electron app:</p>
            <div class="code">npm run electron</div>
          </div>
        </body>
        </html>
      `)}`);
      return;
    }
    
    const currentUrl = `http://localhost:${ports[index]}`;
    console.log('Attempting to load:', currentUrl);
    
    try {
      await mainWindow.loadURL(currentUrl);
      console.log('Successfully loaded dev server at:', currentUrl);
    } catch (error) {
      console.log('Failed to load', currentUrl, ':', error.message);
      // Try next port
      tryLoadUrl(ports, index + 1);
    }
  };
  
  // Start trying ports
  tryLoadUrl(possiblePorts);

  // Temporarily disable dev tools to see console errors clearly
  mainWindow.webContents.openDevTools();

  // Add debugging for page load events
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Page finished loading');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.log('Page failed to load:', errorCode, errorDescription);
  });

  mainWindow.webContents.on('dom-ready', () => {
    console.log('DOM is ready');
  });

  // Log all console messages from the renderer process
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[Renderer Console] ${message}`);
  });

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