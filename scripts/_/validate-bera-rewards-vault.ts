import { isAddressEqual, type Address, type PublicClient } from 'viem'

import type { DefaultListVault } from '@/schemas/vaults-schema'

import { getRewardsVaultForStakeToken } from './get-rewards-vault-for-stake-token'

export const validateBeraRewardsVault = async ({
  errors,
  publicClient,
  vault,
}: {
  errors: Array<string>
  publicClient: PublicClient
  vault: DefaultListVault
}) => {
  const rewardsVaultAddress = await getRewardsVaultForStakeToken({
    depositTokenAddress: vault.depositTokenAddress as Address,
    publicClient,
  })

  if (!rewardsVaultAddress) {
    errors.push(
      `Could not fetch rewards vault address for ${vault.depositTokenAddress}`,
    )
    return
  }

  if (!isAddressEqual(rewardsVaultAddress, vault.beraRewardsVault as Address)) {
    errors.push(
      `${vault.beraRewardsVault} does not match the on-chain rewards vault address for ${vault.depositTokenAddress}. It should be ${rewardsVaultAddress}`,
    )
  }
}
