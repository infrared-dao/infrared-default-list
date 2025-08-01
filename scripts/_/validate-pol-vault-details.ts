import type { PublicClient } from 'viem'

import type { DefaultListPolVault } from '@/schemas/pol-vaults-schema'
import type { DefaultListTokens } from '@/schemas/tokens-schema'

import { checkUniqueness } from './check-uniqueness'
import { validateBeraRewardVault } from './validate-bera-reward-vault'
import { validateDepositTokenAndSlug } from './validate-deposit-token-and-slug'

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

  validateDepositTokenAndSlug({ errors, slugs, tokens, vault: polVault })
  await validateBeraRewardVault({
    errors,
    publicClient,
    vault: polVault,
  })
}
