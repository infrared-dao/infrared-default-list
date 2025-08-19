import { array, type InferOutput, strictObject, string } from 'valibot'

import { AddressSchema } from '@/schemas/address-schema'

export const DefaultListReplacedVaultSchema = strictObject({
  address: AddressSchema,
  originalSlug: string(),
  slug: string(),
})
export type DefaultListReplacedVault = InferOutput<
  typeof DefaultListReplacedVaultSchema
>

export const DefaultListReplacedVaultsSchema = array(
  DefaultListReplacedVaultSchema,
)
export type DefaultListReplacedVaults = InferOutput<
  typeof DefaultListReplacedVaultsSchema
>
