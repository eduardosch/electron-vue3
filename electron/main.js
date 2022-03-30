const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile(path.join(__dirname, "../dist/index.html"));
}

const getData = () => {
    const rawData = fs.readFileSync(path.resolve(__dirname, './json/data.json'));
    return JSON.parse(rawData)
}

app.whenReady().then(() => {
    ipcMain.handle('getData', getData)
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
