import { readdirSync } from 'node:fs'
import { parse } from 'valibot'

import {
  type DefaultListPolVaults,
  DefaultListPolVaultsSchema,
} from '@/schemas/pol-vaults-schema'

import { getJsonFile } from './_/get-json-file'
import { isValidChain } from './_/is-valid-chain'
import { sortPolVaults } from './_/sort-pol-vaults'

const folderPath = 'src/pol-vaults'

readdirSync(folderPath).forEach(async (file) => {
  const chain = file.replace('.json', '')

  if (!isValidChain(chain)) {
    throw new Error(`Unsupported chain: ${chain}`)
  }

  const path = `${folderPath}/${chain}.json`
  const polVaultsFile: { vaults: DefaultListPolVaults } = getJsonFile({
    chain,
    path,
  })
  const polVaults = parse(DefaultListPolVaultsSchema, polVaultsFile.vaults)

  await sortPolVaults({
    path,
    polVaults,
  })
})
