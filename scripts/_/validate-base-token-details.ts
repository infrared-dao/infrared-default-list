import type { PublicClient } from 'viem'

import type { BaseTokenListSchema } from '@/types/base-token-list'

import { validateImage } from './validate-image'
import { validateSymbol } from './validate-symbol'

export const validateBaseTokenDetails = async ({
  errors,
  list,
  publicClient,
}: {
  errors: Array<string>
  list: BaseTokenListSchema
  publicClient: PublicClient
}) => {
  const baseTokens: BaseTokenListSchema['tokens'] = list.tokens

  for (const baseToken of baseTokens) {
    await validateSymbol({ errors, publicClient, token: baseToken })
    await validateImage({
      errors,
      item: baseToken,
      required: true,
      type: 'tokens',
    })
  }
}
