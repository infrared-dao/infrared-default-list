import { array, type InferOutput, strictObject, string } from 'valibot'

export const DefaultListReplacedVaultSchema = strictObject({
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
