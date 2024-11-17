import { pgDataSource } from '../database/database.config'
import { User } from '../api/users/entity/users.entity'
import { IUpdateUser } from 'src/api/users/interface/users.interface'

export class UsersModel {
  usersRepository = pgDataSource.getRepository(User)

  async create(user) {
    return await this.usersRepository.save(user)
  }

  async findByLogin(login: string) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .where('users.login = :login', { login })
      .getOne()
  }

  async getUsers() {
    return await this.usersRepository.createQueryBuilder('users').getMany()
  }

  async findByUserId(userId: number) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .where('users.userId = :userId', { userId })
      .getOne()
  }

  async update(params: IUpdateUser) {
    return await this.usersRepository.update(params.userId, {
      balance: params.balance
    })
  }

  async updateRemind(params: any) {
    return await this.usersRepository.update(params.userId, {
      password: params.password
    })
  }
}
