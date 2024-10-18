import { readdirSync } from 'node:fs'

import type { GaugeListSchema } from '../src/types/gauge-list'
import { getListFile } from './_/get-list-file'
import { getSchemaFile } from './_/get-schema-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateImages } from './_/validate-images'
import { validateList } from './_/validate-list'

const schema = getSchemaFile('schema/gauge-list-schema.json')

const validateGaugeList = async ({ network }: { network: string }) => {
  const errors: Array<string> = []
  const list: GaugeListSchema = getListFile({
    listPath: `src/gauges/${network}/defaultGaugeList.json`,
    network,
  })

  validateList({ errors, list, schema })
  await validateImages({ errors, listItem: list.protocols, type: 'protocols' })
  outputScriptStatus({ errors, network, type: 'Gauge' })
}

readdirSync('src/gauges').forEach(async (network) => {
  await validateGaugeList({ network })
})
