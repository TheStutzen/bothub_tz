import { validation } from '../../validator/validation'
import { IRemind, ISignUp } from '../auth/interface/auth.interface'
import { AuthService } from './auth.service'
import { ISignIn } from './interface/auth.interface'
import { dtoRemind, dtoSignIn, dtoSignUp } from './dto/auth.dto'

export class AuthController {
  authService = new AuthService()

  async signUp(req: any, res: any) {
    const params: ISignUp = req.body

    if (
      params.email == null ||
      params.login == null ||
      params.password == null
    ) {
      return res.status(400).json({
        errors: [
          {
            field: 'email or login or password',
            message: req.__('VALIDATORS.signUpParams.notSpecified')
          }
        ]
      })
    }

    const validate = validation(dtoSignUp, params)

    if (validate) {
      return res.status(400).json({ errors: validate.errors })
    }

    try {
      const result = await this.authService.signUp(res, params)

      if (result.user) {
        res.status(201).json(result)
      } else {
        res.status(400).json(result)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async signIn(req: any, res: any) {
    const params: ISignIn = req.body

    if (params.login == null || params.password == null) {
      return res.status(400).json({
        errors: [
          {
            field: 'login or password',
            message: req.__('VALIDATORS.signInParams.notSpecified')
          }
        ]
      })
    }

    const validate = validation(dtoSignIn, params)

    if (validate) {
      return res.status(400).json({ errors: validate.errors })
    }

    try {
      const result = await this.authService.signIn(req, params)

      if (result.user) {
        res.status(200).json(result)
      } else {
        res.status(400).json(result)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async fetchSession(req: any, res: any) {
    try {
      const result = await this.authService.fetchSession(req)

      if (result.user) {
        res.status(200).json(result)
      } else {
        res.status(400).json(result)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async signOut(req: any, res: any) {
    try {
      const result = await this.authService.signOut(req)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async remind(req: any, res: any) {
    const params: IRemind = req.body

    if (params.login == null) {
      return res.status(400).json({
        errors: [
          {
            field: 'login',
            message: req.__('VALIDATORS.remindParams.notSpecified')
          }
        ]
      })
    }

    const validate = validation(dtoRemind, params)

    if (validate) {
      return res.status(400).json({ errors: validate.errors })
    }

    try {
      const result = await this.authService.remind(req, params)

      if (result.message) {
        res.status(200).json(result)
      } else {
        res.status(400).json(result)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
