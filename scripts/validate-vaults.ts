import { readdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { parse } from 'valibot'
import { createPublicClient } from 'viem'

import { supportedChains } from '@/config/chains'
import {
  type DefaultListTokens,
  DefaultListTokensSchema,
} from '@/schemas/tokens-schema'
import {
  type DefaultListVaults,
  DefaultListVaultsSchema,
} from '@/schemas/vaults-schema'

import { cleanToken } from './_/clean-token'
import { cleanVault } from './_/clean-vault'
import { formatDataToJson } from './_/format-data-to-json'
import { getJsonFile } from './_/get-json-file'
import { isValidChain } from './_/is-valid-chain'
import { outputScriptStatus } from './_/output-script-status'
import { transport } from './_/transport'
import { validateVaultDetails } from './_/validate-vault-details'

const folderPath = 'src/vaults'

const validateVaultsByChain = async ({
  chain,
}: {
  chain: keyof typeof supportedChains
}) => {
  const path = `${folderPath}/${chain}.json`
  const errors: Array<string> = []
  const vaultsFile: { vaults: DefaultListVaults } = getJsonFile({
    chain,
    path,
  })
  const vaults = parse(DefaultListVaultsSchema, vaultsFile.vaults).map(
    (vault) => cleanVault({ vault }),
  )
  const tokensFile: { tokens: DefaultListTokens } = getJsonFile({
    chain,
    path: `src/tokens/${chain}.json`,
  })
  const tokens = parse(DefaultListTokensSchema, tokensFile.tokens).map(
    (token) => cleanToken({ token }),
  )

  const publicClient = createPublicClient({
    chain: supportedChains[chain],
    transport,
  })
  const slugs: Array<string> = []
  const beraRewardsVaults = new Set<string>()

  const promisedVaultDetails = vaults.map(
    async (vault) =>
      await validateVaultDetails({
        beraRewardsVaults,
        errors,
        publicClient,
        slugs,
        tokens,
        vault,
      }),
  )
  await Promise.all(promisedVaultDetails)
  await writeFile(path, formatDataToJson({ data: { vaults } }))
  outputScriptStatus({ chain, errors, type: 'Vaults' })
}

const validateVaults = async () => {
  const promises = readdirSync(folderPath).map(async (file) => {
    const chain = file.replace('.json', '').replace('-replaced', '')

    if (!isValidChain(chain)) {
      throw new Error(`Unsupported chain: ${chain}`)
    }
    await validateVaultsByChain({ chain })
  })

  await Promise.all(promises)
}

await validateVaults()
