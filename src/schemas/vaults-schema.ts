import {
  string,
  type InferOutput,
  array,
  strictObject,
  optional,
} from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListVaultSchema = strictObject({
  beraRewardsVault: AddressSchema,
  isReplacedBy: optional(AddressSchema),
  slug: string(),
  stakeTokenAddress: AddressSchema,
})
export type DefaultListVault = InferOutput<typeof DefaultListVaultSchema>

export const DefaultListVaultsSchema = array(DefaultListVaultSchema)
export type DefaultListVaults = InferOutput<typeof DefaultListVaultsSchema>
