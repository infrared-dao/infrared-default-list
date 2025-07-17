import { string, type InferOutput, array, strictObject } from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListPolVaultSchema = strictObject({
  beraRewardsVault: AddressSchema,
  depositTokenAddress: AddressSchema,
  slug: string(),
  stakeTokenAddress: AddressSchema, // for backend
})
export type DefaultListPolVault = InferOutput<typeof DefaultListPolVaultSchema>

export const DefaultListPolVaultsSchema = array(DefaultListPolVaultSchema)
export type DefaultListPolVaults = InferOutput<
  typeof DefaultListPolVaultsSchema
>
