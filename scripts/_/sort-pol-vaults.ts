import { writeFile } from 'node:fs/promises'

import type { DefaultListPolVaults } from '@/schemas/pol-vaults-schema'

import { formatDataToJson } from './format-data-to-json'

export const sortPolVaults = async ({
  path,
  polVaults,
}: {
  path: string
  polVaults: DefaultListPolVaults
}) => {
  const sortedPolVaults = polVaults.sort((a, b) => a.slug.localeCompare(b.slug))

  await writeFile(path, formatDataToJson({ data: { vaults: sortedPolVaults } }))
}
