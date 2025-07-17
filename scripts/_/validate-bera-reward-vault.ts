import { isAddressEqual, type Address, type PublicClient } from 'viem'

import type { DefaultListPolVault } from '@/schemas/pol-vaults-schema'

import { getRewardVaultForStakeToken } from './get-reward-vault-for-stake-token'

export const validateBeraRewardVault = async ({
  errors,
  polVault,
  publicClient,
}: {
  errors: Array<string>
  polVault: DefaultListPolVault
  publicClient: PublicClient
}) => {
  const rewardVaultAddress = await getRewardVaultForStakeToken({
    depositTokenAddress: polVault.depositTokenAddress as Address,
    publicClient,
  })

  if (!rewardVaultAddress) {
    errors.push(
      `Could not fetch reward vault address for ${polVault.depositTokenAddress}`,
    )
    return
  }

  if (
    !isAddressEqual(rewardVaultAddress, polVault.beraRewardVault as Address)
  ) {
    errors.push(
      `${polVault.beraRewardVault} does not match the on-chain reward vault address for ${polVault.depositTokenAddress}. It should be ${rewardVaultAddress}`,
    )
  }
}
