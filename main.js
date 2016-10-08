const electron = require('electron');
const {
        app,
        globalShortcut,
        dialog,
        ipcMain,
        clipboard
    } = require('electron');
const BrowserWindow = electron.BrowserWindow;
const electronLocalshortcut = require('electron-localshortcut');

let mainWindow,
    rem4Clipboard = "0",
    createWindow = function createWindow () {
        mainWindow = new BrowserWindow({
            width: 250,
            maxWidth: 250,
            minWidth: 250,
            height: 140,
            maxHeight: 140,
            minHeight: 140,
            alwaysOnTop: false,
            closable: true,
            fullscreenable: false,
            maximizable: false
        });

        electronLocalshortcut.register(mainWindow, 'CommandOrControl+C', (event) => {
            clipboard.writeText(rem4Clipboard);
        });

        ipcMain.on('getRemToClipboardRespond', (event, arg) => {
            rem4Clipboard = arg;
        });

        mainWindow.loadURL(`file://${__dirname}/index.html`)
        //mainWindow.webContents.openDevTools()

        mainWindow.on('closed', function () {
            mainWindow = null
        });
    };

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});


