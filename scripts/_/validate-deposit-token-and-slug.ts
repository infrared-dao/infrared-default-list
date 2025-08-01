import slug from 'slug'
import { type Address, isAddressEqual } from 'viem'

import type { DefaultListIVault } from '@/schemas/ivaults-schema'
import type { DefaultListPolVault } from '@/schemas/pol-vaults-schema'
import type { DefaultListTokens } from '@/schemas/tokens-schema'

slug.charmap['.'] = '.' // allow periods in urls. They are valid
slug.charmap['₮'] = '₮' // allow some unicode characters
slug.charmap['%'] = '%' // allow percent in url. It will be escaped later

export const validateDepositTokenAndSlug = ({
  errors,
  slugs,
  tokens,
  vault,
}: {
  errors: Array<string>
  slugs: Array<string>
  tokens: DefaultListTokens
  vault: DefaultListIVault | DefaultListPolVault
}) => {
  const depositToken = tokens.find(({ address }) =>
    isAddressEqual(address as Address, vault.depositTokenAddress as Address),
  )

  if (!depositToken) {
    errors.push(
      `${vault.slug} does not have a token for ${vault.depositTokenAddress}`,
    )
    return
  }

  if (!('protocol' in depositToken) || !depositToken.protocol) {
    errors.push(
      `${depositToken.name} does not have a protocol (pol vault validation)`,
    )
    return
  }

  const cleanDepositTokenName = depositToken.name
    .replace(/\s|_|\//g, '-')
    .toLowerCase()

  const expectedSlugs = [
    cleanDepositTokenName,
    `${slug(depositToken.protocol)}-${slug(cleanDepositTokenName)}`,
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
      `Duplicate slug found: ${vault.slug}. PoL vault slugs must be unique.`,
    )
  }
  slugs.push(vault.slug)
}
