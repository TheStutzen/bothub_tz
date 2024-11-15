export interface IUser {
  userId: number
  login: string
  email: string
  balance: number
  roleId: number
  dateReg: Date
}

export interface IUpdateUser {
  userId: number
  balance: number
}
