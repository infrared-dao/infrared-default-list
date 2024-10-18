import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

export const validateList = ({
  errors,
  list,
  schema,
}: {
  errors: Array<string>
  list: any
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
