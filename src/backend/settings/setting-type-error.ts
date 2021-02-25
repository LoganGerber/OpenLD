export class SettingTypeError extends Error {
	constructor(settingName: string, providedType: string, providedValue: any, expectedType: string) {
		super(`SettingTypeError: Setting ${settingName} provided incorrect type ${providedType} (${providedValue}), expected type ${expectedType}`);
		this.name = "SettingTypeError";
	}
}
