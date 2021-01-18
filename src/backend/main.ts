import { getUserExtensionsPath } from './paths';
import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { ArgumentParser } from 'argparse';
import { PathLike } from 'fs';

type ArgvType = {
	showfile?: PathLike,
	headless?: boolean,
	noExtensions?: boolean;
};

// Parse cli args
let argparser = new ArgumentParser({ description: 'Command line interface for OpenLD.' });

argparser.add_argument('SHOWFILE', {
	type: 'str',
	required: false,
	help: 'File to open.'
});

argparser.add_argument('--headless', {
	action: 'store_true',
	help: 'Launch OpenLD in headless mode (no GUI).'
});

argparser.add_argument('--no-extensions', {
	action: 'store_true',
	help: 'Launch OpenLD without loading any extensions',
	dest: 'noExtensions'
});

let argv: ArgvType = argparser.parse_args();


// Load settings



// Load extensions
// 	Load extensions bundled with program

// 	Load installed extensions
if (!argv.noExtensions) {
	let extensionsPath = getUserExtensionsPath();
}
else {
	// ...
}


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

if (!argv.headless) {
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
}
else {
	// ...
}


// Load show
// 	Show supplied with launch args?
if (argv.showfile) {

}
// 	Previously opened show?
// else if (TODO) {
// 	...
// }
// 	No show
// else {
// 	...
// }
