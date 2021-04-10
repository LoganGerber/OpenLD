export class SettingNonexistantError extends Error {
	constructor(settingName: string) {
		super(`SettingNonexistantError: Setting ${settingName} does not exist in SettingsContainer`);
		this.name = "SettingNonexistantError";
	}
}
