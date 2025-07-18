import { readdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { parse } from 'valibot'
import { createPublicClient } from 'viem'

import { supportedChains } from '@/config/chains'
import {
  type DefaultListIVaults,
  DefaultListIVaultsSchema,
} from '@/schemas/ivaults-schema'
import {
  type DefaultListTokens,
  DefaultListTokensSchema,
} from '@/schemas/tokens-schema'

import { cleanIVault } from './_/clean-ivault'
import { cleanToken } from './_/clean-token'
import { formatDataToJson } from './_/format-data-to-json'
import { getJsonFile } from './_/get-json-file'
import { isValidChain } from './_/is-valid-chain'
import { outputScriptStatus } from './_/output-script-status'
import { transports } from './_/transports'
import { validateIVaultDetails } from './_/validate-ivault-details'

const folderPath = 'src/ivaults'

const validateVaultsByChain = async ({
  chain,
}: {
  chain: keyof typeof supportedChains
}) => {
  const path = `${folderPath}/${chain}.json`
  const errors: Array<string> = []
  const iVaultsFile: { vaults: DefaultListIVaults } = getJsonFile({
    chain,
    path,
  })
  const iVaults = parse(DefaultListIVaultsSchema, iVaultsFile.vaults).map(
    (iVault) => cleanIVault({ iVault }),
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

  const promisedIVaultDetails = iVaults.map(
    async (iVault) =>
      await validateIVaultDetails({
        beraRewardVaults,
        errors,
        iVault,
        publicClient,
        slugs,
        tokens,
      }),
  )
  await Promise.all(promisedIVaultDetails)
  await writeFile(path, formatDataToJson({ data: { vaults: iVaults } }))
  outputScriptStatus({ chain, errors, type: 'iVaults' })
}

const validateIVaults = async () => {
  const promises = readdirSync(folderPath).map(async (file) => {
    const chain = file.replace('.json', '')

    if (!isValidChain(chain)) {
      throw new Error(`Unsupported chain: ${chain}`)
    }
    await validateVaultsByChain({ chain })
  })

  await Promise.all(promises)
}

await validateIVaults()
