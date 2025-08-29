import {
  array,
  type InferOutput,
  optional,
  strictObject,
  string,
} from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListPolVaultSchema = strictObject({
  address: AddressSchema,
  beraRewardVault: AddressSchema,
  depositTokenAddress: AddressSchema,
  forcedUpgradeAddresses: optional(array(AddressSchema)),
  slug: string(),
})
export type DefaultListPolVault = InferOutput<typeof DefaultListPolVaultSchema>

export const DefaultListPolVaultsSchema = array(DefaultListPolVaultSchema)
export type DefaultListPolVaults = InferOutput<
  typeof DefaultListPolVaultsSchema
>
