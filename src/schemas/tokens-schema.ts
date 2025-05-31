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

const ProtocolSchema = string()
const TokenTypeSchema = picklist([
  'amm',
  'cdp',
  'perpetuals',
  'points',
  'unknown',
  'vault',
])

export const DefaultListBasicTokenSchema = strictObject({
  address: AddressSchema,
  decimals: number(),
  image: string(),
  name: string(),
  protocol: optional(ProtocolSchema),
  symbol: string(),
  type: optional(TokenTypeSchema),
})
export type DefaultListBasicToken = InferOutput<
  typeof DefaultListBasicTokenSchema
>
export const DefaultListTokenWithUnderlyingSchema = strictObject({
  ...DefaultListBasicTokenSchema.entries,
  imageNotFromUnderlying: optional(boolean()),
  mintUrl: pipe(string(), nonEmpty('Please enter a mintUrl'), url()),
  protocol: ProtocolSchema,
  type: TokenTypeSchema,
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
