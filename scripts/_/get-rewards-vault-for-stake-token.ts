import type { Address, PublicClient } from 'viem'

// https://docs.berachain.com/developers/contracts/reward-vault-factory
const REWARDS_VAULT_FACTORY_ADDRESS =
  '0x94Ad6Ac84f6C6FbA8b8CCbD71d9f4f101def52a8'
const rewardsVaultFactoryAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'stakingToken', type: 'address' },
    ],
    name: 'getVault',
    outputs: [{ internalType: 'address', name: 'vault', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const getRewardsVaultForStakeToken = async ({
  publicClient,
  stakeTokenAddress,
}: {
  publicClient: PublicClient
  stakeTokenAddress: Address
}) =>
  publicClient.readContract({
    abi: rewardsVaultFactoryAbi,
    address: REWARDS_VAULT_FACTORY_ADDRESS,
    args: [stakeTokenAddress],
    functionName: 'getVault',
  })
