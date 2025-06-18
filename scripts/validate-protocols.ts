import { parse } from 'valibot'

import {
  type DefaultListProtocols,
  DefaultListProtocolsSchema,
} from '@/schemas/protocols-schema'

import { getJsonFile } from './_/get-json-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateProtocolDetails } from './_/validate-protocol-details'

const path = 'src/protocols.json'
const protocolsFile: { protocols: DefaultListProtocols } = getJsonFile({ path })

const validateProtocols = async () => {
  const errors: Array<string> = []
  const protocolIds = new Set<string>()
  const protocolNames = new Set<string>()
  const protocolUrls = new Set<string>()

  const protocols = parse(DefaultListProtocolsSchema, protocolsFile.protocols)
  const promisedProtocolDetails = protocols.map(async (protocol) => {
    await validateProtocolDetails({
      errors,
      protocol,
      protocolIds,
      protocolNames,
      protocolUrls,
    })
  })
  await Promise.all(promisedProtocolDetails)
  outputScriptStatus({ errors, type: 'Protocols' })
}

await validateProtocols()
