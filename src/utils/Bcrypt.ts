import * as bcrypt from 'bcrypt'

export const createHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

export const compareHash = function (password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}
