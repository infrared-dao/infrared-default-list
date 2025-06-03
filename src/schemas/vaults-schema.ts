import { array, type InferOutput, object, string } from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListVaultSchema = object({
  beraRewardsVault: AddressSchema,
  slug: string(),
  stakeTokenAddress: AddressSchema,
})
export type DefaultListVault = InferOutput<typeof DefaultListVaultSchema>

export const DefaultListVaultsSchema = array(DefaultListVaultSchema)
export type DefaultListVaults = InferOutput<typeof DefaultListVaultsSchema>
