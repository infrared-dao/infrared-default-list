import { type Address, erc20Abi, type PublicClient, zeroAddress } from 'viem'

const BERA_DECIMALS = 18

export const getTokenDecimals = async ({
  errors,
  publicClient,
  tokenAddress,
}: {
  errors: Array<string>
  publicClient: PublicClient
  tokenAddress: Address
}) => {
  if (tokenAddress === zeroAddress) {
    return BERA_DECIMALS // hack for BERA
  }

  const symbol = await publicClient.readContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'decimals',
  })
  if (!symbol) {
    errors.push(`${tokenAddress} does not have decimals on the contract.`)
  }
  return symbol
}
