import { IRemind, ISignUp } from '../interface/auth.interface'
import {
  hasLogin,
  hasPassword,
  isEmail,
  isEmpty
} from '../../../utils/Validators'
import { ISignIn } from '../interface/auth.interface'
import * as i18n from 'i18n'

export const dtoSignIn = (params: ISignIn) => {
  const errors: { field: string; message: string }[] = []

  if (isEmpty(params.login)) {
    errors.push({
      field: 'login',
      message: i18n.__('VALIDATORS.isEmpty.error')
    })
  }

  if (isEmpty(params.password)) {
    errors.push({
      field: 'password',
      message: i18n.__('VALIDATORS.isEmpty.error')
    })
  }

  const loginErr = hasLogin(params.login)

  if (loginErr) {
    errors.push(loginErr)
  }

  const passErr = hasPassword(params.password)

  if (passErr) {
    errors.push(passErr)
  }

  return errors
}

export const dtoSignUp = (params: ISignUp) => {
  const errors: { field: string; message: string }[] = []

  if (isEmpty(params.login)) {
    errors.push({
      field: 'login',
      message: i18n.__('VALIDATORS.isEmpty.error')
    })
  }

  if (isEmpty(params.email)) {
    errors.push({
      field: 'email',
      message: i18n.__('VALIDATORS.isEmpty.error')
    })
  }

  if (isEmpty(params.password)) {
    errors.push({
      field: 'password',
      message: i18n.__('VALIDATORS.isEmpty.error')
    })
  }

  if (!isEmail(params.email))
    errors.push({
      field: 'email',
      message: i18n.__('VALIDATORS.isEmail.error')
    })

  const loginErr = hasLogin(params.login)

  if (loginErr) {
    errors.push(loginErr)
  }

  const passErr = hasPassword(params.password)

  if (passErr) {
    errors.push(passErr)
  }

  return errors
}

export const dtoRemind = (params: IRemind) => {
  const errors: { field: string; message: string }[] = []

  if (isEmpty(params.login)) {
    errors.push({
      field: 'login',
      message: i18n.__('VALIDATORS.isEmpty.error')
    })
  }

  return errors
}
