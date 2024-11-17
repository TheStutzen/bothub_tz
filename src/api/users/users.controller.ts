import { validation } from '../../validator/validation'
import { dtoUserUpdate } from './dto/users.dto'
import { IUpdateUser } from './interface/users.interface'
import { UsersService } from './users.service'

export class UsersController {
  usersService = new UsersService()

  async getUsers(req: any, res: any) {
    try {
      const result = await this.usersService.getUsers(req)

      if (result.users) {
        res.status(200).json(result)
      } else {
        res.status(404).json(result)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getBalance(req: any, res: any) {
    try {
      const result = await this.usersService.getBalance(
        req,
        req.session.user.userId
      )

      if (result.balance) {
        res.status(200).json(result)
      } else {
        res.status(404).json(result)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async replenishBalanceUser(req: any, res: any) {
    const params: IUpdateUser = req.body

    if (params.userId == null || params.balance == null) {
      return res.status(400).json({
        errors: [
          {
            field: 'userId or balance',
            message: req.__(
              'VALIDATORS.replenishBalanceUserParams.notSpecified'
            )
          }
        ]
      })
    }

    const validate = validation(dtoUserUpdate, params)

    if (validate) {
      return res.status(400).json({ errors: validate.errors })
    }

    try {
      const result = await this.usersService.replenishBalanceUser(req, params)

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
