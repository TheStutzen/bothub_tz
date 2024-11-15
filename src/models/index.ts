import { RolesModel } from './roles.model'
import { SessionsModel } from './sessions.model'
import { UsersModel } from './users.model'

export default {
  UsersModel: new UsersModel(),
  SessionsModel: new SessionsModel(),
  RolesModel: new RolesModel()
}
