import { config } from 'dotenv'
import { fallback, http } from 'viem'
import { berachain, berachainBepolia, bsc } from 'viem/chains'

config()

export const transports = {
  [berachain.id]: fallback([
    http(
      `https://greatest-shy-wildflower.bera-mainnet.quiknode.pro/${process.env.QUICKNODE_TOKEN}`,
    ),
    http(),
  ]),
  [berachainBepolia.id]: fallback([
    http(
      `https://summer-distinguished-theorem.bera-bepolia.quiknode.pro/${process.env.QUICKNODE_TOKEN_BEPOLIA}`,
    ),
    http(),
  ]),
  [bsc.id]: fallback([http('https://binance.llamarpc.com')]),
}
