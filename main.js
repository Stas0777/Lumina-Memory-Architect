const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    backgroundColor: '#0a0a0c',
    title: "Lumina Memory Architect",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Necessary for loading local assets in some Linux environments
    },
    frame: true, // Use system frame for Nobara/Linux consistency
    autoHideMenuBar: true
  });

  // Target the built index.html from Vite
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    win.loadFile(indexPath).catch(err => {
      console.error("Failed to load production build:", err);
    });
  } else {
    // Development fallback
    console.warn("Production build (dist/) not found. Attempting to load root index.html.");
    win.loadFile('index.html');
  }

  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});