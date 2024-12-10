/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface TokenListSchema {
  keywords: string[]
  name: string
  tokens: {
    address: string
    chainId: number
    decimals: number
    image: string
    name: string
    symbol: string
    [k: string]: unknown
  }[]
  version: {
    major: number
    minor: number
    patch: number
    [k: string]: unknown
  }
  [k: string]: unknown
}
