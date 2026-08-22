const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'logo_cecosesola.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        // Ocultar la barra de menú para que se vea más profesional
        autoHideMenuBar: true
    });

    // Cargamos el archivo principal (index.html es el selector de sedes)
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
