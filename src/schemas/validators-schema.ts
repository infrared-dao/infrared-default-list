import { array, object, type InferOutput, string } from 'valibot'

export const DefaultListValidatorSchema = object({
  name: string(),
})
export type DefaultListValidator = InferOutput<
  typeof DefaultListValidatorSchema
>

export const DefaultListValidatorsSchema = array(DefaultListValidatorSchema)
export type DefaultListValidators = InferOutput<
  typeof DefaultListValidatorsSchema
>
