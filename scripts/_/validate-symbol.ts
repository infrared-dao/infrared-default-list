import type { Address, PublicClient } from 'viem'

import type { TokensSchema } from '@/types/tokens'

import { getTokenSymbol } from './get-token-symbol'

export const validateSymbol = async ({
  errors,
  publicClient,
  token,
}: {
  errors: Array<string>
  publicClient: PublicClient
  token: TokensSchema['tokens'][number]
}) => {
  if (token.symbol === '') {
    errors.push(`Missing symbol for ${token.address}.`)
    return
  }

  const symbol = await getTokenSymbol({
    errors,
    publicClient,
    tokenAddress: token.address as Address,
  })

  if (token.symbol !== symbol) {
    errors.push(
      `${token.symbol}’s symbol does not match the on-chain symbol ${symbol}.`,
    )
  }
}
