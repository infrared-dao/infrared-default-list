import type { VaultTypesSchema } from '@/types/vault-types'

import { getFile } from './_/get-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'

const schema = getFile('schema/vault-types-schema.json')
const vaultTypes: VaultTypesSchema = getFile('src/vault-types.json')

const validateVaultTypes = async () => {
  const errors: Array<string> = []

  validateList({ errors, list: vaultTypes, schema, type: 'vault-types' })
  outputScriptStatus({ errors, type: 'Protocol types' })
}

validateVaultTypes()
