import type { TokenTypesSchema } from '@/types/token-types'

import { getFile } from './_/get-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'

const schema = getFile('schema/token-types-schema.json')
const tokenTypes: TokenTypesSchema = getFile('src/token-types.json')

const validateTokenTypes = async () => {
  const errors: Array<string> = []

  validateList({ errors, list: tokenTypes, schema, type: 'token-types' })
  outputScriptStatus({ errors, type: 'Token types' })
}

validateTokenTypes()
