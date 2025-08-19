import { array, type InferOutput, strictObject, string } from 'valibot'

export const DefaultListReplacesVaultSchema = strictObject({
  originalSlug: string(),
  slug: string(),
})
export type DefaultListReplacesVault = InferOutput<
  typeof DefaultListReplacesVaultSchema
>

export const DefaultListReplacesVaultsSchema = array(
  DefaultListReplacesVaultSchema,
)
export type DefaultListReplacesVaults = InferOutput<
  typeof DefaultListReplacesVaultsSchema
>
