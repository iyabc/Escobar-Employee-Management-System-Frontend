import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
const ipc = ipcMain;

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    // width: 1200,
    // height: 600,
    // minWidth: 940,
    // minHeight: 500,
    // frame: false,
    fullscreen: true,
    frame: false,
    webPreferences: {
      // contextIsolation: true,
    }
  });

  ipc.on('closeApp', () => {
    console.log('close');
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
