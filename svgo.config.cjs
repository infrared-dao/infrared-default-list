module.exports = {
  js2svg: {
    eol: 'lf',
    finalNewline: true,
  },
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false
        }
      }
    },
    'convertStyleToAttrs',
    'removeDimensions'
  ]
}
