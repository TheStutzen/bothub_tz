import {
  IErrorsType,
  IUserWithFields
} from '../../../shared/interface/shared.interface'

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

export interface IGetUsersResponse {
  message: string
  errors: IErrorsType[]
  users: IUserWithFields[]
}

export interface IGetBalanceResponse {
  message: string
  errors: IErrorsType[]
  balance: number
}
