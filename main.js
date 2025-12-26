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
      webSecurity: false 
    },
    frame: true,
    autoHideMenuBar: true
  });

  // Open DevTools to catch runtime errors
  win.webContents.openDevTools();

  // Inject main process environment variables into the renderer
  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
      window.process = window.process || {};
      window.process.env = ${JSON.stringify(process.env)};
    `);
  });

  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    win.loadFile(indexPath).catch(err => {
      console.error("Lumina Error: Failed to load production build:", err);
    });
  } else {
    console.error("Lumina Error: 'dist/index.html' not found.");
    win.loadURL('data:text/html,<html><body style="background:#0a0a0c;color:white;font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;"><div><h1>Build Required</h1><p>Please run <b>npm start</b> in your terminal.</p></div></body></html>');
  }
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