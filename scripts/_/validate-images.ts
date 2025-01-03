import { existsSync } from 'node:fs'
import path from 'path'

import type { ProtocolsSchema } from '@/types/protocols'
import type { TokenListSchema } from '@/types/token-list'

import { checkImageSize } from './check-image-size'
import { ASSETS_FOLDER } from './constants'

export const validateImages = async ({
  errors,
  listItem,
  type,
}: {
  errors: Array<string>
  listItem: ProtocolsSchema['protocols'] | TokenListSchema['tokens']
  type: string
}) => {
  for (const item of listItem) {
    const imagePath = path.join(`${ASSETS_FOLDER}/${type}`, item.image)
    if (!existsSync(imagePath)) {
      errors.push(
        `Image file "${item.image}" not found for ${type} "${item.name}"`,
      )
    } else if (path.extname(imagePath).toLowerCase() === '.png') {
      const isCorrectSize = await checkImageSize(imagePath)
      if (!isCorrectSize) {
        errors.push(
          `Image file "${item.image}" for ${type} "${item.name}" is not 128x128 pixels`,
        )
      }
    }
  }
}
