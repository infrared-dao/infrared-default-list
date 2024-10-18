export const outputScriptStatus = ({
  errors,
  network,
  type,
}: {
  errors: Array<string>
  network: string
  type: string
}) => {
  if (errors.length > 0) {
    console.error(`Validation failed for network ${network}:`)
    errors.forEach((error) => console.error(error))
    process.exit(1)
  }

  console.log(`${type} validation successful for network: ${network}`)
}
