import validator from 'validator'

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const phonePattern = /^(\+7|8|(\+3[3-7]))[\d\s\-()]{10,14}$/

export function determineInputType(str: string): string {
  if (emailPattern.test(str)) {
    return 'email'
  }

  if (phonePattern.test(str)) {
    return 'phone'
  }

  return 'login'
}

export function hasPassword(str: string) {
  if (str) {
    if (str.length < 8) {
      return {
        field: 'password',
        message: 'Минимальная длина пароля 8 символов'
      }
    }

    if (str.length > 32) {
      return {
        field: 'password',
        message: 'Максимальная длина пароля 32 символа'
      }
    }

    if (
      !/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,})(?!.*pass|.*word|.*1234|.*qwer|.*asdf).{8,}$/.test(
        str
      )
    ) {
      return {
        field: 'password',
        message:
          'Пароль должен содержать заглавные и строчные латинские буквы, цифры и спец. символы ($ @ # & !)'
      }
    }

    return null
  }

  return {
    field: 'password',
    message: 'Пароль не был указан'
  }
}

export function hasName(str: string) {
  if (!str) {
    return {
      field: 'name',
      message: 'Не указано имя'
    }
  }

  return null
}

export function hasPinCode(str: string) {
  if (!/^\d{4}$/.test(str)) {
    return false
  }

  return true
}

export function hasLogin(str: string) {
  if (str.length < 3) {
    return {
      field: 'login',
      message: 'Логин должен содержать не менее 3 символов'
    }
  }

  if (str.length > 32) {
    return {
      field: 'login',
      message: 'Логин может содержать не более 32 символа'
    }
  }

  if (/^\d/.test(str)) {
    return {
      field: 'login',
      message: 'Первый символ логина не может быть цифрой'
    }
  }

  if (!/^[a-z0-9]+$/.test(str)) {
    return {
      field: 'login',
      message:
        'Логин может содержать только латинские буквы в нижнем регистре и цифры'
    }
  }

  return null
}

export function isPhone(str: string) {
  return validator.isMobilePhone(str)
}

export function isEmail(str: string) {
  return validator.isEmail(str)
}

export function isEmpty(str: string) {
  return str.trim() === ''
}

export function isNumber(str: number) {
  return typeof str === 'number'
}

export function isArray(str: any) {
  return Array.isArray(str)
}

export function isBoolean(str: boolean) {
  return typeof str === 'boolean'
}
