import { berachain, berachainBepolia, bsc } from 'viem/chains'

export const supportedChains = {
  bepolia: berachainBepolia,
  bsc: bsc,
  mainnet: berachain,
} as const
