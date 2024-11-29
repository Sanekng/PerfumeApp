const { app, BrowserWindow } = require('electron');
const path = require('path');

// Manual check for development mode
const isDev = process.env.NODE_ENV === 'development electron .' || !app.isPackaged;

// Function to create the main Electron window
const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    // Development: Load React dev server
    await mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // Production: Load React build
    await mainWindow.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
};

// App initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
