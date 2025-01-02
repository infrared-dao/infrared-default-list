import {
  type Address,
  createPublicClient,
  erc20Abi,
  fallback,
  http,
} from 'viem'
import { berachainTestnetbArtio } from 'viem/chains'

import type { GaugeListSchema } from '@/types/gauge-list'

import { delay } from './delay'

const RPC_REQUESTS_PER_SECOND = 10

const publicClient = createPublicClient({
  chain: berachainTestnetbArtio,
  transport: fallback([http()]),
})

const getVaultSymbol = async ({
  errors,
  underlyingToken,
}: {
  errors: Array<string>
  underlyingToken: string
}) => {
  const symbol = await publicClient.readContract({
    abi: erc20Abi,
    address: underlyingToken as Address,
    functionName: 'symbol',
  })
  if (!symbol) {
    errors.push(`${underlyingToken} does not have a symbol on the contract.`)
  }
  return symbol
}

export const validateGaugeNames = async ({
  errors,
  list,
}: {
  errors: Array<string>
  list: GaugeListSchema
}) => {
  const gauges: GaugeListSchema['gauges'] = list.gauges
  let rpcLookupCount = 0

  for (const gauge of gauges) {
    const symbols = await Promise.all(
      gauge.underlyingTokens.map(async (underlyingToken) => {
        rpcLookupCount += 1
        if (rpcLookupCount % RPC_REQUESTS_PER_SECOND === 0) {
          console.log('delay')
          await delay(1000)
        }
        return await getVaultSymbol({ errors, underlyingToken })
      }),
    )
    const name = symbols.join('-')

    if (gauge.name !== name) {
      errors.push(`${gauge.name} does not match ${name}.`)
    }
  }
}
