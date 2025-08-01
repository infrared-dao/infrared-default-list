import { array, type InferOutput, strictObject, string } from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListPolVaultSchema = strictObject({
  beraRewardVault: AddressSchema,
  depositTokenAddress: AddressSchema,
  slug: string(),
})
export type DefaultListPolVault = InferOutput<typeof DefaultListPolVaultSchema>

export const DefaultListPolVaultsSchema = array(DefaultListPolVaultSchema)
export type DefaultListPolVaults = InferOutput<
  typeof DefaultListPolVaultsSchema
>
