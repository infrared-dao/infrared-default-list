import type { DefaultListToken } from '@/schemas/tokens-schema'

import { lowercaseAddress } from './lowercase-address'

export const cleanToken = ({
  token,
}: {
  token: DefaultListToken
}): DefaultListToken => ({
  ...token,
  address: lowercaseAddress(token.address),
  ...('mintUrl' in token && token.mintUrl
    ? {
        mintUrl: token.mintUrl.toLowerCase(),
      }
    : {}),
  ...('underlyingTokens' in token && !!token.underlyingTokens
    ? {
        underlyingTokens: token.underlyingTokens.map((underlyingToken) =>
          lowercaseAddress(underlyingToken),
        ),
      }
    : {}),
})
