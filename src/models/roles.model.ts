import { Role } from '../api/roles/entity/roles.entity'
import { pgDataSource } from '../database/database.config'

export class RolesModel {
  rolesRepository = pgDataSource.getRepository(Role)

  async findById(id: number) {
    return await this.rolesRepository
      .createQueryBuilder('roles')
      .where('roles.id = :id', { id })
      .getOne()
  }
}
