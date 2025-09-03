import {
  array,
  boolean,
  type InferOutput,
  optional,
  strictObject,
  string,
} from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListUpgradeableVaultsSchema = strictObject({
  address: AddressSchema,
  forced: optional(boolean()),
})

export const DefaultListPolVaultSchema = strictObject({
  address: AddressSchema,
  beraRewardVault: AddressSchema,
  depositTokenAddress: AddressSchema,
  slug: string(),
  upgradeableVaults: optional(array(DefaultListUpgradeableVaultsSchema)),
})
export type DefaultListPolVault = InferOutput<typeof DefaultListPolVaultSchema>

export const DefaultListPolVaultsSchema = array(DefaultListPolVaultSchema)
export type DefaultListPolVaults = InferOutput<
  typeof DefaultListPolVaultsSchema
>
