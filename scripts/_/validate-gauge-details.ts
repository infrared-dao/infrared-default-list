import type { supportedChains } from '@/config/chains'
import type { BaseTokenListSchema } from '@/types/base-token-list'
import type { GaugeListSchema } from '@/types/gauge-list'
import type { ProtocolsSchema } from '@/types/protocols'

import { getFile } from './get-file'
import { getListFile } from './get-list-file'

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

const validateStakeToken = ({
  errors,
  gauge,
  tokensList,
}: {
  errors: Array<string>
  gauge: GaugeListSchema['gauges'][number]
  tokensList: BaseTokenListSchema
}) => {
  const matchingToken = tokensList.tokens.find(
    ({ address }) => address === gauge.stakeTokenAddress,
  )

  if (!matchingToken) {
    errors.push(
      `${gauge.name} does not have a token for ${gauge.stakeTokenAddress}.`,
    )
  }
}

export const validateGaugeDetails = ({
  errors,
  list,
  network,
}: {
  errors: Array<string>
  list: GaugeListSchema
  network: keyof typeof supportedChains
}) => {
  const gauges: GaugeListSchema['gauges'] = list.gauges

  const tokensList: BaseTokenListSchema = getListFile({
    listPath: `src/tokens/${network}.json`,
    network,
  })

  for (const gauge of gauges) {
    validateProtocol({ errors, gauge })
    validateStakeToken({ errors, gauge, tokensList })
  }
}
