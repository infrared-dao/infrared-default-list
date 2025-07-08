import { string, type InferOutput, array, strictObject } from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListVaultSchema = strictObject({
  beraRewardsVault: AddressSchema,
  depositTokenAddress: AddressSchema,
  slug: string(),
  stakeTokenAddress: AddressSchema, // for backend
})
export type DefaultListVault = InferOutput<typeof DefaultListVaultSchema>

export const DefaultListVaultsSchema = array(DefaultListVaultSchema)
export type DefaultListVaults = InferOutput<typeof DefaultListVaultsSchema>
