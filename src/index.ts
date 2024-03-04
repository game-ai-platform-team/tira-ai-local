import {app, BrowserWindow} from "electron"
import path from "path";

app.on("ready", () => {

    const win = new BrowserWindow()

    const indexHtml = path.join(__dirname + "/index.html")

    win.loadFile(indexHtml)
})