import { type Address, type PublicClient, zeroAddress } from 'viem'

import type { supportedChains } from '@/config/chains'
import type { BaseTokenListSchema } from '@/types/base-token-list'
import type { GaugeListSchema } from '@/types/gauge-list'
import type { ProtocolsSchema } from '@/types/protocols'

import { delay } from './delay'
import { getFile } from './get-file'
import { getListFile } from './get-list-file'
import { getTokenSymbol } from './get-token-symbol'

const RPC_REQUESTS_PER_SECOND = 10
const ONE_SECOND = 1000

interface Counter {
  value: number
}

const validateName = async ({
  errors,
  gauge,
  publicClient,
  rpcLookupCount,
}: {
  errors: Array<string>
  gauge: GaugeListSchema['gauges'][number]
  publicClient: PublicClient
  rpcLookupCount: Counter
}) => {
  const symbols = await Promise.all(
    gauge.underlyingTokens.map(async (underlyingToken) => {
      rpcLookupCount.value += 1
      if (rpcLookupCount.value % RPC_REQUESTS_PER_SECOND === 0) {
        await delay(ONE_SECOND)
      }
      return await getTokenSymbol({
        errors,
        publicClient,
        token: underlyingToken as Address,
      })
    }),
  )
  const underlyingTokenSymbols = symbols.join('-')

  if (gauge.name !== underlyingTokenSymbols) {
    rpcLookupCount.value += 1
    if (rpcLookupCount.value % RPC_REQUESTS_PER_SECOND === 0) {
      await delay(ONE_SECOND)
    }
    const lpTokenSymbol = await getTokenSymbol({
      errors,
      publicClient,
      token: gauge.lpTokenAddress as Address,
    })

    if (gauge.name !== lpTokenSymbol) {
      errors.push(
        `${gauge.name} does not match ${lpTokenSymbol} or ${underlyingTokenSymbols}.`,
      )
    }
  }
}

const protocolsList: ProtocolsSchema = getFile('src/protocols.json')

const validateProtocol = ({
  errors,
  gauge,
}: {
  errors: Array<string>
  gauge: GaugeListSchema['gauges'][number]
}) => {
  const matchingProtocol = protocolsList.protocols.find(
    ({ id }) => id === gauge.protocol,
  )

  if (!matchingProtocol) {
    errors.push(`${gauge.name} does not have a protocol for ${gauge.protocol}.`)
  }
}

const validateToken = ({
  errors,
  gauge,
  tokensList,
}: {
  errors: Array<string>
  gauge: GaugeListSchema['gauges'][number]
  tokensList: BaseTokenListSchema
}) => {
  for (const underlyingToken of gauge.underlyingTokens) {
    if (underlyingToken === zeroAddress) {
      errors.push(`${zeroAddress} is not a valid underlying token.`)
    } else {
      const matchingToken = tokensList.tokens.find(
        ({ address }) => address === underlyingToken,
      )
      if (!matchingToken) {
        errors.push(
          `${gauge.name} does not have a token for ${underlyingToken}.`,
        )
      }
    }
  }
}

export const validateGaugeDetails = async ({
  errors,
  list,
  network,
  publicClient,
}: {
  errors: Array<string>
  list: GaugeListSchema
  network: keyof typeof supportedChains
  publicClient: PublicClient
}) => {
  const gauges: GaugeListSchema['gauges'] = list.gauges
  const rpcLookupCount = { value: 0 }

  const tokensList: BaseTokenListSchema = getListFile({
    listPath: `src/tokens/${network}.json`,
    network,
  })

  for (const gauge of gauges) {
    await validateName({ errors, gauge, publicClient, rpcLookupCount })
    validateProtocol({ errors, gauge })
    validateToken({ errors, gauge, tokensList })
  }
}
