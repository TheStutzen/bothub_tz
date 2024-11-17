import Models from '../../models'
import {
  IGetBalanceResponse,
  IGetUsersResponse,
  IUpdateUser
} from './interface/users.interface'

export class UsersService {
  async getUsers(req: any): Promise<IGetUsersResponse> {
    const users = await Models.UsersModel.getUsers()

    if (users.length) {
      const filteredUsers = users.map(
        ({ userId, login, email, balance, roleId }) => ({
          userId,
          login,
          email,
          balance,
          roleId
        })
      )

      return { message: null, errors: null, users: filteredUsers }
    }

    return {
      message: null,
      errors: [
        { field: 'getUsers', message: req.__('USERS.getUsers.notFound') }
      ],
      users: null
    }
  }

  async getBalance(req: any, userId: number): Promise<IGetBalanceResponse> {
    const user = await Models.UsersModel.findByUserId(userId)

    if (user) {
      return { message: null, errors: null, balance: user.balance }
    }

    return {
      message: null,
      errors: [{ field: 'user', message: req._('USERS.getBalance.notFound') }],
      balance: null
    }
  }

  async replenishBalanceUser(req: any, params: IUpdateUser) {
    const user = await Models.UsersModel.findByUserId(params.userId)

    if (user) {
      const hasUpdate = await Models.UsersModel.update({
        userId: user.userId,
        balance: +user.balance + params.balance
      })

      if (hasUpdate.affected === 1) {
        return {
          message: req.__('USERS.replenishBalanceUser.success')
        }
      }

      return {
        errors: [
          {
            field: 'updateUser',
            message: req.__('USERS.replenishBalanceUser.error')
          }
        ]
      }
    }

    return {
      errors: [
        {
          field: 'userId',
          message: req.__('USERS.replenishBalanceUser.notFound')
        }
      ]
    }
  }

  async writeOffBalanceUser(params: IUpdateUser) {
    const user = await Models.UsersModel.findByUserId(params.userId)

    if (user) {
      const hasUpdate = await Models.UsersModel.update({
        userId: user.userId,
        balance: +user.balance - params.balance
      })

      if (hasUpdate.affected === 1) {
        return {
          message: 'Баланс пользователя был успешно обновлён'
        }
      }

      return {
        errors: [
          { field: 'updateUser', message: 'Неудалось обновить пользователя' }
        ]
      }
    }

    return {
      errors: [
        {
          field: 'userId',
          message: 'Пользователя с указанным userId не существует'
        }
      ]
    }
  }
}
