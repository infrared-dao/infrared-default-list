import { readdirSync } from 'node:fs'

import type { GaugeListSchema } from '@/types/gauge-list'

import { getFile } from './_/get-file'
import { getListFile } from './_/get-list-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateGaugeNames } from './_/validate-gauge-names'
import { validateList } from './_/validate-list'

const schema = getFile('schema/gauge-list-schema.json')

const validateGaugeList = async ({ network }: { network: string }) => {
  const errors: Array<string> = []
  const list: GaugeListSchema = getListFile({
    listPath: `src/gauges/${network}.json`,
    network,
  })

  validateList({ errors, list, schema })
  await validateGaugeNames({ errors, list })
  outputScriptStatus({ errors, network, type: 'Gauge' })
}

readdirSync('src/gauges').forEach(async (network) => {
  await validateGaugeList({ network: network.replace('.json', '') })
})
