import type { DefaultListProtocol } from '@/schemas/protocols-schema'

import { checkUniqueness } from './check-uniqueness'
import { validateProtocolImages } from './validate-protocol-images'

export const validateProtocolDetails = async ({
  errors,
  protocol,
  protocolIds,
  protocolNames,
  protocolUrls,
}: {
  errors: Array<string>
  protocol: DefaultListProtocol
  protocolIds: Set<string>
  protocolNames: Set<string>
  protocolUrls: Set<string>
}) => {
  checkUniqueness({
    errors,
    fieldName: 'id',
    set: protocolIds,
    value: protocol.id,
  })
  checkUniqueness({
    errors,
    fieldName: 'name',
    set: protocolNames,
    value: protocol.name,
  })
  checkUniqueness({
    errors,
    fieldName: 'url',
    set: protocolUrls,
    value: protocol.url,
  })

  await validateProtocolImages({
    errors,
    protocol,
  })
}
