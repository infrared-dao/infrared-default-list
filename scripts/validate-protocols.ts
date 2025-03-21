import { getFile } from './_/get-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateList } from './_/validate-list'
import { validateProtocolImages } from './_/validate-protocol-images'

const schema = getFile('schema/protocols-schema.json')
const protocols = getFile('src/protocols.json')

const validateProtocols = async () => {
  const errors: Array<string> = []

  validateList({ errors, list: protocols, schema, type: 'protocols' })
  await validateProtocolImages({
    errors,
    listItem: protocols.protocols,
    type: 'protocols',
  })
  outputScriptStatus({ errors, type: 'Protocols' })
}

validateProtocols()
