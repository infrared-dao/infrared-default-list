/* eslint-disable no-prototype-builtins */

/* eslint-disable no-nested-ternary */
import { writeFile } from 'node:fs/promises'

import type { TokensSchema } from '@/types/tokens'

import { formatDataToJson } from './format-data-to-json'

export const sortTokens = async ({
  path,
  tokens,
}: {
  path: string
  tokens: TokensSchema['tokens']
}) => {
  const sortedTokens = tokens.sort((a, b) =>
    a.hasOwnProperty('underlyingTokens')
      ? b.hasOwnProperty('underlyingTokens')
        ? 'protocol' in a && 'protocol' in b
          ? a.protocol.localeCompare(b.protocol) ||
            a.name.localeCompare(b.name) ||
            a.address.localeCompare(b.address)
          : 1 // we will never get here
        : 1
      : b.hasOwnProperty('underlyingTokens')
        ? -1
        : a.symbol.localeCompare(b.symbol),
  )

  await writeFile(path, formatDataToJson({ data: { tokens: sortedTokens } }))
}
