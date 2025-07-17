import type { DefaultListPolVault } from '@/schemas/pol-vaults-schema'

import { lowercaseAddress } from './lowercase-address'

export const cleanPolVault = ({
  polVault,
}: {
  polVault: DefaultListPolVault
}): DefaultListPolVault => ({
  ...polVault,
  beraRewardVault: lowercaseAddress(polVault.beraRewardVault),
  depositTokenAddress: lowercaseAddress(polVault.depositTokenAddress),
})
