import { readdirSync } from 'node:fs'
import { createPublicClient, http } from 'viem'

import { supportedChains } from '@/config/chains'
import type { TokenListSchema } from '@/types/token-list'

import { getFile } from './_/get-file'
import { getListFile } from './_/get-list-file'
import { isValidNetwork } from './_/is-valid-network'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'
import { validateTokenDetails } from './_/validate-token-details'

const schema = getFile('schema/token-list-schema.json')

const validateBaseTokens = async ({
  network,
}: {
  network: keyof typeof supportedChains
}) => {
  const errors: Array<string> = []
  const list: TokenListSchema = getListFile({
    listPath: `src/tokens/${network}.json`,
    network,
  })

  const chain = supportedChains[network]
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  validateList({ errors, list, schema, type: 'tokens' })
  await validateTokenDetails({ errors, list, publicClient })
  outputScriptStatus({ errors, network, type: 'Token' })
}

readdirSync('src/base-tokens').forEach(async (file) => {
  const network = file.replace('.json', '')

  if (!isValidNetwork(network)) {
    throw new Error(`Unsupported network: ${network}`)
  }

  await validateBaseTokens({ network })
})
