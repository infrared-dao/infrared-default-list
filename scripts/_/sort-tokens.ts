import { writeFile } from 'node:fs/promises'

import type { DefaultListTokens } from '@/schemas/tokens-schema'

import { formatDataToJson } from './format-data-to-json'

export const sortTokens = async ({
  path,
  tokens,
}: {
  path: string
  tokens: DefaultListTokens
}) => {
  const sortedTokens = tokens.sort((a, b) => {
    if (Object.prototype.hasOwnProperty.call(a, 'underlyingTokens')) {
      if (Object.prototype.hasOwnProperty.call(b, 'underlyingTokens')) {
        if ('protocol' in a && a.protocol && 'protocol' in b && b.protocol) {
          return (
            a.protocol.localeCompare(b.protocol) ||
            a.name.localeCompare(b.name) ||
            a.address.localeCompare(b.address)
          )
        }
        return 1 // we will never get here
      }
      return 1
    }

    if (Object.prototype.hasOwnProperty.call(b, 'underlyingTokens')) {
      return -1
    }

    return a.symbol.localeCompare(b.symbol)
  })

  await writeFile(path, formatDataToJson({ data: { tokens: sortedTokens } }))
}
