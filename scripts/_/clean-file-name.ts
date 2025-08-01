export const cleanFileName = (fileName: string) =>
  `${fileName
    .replace(/-\d+\.?\d*%/, '') // kodiakTradingFee is not necessary as we don't need a different version of the images
    .replace('.', '-')
    .replace('₮', 't')
    .replace(/\s|_|\/|\./g, '-')
    .toLowerCase()}`
