import {
  array,
  boolean,
  type InferOutput,
  nonEmpty,
  number,
  object,
  optional,
  picklist,
  pipe,
  string,
  union,
  url,
} from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListBasicTokenSchema = object({
  address: AddressSchema,
  decimals: number(),
  image: string(),
  name: string(),
  symbol: string(),
})
export type DefaultListBasicToken = InferOutput<
  typeof DefaultListBasicTokenSchema
>
export const DefaultListTokenWithUnderlyingSchema = object({
  ...DefaultListBasicTokenSchema.entries,
  imageNotFromUnderlying: optional(boolean()),
  mintUrl: pipe(string(), nonEmpty('Please enter a mintUrl'), url()),
  protocol: string(),
  type: picklist(['amm', 'cdp', 'perpetuals', 'unknown', 'vault']),
  underlyingTokens: array(AddressSchema),
})
export type DefaultListTokenWithUnderlying = InferOutput<
  typeof DefaultListTokenWithUnderlyingSchema
>

export const DefaultListTokenSchema = union([
  DefaultListBasicTokenSchema,
  DefaultListTokenWithUnderlyingSchema,
])
export type DefaultListToken = InferOutput<typeof DefaultListTokenSchema>

export const DefaultListTokensSchema = array(DefaultListTokenSchema)
export type DefaultListTokens = InferOutput<typeof DefaultListTokensSchema>
