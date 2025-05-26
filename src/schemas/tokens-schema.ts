import {
  number,
  string,
  type InferOutput,
  array,
  url,
  picklist,
  pipe,
  nonEmpty,
  strictObject,
  union,
  boolean,
  optional,
} from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListBasicTokenSchema = strictObject({
  address: AddressSchema,
  decimals: number(),
  image: string(),
  name: string(),
  symbol: string(),
})
export type DefaultListBasicToken = InferOutput<
  typeof DefaultListBasicTokenSchema
>
export const DefaultListTokenWithUnderlyingSchema = strictObject({
  ...DefaultListBasicTokenSchema.entries,
  imageNotFromUnderlying: optional(boolean()),
  isReplacedBy: optional(AddressSchema),
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
