import Ajv, { ValidateFunction, JSONSchemaType } from 'ajv';
import { BooleanValueType, HomogeniusArrayValueType, MixedArrayValueType, NumberValueType, ObjectValueType, SettingValueType, StringValueType } from './setting-types';

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
			// TODO: Alert the user that the provided value was not valid, and has been changed to the default
			this.value = schema.default as T;
		}
		else {
			this.value = value;
		}
	}


	/**
	 * ChangeValue
	 */
	public ChangeValue(value?: T): void {
		if (value === undefined) {
			this.value = this.schema.default as T;
			return;
		}
		if (!this.validation(value)) {
			// TODO: Alert the user that the provided value was not value, and no change has taken place.
			return;
		}
		this.value = value;
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