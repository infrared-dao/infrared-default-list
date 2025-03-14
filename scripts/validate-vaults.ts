import { readdirSync } from 'node:fs'

import type { supportedChains } from '@/config/chains'
import type { VaultsSchema } from '@/types/vaults'

import { getFile } from './_/get-file'
import { getJsonFile } from './_/get-json-file'
import { isValidNetwork } from './_/is-valid-network'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'
import { validateVaultDetails } from './_/validate-vault-details'

const schema = getFile('schema/vaults-schema.json')

const validateVaults = async ({
  network,
}: {
  network: keyof typeof supportedChains
}) => {
  const errors: Array<string> = []
  const vaults: VaultsSchema = getJsonFile({
    network,
    path: `src/vaults/${network}.json`,
  })

  validateList({ errors, list: vaults, schema, type: 'vault' })
  validateVaultDetails({ errors, network, vaults: vaults.vaults })
  outputScriptStatus({ errors, network, type: 'Vault' })
}

readdirSync('src/vaults').forEach(async (file) => {
  const network = file.replace('.json', '')

  if (!isValidNetwork(network)) {
    throw new Error(`Unsupported network: ${network}`)
  }

  await validateVaults({
    network,
  })
})
