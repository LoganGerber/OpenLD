import { JSONSchemaType } from 'ajv';

import { JSONNumberType, JSONStringType, JSONBooleanType, JSONMixedArrayType, JSONHomogeniusArrayType, JSONObjectType, JSONNullType } from './types';


// Currently broken, will be fixed with https://github.com/microsoft/TypeScript/pull/41976

/*
// Code found at https://github.com/microsoft/TypeScript/issues/41966

// We DONT care about what this type actually is, all we care about is the type signature.
// This will *only* be used to compare type signatures in the Equals type below.
type EqualsTest<T> = <A>() => A extends T ? 1 : 0;

// Check if two types are the same.
type Equals<A1, A2> = EqualsTest<A2> extends EqualsTest<A1> ? 1 : 0;

// Remove type K if it equals type I
type Filter<K, I> = Equals<K, I> extends 1 ? never : K;

// Remove the indexer from a type. This takes advantage of how an indexer's key type is `string`, rather than a string representation of its name.
type OmitIndex<T> = {
	[K in keyof T as Filter<K, string>]: T[K];
};
// End found code


export type JSONNumberMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONNumberGeneric>>>;
export type JSONStringMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONStringGeneric>>>;
export type JSONBooleanMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONBooleanGeneric>>>;
export type JSONMixedArrayMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONMixedArrayGeneric>>>;
export type JSONHomogeniusArrayMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONHomogeniusArrayGeneric>>>;
export type JSONObjectMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONObjectGeneric>>>;
export type JSONNullMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONNullGeneric>>>;

export type JSONMetaSchemaType =
	JSONNumberMetaSchemaType |
	JSONStringMetaSchemaType |
	JSONBooleanMetaSchemaType |
	JSONMixedArrayMetaSchemaType |
	JSONHomogeniusArrayMetaSchemaType |
	JSONObjectMetaSchemaType |
	JSONNullMetaSchemaType;
*/


// TODO: Temporary, all copied over from AJV. To be removed when above code is fixed with TS update
type PartialSchema<T> = Partial<JSONSchemaType<T, true>>;

type JSONType<T extends string, _partial extends boolean> = _partial extends true ? T | undefined : T;

type JSONSchemaNoIndexType<T, _partial extends boolean = false> = (T extends number ? {
	type: JSONType<"number" | "integer", _partial>;
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;
	multipleOf?: number;
	format?: string;
} : T extends string ? {
	type: JSONType<"string", _partial>;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	format?: string;
} : T extends boolean ? {
	type: "boolean";
} : T extends [any, ...any[]] ? {
	type: JSONType<"array", _partial>;
	items: {
		[K in keyof T]-?: JSONSchemaType<T[K]> & Nullable<T[K]>;
	} & {
		length: T["length"];
	};
	minItems: T["length"];
} & ({
	maxItems: T["length"];
} | {
	additionalItems: false;
}) : T extends any[] ? {
	type: JSONType<"array", _partial>;
	items: JSONSchemaType<T[0]>;
	contains?: PartialSchema<T[0]>;
	minItems?: number;
	maxItems?: number;
	minContains?: number;
	maxContains?: number;
	uniqueItems?: true;
	additionalItems?: never;
} : T extends Record<string, any> ? {
	type: JSONType<"object", _partial>;
	required: _partial extends true ? (keyof T)[] : RequiredMembers<T>[];
	additionalProperties?: boolean | JSONSchemaType<T[string]>;
	unevaluatedProperties?: boolean | JSONSchemaType<T[string]>;
	properties?: _partial extends true ? Partial<PropertiesSchema<T>> : PropertiesSchema<T>;
	patternProperties?: {
		[Pattern in string]?: JSONSchemaType<T[string]>;
	};
	propertyNames?: JSONSchemaType<string>;
	dependencies?: {
		[K in keyof T]?: (keyof T)[] | PartialSchema<T>;
	};
	dependentRequired?: {
		[K in keyof T]?: (keyof T)[];
	};
	dependentSchemas?: {
		[K in keyof T]?: PartialSchema<T>;
	};
	minProperties?: number;
	maxProperties?: number;
} : T extends null ? {
	nullable: true;
} : never) & {
	$id?: string;
	$ref?: string;
	$defs?: {
		[Key in string]?: JSONSchemaType<Known, true>;
	};
	definitions?: {
		[Key in string]?: JSONSchemaType<Known, true>;
	};
	allOf?: PartialSchema<T>[];
	anyOf?: PartialSchema<T>[];
	oneOf?: PartialSchema<T>[];
	if?: PartialSchema<T>;
	then?: PartialSchema<T>;
	else?: PartialSchema<T>;
	not?: PartialSchema<T>;
};

type Known = KnownRecord | [Known, ...Known[]] | Known[] | number | string | boolean | null;
interface KnownRecord extends Record<string, Known> {
}

type PropertiesSchema<T> = {
	[K in keyof T]-?: (JSONSchemaType<T[K]> & Nullable<T[K]>) | {
		$ref: string;
	};
};

type RequiredMembers<T> = {
	[K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

type Nullable<T> = undefined extends T ? {
	nullable: true;
	const?: never;
	enum?: (T | null)[];
	default?: T | null;
} : {
	const?: T;
	enum?: T[];
	default?: T;
};


export type JSONNumberMetaSchemaType = JSONSchemaType<JSONSchemaNoIndexType<JSONNumberType>>;
export type JSONStringMetaSchemaType = JSONSchemaType<JSONSchemaNoIndexType<JSONStringType>>;
export type JSONBooleanMetaSchemaType = JSONSchemaType<JSONSchemaNoIndexType<JSONBooleanType>>;
export type JSONMixedArrayMetaSchemaType = JSONSchemaType<JSONSchemaNoIndexType<JSONMixedArrayType>>;
export type JSONHomogeniusArrayMetaSchemaType = JSONSchemaType<JSONSchemaNoIndexType<JSONHomogeniusArrayType>>;
export type JSONObjectMetaSchemaType = JSONSchemaType<JSONSchemaNoIndexType<JSONObjectType>>;
export type JSONNullMetaSchemaType = JSONSchemaType<JSONSchemaNoIndexType<JSONNullType>>;

export type JSONMetaSchemaType =
	JSONNumberMetaSchemaType |
	JSONStringMetaSchemaType |
	JSONBooleanMetaSchemaType |
	JSONMixedArrayMetaSchemaType |
	JSONHomogeniusArrayMetaSchemaType |
	JSONObjectMetaSchemaType |
	JSONNullMetaSchemaType;
