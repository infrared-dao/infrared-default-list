import { berachainTestnetbArtio } from 'viem/chains'

import { berachainMainnet } from '@/config/berachain-mainnet'

export const supportedChains = {
  bartio: berachainTestnetbArtio,
  mainnet: berachainMainnet,
} as const
