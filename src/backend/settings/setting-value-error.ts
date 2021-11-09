import { SettingValueType } from './setting-types';

export class SettingValueError<T extends SettingValueType> extends Error {
	constructor(settingName: string, providedValue: T) {
		super(`SettingValueError: Value ${providedValue} not valid for setting ${settingName}`);
		this.name = 'SettingValueError';
	}
}
