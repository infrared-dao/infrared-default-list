import {
  type Address,
  createPublicClient,
  erc20Abi,
  fallback,
  http,
} from 'viem'
import { berachainTestnetbArtio } from 'viem/chains'

import type { GaugeListSchema } from '@/types/gauge-list'

export const validateGaugeNames = async ({
  errors,
  list,
}: {
  errors: Array<string>
  list: GaugeListSchema
}) => {
  const publicClient = createPublicClient({
    chain: berachainTestnetbArtio,
    transport: fallback([
      http(
        `https://${process.env.QUIKNODE_SUBDOMAIN}.bera-bartio.quiknode.pro/${process.env.QUIKNODE_KEY}`,
      ),
      http(),
    ]),
  })
  const gauges: GaugeListSchema['gauges'] = list.gauges

  await Promise.all(
    gauges.map(async (gauge) => {
      const symbols = await Promise.all(
        gauge.underlyingTokens.map(async (underlyingToken) => {
          const symbol = await publicClient.readContract({
            abi: erc20Abi,
            address: underlyingToken as Address,
            functionName: 'symbol',
          })
          if (!symbol) {
            errors.push(
              `${underlyingToken} does not have a symbol on the contract.`,
            )
          }

          return symbol
        }),
      )
      const name = symbols.join('-')

      if (gauge.name !== name) {
        errors.push(`${gauge.name} does not match ${name}.`)
      }
    }),
  )
}
