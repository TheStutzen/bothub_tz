/* eslint-disable @typescript-eslint/no-unused-vars */
import { compareHash, createHash } from '../../utils/Bcrypt'
import Models from '../../models'
import {
  IFetchSessionResponse,
  IRemind,
  ISignIn,
  ISignInResponse,
  ISignOutResponse,
  ISignUp,
  ISignUpResponse
} from './interface/auth.interface'
import { signSession } from '../../libs/SignSession'
// import { gp } from '../../utils/GenPass'

export class AuthService {
  async signUp(req: any, params: ISignUp): Promise<ISignUpResponse> {
    const { login, email, password } = params

    const check = await Models.UsersModel.findByLogin(params.login)

    if (check) {
      return {
        message: null,
        errors: [
          {
            field: 'login',
            message: req.__('AUTH.signUp.loginIsExist')
          }
        ],
        user: null
      }
    }

    const user = await Models.UsersModel.create({
      login,
      email,
      password: createHash(password),
      roleId: 3
    })

    if (user) {
      return {
        message: req.__('AUTH.signUp.success'),
        errors: null,
        user: {
          login: user.login,
          email: user.email,
          userId: user.userId,
          balance: user.balance,
          roleId: user.roleId
        }
      }
    }

    return {
      message: null,
      errors: [
        {
          field: 'signUp',
          message: req.__('AUTH.signUp.error')
        }
      ],
      user: null
    }
  }

  async signIn(req: any, params: ISignIn): Promise<ISignInResponse> {
    const user = await Models.UsersModel.findByLogin(params.login)

    if (!user) {
      return {
        message: null,
        errors: [
          {
            field: 'login or passwrod',
            message: req.__('AUTH.signIn.loginOrPasswordIncorrect')
          }
        ],
        sid: null,
        user: null
      }
    }

    const passwordIsMatch = compareHash(params.password, user.password)

    if (!passwordIsMatch) {
      return {
        message: null,
        errors: [
          {
            field: 'login or passwrod',
            message: req.__('AUTH.signIn.loginOrPasswordIncorrect')
          }
        ],
        sid: null,
        user: null
      }
    }

    req.session.user = {
      userId: user.userId
    }

    const sessionId = req.sessionID

    const { password, ...userWithoutPassword } = user

    return {
      message: req.__('AUTH.signIn.success'),
      errors: null,
      sid: signSession(sessionId),
      user: userWithoutPassword
    }
  }

  async fetchSession(req: any): Promise<IFetchSessionResponse> {
    if (!req.session.user) {
      return {
        message: null,
        errors: [
          {
            field: 'fetchSession',
            message: req.__('AUTH.fetchSession.sessionNotFound')
          }
        ],
        sid: null,
        user: null
      }
    }

    const userId = req.session.user.userId

    const user = await Models.UsersModel.findByUserId(userId)

    if (!user) {
      return {
        message: null,
        errors: [
          {
            field: 'fetchSession',
            message: req.__('AUTH.fetchSession.userNotExist')
          }
        ],
        sid: null,
        user: null
      }
    }

    const { password, ...userWithoutPassword } = user

    return {
      message: req.__('AUTH.fetchSession.success'),
      errors: null,
      sid: signSession(req.sessionID),
      user: userWithoutPassword
    }
  }

  async signOut(req: any): Promise<ISignOutResponse> {
    if (req.sessionID) {
      req.session.destroy(req.sessionID, (err) => {
        if (err) console.error('error destroy session', err)
      })

      return {
        message: req.__('AUTH.signOut.success'),
        errors: null
      }
    }

    return {
      message: req.__('AUTH.signOut.success'),
      errors: null
    }
  }

  async remind(params: IRemind) {
    const auth = await Models.UsersModel.findByLogin(params.login)

    if (auth) {
      // const password = gp()
      // const hashPass = createHash(password)
      // const hasUpdate = Models.UsersModel.update(auth.id, {
      //   password: hashPass
      // })
      // if (hasUpdate) {
      //   // Здесь можно добавить логику отправку сообщения через NODEMAILER
      // }
    }

    throw new Error('Пользователя с указанным логин не существует')
  }
}
