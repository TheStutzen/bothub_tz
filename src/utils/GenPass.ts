import { generate } from 'generate-password'

export const gp = (length = 10) =>
  generate({
    length: length,
    numbers: true
  })
