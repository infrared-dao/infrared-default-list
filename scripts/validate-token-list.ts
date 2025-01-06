import { readdirSync } from 'node:fs'

import type { TokenListSchema } from '@/types/token-list'

import { getFile } from './_/get-file'
import { getListFile } from './_/get-list-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateImages } from './_/validate-images'
import { validateList } from './_/validate-list'

const schema = getFile('schema/token-list-schema.json')

const validateTokenList = async ({ network }: { network: string }) => {
  const errors: Array<string> = []
  const list: TokenListSchema = getListFile({
    listPath: `src/tokens/${network}.json`,
    network,
  })

  validateList({ errors, list, schema })
  await validateImages({ errors, listItem: list.tokens, type: 'tokens' })
  outputScriptStatus({ errors, network, type: 'Token' })
}

readdirSync('src/tokens').forEach(async (network) => {
  await validateTokenList({ network: network.replace('.json', '') })
})
