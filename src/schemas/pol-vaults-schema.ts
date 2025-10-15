import {
  array,
  boolean,
  type InferOutput,
  optional,
  strictObject,
  string,
} from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListUpgradeableVaultSchema = strictObject({
  address: AddressSchema,
  forced: optional(boolean()),
})

export const DefaultListUpgradeableVaultsSchema = array(
  DefaultListUpgradeableVaultSchema,
)

export const DefaultListPolVaultSchema = strictObject({
  address: AddressSchema,
  beraRewardVault: AddressSchema,
  depositTokenAddress: AddressSchema,
  slug: string(),
  slugIsLegacy: optional(boolean()),
  upgradeableVaults: optional(DefaultListUpgradeableVaultsSchema),
})
export type DefaultListPolVault = InferOutput<typeof DefaultListPolVaultSchema>

export const DefaultListPolVaultsSchema = array(DefaultListPolVaultSchema)
export type DefaultListPolVaults = InferOutput<
  typeof DefaultListPolVaultsSchema
>
