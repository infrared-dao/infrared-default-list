import { writeFile } from 'node:fs/promises'

import type { DefaultListIVaults } from '@/schemas/ivaults-schema'
import type { DefaultListPolVaults } from '@/schemas/pol-vaults-schema'

import { formatDataToJson } from './format-data-to-json'

export const sortVaults = async ({
  path,
  vaults,
}: {
  path: string
  vaults: DefaultListIVaults | DefaultListPolVaults
}) => {
  const sortedVaults = vaults.sort((a, b) => a.slug.localeCompare(b.slug))

  await writeFile(path, formatDataToJson({ data: { vaults: sortedVaults } }))
}
