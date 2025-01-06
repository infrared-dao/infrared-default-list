import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import type { GaugeListSchema } from '@/types/gauge-list'
import type { GaugeTypesSchema } from '@/types/gauge-types'
import type { ProtocolsSchema } from '@/types/protocols'
import type { TokenListSchema } from '@/types/token-list'
import type { ValidatorListSchema } from '@/types/validator-list'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

export const validateList = ({
  errors,
  list,
  schema,
}: {
  errors: Array<string>
  list:
    | GaugeListSchema
    | GaugeTypesSchema
    | ProtocolsSchema
    | TokenListSchema
    | ValidatorListSchema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any
}) => {
  // Validate the overall structure
  const validate = ajv.compile(schema)
  const valid = validate(list)

  if (!valid) {
    validate.errors?.forEach((error) => {
      errors.push(
        `Error in gauge list: ${error.message} at ${error.instancePath}`,
      )
    })
  }
}
