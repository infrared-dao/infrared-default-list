import type { PublicClient } from 'viem'

import type { DefaultListIVault } from '@/schemas/ivaults-schema'

import { checkUniqueness } from './check-uniqueness'
import { validateBeraRewardVault } from './validate-bera-reward-vault'

export const validateIVaultDetails = async ({
  beraRewardVaults,
  errors,
  iVault,
  publicClient,
}: {
  beraRewardVaults: Set<string>
  errors: Array<string>
  iVault: DefaultListIVault
  publicClient: PublicClient
}) => {
  checkUniqueness({
    errors,
    fieldName: 'beraRewardVault',
    set: beraRewardVaults,
    value: iVault.beraRewardVault,
  })

  await validateBeraRewardVault({
    errors,
    publicClient,
    vault: iVault,
  })
}
