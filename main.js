
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#0a0a0c',
    icon: path.join(__dirname, 'icon.png'), // Path to your icon
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // For accessing memory/processes, you'd eventually use a preload script 
      // or IPC to talk to native Node.js modules like 'memoryjs' or 'robotjs'
    }
  });

  // In production, we would load the built index.html
  // For development/demo, we load the local file
  win.loadFile('index.html');

  // Open the DevTools if needed
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
