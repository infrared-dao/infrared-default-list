import slugify from 'slugify'

import type { supportedChains } from '@/config/chains'
import type { GaugeListSchema } from '@/types/gauge-list'
import type { ProtocolsSchema } from '@/types/protocols'
import type { TokenListSchema } from '@/types/token-list'

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
  const protocol = protocolsList.protocols.find(
    ({ id }) => id === gauge.protocol,
  )

  if (!protocol) {
    errors.push(`${gauge.slug} does not have a protocol for ${gauge.protocol}.`)
  }
}

const validateStakeTokenAndSlug = ({
  errors,
  gauge,
  tokensList,
}: {
  errors: Array<string>
  gauge: GaugeListSchema['gauges'][number]
  tokensList: TokenListSchema
}) => {
  const stakeToken = tokensList.tokens.find(
    ({ address }) => address === gauge.stakeTokenAddress,
  )

  if (!stakeToken) {
    errors.push(
      `${gauge.slug} does not have a token for ${gauge.stakeTokenAddress}.`,
    )
    return
  }

  const expectedSlug = `${slugify(gauge.protocol, { lower: true })}-${slugify(stakeToken.name, { lower: true })}`

  if (gauge.slug !== expectedSlug) {
    errors.push(`${gauge.slug}’s slug does not match ${expectedSlug}`)
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

  const tokensList: TokenListSchema = getListFile({
    listPath: `src/tokens/${network}.json`,
    network,
  })

  for (const gauge of gauges) {
    validateProtocol({ errors, gauge })
    validateStakeTokenAndSlug({ errors, gauge, tokensList })
  }
}
