interface Window {
  electron?: {
    aiMode?: {
      minimizeApp: () => void;
      maximizeApp: () => void;
      closeApp: () => void;
    };
  };
}
