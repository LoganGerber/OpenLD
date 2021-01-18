import { join } from 'path';
import { homedir } from 'os';

export function getUserDataPath(): string {
	// https://github.com/microsoft/vscode/blob/master/src/paths.js
	if (process.env['OPENLD_APPDATA']) {
		return join(process.env['OPENLD_APPDATA'], 'OpenLD');
	}

	switch (process.platform) {
		case 'win32':
			let appDataPath = process.env['APPDATA'] || process.env['USERPROFILE'];

			if (!appDataPath) {
				throw new Error('Windows: Unexpected undefined %APPDATA% and %USERPROFILE% environment variables');
			}

			return join(appDataPath, 'OpenLD');
		case 'darwin':
			return join(homedir(), 'Library', 'Application Support', 'OpenLD');
		case 'linux':
			return join(process.env['XDG_CONFIG_HOME'] || homedir(), '.openld');
		default:
			throw new Error('Unsupported platform');
	}
}

export function getUserExtensionsPath(): string {
	return join(getUserDataPath(), 'extensions');
}
