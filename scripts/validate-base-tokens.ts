import { readdirSync } from 'node:fs'
import { createPublicClient, http } from 'viem'

import { supportedChains } from '@/config/chains'
import type { BaseTokenListSchema } from '@/types/base-token-list'

import { getFile } from './_/get-file'
import { getListFile } from './_/get-list-file'
import { isValidNetwork } from './_/is-valid-network'
import { outputScriptStatus } from './_/output-script-status'
import { validateBaseTokenDetails } from './_/validate-base-token-details'
import { validateList } from './_/validate-list'

const schema = getFile('schema/base-token-list-schema.json')

const validateBaseTokens = async ({
  network,
}: {
  network: keyof typeof supportedChains
}) => {
  const errors: Array<string> = []
  const list: BaseTokenListSchema = getListFile({
    listPath: `src/base-tokens/${network}.json`,
    network,
  })

  const chain = supportedChains[network]
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  validateList({ errors, list, schema, type: 'base-tokens' })
  await validateBaseTokenDetails({ errors, list, publicClient })
  outputScriptStatus({ errors, network, type: 'Base token' })
}

readdirSync('src/base-tokens').forEach(async (file) => {
  const network = file.replace('.json', '')

  if (!isValidNetwork(network)) {
    throw new Error(`Unsupported network: ${network}`)
  }

  await validateBaseTokens({ network })
})
