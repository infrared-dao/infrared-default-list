import { readFileSync } from 'node:fs'

import { getErrorMessage } from './get-error-message'

export const getJsonFile = ({
  chain,
  path,
}: {
  chain?: string
  path: string
}) => {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'))
  } catch (error) {
    console.error(
      `Error reading JSON files for chain ${chain}:`,
      getErrorMessage(error),
    )
    process.exit(1)
  }
}
