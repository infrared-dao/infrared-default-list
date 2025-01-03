import type { Address } from 'viem'

import type { GaugeListSchema } from '@/types/gauge-list'

import { delay } from './delay'
import { getTokenSymbol } from './get-token-symbol'

const RPC_REQUESTS_PER_SECOND = 10
const ONE_SECOND = 1000

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
          await delay(ONE_SECOND)
        }
        return await getTokenSymbol({
          errors,
          token: underlyingToken as Address,
        })
      }),
    )
    const name = symbols.join('-')

    if (gauge.name !== name) {
      errors.push(`${gauge.name} does not match ${name}.`)
    }
  }
}
