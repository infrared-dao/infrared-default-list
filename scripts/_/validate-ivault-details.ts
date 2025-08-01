import type { PublicClient } from 'viem'

import type { DefaultListIVault } from '@/schemas/ivaults-schema'
import type { DefaultListTokens } from '@/schemas/tokens-schema'

import { checkUniqueness } from './check-uniqueness'
import { validateBeraRewardVault } from './validate-bera-reward-vault'
import { validateDepositTokenAndSlug } from './validate-deposit-token-and-slug'

export const validateIVaultDetails = async ({
  beraRewardVaults,
  errors,
  iVault,
  publicClient,
  slugs,
  tokens,
}: {
  beraRewardVaults: Set<string>
  errors: Array<string>
  iVault: DefaultListIVault
  publicClient: PublicClient
  slugs: Array<string>
  tokens: DefaultListTokens
}) => {
  checkUniqueness({
    errors,
    fieldName: 'beraRewardVault',
    set: beraRewardVaults,
    value: iVault.beraRewardVault,
  })

  validateDepositTokenAndSlug({ errors, slugs, tokens, vault: iVault })
  await validateBeraRewardVault({
    errors,
    publicClient,
    vault: iVault,
  })
}
