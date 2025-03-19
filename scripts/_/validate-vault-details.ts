import slugify from 'slugify'

import type { supportedChains } from '@/config/chains'
import type { ProtocolsSchema } from '@/types/protocols'
import type { TokensSchema } from '@/types/tokens'
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
  slugs,
  tokens,
  vault,
}: {
  errors: Array<string>
  slugs: Array<string>
  tokens: TokensSchema
  vault: VaultsSchema['vaults'][number]
}) => {
  const stakeToken = tokens.tokens.find(
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
    if (slugs.includes(expectedSlug)) {
      if (!vault.slug.startsWith(expectedSlug)) {
        errors.push(`${vault.slug}’s slug does not start with ${expectedSlug}`)
      }
    } else {
      errors.push(`${vault.slug}’s slug does not match ${expectedSlug}`)
    }
  }

  if (slugs.includes(vault.slug)) {
    errors.push(
      `Slug "${vault.slug}" is not unique. Vault slugs must be unique.`,
    )
  }
  slugs.push(vault.slug)
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
  const tokens: TokensSchema = getListFile({
    listPath: `src/tokens/${network}.json`,
    network,
  })
  const slugs: string[] = []

  for (const vault of vaults) {
    validateProtocol({ errors, vault })
    validateStakeTokenAndSlug({ errors, slugs, tokens, vault })
  }
}
