import { readdirSync } from 'node:fs'
import { parse } from 'valibot'

import {
  type DefaultListIVaults,
  DefaultListIVaultsSchema,
} from '@/schemas/ivaults-schema'

import { getJsonFile } from './_/get-json-file'
import { isValidChain } from './_/is-valid-chain'
import { sortVaults } from './_/sort-vaults'

const folderPath = 'src/ivaults'

readdirSync(folderPath).forEach(async (file) => {
  const chain = file.replace('.json', '')

  if (!isValidChain(chain)) {
    throw new Error(`Unsupported chain: ${chain}`)
  }

  const path = `${folderPath}/${chain}.json`
  const iVaultsFile: { vaults: DefaultListIVaults } = getJsonFile({
    chain,
    path,
  })
  const iVaults = parse(DefaultListIVaultsSchema, iVaultsFile.vaults)

  await sortVaults({
    path,
    vaults: iVaults,
  })
})
