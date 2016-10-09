const electron = require('electron');
const {
        app,
        globalShortcut,
        dialog,
        ipcMain,
        Menu,
        clipboard
    } = require('electron');
const BrowserWindow = electron.BrowserWindow;

let mainWindow,
    rem4Clipboard = "0",
    createWindow = function createWindow () {
        mainWindow = new BrowserWindow({
            width: 280,
            maxWidth: 280,
            minWidth: 280,
            height: 180,
            maxHeight: 160,
            minHeight: 160,
            alwaysOnTop: false,
            closable: true,
            fullscreenable: false,
            maximizable: false
        });

        ipcMain.on('getRemToClipboardRespond', (event, arg) => {
            rem4Clipboard = arg;
        });

        mainWindow.loadURL(`file://${__dirname}/index.html`)
        //mainWindow.webContents.openDevTools()

        mainWindow.on('closed', function () {
            mainWindow = null
        });

        const menu = Menu.buildFromTemplate(template)
            Menu.setApplicationMenu(menu);
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

const template = [
  {
    label: 'Edit',
    submenu: [
        {
            role: 'undo'
        },
        {
            role: 'redo'
        },
        {
            type: 'separator'
        },
        {
            label: 'copy',
            accelerator: 'CmdOrCtrl+C',
            click () {
                if (mainWindow && mainWindow.webContents) {
                    clipboard.writeText(rem4Clipboard);
                    // sending to render process
                    mainWindow.webContents.send('clipboardSuccess', true);
                }
            }
        },
        {
            role: 'paste'
        },
        {
            role: 'pasteandmatchstyle'
        },
        {
            role: 'delete'
        },
        {
            role: 'selectall'
        }
    ]
  }
];


