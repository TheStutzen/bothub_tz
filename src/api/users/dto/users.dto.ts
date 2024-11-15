import { isNumber } from '../../../utils/Validators'
import { IUpdateUser } from '../interface/users.interface'

export const dtoUserUpdate = (params: IUpdateUser) => {
  const errors: { field: string; message: string }[] = []

  if (!isNumber(params.userId)) {
    errors.push({
      field: 'userId',
      message: 'Было передано не валидное значение'
    })
  }

  if (!isNumber(params.balance)) {
    errors.push({
      field: 'balance',
      message: 'Было передано не валидное значение'
    })
  }

  return errors
}
