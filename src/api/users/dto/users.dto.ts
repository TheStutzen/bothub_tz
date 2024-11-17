import { isNumber } from '../../../utils/Validators'
import { IUpdateUser } from '../interface/users.interface'
import * as i18n from 'i18n'

export const dtoUserUpdate = (params: IUpdateUser) => {
  const errors: { field: string; message: string }[] = []

  if (!isNumber(params.userId)) {
    errors.push({
      field: 'userId',
      message: i18n.__('VALIDATORS.isNumber.error')
    })
  }

  if (!isNumber(params.balance)) {
    errors.push({
      field: 'balance',
      message: i18n.__('VALIDATORS.isNumber.error')
    })
  }

  return errors
}
