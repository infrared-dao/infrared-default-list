import type { Address, PublicClient } from 'viem'

import type { TokensSchema } from '@/types/tokens'

import { delay } from './delay'
import { getTokenSymbol } from './get-token-symbol'
import { validateDecimals } from './validate-decimals'
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
  token: TokensSchema['tokens'][number]
}) => {
  const tokenSymbol = await getTokenSymbol({
    errors,
    publicClient,
    tokenAddress: token.address as Address,
  })

  if (token.name !== tokenSymbol && 'underlyingTokens' in token) {
    const symbols = await Promise.all(
      token.underlyingTokens.map(async (underlyingToken) => {
        rpcLookupCount.value += 1
        if (rpcLookupCount.value % RPC_REQUESTS_PER_SECOND === 0) {
          await delay(ONE_SECOND)
        }
        return await getTokenSymbol({
          errors,
          publicClient,
          tokenAddress: underlyingToken as Address,
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
        `${token.name} does not match ${tokenSymbol} or ${underlyingTokenSymbols}.`,
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
  list: TokensSchema
  publicClient: PublicClient
}) => {
  const tokens: TokensSchema['tokens'] = list.tokens
  const rpcLookupCount = { value: 0 }

  for (const token of tokens) {
    await validateName({ errors, publicClient, rpcLookupCount, token })
    await validateSymbol({ errors, publicClient, token })
    await validateDecimals({ errors, publicClient, token })
    await validateImage({
      errors,
      item: token,
      required: false,
      type: 'tokens',
    })
  }
}
