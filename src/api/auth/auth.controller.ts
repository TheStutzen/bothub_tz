import { validation } from '../../validator/validation'
import { ISignUp } from '../auth/interface/auth.interface'
import { AuthService } from './auth.service'
import { ISignIn } from './interface/auth.interface'
import { dtoSignIn, dtoSignUp } from './dto/auth.dto'

export class AuthController {
  authService = new AuthService()

  async signUp(req: any, res: any) {
    const params: ISignUp = req.body

    if (params.email == null || params.login == null || params.password == null)
      return res.status(400).json({
        errors: [
          {
            field: 'email or login or password',
            message: 'Какое-то или все значения не были переданы'
          }
        ]
      })

    const validate = validation(dtoSignUp, params)

    if (validate) {
      return res.status(400).json({ errors: validate.errors })
    }

    try {
      const result = await this.authService.signUp(params)

      if (result.message) {
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

    if (params.login == null || params.password == null)
      return res.status(400).json({
        errors: [
          {
            field: 'login or password',
            message: 'Логин или пароль не были указаны'
          }
        ]
      })

    const validate = validation(dtoSignIn, params)

    if (validate) {
      return res.status(400).json({ errors: validate.errors })
    }

    try {
      const result = await this.authService.signIn(req, params)

      if (result.message) {
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

      if (result.message) {
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
}
