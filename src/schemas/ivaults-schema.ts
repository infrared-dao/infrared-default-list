import {
  array,
  type InferOutput,
  optional,
  strictObject,
  string,
} from 'valibot'

import { DefaultListUpgradeableVaultsSchema } from '@/schemas/pol-vaults-schema'

import { AddressSchema } from './address-schema'

export const DefaultListIVaultSchema = strictObject({
  address: AddressSchema,
  beraRewardVault: optional(AddressSchema),
  depositTokenAddress: AddressSchema,
  slug: string(),
  upgradeableVaults: optional(array(DefaultListUpgradeableVaultsSchema)),
})
export type DefaultListIVault = InferOutput<typeof DefaultListIVaultSchema>

export const DefaultListIVaultsSchema = array(DefaultListIVaultSchema)
export type DefaultListIVaults = InferOutput<typeof DefaultListIVaultsSchema>
