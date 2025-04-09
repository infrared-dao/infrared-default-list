import { existsSync } from 'node:fs'
import path from 'path'

import type { ProtocolsSchema } from '@/types/protocols'

import { checkImageSize } from './check-image-size'
import { ASSETS_FOLDER } from './constants'

const validateImage = async ({
  errors,
  imagePath,
  protocol,
  type,
}: {
  errors: Array<string>
  imagePath: string
  protocol: ProtocolsSchema['protocols'][number]
  type: string
}) => {
  if (!existsSync(imagePath)) {
    errors.push()
  } else if (path.extname(imagePath).toLowerCase() === '.png') {
    const isCorrectSize = await checkImageSize(imagePath)
    if (!isCorrectSize) {
      errors.push(
        `Image file "${imagePath}" for ${type} "${protocol.name}" is not 128x128 pixels`,
      )
    }
  }
}

export const validateProtocolImages = async ({
  errors,
  protocol,
  type,
}: {
  errors: Array<string>
  protocol: ProtocolsSchema['protocols'][number]
  type: string
}) => {
  // Check dark image
  const imageDarkPath = path.join(
    `${ASSETS_FOLDER}/${type}`,
    protocol.imageDark as string,
  )
  await validateImage({ errors, imagePath: imageDarkPath, protocol, type })

  // Check light image
  const imageLightPath = path.join(
    `${ASSETS_FOLDER}/${type}`,
    protocol.imageLight as string,
  )

  await validateImage({ errors, imagePath: imageLightPath, protocol, type })
}
