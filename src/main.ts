import {app, BrowserWindow} from "electron";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
app.on("ready", () => {

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })


    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
    win.webContents.openDevTools()
})
