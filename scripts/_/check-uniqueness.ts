export const checkUniqueness = ({
  errors,
  fieldName,
  set,
  value,
}: {
  errors: Array<string>
  fieldName: string
  set: Set<string>
  value: string | undefined
}) => {
  if (value) {
    if (set.has(value)) {
      errors.push(`Duplicate found: ${value}. ${fieldName}s must be unique.`)
    }
    set.add(value)
  }
}
