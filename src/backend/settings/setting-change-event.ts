import { Event } from "bindable-observer";
import { Setting } from "./setting";
import { SettingValueType } from "./setting-types";

export class SettingChangeEvent<T extends SettingValueType> extends Event {
	private _setting: Setting;
	private _oldValue: T;
	private _newValue: T;

	public constructor(setting: Setting, oldValue: T, newValue: T) {
		super();

		this._setting = setting;
		this._oldValue = oldValue;
		this._newValue = newValue;
	}


	public get setting(): Setting {
		return this._setting;
	}

	public get oldValue(): T {
		return this._oldValue;
	}

	public get newValue(): T {
		return this._newValue;
	}


	public get name(): string {
		return "Setting Change";
	}
	public get uniqueName(): string {
		return "OpenLD-SettingChangeEvent";
	}
}
