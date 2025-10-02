import type { DefaultListPolVault } from '@/schemas/pol-vaults-schema'

import { lowercaseAddress } from './lowercase-address'

export const cleanPolVault = ({
  polVault,
}: {
  polVault: DefaultListPolVault
}): DefaultListPolVault => ({
  ...polVault,
  address: lowercaseAddress(polVault.address),
  beraRewardVault: lowercaseAddress(polVault.beraRewardVault),
  depositTokenAddress: lowercaseAddress(polVault.depositTokenAddress),
})
