
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#0a0a0c',
    title: "Lumina Memory Architect",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Check if we have a production build
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    // Load the built version (Production)
    win.loadFile(indexPath);
  } else {
    // Fallback to local index.html if dist doesn't exist yet
    // This usually only happens during initial setup
    win.loadFile('index.html');
  }

  // Optional: win.webContents.openDevTools();
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
