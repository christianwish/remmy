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
            width: 280,
            maxWidth: 280,
            minWidth: 280,
            height: 160,
            maxHeight: 160,
            minHeight: 160,
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


