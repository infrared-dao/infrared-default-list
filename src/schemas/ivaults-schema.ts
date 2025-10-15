import {
  array,
  boolean,
  type InferOutput,
  optional,
  strictObject,
  string,
} from 'valibot'

import { AddressSchema } from './address-schema'
import { DefaultListUpgradeableVaultsSchema } from './pol-vaults-schema'

export const DefaultListIVaultSchema = strictObject({
  address: AddressSchema,
  beraRewardVault: optional(AddressSchema),
  depositTokenAddress: AddressSchema,
  description: string(),
  slug: string(),
  slugIsLegacy: optional(boolean()),
  upgradeableVaults: optional(DefaultListUpgradeableVaultsSchema),
})
export type DefaultListIVault = InferOutput<typeof DefaultListIVaultSchema>

export const DefaultListIVaultsSchema = array(DefaultListIVaultSchema)
export type DefaultListIVaults = InferOutput<typeof DefaultListIVaultsSchema>
