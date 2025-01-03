import { type Address, createPublicClient, erc20Abi, http } from 'viem'
import { berachainTestnetbArtio } from 'viem/chains'

const publicClient = createPublicClient({
  chain: berachainTestnetbArtio,
  transport: http(),
})

export const getTokenSymbol = async ({
  errors,
  token,
}: {
  errors: Array<string>
  token: Address
}) => {
  const symbol = await publicClient.readContract({
    abi: erc20Abi,
    address: token,
    functionName: 'symbol',
  })
  if (!symbol) {
    errors.push(`${token} does not have a symbol on the contract.`)
  }
  return symbol
}
