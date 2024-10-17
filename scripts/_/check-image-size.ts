import sharp from 'sharp'

import { getErrorMessage } from './get-error-message'

export const checkImageSize = async (filePath: string) => {
  try {
    const metadata = await sharp(filePath).metadata()
    return metadata.width === 128 && metadata.height === 128
  } catch (error) {
    console.error(
      `Error checking image size for ${filePath}:`,
      getErrorMessage(error),
    )
    return false
  }
}
