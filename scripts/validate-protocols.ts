import { getFile } from './_/get-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'
import { validateProtocolImages } from './_/validate-protocol-images'

const schema = getFile('schema/protocols-schema.json')
const path = 'src/protocols.json'
const protocols = getFile(path)

const validateProtocols = async () => {
  const errors: Array<string> = []

  const protocolIds = new Set<string>()

  validateList({ errors, list: protocols, schema, type: 'protocols' })
  for (const protocol of protocols.protocols) {
    if (protocolIds.has(protocol.id)) {
      errors.push(
        `Error in protocols: Duplicate protocol ID found: ${protocol.id}`,
      )
    }
    protocolIds.add(protocol.id)
    await validateProtocolImages({
      errors,
      protocol,
      type: 'protocols',
    })
  }
  outputScriptStatus({ errors, type: 'Protocols' })
}

validateProtocols()
