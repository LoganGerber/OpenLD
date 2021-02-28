import { Event } from "bindable-observer";
import { SettingValueType } from "./setting-types";

export class SettingChangeEvent<T extends SettingValueType> extends Event {
	private _settingName: string;
	private _oldValue: T;
	private _newValue: T;

	public constructor(settingName: string, oldValue: T, newValue: T) {
		super();

		this._settingName = settingName;
		this._oldValue = oldValue;
		this._newValue = newValue;
	}


	public get settingName(): string {
		return this._settingName;
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
