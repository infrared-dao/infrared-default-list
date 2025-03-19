import { type Address, erc20Abi, type PublicClient } from 'viem'

export const getTokenSymbol = async ({
  errors,
  publicClient,
  tokenAddress,
}: {
  errors: Array<string>
  publicClient: PublicClient
  tokenAddress: Address
}) => {
  if (tokenAddress === '0x0000000000000000000000000000000000000000') {
    return 'BERA' // hack for BERA
  }

  const symbol = await publicClient.readContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'symbol',
  })
  if (!symbol) {
    errors.push(`${tokenAddress} does not have a symbol on the contract.`)
  }
  return symbol
}
