const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL(
        process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../build/index.html')}`
    );

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit',
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

app.commandLine.appendSwitch('disable-http-cache');

