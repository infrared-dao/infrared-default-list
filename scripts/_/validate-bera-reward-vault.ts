import { isAddressEqual, type Address, type PublicClient } from 'viem'

import type { DefaultListIVault } from '@/schemas/ivaults-schema'
import type { DefaultListPolVault } from '@/schemas/pol-vaults-schema'

import { getRewardVaultForStakeToken } from './get-reward-vault-for-stake-token'

export const validateBeraRewardVault = async ({
  errors,
  publicClient,
  vault,
}: {
  errors: Array<string>
  publicClient: PublicClient
  vault: DefaultListIVault | DefaultListPolVault
}) => {
  const rewardVaultAddress = await getRewardVaultForStakeToken({
    depositTokenAddress: vault.depositTokenAddress as Address,
    publicClient,
  })

  if (!rewardVaultAddress) {
    errors.push(
      `Could not fetch reward vault address for ${vault.depositTokenAddress}`,
    )
    return
  }

  if (!isAddressEqual(rewardVaultAddress, vault.beraRewardVault as Address)) {
    errors.push(
      `${vault.beraRewardVault} does not match the on-chain reward vault address for ${vault.depositTokenAddress}. It should be ${rewardVaultAddress}`,
    )
  }
}
