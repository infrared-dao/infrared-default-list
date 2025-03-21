import { readdirSync } from 'node:fs'
import { createPublicClient, http } from 'viem'

import { supportedChains } from '@/config/chains'
import type { TokensSchema } from '@/types/tokens'

import { getFile } from './_/get-file'
import { getJsonFile } from './_/get-json-file'
import { isValidNetwork } from './_/is-valid-network'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'
import { validateTokenDetails } from './_/validate-token-details'

const schema = getFile('schema/tokens-schema.json')

const validateTokens = async ({
  network,
}: {
  network: keyof typeof supportedChains
}) => {
  const errors: Array<string> = []
  const tokens: TokensSchema = getJsonFile({
    network,
    path: `src/tokens/${network}.json`,
  })

  const chain = supportedChains[network]
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  validateList({ errors, list: tokens, schema, type: 'tokens' })
  await validateTokenDetails({ errors, publicClient, tokens: tokens.tokens })
  outputScriptStatus({ errors, network, type: 'Token' })
}

readdirSync('src/tokens').forEach(async (file) => {
  const network = file.replace('.json', '')

  if (!isValidNetwork(network)) {
    throw new Error(`Unsupported network: ${network}`)
  }

  await validateTokens({ network })
})
