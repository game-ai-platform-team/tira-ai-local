import {app, BrowserWindow} from "electron";
import {spawn} from "node:child_process";
import path from "path"

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

    console.log(__dirname)
    const file = path.join(__dirname, "./background-service.pex")
    console.log("Spawning process")
    const spawned = spawn("python3", [file]);

    spawned.stdout.on("data", (data) => {
        console.log(data.toString())
    })

    spawned.on("exit", (message) => {
        console.log("exit " + message)
    })
})
