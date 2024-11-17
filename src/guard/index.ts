import { SessionInterface } from './guard.interface'
import Models from '../models/index'
import { AccessControlService } from '../libs/access-control/access-control.service'

export const CheckSession = async (
  req: any,
  essence: string,
  method: string,
  cp: boolean
): Promise<SessionInterface> => {
  let checker: any
  const user = req.session?.user
  const accessControlService = new AccessControlService()
  accessControlService.onModuleInit()

  const methodsCpMap = {
    create: accessControlService.createAny.bind(accessControlService),
    get: accessControlService.readAny.bind(accessControlService),
    update: accessControlService.updateAny.bind(accessControlService),
    delete: accessControlService.deleteAny.bind(accessControlService)
  }

  const methodsMap = {
    create: accessControlService.createOwn.bind(accessControlService),
    get: accessControlService.readOwn.bind(accessControlService),
    update: accessControlService.updateOwn.bind(accessControlService),
    delete: accessControlService.deleteOwn.bind(accessControlService)
  }

  if (user) {
    const dbUser = await Models.UsersModel.findByUserId(user.userId)
    const role = await Models.RolesModel.findById(dbUser.roleId)

    if (cp) {
      checker = methodsCpMap[method]
    } else {
      checker = methodsMap[method]
    }

    const hasAccess = await checker(essence, role.key)

    if (hasAccess.granted) {
      return {
        ok: true,
        user: dbUser,
        sessionId: req.sessionID
      }
    }

    return {
      ok: false,
      message: req.__('HTTP.403')
    }
  }

  return {
    ok: false,
    message: req.__('HTTP.401')
  }
}
