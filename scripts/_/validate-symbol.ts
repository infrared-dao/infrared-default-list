import { type Address, erc20Abi, type PublicClient, zeroAddress } from 'viem'

import type { BaseTokenListSchema } from '@/types/base-token-list'
import type { TokenListSchema } from '@/types/token-list'

export const validateSymbol = async ({
  errors,
  publicClient,
  token,
}: {
  errors: Array<string>
  publicClient: PublicClient
  token:
    | BaseTokenListSchema['tokens'][number]
    | TokenListSchema['tokens'][number]
}) => {
  if (token.address === zeroAddress) {
    // BERA
    return
  }
  if (token.symbol === '') {
    errors.push(`Missing symbol for ${token.address}.`)
    return
  }

  const symbol = await publicClient.readContract({
    abi: erc20Abi,
    address: token.address as Address,
    functionName: 'symbol',
  })

  if (token.symbol !== symbol) {
    errors.push(
      `${token.symbol}’s symbol does not match the on-chain symbol ${symbol}.`,
    )
  }
}
