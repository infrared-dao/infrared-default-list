import { readFileSync } from 'node:fs'

import { getErrorMessage } from './get-error-message'

export const getListFile = ({
  listPath,
  network,
}: {
  listPath: string
  network: string
}): any => {
  try {
    return JSON.parse(readFileSync(listPath, 'utf-8'))
  } catch (error) {
    console.error(
      `Error reading JSON files for network ${network}:`,
      getErrorMessage(error),
    )
    process.exit(1)
  }
}
