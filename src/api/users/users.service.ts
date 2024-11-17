import Models from '../../models'
import { IUpdateUser } from './interface/users.interface'

export class UsersService {
  async getUsers(req: any) {
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

      return { users: filteredUsers }
    }

    return {
      users: null,
      errors: [
        { field: 'getUsers', message: req.__('USERS.getUsers.notFound') }
      ]
    }
  }

  async getBalance(req: any, userId: number) {
    const user = await Models.UsersModel.findByUserId(userId)

    if (user) {
      return { balance: user.balance }
    }

    return {
      users: null,
      errors: [{ field: 'user', message: req._('USERS.getBalance.notFound') }]
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
