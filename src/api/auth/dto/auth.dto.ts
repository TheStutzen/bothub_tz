import { ISignUp } from '../interface/auth.interface'
import {
  determineInputType,
  hasLogin,
  hasPassword,
  isEmail,
  isPhone,
  isEmpty
} from '../../../utils/Validators'
import { IRemind, ISignIn } from '../interface/auth.interface'

export const dtoSignIn = (params: ISignIn) => {
  const errors: { field: string; message: string }[] = []

  if (isEmpty(params.login)) {
    errors.push({ field: 'login', message: 'Была передана пустая строка' })
  }

  if (isEmpty(params.password)) {
    errors.push({
      field: 'password',
      message: 'Не указан пароль'
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

export const dtoRemind = (params: IRemind) => {
  const errors: { field: string; message: string }[] = []

  const loginType = determineInputType(params.login)

  if (loginType === 'email') {
    if (!isEmail(params.login)) {
      errors.push({
        field: 'login',
        message: 'Неверный формат электронной почты'
      })
    }
  }

  if (loginType === 'phone') {
    if (!isPhone(params.login)) {
      errors.push({
        field: 'login',
        message: 'Неверный формат номера телефона'
      })
    }

    errors.push({
      field: 'login',
      message: 'Для данного типа высылается временный пароль c смс кодом'
    })
  }

  if (loginType === 'login') {
    const loginError = hasLogin(params.login)
    if (loginError) {
      errors.push(loginError)
    }
  }

  return errors
}

export const dtoSignUp = (params: ISignUp) => {
  const errors: { field: string; message: string }[] = []

  if (isEmpty(params.login)) {
    errors.push({
      field: 'login',
      message: 'Не указан логин'
    })
  }

  if (isEmpty(params.email)) {
    errors.push({
      field: 'email',
      message: 'Не указан email'
    })
  }

  if (isEmpty(params.password)) {
    errors.push({
      field: 'password',
      message: 'Не указан пароль'
    })
  }

  if (!isEmail(params.email))
    errors.push({
      field: 'email',
      message: 'Передана не валидная почта'
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
