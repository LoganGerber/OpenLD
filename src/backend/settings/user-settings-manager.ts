import { getUserDataPath } from '../paths';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Setting } from './setting';
import { SettingsContainer } from './settings-container';

const USER_SETTINGS_FILE_NAME = 'usersettings.json';
const ENCODING = 'utf8';

class UserSettingsManagerClass extends SettingsContainer {
	public LoadUserSettings(): void {
		// Locate user settings file on system
		let settingsDir = getUserDataPath();
		let loadedSettings = {};

		if (!existsSync(settingsDir)) {
			mkdirSync(settingsDir, { recursive: true });
		}

		let appSettingsFile = join(settingsDir, USER_SETTINGS_FILE_NAME);
		if (!existsSync(appSettingsFile)) {
			writeFileSync(appSettingsFile, "{}", { encoding: ENCODING });
		}
		else {
			loadedSettings = JSON.parse(readFileSync(appSettingsFile, { encoding: ENCODING }));
		}

		// loadedSettings has the raw json data for the settings. The keys are the names of the settings, the values are the values.

		// 
	}
}

export const UserSettingsManager = new UserSettingsManagerClass();

// Load user settings on first run
UserSettingsManager.LoadUserSettings();

