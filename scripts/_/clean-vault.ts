import type { DefaultListVault } from '@/schemas/vaults-schema'

import { lowercaseAddress } from './lowercase-address'

export const cleanVault = ({
  vault,
}: {
  vault: DefaultListVault
}): DefaultListVault => ({
  ...vault,
  beraRewardsVault: lowercaseAddress(vault.beraRewardsVault),
  depositTokenAddress: lowercaseAddress(vault.depositTokenAddress),
})
