import {
  array,
  boolean,
  nonEmpty,
  number,
  optional,
  picklist,
  pipe,
  strictObject,
  string,
  type InferOutput,
  union,
  url,
} from 'valibot'

import { AddressSchema } from './address-schema'

export const MintUrlSchema = pipe(
  string(),
  nonEmpty('Please enter a mintUrl'),
  url(),
)
export const ProtocolSchema = string()
export const TokenTypeSchema = picklist([
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
  isNotWorkingWithEnso: optional(boolean()),
  isSoulbound: optional(boolean()),
  isStakeDisabled: optional(boolean()),
  isUnpriced: optional(boolean()),
  name: string(),
  symbol: string(),
})
export type DefaultListBasicToken = InferOutput<
  typeof DefaultListBasicTokenSchema
>
export const DefaultListStakeTokenSchema = strictObject({
  ...DefaultListBasicTokenSchema.entries,
  imageNotFromUnderlying: optional(boolean()),
  mintUrl: MintUrlSchema,
  protocol: ProtocolSchema,
  type: TokenTypeSchema,
  underlyingTokens: optional(array(AddressSchema)),
})
export type DefaultListStakeToken = InferOutput<
  typeof DefaultListStakeTokenSchema
>

export const DefaultListTokenSchema = union([
  DefaultListBasicTokenSchema,
  DefaultListStakeTokenSchema,
])
export type DefaultListToken = InferOutput<typeof DefaultListTokenSchema>

export const DefaultListTokensSchema = array(DefaultListTokenSchema)
export type DefaultListTokens = InferOutput<typeof DefaultListTokensSchema>
