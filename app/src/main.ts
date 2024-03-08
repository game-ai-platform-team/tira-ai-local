import {app, BrowserWindow} from "electron";
import {spawn} from "node:child_process";

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

    console.log("Spawning process")
    const spawned = spawn("poetry", ["run", "python3", "./src/main.py"]);
    spawned.on("message", (message) => {
        console.log(message)
    })
    spawned.on("error", (message) => {
        console.log(message)
    })
    spawned.on("exit", (message) => {
        console.log("exit")
    })
})
