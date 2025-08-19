import { readdirSync } from 'node:fs'
import { parse } from 'valibot'

import type { supportedChains } from '@/config/chains'
import {
  type DefaultListPolVault,
  type DefaultListPolVaults,
  DefaultListPolVaultsSchema,
} from '@/schemas/pol-vaults-schema'
import { DefaultListReplacesVaultsSchema } from '@/schemas/replaced-vaults-schema'

import { checkUniqueness } from './_/check-uniqueness'
import { cleanPolVault } from './_/clean-pol-vault'
import { getJsonFile } from './_/get-json-file'
import { isValidChain } from './_/is-valid-chain'
import { outputScriptStatus } from './_/output-script-status'

const folderPath = 'src/pol-vaults-replaced'

export const validateReplacedPolVault = async ({
  errors,
  polVaults,
  replacedPolVault,
  slugs,
}: {
  errors: Array<string>
  polVaults: Array<DefaultListPolVault>
  replacedPolVault: { originalSlug: string; slug: string }
  slugs: Set<string>
}) => {
  checkUniqueness({
    errors,
    fieldName: 'slug',
    set: slugs,
    value: replacedPolVault.slug,
  })
  const foundPolVault = polVaults.find(
    ({ slug }) => slug === replacedPolVault.originalSlug,
  )
  if (!foundPolVault) {
    errors.push(`No PoL vault found for ${replacedPolVault.slug}`)
  }
}

const validateReplacedPolVaultsByChain = async ({
  chain,
}: {
  chain: keyof typeof supportedChains
}) => {
  const path = `${folderPath}/${chain}.json`
  const errors: Array<string> = []
  const polVaultsFile: { vaults: DefaultListPolVaults } = getJsonFile({
    chain,
    path: `src/pol-vaults/${chain}.json`,
  })
  const polVaults = parse(DefaultListPolVaultsSchema, polVaultsFile.vaults).map(
    (polVault) => cleanPolVault({ polVault }),
  )
  const replacedPolVaultsFile: {
    vaults: { originalSlug: string; slug: string }
  } = getJsonFile({
    chain,
    path,
  })
  const replacedPolVaults = parse(
    DefaultListReplacesVaultsSchema,
    replacedPolVaultsFile.vaults,
  )

  const slugs = new Set<string>()

  const promisedPolVaultDetails = replacedPolVaults.map(
    async (replacedPolVault) =>
      await validateReplacedPolVault({
        errors,
        polVaults,
        replacedPolVault,
        slugs,
      }),
  )
  await Promise.all(promisedPolVaultDetails)
  outputScriptStatus({ chain, errors, type: 'PoL vaults' })
}

const validatePolVaultsReplaced = async () => {
  const promises = readdirSync(folderPath).map(async (file) => {
    const chain = file.replace('.json', '')

    if (!isValidChain(chain)) {
      throw new Error(`Unsupported chain: ${chain}`)
    }
    await validateReplacedPolVaultsByChain({ chain })
  })

  await Promise.all(promises)
}

await validatePolVaultsReplaced()
