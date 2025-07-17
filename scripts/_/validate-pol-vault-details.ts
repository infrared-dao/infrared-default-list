import slug from 'slug'
import { type Address, isAddressEqual, type PublicClient } from 'viem'

import type { DefaultListPolVault } from '@/schemas/pol-vaults-schema'
import type { DefaultListTokens } from '@/schemas/tokens-schema'

import { checkUniqueness } from './check-uniqueness'
import { validateBeraRewardVault } from './validate-bera-reward-vault'

slug.charmap['.'] = '.' // allow periods in urls. They are valid
slug.charmap['₮'] = '₮' // allow some unicode characters

const validateStakeTokenAndSlug = ({
  errors,
  polVault,
  slugs,
  tokens,
}: {
  errors: Array<string>
  polVault: DefaultListPolVault
  slugs: Array<string>
  tokens: DefaultListTokens
}) => {
  const stakeToken = tokens.find(({ address }) =>
    isAddressEqual(address as Address, polVault.depositTokenAddress as Address),
  )

  if (!stakeToken) {
    errors.push(
      `${polVault.slug} does not have a token for ${polVault.depositTokenAddress}`,
    )
    return
  }

  if (!('protocol' in stakeToken) || !stakeToken.protocol) {
    errors.push(
      `${stakeToken.name} does not have a protocol (pol vault validation)`,
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

  if (!expectedSlugs.includes(polVault.slug)) {
    if (slugs.some((slug) => expectedSlugs.includes(slug))) {
      if (
        !expectedSlugs.some((expectedSlug) =>
          polVault.slug.startsWith(expectedSlug),
        )
      ) {
        errors.push(
          `${polVault.slug}’s slug does not start with ${expectedSlugs.join(' or ')}`,
        )
      }
    } else {
      errors.push(
        `${polVault.slug}’s slug does not match ${expectedSlugs.join(' or ')}`,
      )
    }
  }

  if (slugs.includes(polVault.slug)) {
    errors.push(
      `Duplicate slug found: ${polVault.slug}. PoL vault slugs must be unique.`,
    )
  }
  slugs.push(polVault.slug)
}

export const validatePolVaultDetails = async ({
  beraRewardVaults,
  errors,
  polVault,
  publicClient,
  slugs,
  tokens,
}: {
  beraRewardVaults: Set<string>
  errors: Array<string>
  polVault: DefaultListPolVault
  publicClient: PublicClient
  slugs: Array<string>
  tokens: DefaultListTokens
}) => {
  checkUniqueness({
    errors,
    fieldName: 'beraRewardVault',
    set: beraRewardVaults,
    value: polVault.beraRewardVault,
  })

  validateStakeTokenAndSlug({ errors, polVault, slugs, tokens })
  await validateBeraRewardVault({
    errors,
    polVault,
    publicClient,
  })
}
