import type { DefaultListPolVault } from '@/schemas/pol-vaults-schema'

import { lowercaseAddress } from './lowercase-address'

export const cleanPolVault = ({
  polVault,
}: {
  polVault: DefaultListPolVault
}): DefaultListPolVault => ({
  ...polVault,
  beraRewardsVault: lowercaseAddress(polVault.beraRewardsVault),
  depositTokenAddress: lowercaseAddress(polVault.depositTokenAddress),
})
