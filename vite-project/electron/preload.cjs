const { contextBridge, ipcRenderer } = require('electron');

// expose safe APIs to renderer via `window.electron` object
contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => {
    // whitelist channels
    const validChannels = ["toMain", "ai-command", "speech-start", "speech-stop"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = ["fromMain", "ai-response", "speech-result", "system-info"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  
  // AI Mode specific APIs
  aiMode: {
    // Get system information
    getSystemInfo: () => {
      return ipcRenderer.invoke('get-system-info');
    },
    
    // Handle speech recognition
    startSpeechRecognition: () => {
      return ipcRenderer.invoke('start-speech-recognition');
    },
    
    stopSpeechRecognition: () => {
      return ipcRenderer.invoke('stop-speech-recognition');
    },
    
    // Text-to-speech
    speak: (text, options = {}) => {
      return ipcRenderer.invoke('text-to-speech', text, options);
    },
    
    // File system access for storing voice commands
    saveCommandHistory: (commands) => {
      return ipcRenderer.invoke('save-command-history', commands);
    },
    
    loadCommandHistory: () => {
      return ipcRenderer.invoke('load-command-history');
    },
    
    // System notifications
    showNotification: (title, body, options = {}) => {
      return ipcRenderer.invoke('show-notification', title, body, options);
    },
    
    // App control
    minimizeApp: () => {
      ipcRenderer.send('minimize-app');
    },
    
    maximizeApp: () => {
      ipcRenderer.send('maximize-app');
    },
    
    closeApp: () => {
      ipcRenderer.send('close-app');
    },
    
    // Development helpers
    openDevTools: () => {
      ipcRenderer.send('open-dev-tools');
    },
    
    reloadApp: () => {
      ipcRenderer.send('reload-app');
    }
  },
  
  // Platform information
  platform: {
    getNodeVersion: () => process.versions.node,
    getElectronVersion: () => process.versions.electron,
    getChromeVersion: () => process.versions.chrome,
    getPlatform: () => process.platform,
    getArch: () => process.arch
  }
});
