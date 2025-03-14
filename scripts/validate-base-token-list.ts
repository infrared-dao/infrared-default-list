import { readdirSync } from 'node:fs'

import type { BaseTokenListSchema } from '@/types/base-token-list'

import { getFile } from './_/get-file'
import { getListFile } from './_/get-list-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateImages } from './_/validate-images'
import { validateList } from './_/validate-list'

const schema = getFile('schema/base-token-list-schema.json')

const validateBaseTokenList = async ({ network }: { network: string }) => {
  const errors: Array<string> = []
  const list: BaseTokenListSchema = getListFile({
    listPath: `src/tokens/${network}.json`,
    network,
  })

  validateList({ errors, list, schema })
  await validateImages({ errors, listItem: list.tokens, type: 'tokens' })
  outputScriptStatus({ errors, network, type: 'Token' })
}

readdirSync('src/base-tokens').forEach(async (network) => {
  await validateBaseTokenList({ network: network.replace('.json', '') })
})
