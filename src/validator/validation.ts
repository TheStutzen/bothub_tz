export const validation = (
  validateFn: (args: any) => { field: string; message: string }[],
  args: any
) => {
  const validationErrors = validateFn(args)

  if (validationErrors.length > 0) {
    return {
      message: null,
      errors: validationErrors
    }
  }

  return null
}
