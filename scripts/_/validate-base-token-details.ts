import { type Address, erc20Abi, type PublicClient, zeroAddress } from 'viem'

import type { BaseTokenListSchema } from '@/types/base-token-list'

import { validateImage } from './validate-image'

const validateSymbol = async ({
  baseToken,
  errors,
  publicClient,
}: {
  baseToken: BaseTokenListSchema['tokens'][number]
  errors: Array<string>
  publicClient: PublicClient
}) => {
  if (baseToken.address === zeroAddress) {
    // BERA
    return
  }

  const symbol = await publicClient.readContract({
    abi: erc20Abi,
    address: baseToken.address as Address,
    functionName: 'symbol',
  })

  if (baseToken.symbol !== symbol) {
    errors.push(
      `${baseToken.name}’s symbol does not match the on-chain symbol ${symbol}.`,
    )
  }
}

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
    await validateSymbol({ baseToken, errors, publicClient })
    await validateImage({ errors, item: baseToken, type: 'tokens' })
  }
}
