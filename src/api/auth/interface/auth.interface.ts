import {
  IErrorsType,
  IUserWithFields
} from '../../../shared/interface/shared.interface'

export interface ISignIn {
  login: string
  password: string
}

export interface IRemind {
  login: string
}

export interface ISignUp {
  login: string
  email: string
  password: string
}

export interface ISignUpResponse {
  message: string
  errors: IErrorsType[]
  user: IUserWithFields
}

export interface ISignInResponse {
  message: string
  errors: IErrorsType[]
  sid: string
  user: IUserWithFields
}

export interface IFetchSessionResponse {
  message: string
  errors: IErrorsType[]
  sid: string
  user: IUserWithFields
}

export interface ISignOutResponse {
  message: string
  errors: IErrorsType[]
}

export interface IRemindResponse {
  message: string
  errors: IErrorsType[]
}
