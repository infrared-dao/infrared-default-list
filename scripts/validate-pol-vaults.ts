import { readdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { parse } from 'valibot'
import { createPublicClient } from 'viem'

import { supportedChains } from '@/config/chains'
import {
  type DefaultListPolVaults,
  DefaultListPolVaultsSchema,
} from '@/schemas/pol-vaults-schema'
import {
  type DefaultListTokens,
  DefaultListTokensSchema,
} from '@/schemas/tokens-schema'

import { cleanPolVault } from './_/clean-pol-vault'
import { cleanToken } from './_/clean-token'
import { formatDataToJson } from './_/format-data-to-json'
import { getJsonFile } from './_/get-json-file'
import { isValidChain } from './_/is-valid-chain'
import { outputScriptStatus } from './_/output-script-status'
import { transports } from './_/transports'
import { validatePolVaultDetails } from './_/validate-pol-vault-details'

const folderPath = 'src/pol-vaults'

const validateVaultsByChain = async ({
  chain,
}: {
  chain: keyof typeof supportedChains
}) => {
  const path = `${folderPath}/${chain}.json`
  const errors: Array<string> = []
  const polVaultsFile: { vaults: DefaultListPolVaults } = getJsonFile({
    chain,
    path,
  })
  const polVaults = parse(DefaultListPolVaultsSchema, polVaultsFile.vaults).map(
    (polVault) => cleanPolVault({ polVault }),
  )
  const tokensFile: { tokens: DefaultListTokens } = getJsonFile({
    chain,
    path: `src/tokens/${chain}.json`,
  })
  const tokens = parse(DefaultListTokensSchema, tokensFile.tokens).map(
    (token) => cleanToken({ token }),
  )

  const publicClient = createPublicClient({
    batch: {
      multicall: true,
    },
    chain: supportedChains[chain],
    transport: transports[supportedChains[chain].id],
  })
  console.log(publicClient.chain.rpcUrls)
  const slugs: Array<string> = []
  const beraRewardVaults = new Set<string>()

  const promisedPolVaultDetails = polVaults.map(
    async (polVault) =>
      await validatePolVaultDetails({
        beraRewardVaults,
        errors,
        polVault,
        publicClient,
        slugs,
        tokens,
      }),
  )
  await Promise.all(promisedPolVaultDetails)
  await writeFile(path, formatDataToJson({ data: { vaults: polVaults } }))
  outputScriptStatus({ chain, errors, type: 'PoL vaults' })
}

const validatePolVaults = async () => {
  const promises = readdirSync(folderPath).map(async (file) => {
    const chain = file.replace('.json', '')

    if (!isValidChain(chain)) {
      throw new Error(`Unsupported chain: ${chain}`)
    }
    await validateVaultsByChain({ chain })
  })

  await Promise.all(promises)
}

await validatePolVaults()
