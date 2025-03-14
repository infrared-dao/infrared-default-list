import type { Address, PublicClient } from 'viem'

import type { TokenListSchema } from '@/types/token-list'

import { delay } from './delay'
import { getTokenSymbol } from './get-token-symbol'
import { validateImage } from './validate-image'
import { validateSymbol } from './validate-symbol'

const RPC_REQUESTS_PER_SECOND = 10
const ONE_SECOND = 1000

interface Counter {
  value: number
}

const validateName = async ({
  errors,
  publicClient,
  rpcLookupCount,
  token,
}: {
  errors: Array<string>
  publicClient: PublicClient
  rpcLookupCount: Counter
  token: TokenListSchema['tokens'][number]
}) => {
  const lpTokenSymbol = await getTokenSymbol({
    errors,
    publicClient,
    token: token.address as Address,
  })

  if (token.name !== lpTokenSymbol) {
    const symbols = await Promise.all(
      token.underlyingTokens.map(async (underlyingToken) => {
        rpcLookupCount.value += 1
        if (rpcLookupCount.value % RPC_REQUESTS_PER_SECOND === 0) {
          await delay(ONE_SECOND)
        }
        return await getTokenSymbol({
          errors,
          publicClient,
          token: underlyingToken as Address,
        })
      }),
    )
    const underlyingTokenSymbols = symbols.join('-')

    if (token.name !== underlyingTokenSymbols) {
      rpcLookupCount.value += 1
      if (rpcLookupCount.value % RPC_REQUESTS_PER_SECOND === 0) {
        await delay(ONE_SECOND)
      }

      errors.push(
        `${token.name} does not match ${lpTokenSymbol} or ${underlyingTokenSymbols}.`,
      )
    }
  }
}

export const validateTokenDetails = async ({
  errors,
  list,
  publicClient,
}: {
  errors: Array<string>
  list: TokenListSchema
  publicClient: PublicClient
}) => {
  const tokens: TokenListSchema['tokens'] = list.tokens
  const rpcLookupCount = { value: 0 }

  for (const token of tokens) {
    await validateName({ errors, publicClient, rpcLookupCount, token })
    await validateSymbol({ errors, publicClient, token })
    await validateImage({
      errors,
      item: token,
      required: false,
      type: 'tokens',
    })
  }
}
