import { readdirSync } from 'node:fs'

import type { ValidatorsSchema } from '@/types/validators'

import { getFile } from './_/get-file'
import { getJsonFile } from './_/get-json-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'

const schema = getFile('schema/validators-schema.json')

const validatorValidatorList = async ({ network }: { network: string }) => {
  const errors: Array<string> = []
  const validators: ValidatorsSchema = getJsonFile({
    network,
    path: `src/validators/${network}.json`,
  })

  validateList({ errors, list: validators, schema, type: 'validator' })
  outputScriptStatus({ errors, network, type: 'Validator' })
}

readdirSync('src/validators').forEach(async (network) => {
  await validatorValidatorList({ network: network.replace('.json', '') })
})
