import Ajv, { ValidateFunction, JSONSchemaType } from 'ajv';

import { BooleanValueType, HomogeniusArrayValueType, MixedArrayValueType, NumberValueType, ObjectValueType, SettingValueType, StringValueType } from './setting-types';

import { GlobalObserver } from '../base/event-system/global-observer';
import { SettingChangeEvent } from './setting-change-event';

const ajv = new Ajv();

type BaseSettingSchemaType<T extends SettingValueType> = {
	name: string,
	description: string,
	default: T | null,
};

export type NumberSettingSchemaType = JSONSchemaType<NumberValueType> & BaseSettingSchemaType<NumberValueType>;
export type StringSettingSchemaType = JSONSchemaType<StringValueType> & BaseSettingSchemaType<StringValueType>;
export type BooleanSettingSchemaType = JSONSchemaType<BooleanValueType> & BaseSettingSchemaType<BooleanValueType>;
export type HomogeniusArraySettingSchemaType = JSONSchemaType<HomogeniusArrayValueType> & BaseSettingSchemaType<HomogeniusArrayValueType>;
export type MixedArraySettingSchemaType = JSONSchemaType<MixedArrayValueType> & BaseSettingSchemaType<MixedArrayValueType>;
export type ObjectSettingSchemaType = JSONSchemaType<ObjectValueType> & BaseSettingSchemaType<ObjectValueType>;

export type SettingSchemaType = NumberSettingSchemaType
	| StringSettingSchemaType
	| BooleanSettingSchemaType
	| HomogeniusArraySettingSchemaType
	| MixedArraySettingSchemaType
	| ObjectSettingSchemaType;

type ValueToSettingSchemaTypeMap<T extends SettingValueType> =
	T extends BooleanValueType ? BooleanSettingSchemaType
	: T extends HomogeniusArrayValueType ? HomogeniusArraySettingSchemaType
	: T extends MixedArrayValueType ? MixedArraySettingSchemaType
	: T extends NumberValueType ? NumberSettingSchemaType
	: T extends ObjectValueType ? ObjectSettingSchemaType
	: T extends StringValueType ? StringSettingSchemaType
	: never;


export class Setting<T extends SettingValueType = SettingValueType> {
	protected value: T;
	protected schema: ValueToSettingSchemaTypeMap<T>;
	protected validation: ValidateFunction;
	protected name: string;
	protected description: string;


	private type: string;


	constructor(schema: ValueToSettingSchemaTypeMap<T>, value?: T) {
		this.schema = schema;
		this.validation = ajv.compile(schema);
		this.type = schema.type;
		this.name = schema.name;
		this.description = schema.description;
		if (value === undefined) {
			this.value = schema.default as T;
		}
		else if (!this.validation(value)) {
			this.value = schema.default as T;
		}
		else {
			this.value = value;
		}
	}


	/**
	 * ChangeValue
	 */
	public ChangeValue(value?: T): boolean {
		if (value === undefined) {
			let oldValue = this.value;
			this.value = this.schema.default as T;
			GlobalObserver.emit(new SettingChangeEvent<T>(this, oldValue, this.value));
			return true;
		}
		if (!this.validation(value)) {
			return false;
		}
		let oldValue = this.value;
		this.value = value;
		GlobalObserver.emit(new SettingChangeEvent<T>(this, oldValue, this.value));
		return true;
	}

	/**
	 * GetValue
	 */
	public GetValue(): T {
		return this.value;
	}

	public GetType(): string {
		return this.type;
	}

	public GetSchema(): ValueToSettingSchemaTypeMap<T> {
		return this.schema;
	}

	public GetName(): string {
		return this.name;
	}
	public GetDescription(): string {
		return this.description;
	}
}

export class NumberSetting extends Setting<NumberValueType>{}
export class StringSetting extends Setting<StringValueType>{};
export class BooleanSetting extends Setting<BooleanValueType>{};
export class HomogeniusArraySetting extends Setting<HomogeniusArrayValueType>{};
export class MixedArraySetting extends Setting<MixedArrayValueType>{};
export class ObjectSetting extends Setting<ObjectValueType>{};
