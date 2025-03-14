import { existsSync } from 'node:fs'
import path from 'path'

import type { BaseTokenListSchema } from '@/types/base-token-list'
import type { ProtocolsSchema } from '@/types/protocols'
import type { TokenListSchema } from '@/types/token-list'

import { checkImageSize } from './check-image-size'
import { ASSETS_FOLDER } from './constants'

export const validateImage = async ({
  errors,
  item,
  required,
  type,
}: {
  errors: Array<string>
  item:
    | BaseTokenListSchema['tokens'][number]
    | ProtocolsSchema['protocols'][number]
    | TokenListSchema['tokens'][number]
  required: boolean
  type: string
}) => {
  const itemImage = item.imageDark || item.imageLight || item.image
  if (!itemImage) {
    if (required) {
      errors.push(
        `Image file "${itemImage}" not found for ${type} "${item.name}"`,
      )
    }
    return
  }
  const imagePath = path.join(`${ASSETS_FOLDER}/${type}`, itemImage as string)
  if (!existsSync(imagePath)) {
    errors.push(
      `Image file "${itemImage}" not found for ${type} "${item.name}" at ${imagePath}`,
    )
  }
  if (path.extname(imagePath).toLowerCase() === '.png') {
    const isCorrectSize = await checkImageSize(imagePath)
    if (!isCorrectSize) {
      errors.push(
        `Image file "${itemImage}" for ${type} "${item.name}" is not 128x128 pixels`,
      )
    }
  }
}
