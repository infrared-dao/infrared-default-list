import {
  array,
  type InferOutput,
  optional,
  strictObject,
  string,
} from 'valibot'

import { AddressSchema } from './address-schema'

export const DefaultListIVaultSchema = strictObject({
  beraRewardVault: optional(AddressSchema),
  depositTokenAddress: AddressSchema,
  slug: string(),
})
export type DefaultListIVault = InferOutput<typeof DefaultListIVaultSchema>

export const DefaultListIVaultsSchema = array(DefaultListIVaultSchema)
export type DefaultListIVaults = InferOutput<typeof DefaultListIVaultsSchema>
