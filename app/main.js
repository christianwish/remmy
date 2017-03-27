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
            maxHeight: 180,
            minHeight: 180,
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
            label: 'Copy',
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
            label: 'Switch unit',
            accelerator: 'CmdOrCtrl+U',
            click () {
                if (mainWindow && mainWindow.webContents) {
                    // sending to render process
                    mainWindow.webContents.send('switchUnit', true);
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
        },
        {
            type: 'separator'
        },
        {
            role: 'hide'
        },
        {
            role: 'hideothers'
        },
        {
            role: 'unhide'
        },
        {
            type: 'separator'
        },
        {
            role: 'quit'
        }
    ]
  }
];
