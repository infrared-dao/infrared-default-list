import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import type { BaseTokenListSchema } from '@/types/base-token-list'
import type { ProtocolsSchema } from '@/types/protocols'
import type { TokenListSchema } from '@/types/token-list'
import type { ValidatorListSchema } from '@/types/validator-list'
import type { VaultTypesSchema } from '@/types/vault-types'
import type { VaultsSchema } from '@/types/vaults'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

export const validateList = ({
  errors,
  list,
  schema,
  type,
}: {
  errors: Array<string>
  list:
    | BaseTokenListSchema
    | VaultsSchema
    | VaultTypesSchema
    | ProtocolsSchema
    | TokenListSchema
    | ValidatorListSchema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any
  type: string
}) => {
  // Validate the overall structure
  const validate = ajv.compile(schema)
  const valid = validate(list)

  if (!valid) {
    validate.errors?.forEach((error) => {
      errors.push(
        `Error in ${type} list: ${error.message} at ${error.instancePath}`,
      )
    })
  }
}
