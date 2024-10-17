/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface GaugeListSchema {
  gauges: {
    beraRewardsVault: string
    lpTokenAddress: string
    mintUrl: string
    name: string
    protocol: string
    types: string[]
    underlyingTokens: string[]
    [k: string]: unknown
  }[]
  name: string
  protocols: {
    description: string
    id: string
    image: string
    name: string
    url: string
    [k: string]: unknown
  }[]
  types: {
    [k: string]: {
      description: string
      name: string
      [k: string]: unknown
    }
  }
  version: {
    major: number
    minor: number
    patch: number
    [k: string]: unknown
  }
  [k: string]: unknown
}
