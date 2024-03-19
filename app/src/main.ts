import { app, BrowserWindow } from "electron";
import { ChildProcess, spawn } from "child_process";
import path from "path";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

let backgroundProcess: ChildProcess | undefined = undefined;

app.on("ready", () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);


  console.log(__dirname);
  const file = path.join(__dirname, "./background-service.pex");
  console.log("Spawning process");
  backgroundProcess = spawn("python3", [file]);

  backgroundProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  backgroundProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  backgroundProcess.on("exit", (message) => {
    console.log("exit " + message);
  });
});

app.on("before-quit", () => {
  if (backgroundProcess != undefined) {
    backgroundProcess.kill();
  }
});
