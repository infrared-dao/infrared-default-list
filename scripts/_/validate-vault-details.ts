import slug from 'slug'
import type { PublicClient } from 'viem'

import type { supportedChains } from '@/config/chains'
import type { TokensSchema } from '@/types/tokens'
import type { VaultsSchema } from '@/types/vaults'

import { getJsonFile } from './get-json-file'
import { validateBeraRewardsVault } from './validate-bera-rewards-vault'

slug.charmap['.'] = '.' // allow periods in urls. They are valid
slug.charmap['₮'] = '₮' // allow some unicode characters

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

  if (!('protocol' in stakeToken)) {
    errors.push(
      `${stakeToken.name} does not have a protocol (vault validation)`,
    )
    return
  }

  const expectedSlug = `${slug(stakeToken.protocol)}-${slug(stakeToken.name)}`

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
      `Slug "${vault.slug}" is not unique. Vault slugs must be unique`,
    )
  }
  slugs.push(vault.slug)
}

export const validateVaultDetails = ({
  errors,
  network,
  publicClient,
  vaults,
}: {
  errors: Array<string>
  network: keyof typeof supportedChains
  publicClient: PublicClient
  vaults: VaultsSchema['vaults']
}) => {
  const tokens: TokensSchema = getJsonFile({
    network,
    path: `src/tokens/${network}.json`,
  })
  const slugs: Array<string> = []

  for (const vault of vaults) {
    validateStakeTokenAndSlug({ errors, slugs, tokens, vault })
    validateBeraRewardsVault({
      errors,
      publicClient,
      vault,
    })
  }
}
