import { existsSync } from 'node:fs'
import path from 'path'

import type { ProtocolsSchema } from '@/types/protocols'

import { checkImageSize } from './check-image-size'
import { ASSETS_FOLDER } from './constants'

export const validateProtocolImages = async ({
  errors,
  listItem,
  type,
}: {
  errors: Array<string>
  listItem: ProtocolsSchema['protocols']
  type: string
}) => {
  for (const item of listItem) {
    const itemImage = item.imageDark || item.imageLight
    const imagePath = path.join(`${ASSETS_FOLDER}/${type}`, itemImage as string)
    if (!existsSync(imagePath)) {
      errors.push(
        `Image file "${itemImage}" not found for ${type} "${item.name}" at ${imagePath}`,
      )
    } else if (path.extname(imagePath).toLowerCase() === '.png') {
      const isCorrectSize = await checkImageSize(imagePath)
      if (!isCorrectSize) {
        errors.push(
          `Image file "${itemImage}" for ${type} "${item.name}" is not 128x128 pixels`,
        )
      }
    }
  }
}
