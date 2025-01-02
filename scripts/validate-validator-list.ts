import { readdirSync } from 'node:fs'

import type { ValidatorListSchema } from '@/types/validator-list'

import { getFile } from './_/get-file'
import { getListFile } from './_/get-list-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'

const schema = getFile('schema/validator-list-schema.json')

const validatorValidatorList = async ({ network }: { network: string }) => {
  const errors: Array<string> = []
  const list: ValidatorListSchema = getListFile({
    listPath: `src/validators/${network}/defaultValidatorList.json`,
    network,
  })

  validateList({ errors, list, schema })
  outputScriptStatus({ errors, network, type: 'Validator' })
}

readdirSync('src/validators').forEach(async (network) => {
  await validatorValidatorList({ network })
})
