export const outputScriptStatus = ({
  errors,
  network,
  type,
}: {
  errors: Array<string>
  network?: string
  type: string
}) => {
  if (errors.length > 0) {
    console.error(`Validation failed${network ? ` for ${network}` : ''}`)
    errors.forEach((error) => console.error(error))
    process.exit(1)
  }

  console.log(
    `${type} validation successful${network ? ` for ${network}` : ''}`,
  )
}
