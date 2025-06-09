import { readdirSync } from 'node:fs'
import { parse } from 'valibot'

import {
  type DefaultListVaults,
  DefaultListVaultsSchema,
} from '@/schemas/vaults-schema'

import { getJsonFile } from './_/get-json-file'
import { isValidChain } from './_/is-valid-chain'
import { sortVaults } from './_/sort-vaults'

const folderPath = 'src/vaults'

readdirSync(folderPath).forEach(async (file) => {
  const chain = file.replace('.json', '').replace('-replaced', '')

  if (!isValidChain(chain)) {
    throw new Error(`Unsupported chain: ${chain}`)
  }

  const path = `${folderPath}/${chain}.json`
  const vaultsFile: { vaults: DefaultListVaults } = getJsonFile({
    chain,
    path,
  })
  const vaults = parse(DefaultListVaultsSchema, vaultsFile.vaults)

  await sortVaults({
    path,
    vaults,
  })
})
