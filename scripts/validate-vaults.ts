import { readdirSync } from 'node:fs'
import { createPublicClient, http } from 'viem'

import { supportedChains } from '@/config/chains'
import type { VaultsSchema } from '@/types/vaults'

import { getFile } from './_/get-file'
import { getJsonFile } from './_/get-json-file'
import { isValidNetwork } from './_/is-valid-network'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'
import { validateVaultDetails } from './_/validate-vault-details'

const schema = getFile('schema/vaults-schema.json')
const folderPath = 'src/vaults'

const validateVaults = async ({
  network,
}: {
  network: keyof typeof supportedChains
}) => {
  const errors: Array<string> = []
  const path = `${folderPath}/${network}.json`
  const vaults: VaultsSchema = getJsonFile({
    network,
    path,
  })

  const chain = supportedChains[network]
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  validateList({ errors, list: vaults, schema, type: 'vaults' })
  validateVaultDetails({ errors, network, publicClient, vaults: vaults.vaults })

  outputScriptStatus({ errors, network, type: 'Vaults' })
}

readdirSync(folderPath).forEach(async (file) => {
  const network = file.replace('.json', '')

  if (!isValidNetwork(network)) {
    throw new Error(`Unsupported network: ${network}`)
  }

  await validateVaults({
    network,
  })
})
