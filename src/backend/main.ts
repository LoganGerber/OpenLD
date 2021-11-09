import { app, BrowserWindow } from 'electron';
import { join } from 'path';

// Prepare main window
function createWindow(): void {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			// nodeIntegration: true,
			// enableRemoteModule: true,
			devTools: true
		}
	});

	win.loadFile(join(__dirname, '../../html/index.html'));
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
