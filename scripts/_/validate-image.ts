import { existsSync } from 'node:fs'
import path from 'path'

import type { TokensSchema } from '@/types/tokens'

import { checkImageSize } from './check-image-size'
import { ASSETS_FOLDER } from './constants'

export const validateImage = async ({
  errors,
  item,
  required,
  type,
}: {
  errors: Array<string>
  item: TokensSchema['tokens'][number]
  required: boolean
  type: string
}) => {
  if (!item.image) {
    if (required) {
      errors.push(
        `Image file "${item.image}" not found for ${type} "${item.name}"`,
      )
    }
    return
  }
  const imagePath = path.join(`${ASSETS_FOLDER}/${type}`, item.image as string)
  if (!existsSync(imagePath)) {
    errors.push(
      `Image file "${item.image}" not found for ${type} "${item.name}" at ${imagePath}`,
    )
  }
  if (path.extname(imagePath).toLowerCase() === '.png') {
    const isCorrectSize = await checkImageSize(imagePath)
    if (!isCorrectSize) {
      errors.push(
        `Image file "${item.image}" for ${type} "${item.name}" is not 128x128 pixels`,
      )
    }
  }
}
