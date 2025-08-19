import { readdirSync } from 'node:fs'
import { parse } from 'valibot'

import type { supportedChains } from '@/config/chains'
import {
  type DefaultListIVault,
  DefaultListIVaultsSchema,
} from '@/schemas/ivaults-schema'
import { DefaultListReplacesVaultsSchema } from '@/schemas/replaced-vaults-schema'

import { checkUniqueness } from './_/check-uniqueness'
import { cleanIVault } from './_/clean-ivault'
import { getJsonFile } from './_/get-json-file'
import { isValidChain } from './_/is-valid-chain'
import { outputScriptStatus } from './_/output-script-status'

const folderPath = 'src/ivaults-replaced'

export const validateReplacedIVault = async ({
  errors,
  iVaults,
  replacedIVault,
  slugs,
}: {
  errors: Array<string>
  iVaults: Array<DefaultListIVault>
  replacedIVault: { originalSlug: string; slug: string }
  slugs: Set<string>
}) => {
  checkUniqueness({
    errors,
    fieldName: 'slug',
    set: slugs,
    value: replacedIVault.slug,
  })
  const foundIVault = iVaults.find(
    ({ slug }) => slug === replacedIVault.originalSlug,
  )
  if (!foundIVault) {
    errors.push(`No iVault found for ${replacedIVault.slug}`)
  }
}

const validateReplacedIVaultsByChain = async ({
  chain,
}: {
  chain: keyof typeof supportedChains
}) => {
  const path = `${folderPath}/${chain}.json`
  const errors: Array<string> = []
  const iVaultsFile: { vaults: DefaultListIVault } = getJsonFile({
    chain,
    path: `src/ivaults/${chain}.json`,
  })
  const iVaults = parse(DefaultListIVaultsSchema, iVaultsFile.vaults).map(
    (iVault) => cleanIVault({ iVault }),
  )
  const replacedIVaultsFile: {
    vaults: { originalSlug: string; slug: string }
  } = getJsonFile({
    chain,
    path,
  })
  const replacedIVaults = parse(
    DefaultListReplacesVaultsSchema,
    replacedIVaultsFile.vaults,
  )

  const slugs = new Set<string>()

  const promisedIVaultDetails = replacedIVaults.map(
    async (replacedIVault) =>
      await validateReplacedIVault({
        errors,
        iVaults,
        replacedIVault,
        slugs,
      }),
  )
  await Promise.all(promisedIVaultDetails)
  outputScriptStatus({ chain, errors, type: 'iVaults' })
}

const validateIVaultsReplaced = async () => {
  const promises = readdirSync(folderPath).map(async (file) => {
    const chain = file.replace('.json', '')

    if (!isValidChain(chain)) {
      throw new Error(`Unsupported chain: ${chain}`)
    }
    await validateReplacedIVaultsByChain({ chain })
  })

  await Promise.all(promises)
}

await validateIVaultsReplaced()
