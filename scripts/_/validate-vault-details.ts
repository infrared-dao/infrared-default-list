import slugify from 'slugify'

import type { supportedChains } from '@/config/chains'
import type { ProtocolsSchema } from '@/types/protocols'
import type { TokenListSchema } from '@/types/token-list'
import type { VaultsSchema } from '@/types/vaults'

import { getFile } from './get-file'
import { getListFile } from './get-list-file'

const protocolsList: ProtocolsSchema = getFile('src/protocols.json')

const validateProtocol = ({
  errors,
  vault,
}: {
  errors: Array<string>
  vault: VaultsSchema['vaults'][number]
}) => {
  const protocol = protocolsList.protocols.find(
    ({ id }) => id === vault.protocol,
  )

  if (!protocol) {
    errors.push(`${vault.slug} does not have a protocol for ${vault.protocol}.`)
  }
}

const validateStakeTokenAndSlug = ({
  errors,
  tokensList,
  vault,
}: {
  errors: Array<string>
  tokensList: TokenListSchema
  vault: VaultsSchema['vaults'][number]
}) => {
  const stakeToken = tokensList.tokens.find(
    ({ address }) => address === vault.stakeTokenAddress,
  )

  if (!stakeToken) {
    errors.push(
      `${vault.slug} does not have a token for ${vault.stakeTokenAddress}`,
    )
    return
  }

  const expectedSlug = `${slugify(vault.protocol, { lower: true })}-${slugify(stakeToken.name, { lower: true })}`

  if (vault.slug !== expectedSlug) {
    errors.push(`${vault.slug}’s slug does not match ${expectedSlug}`)
  }
}

export const validateVaultDetails = ({
  errors,
  list,
  network,
}: {
  errors: Array<string>
  list: VaultsSchema
  network: keyof typeof supportedChains
}) => {
  const vaults: VaultsSchema['vaults'] = list.vaults

  const tokensList: TokenListSchema = getListFile({
    listPath: `src/tokens/${network}.json`,
    network,
  })

  for (const vault of vaults) {
    validateProtocol({ errors, vault })
    validateStakeTokenAndSlug({ errors, tokensList, vault })
  }
}
