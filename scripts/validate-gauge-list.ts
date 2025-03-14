import { readdirSync } from 'node:fs'

import type { supportedChains } from '@/config/chains'
import type { GaugeListSchema } from '@/types/gauge-list'

import { getFile } from './_/get-file'
import { getListFile } from './_/get-list-file'
import { isValidNetwork } from './_/is-valid-network'
import { outputScriptStatus } from './_/output-script-status'
import { validateGaugeDetails } from './_/validate-gauge-details'
import { validateList } from './_/validate-list'

const schema = getFile('schema/gauge-list-schema.json')

const validateGaugeList = async ({
  network,
}: {
  network: keyof typeof supportedChains
}) => {
  const errors: Array<string> = []
  const list: GaugeListSchema = getListFile({
    listPath: `src/gauges/${network}.json`,
    network,
  })

  validateList({ errors, list, schema })
  validateGaugeDetails({ errors, list, network })
  outputScriptStatus({ errors, network, type: 'Gauge' })
}

readdirSync('src/gauges').forEach(async (file) => {
  const network = file.replace('.json', '')

  if (!isValidNetwork(network)) {
    throw new Error(`Unsupported network: ${network}`)
  }

  await validateGaugeList({
    network,
  })
})
