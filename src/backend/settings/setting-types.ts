import {
	JSONBooleanType,
	JSONHomogeniusArrayType,
	JSONMixedArrayType,
	JSONNumberType,
	JSONObjectType,
	JSONStringType
} from '../base/json/types';

export type BooleanValueType = JSONBooleanType;
export type HomogeniusArrayValueType = JSONHomogeniusArrayType;
export type MixedArrayValueType = JSONMixedArrayType;
export type NumberValueType = JSONNumberType;
export type ObjectValueType = JSONObjectType;
export type StringValueType = JSONStringType;

export type SettingValueType = BooleanValueType | HomogeniusArrayValueType | MixedArrayValueType | NumberValueType | ObjectValueType | StringValueType;
