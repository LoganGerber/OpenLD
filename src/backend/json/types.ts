export type JSONNumberType = number;
export type JSONStringType = string;
export type JSONBooleanType = boolean;
export type JSONMixedArrayType = [JSONValueType, ...JSONValueType[]];
export type JSONHomogeniusArrayType = JSONValueType[];
export type JSONNullType = null;

export interface JSONObjectType extends Record<string, JSONValueType> {}

export type JSONValueType =
	JSONNumberType
	| JSONStringType
	| JSONBooleanType
	| JSONMixedArrayType
	| JSONHomogeniusArrayType
	| JSONObjectType
	| JSONNullType;
