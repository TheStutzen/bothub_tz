/* eslint-disable @typescript-eslint/no-unused-vars */
import { compareHash, createHash } from '../../utils/Bcrypt'
import Models from '../../models'
import { IRemind, ISignIn, ISignUp } from './interface/auth.interface'
import { signSession } from '../../libs/SignSession'
// import { gp } from '../../utils/GenPass'

export class AuthService {
  async signUp(req: any, params: ISignUp) {
    const { login, email, password } = params

    const check = await Models.UsersModel.findByLogin(params.login)

    if (check) {
      return {
        errors: [
          {
            field: 'login',
            message: req.__('AUTH.signUp.loginIsExist')
          }
        ]
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
        user: {
          login: user.login,
          email: user.email,
          userId: user.userId,
          balance: user.balance
        }
      }
    }

    return {
      errors: [
        {
          field: 'signUp',
          message: req.__('AUTH.signUp.error')
        }
      ]
    }
  }

  async signIn(req: any, params: ISignIn) {
    const user = await Models.UsersModel.findByLogin(params.login)

    if (!user) {
      return {
        errors: [
          {
            field: 'login or passwrod',
            message: req.__('AUTH.signIn.loginOrPasswordIncorrect')
          }
        ]
      }
    }

    const passwordIsMatch = compareHash(params.password, user.password)

    if (!passwordIsMatch) {
      return {
        errors: [
          {
            field: 'login or passwrod',
            message: req.__('AUTH.signIn.loginOrPasswordIncorrect')
          }
        ]
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

  async fetchSession(req: any) {
    if (!req.session.user) {
      return {
        errors: [
          {
            field: 'fetchSession',
            message: req.__('AUTH.fetchSession.sessionNotFound')
          }
        ]
      }
    }

    const userId = req.session.user.userId

    const user = await Models.UsersModel.findByUserId(userId)

    if (!user) {
      return {
        errors: [
          {
            field: 'fetchSession',
            message: req.__('AUTH.fetchSession.userNotExist')
          }
        ]
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

  async signOut(req: any) {
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
