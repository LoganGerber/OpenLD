import { EventEmitter } from 'events';
import { BindableObserver } from 'bindable-observer';

import { Setting } from './setting';
import { SettingValueType } from './setting-types';
import { SettingNonexistantError } from './setting-nonexistant-error';
import { SettingChangeEvent } from './setting-change-event';
import { GlobalObserver } from '../base/event-system/global-observer';

export class SettingsContainer {
	private _settings: Record<string, Setting>;
	private _observer: BindableObserver;


	public get observer(): BindableObserver {
		return this._observer;
	}


	public constructor() {
		this._settings = {};
		this._observer = new BindableObserver(EventEmitter);

		this._observer.bind(GlobalObserver);
	}

	public ChangeSetting<T extends SettingValueType>(settingName: string, value: T): void {
		// Check if setting name exists in container
		if (!(settingName in this._settings)) {
			throw new SettingNonexistantError(settingName);
		}

		let setting = this.GetSetting(settingName);
		let oldValue = this.GetSettingValue(settingName);

		setting.ChangeValue(value);
		this._observer.emit(new SettingChangeEvent(setting, oldValue, value));
	}

	public GetSettingValue<T extends SettingValueType = SettingValueType>(settingName: string): T {
		if (!(settingName in this._settings)) {
			throw new SettingNonexistantError(settingName);
		}

		return this._settings[settingName].GetValue() as T;
	}

	public GetSetting(settingName: string): Setting {
		if (!(settingName in this._settings)) {
			throw new SettingNonexistantError(settingName);
		}

		return this._settings[settingName];
	}

	public AddSetting(setting: Setting) {
		this._settings[setting.GetName()] = setting;
	}

	public RemoveSetting(settingName: string) {
		if (!(settingName in this._settings)) {
			throw new SettingNonexistantError(settingName);
		}

		delete this._settings[settingName];
	}
}
