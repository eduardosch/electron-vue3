const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

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

const data = [
    {
        name: 'Eduardo',
        age: 35
    },
    {
        name: 'Otávio',
        age: 30
    },
    {
        name: 'Felipe',
        age: 32
    },
    {
        name: 'Grazi',
        age: 80
    },
]

const getData = () => {
    return data
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
