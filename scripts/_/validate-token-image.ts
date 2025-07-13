import type { DefaultListToken } from '@/schemas/tokens-schema'

import {
  IMAGE_SIZE,
  IMAGE_WIDTH_2_TOKENS,
  IMAGE_WIDTH_3_TOKENS,
  IMAGE_WIDTH_4_TOKENS,
} from './constants'
import { validateImage } from './validate-image'

const getExpectedWidth = ({ token }: { token: DefaultListToken }) => {
  if (
    'underlyingTokens' in token &&
    !!token.underlyingTokens &&
    !token.imageNotFromUnderlying
  ) {
    // eslint-disable-next-line no-magic-numbers
    if (token.underlyingTokens.length === 2) {
      return IMAGE_WIDTH_2_TOKENS
    }
    // eslint-disable-next-line no-magic-numbers
    if (token.underlyingTokens.length === 3) {
      return IMAGE_WIDTH_3_TOKENS
    }
    // eslint-disable-next-line no-magic-numbers
    if (token.underlyingTokens.length === 4) {
      return IMAGE_WIDTH_4_TOKENS
    }
  }
  return IMAGE_SIZE
}

export const validateTokenImage = async ({
  errors,
  token,
}: {
  errors: Array<string>
  token: DefaultListToken
}) => {
  const hasUnderlyingTokens =
    'underlyingTokens' in token && !!token.underlyingTokens
  const customWidth = 'imageCustomWidth' in token && !!token.imageCustomWidth

  return validateImage({
    customWidth,
    errors,
    folder: 'tokens',
    height: IMAGE_SIZE,
    identifier: token.symbol,
    identifier2: token.name,
    image: token.image,
    required:
      !hasUnderlyingTokens ||
      (hasUnderlyingTokens && token.underlyingTokens?.length === 1),
    type: 'Token',
    width: getExpectedWidth({ token }),
  })
}
