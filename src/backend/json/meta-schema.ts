import { JSONSchemaType } from 'ajv';

import { JSONNumberType, JSONStringType, JSONBooleanType, JSONMixedArrayType, JSONHomogeniusArrayType, JSONObjectType, JSONNullType } from './types';


// Code found at https://github.com/microsoft/TypeScript/issues/41966

// We DONT care about what this type actually is, all we care about is the type signature.
// This will *only* be used to compare type signatures in the Equals type below.
type EqualsTest<T> = <A>() => A extends T ? 1 : 0;

// Check if two types are the same.
type Equals<A1, A2> = EqualsTest<A2> extends EqualsTest<A1> ? 1 : 0;

// Remove type K if it equals type I
type Filter<K, I> = Equals<K, I> extends 1 ? never : K;

// Remove the indexer from a type. This takes advantage of how an indexer's key type is `string`, rather than a string representation of its name.
type OmitStringIndex<T> = {
	[K in keyof T as Filter<K, string>]: T[K];
};

type OmitNumberIndex<T> = {
	[K in keyof T as Filter<K, number>]: T[K];
};

type OmitIndex<T> = OmitNumberIndex<OmitStringIndex<T>>;
// End found code


export type JSONNumberMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONNumberType>>>;
export type JSONStringMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONStringType>>>;
export type JSONBooleanMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONBooleanType>>>;
export type JSONMixedArrayMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONMixedArrayType>>>;
export type JSONHomogeniusArrayMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONHomogeniusArrayType>>>;
export type JSONObjectMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONObjectType>>>;
export type JSONNullMetaSchemaType = JSONSchemaType<OmitIndex<JSONSchemaType<JSONNullType>>>;

export type JSONMetaSchemaType =
	JSONNumberMetaSchemaType
	| JSONStringMetaSchemaType
	| JSONBooleanMetaSchemaType
	| JSONMixedArrayMetaSchemaType
	| JSONHomogeniusArrayMetaSchemaType
	| JSONObjectMetaSchemaType
	| JSONNullMetaSchemaType;

