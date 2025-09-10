export const infraredMainnetAbi = [
  {
    inputs: [],
    name: 'AccessControlBadConfirmation',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32',
      },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'AddressEmptyCode',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadySet',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'ERC1967InvalidImplementation',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ERC1967NonPayable',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EnforcedPause',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExpectedPause',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FailedCall',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidArrayLength',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidFee',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidInitialization',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidValidator',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoRewardsVault',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotInitializing',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotPauser',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RewardTokenNotSupported',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RewardTokenNotWhitelisted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TokensReservedForProtocolFees',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UUPSUnauthorizedCallContext',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'slot',
        type: 'bytes32',
      },
    ],
    name: 'UUPSUnsupportedProxiableUUID',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    inputs: [],
    name: 'VaultAlreadyUpToDate',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroAmount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
    ],
    name: 'ActivatedBoosts',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'distributor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'numClaims',
        type: 'uint256',
      },
    ],
    name: 'BGTIncentivesClaimAttempted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bgtAmt',
        type: 'uint256',
      },
    ],
    name: 'BaseHarvested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256',
      },
    ],
    name: 'BribeSupplied',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amtWiberaVault',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amtIbgtVault',
        type: 'uint256',
      },
    ],
    name: 'BribesCollected',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes[]',
        name: 'pubkeys',
        type: 'bytes[]',
      },
      {
        indexed: false,
        internalType: 'uint128[]',
        name: 'amounts',
        type: 'uint128[]',
      },
    ],
    name: 'CancelDropBoosts',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
      {
        indexed: false,
        internalType: 'uint128[]',
        name: '_amts',
        type: 'uint128[]',
      },
    ],
    name: 'CancelledBoosts',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
    ],
    name: 'DroppedBoosts',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'stakingAsset',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'berachainRewardVault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bgtAmt',
        type: 'uint256',
      },
    ],
    name: 'ExternalVaultClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum ConfigTypes.FeeType',
        name: '_feeType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_oldFeeRate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newFeeRate',
        type: 'uint256',
      },
    ],
    name: 'FeeUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_ibgt',
        type: 'address',
      },
    ],
    name: 'IBGTSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_IR',
        type: 'address',
      },
    ],
    name: 'IRSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_oldWeight',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newWeight',
        type: 'uint256',
      },
    ],
    name: 'InfraredBERABribeSplitUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_ibgtAmt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_iredAmt',
        type: 'uint256',
      },
    ],
    name: 'InfraredBGTSupplied',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_oldIbgt',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_newIbgt',
        type: 'address',
      },
    ],
    name: 'InfraredBGTUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_oldIbgtVault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_newIbgtVault',
        type: 'address',
      },
    ],
    name: 'InfraredBGTVaultUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
    ],
    name: 'NewVault',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_ibera',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_distributor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256',
      },
    ],
    name: 'OperatorRewardsDistributed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_voterAmt',
        type: 'uint256',
      },
    ],
    name: 'ProtocolFees',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'ProtocolFeesClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes[]',
        name: 'pubkeys',
        type: 'bytes[]',
      },
      {
        indexed: false,
        internalType: 'uint128[]',
        name: 'amounts',
        type: 'uint128[]',
      },
    ],
    name: 'QueueDropBoosts',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
      {
        indexed: false,
        internalType: 'uint128[]',
        name: '_amts',
        type: 'uint128[]',
      },
    ],
    name: 'QueuedBoosts',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'Recovered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_from',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_to',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256',
      },
    ],
    name: 'Redelegated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256',
      },
    ],
    name: 'RewardSupplied',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'RewardTokenNotSupported',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_oldDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newDuration',
        type: 'uint256',
      },
    ],
    name: 'RewardsDurationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_pubkey',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256',
      },
    ],
    name: 'Undelegated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMintRate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMintRate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'UpdatedIRMintRate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'pubkey',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'commissionRate',
        type: 'uint96',
      },
    ],
    name: 'ValidatorCommissionActivated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'pubkey',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'commissionRate',
        type: 'uint96',
      },
    ],
    name: 'ValidatorCommissionQueued',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes',
        name: '_validator',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct DataTypes.Token[]',
        name: '_rewards',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bgtAmt',
        type: 'uint256',
      },
    ],
    name: 'ValidatorHarvested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_current',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_new',
        type: 'bytes',
      },
    ],
    name: 'ValidatorReplaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'pubkey',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
        ],
        indexed: false,
        internalType: 'struct ValidatorTypes.Validator[]',
        name: '_validators',
        type: 'tuple[]',
      },
    ],
    name: 'ValidatorsAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
    ],
    name: 'ValidatorsRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bgtAmt',
        type: 'uint256',
      },
    ],
    name: 'VaultHarvested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'oldVault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newVault',
        type: 'address',
      },
    ],
    name: 'VaultMigrated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'pause',
        type: 'bool',
      },
    ],
    name: 'VaultRegistrationPauseStatus',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_voter',
        type: 'address',
      },
    ],
    name: 'VoterSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_wasWhitelisted',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_isWhitelisted',
        type: 'bool',
      },
    ],
    name: 'WhiteListedRewardTokensUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'GOVERNANCE_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'KEEPER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PAUSER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'REWARDS_STORAGE_LOCATION',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'VALIDATOR_STORAGE_LOCATION',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'VAULT_STORAGE_LOCATION',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
    ],
    name: 'activateBoosts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_pubkey',
        type: 'bytes',
      },
    ],
    name: 'activateQueuedValCommission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stakingToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_rewardsToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'addIncentives',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stakingToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_rewardsToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_rewardsDuration',
        type: 'uint256',
      },
    ],
    name: 'addReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'pubkey',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
        ],
        internalType: 'struct ValidatorTypes.Validator[]',
        name: '_validators',
        type: 'tuple[]',
      },
    ],
    name: 'addValidators',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
      {
        internalType: 'uint128[]',
        name: '_amts',
        type: 'uint128[]',
      },
    ],
    name: 'cancelBoosts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
      {
        internalType: 'uint128[]',
        name: '_amts',
        type: 'uint128[]',
      },
    ],
    name: 'cancelDropBoosts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_feeTotal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_feeProtocol',
        type: 'uint256',
      },
    ],
    name: 'chargedFeesOnRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amtRecipient',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amtVoter',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amtProtocol',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'chef',
    outputs: [
      {
        internalType: 'contract IBeraChef',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'identifier',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'merkleProof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'struct IBGTIncentiveDistributor.Claim[]',
        name: '_claims',
        type: 'tuple[]',
      },
    ],
    name: 'claimBGTIncentives',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'claimExternalVaultRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'claimLostRewardsOnVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'claimProtocolFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'collectBribes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'collector',
    outputs: [
      {
        internalType: 'contract IBribeCollector',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentImplementation',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_delegatee',
        type: 'address',
      },
    ],
    name: 'delegateBGT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'distributor',
    outputs: [
      {
        internalType: 'contract IInfraredDistributor',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
    ],
    name: 'dropBoosts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'externalVaultRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: 'iBgtAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 't',
        type: 'uint256',
      },
    ],
    name: 'fees',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBGTBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'harvestBase',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'harvestBoostRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]',
      },
    ],
    name: 'harvestBribes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'harvestOldVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'harvestOperatorRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'harvestVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'honey',
    outputs: [
      {
        internalType: 'contract ERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ibera',
    outputs: [
      {
        internalType: 'contract IInfraredBERA',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ibgt',
    outputs: [
      {
        internalType: 'contract InfraredBGT',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ibgtVault',
    outputs: [
      {
        internalType: 'contract IInfraredVault',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'implementation',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'infrared',
    outputs: [
      {
        internalType: 'contract IInfrared',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'infraredValidators',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'pubkey',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
        ],
        internalType: 'struct ValidatorTypes.Validator[]',
        name: 'validators',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_stakingTokens',
        type: 'address[]',
      },
    ],
    name: 'initializeV1_2',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ir',
    outputs: [
      {
        internalType: 'contract IInfraredGovernanceToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_pubkey',
        type: 'bytes',
      },
    ],
    name: 'isInfraredValidator',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'versionToUpgradeTo',
        type: 'uint8',
      },
    ],
    name: 'migrateVault',
    outputs: [
      {
        internalType: 'address',
        name: 'newVault',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numInfraredValidators',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
    ],
    name: 'pauseOldStaking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'pauseStaking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'protocolFeeAmounts',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proxiableUUID',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
      {
        internalType: 'uint128[]',
        name: '_amts',
        type: 'uint128[]',
      },
    ],
    name: 'queueBoosts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
      {
        internalType: 'uint128[]',
        name: '_amts',
        type: 'uint128[]',
      },
    ],
    name: 'queueDropBoosts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
      {
        internalType: 'uint96',
        name: '_commissionRate',
        type: 'uint96',
      },
    ],
    name: 'queueMultipleValCommissions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_pubkey',
        type: 'bytes',
      },
      {
        internalType: 'uint64',
        name: '_startBlock',
        type: 'uint64',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'percentageNumerator',
            type: 'uint96',
          },
        ],
        internalType: 'struct IBeraChef.Weight[]',
        name: '_weights',
        type: 'tuple[]',
      },
    ],
    name: 'queueNewCuttingBoard',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_pubkey',
        type: 'bytes',
      },
      {
        internalType: 'uint96',
        name: '_commissionRate',
        type: 'uint96',
      },
    ],
    name: 'queueValCommission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'recoverERC20FromOldVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'recoverERC20FromVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'registerVault',
    outputs: [
      {
        internalType: 'contract IInfraredVault',
        name: 'vault',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stakingToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_rewardsToken',
        type: 'address',
      },
    ],
    name: 'removeReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: '_pubkeys',
        type: 'bytes[]',
      },
    ],
    name: 'removeValidators',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_current',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: '_new',
        type: 'bytes',
      },
    ],
    name: 'replaceValidator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardsDuration',
    outputs: [
      {
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardsFactory',
    outputs: [
      {
        internalType: 'contract IRewardVaultFactory',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_ir',
        type: 'address',
      },
    ],
    name: 'setIR',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'pause',
        type: 'bool',
      },
    ],
    name: 'setVaultRegistrationPauseStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_voter',
        type: 'address',
      },
    ],
    name: 'setVoter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
    ],
    name: 'unpauseOldStaking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'unpauseStaking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum ConfigTypes.FeeType',
        name: '_t',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256',
      },
    ],
    name: 'updateFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_irMintRate',
        type: 'uint256',
      },
    ],
    name: 'updateIRMintRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_weight',
        type: 'uint256',
      },
    ],
    name: 'updateInfraredBERABribeSplit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_rewardsDuration',
        type: 'uint256',
      },
    ],
    name: 'updateRewardsDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stakingToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_rewardsToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_rewardsDuration',
        type: 'uint256',
      },
    ],
    name: 'updateRewardsDurationForVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_whitelisted',
        type: 'bool',
      },
    ],
    name: 'updateWhiteListedRewardTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stakingToken',
        type: 'address',
      },
    ],
    name: 'vaultRegistry',
    outputs: [
      {
        internalType: 'contract IInfraredVault',
        name: 'vault',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'voter',
    outputs: [
      {
        internalType: 'contract IVoter',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'wbera',
    outputs: [
      {
        internalType: 'contract IWBERA',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'whitelistedRewardTokens',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const
