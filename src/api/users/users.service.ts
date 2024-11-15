import Models from '../../models'
import { IUpdateUser } from './interface/users.interface'

export class UsersService {
  async getUsers() {
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
      errors: [{ field: 'getUsers', message: 'Пользователей не найдено' }]
    }
  }

  async getBalance(userId: number) {
    const user = await Models.UsersModel.findByUserId(userId)

    if (user) {
      return { balance: user.balance }
    }

    return {
      users: null,
      errors: [{ field: 'user', message: 'Пользователя не найдено' }]
    }
  }

  async replenishBalanceUser(params: IUpdateUser) {
    const user = await Models.UsersModel.findByUserId(params.userId)

    if (user) {
      const hasUpdate = await Models.UsersModel.update({
        userId: user.userId,
        balance: +user.balance + params.balance
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
