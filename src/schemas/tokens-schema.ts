import {
  array,
  boolean,
  type InferOutput,
  nonEmpty,
  number,
  optional,
  picklist,
  pipe,
  strictObject,
  string,
  union,
  url,
} from 'valibot'
import { berachain, berachainBepolia } from 'viem/chains'

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
export const TokenCategorySchema = picklist([
  'btc',
  'bera',
  'eth',
  'meme',
  'project',
  'solana',
  'stablecoin',
])

export const chainIds = picklist([berachain.id, berachainBepolia.id])

export const DefaultListBasicTokenSchema = strictObject({
  address: AddressSchema,
  category: TokenCategorySchema,
  chainId: chainIds,
  decimals: number(),
  image: string(),
  isDepositDisabled: optional(boolean()),
  isNotWorkingWithEnso: optional(boolean()),
  isSoulbound: optional(boolean()),
  isUnpriced: optional(boolean()),
  mintUrl: optional(MintUrlSchema),
  name: string(),
  nameCustom: optional(boolean()),
  symbol: string(),
})
export type DefaultListBasicToken = InferOutput<
  typeof DefaultListBasicTokenSchema
>
export const DefaultListDepositTokenSchema = strictObject({
  ...DefaultListBasicTokenSchema.entries,
  category: optional(TokenCategorySchema),
  imageCustomWidth: optional(boolean()),
  imageNotFromUnderlying: optional(boolean()),
  kodiakTradingFee: optional(number()),
  mintUrl: MintUrlSchema,
  protocol: ProtocolSchema,
  type: TokenTypeSchema,
  underlyingTokens: optional(array(AddressSchema)),
})
export type DefaultListDepositToken = InferOutput<
  typeof DefaultListDepositTokenSchema
>

export const DefaultListTokenSchema = union([
  DefaultListBasicTokenSchema,
  DefaultListDepositTokenSchema,
])
export type DefaultListToken = InferOutput<typeof DefaultListTokenSchema>

export const DefaultListTokensSchema = array(DefaultListTokenSchema)
export type DefaultListTokens = InferOutput<typeof DefaultListTokensSchema>
