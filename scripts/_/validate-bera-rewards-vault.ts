import { isAddressEqual, type Address, type PublicClient } from 'viem'

import type { DefaultListPolVault } from '@/schemas/pol-vaults-schema'

import { getRewardsVaultForStakeToken } from './get-rewards-vault-for-stake-token'

export const validateBeraRewardsVault = async ({
  errors,
  polVault,
  publicClient,
}: {
  errors: Array<string>
  polVault: DefaultListPolVault
  publicClient: PublicClient
}) => {
  const rewardsVaultAddress = await getRewardsVaultForStakeToken({
    depositTokenAddress: polVault.depositTokenAddress as Address,
    publicClient,
  })

  if (!rewardsVaultAddress) {
    errors.push(
      `Could not fetch rewards vault address for ${polVault.depositTokenAddress}`,
    )
    return
  }

  if (
    !isAddressEqual(rewardsVaultAddress, polVault.beraRewardsVault as Address)
  ) {
    errors.push(
      `${polVault.beraRewardsVault} does not match the on-chain rewards vault address for ${polVault.depositTokenAddress}. It should be ${rewardsVaultAddress}`,
    )
  }
}
