import slug from 'slug'
import { type Address, isAddressEqual, type PublicClient } from 'viem'

import type { DefaultListTokens } from '@/schemas/tokens-schema'
import type { DefaultListVault } from '@/schemas/vaults-schema'

import { checkUniqueness } from './check-uniqueness'
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
  tokens: DefaultListTokens
  vault: DefaultListVault
}) => {
  const stakeToken = tokens.find(({ address }) =>
    isAddressEqual(address as Address, vault.depositTokenAddress as Address),
  )

  if (!stakeToken) {
    errors.push(
      `${vault.slug} does not have a token for ${vault.depositTokenAddress}`,
    )
    return
  }

  if (!('protocol' in stakeToken) || !stakeToken.protocol) {
    errors.push(
      `${stakeToken.name} does not have a protocol (vault validation)`,
    )
    return
  }

  const cleanStakeTokenName = stakeToken.name
    .replace(/\s|_|\//g, '-')
    .toLowerCase()

  const expectedSlugs = [
    cleanStakeTokenName,
    `${slug(stakeToken.protocol)}-${slug(cleanStakeTokenName)}`,
  ]

  if (!expectedSlugs.includes(vault.slug)) {
    if (slugs.some((slug) => expectedSlugs.includes(slug))) {
      if (
        !expectedSlugs.some((expectedSlug) =>
          vault.slug.startsWith(expectedSlug),
        )
      ) {
        errors.push(
          `${vault.slug}’s slug does not start with ${expectedSlugs.join(' or ')}`,
        )
      }
    } else {
      errors.push(
        `${vault.slug}’s slug does not match ${expectedSlugs.join(' or ')}`,
      )
    }
  }

  if (slugs.includes(vault.slug)) {
    errors.push(
      `Duplicate slug found: ${vault.slug}. Vault slugs must be unique.`,
    )
  }
  slugs.push(vault.slug)
}

export const validateVaultDetails = async ({
  beraRewardsVaults,
  errors,
  publicClient,
  slugs,
  tokens,
  vault,
}: {
  beraRewardsVaults: Set<string>
  errors: Array<string>
  publicClient: PublicClient
  slugs: Array<string>
  tokens: DefaultListTokens
  vault: DefaultListVault
}) => {
  checkUniqueness({
    errors,
    fieldName: 'beraRewardsVault',
    set: beraRewardsVaults,
    value: vault.beraRewardsVault,
  })

  validateStakeTokenAndSlug({ errors, slugs, tokens, vault })
  await validateBeraRewardsVault({
    errors,
    publicClient,
    vault,
  })
}
