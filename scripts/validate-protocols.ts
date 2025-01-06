import { getFile } from './_/get-file'
import { outputScriptStatus } from './_/output-script-status'
import { validateImages } from './_/validate-images'
import { validateList } from './_/validate-list'

const schema = getFile('schema/protocols-schema.json')
const protocols = getFile('src/protocols.json')

const validateProtocols = async () => {
  const errors: Array<string> = []

  validateList({ errors, list: protocols, schema })
  await validateImages({
    errors,
    listItem: protocols.protocols,
    type: 'protocols',
  })
  outputScriptStatus({ errors, type: 'Protocols' })
}

validateProtocols()
