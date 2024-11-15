/* eslint-disable @typescript-eslint/no-require-imports */
import { Request, Response, NextFunction } from 'express'
import { CheckSession } from '../guard'
import { AuthController } from '../api/auth/auth.controller'
import { UsersController } from '../api/users/users.controller'
import { LlmController } from '../api/llm/llm.controller'
import * as swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../libs/swagger'

const checkSessionMiddleware =
  (service: string, permission: string, isAdmin: boolean) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const guard = await CheckSession(req, service, permission, isAdmin)

    if (!guard.ok) {
      return res
        .status(403)
        .json({ errors: [{ field: 'auth', message: guard.message }] })
    }

    next()
  }

export class Routes {
  authController = new AuthController()
  usersController = new UsersController()
  llmController = new LlmController()

  constructor(app: any) {
    this.registerRoutes(app)
  }

  registerRoutes(app: any) {
    // AUTH

    /**
     * @swagger
     * tags:
     *   - name: Auth
     *     description: Authentication related endpoints
     * /api/signUp:
     *   post:
     *     tags: [Auth]
     *     summary: Sign up a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               login:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Successfully signed up
     *       400:
     *         description: Invalid request
     */
    app.post(
      '/api/signUp',
      async (req, res) => await this.authController.signUp(req, res)
    )

    /**
     * @swagger
     * /api/signIn:
     *   post:
     *     tags: [Auth]
     *     summary: SignIn user
     *     security:
     *       - cookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               login:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Успешная авторизация
     *       400:
     *         description: Invalid request
     */
    app.post(
      '/api/signIn',
      async (req, res) => await this.authController.signIn(req, res)
    )

    /**
     * @swagger
     * /api/fetchSession:
     *   get:
     *     tags: [Auth]
     *     summary: fetchSession user
     *     security:
     *       - cookieAuth: []
     *     responses:
     *       200:
     *         description: Вы авторизованы
     *       400:
     *         description: Invalid request
     */
    app.get(
      '/api/fetchSession',
      async (req, res) => await this.authController.fetchSession(req, res)
    )

    /**
     * @swagger
     * /api/signOut:
     *   get:
     *     tags: [Auth]
     *     summary: signOut user
     *     security:
     *       - cookieAuth: []
     *     responses:
     *       200:
     *         description: Вы успешно вышли
     *       400:
     *         description: Invalid request
     */
    app.get(
      '/api/signOut',
      async (req, res) => await this.authController.signOut(req, res)
    )

    // USERS

    /**
     * @swagger
     * tags:
     *   - name: Users
     *     description: Users related endpoints
     * /api/getBalance:
     *   get:
     *     tags: [Users]
     *     summary: Check balance user
     *     security:
     *       - cookieAuth: []
     *     responses:
     *       200:
     *         description: balance
     *       400:
     *         description: Invalid request
     */
    app.get(
      '/api/getBalance',
      checkSessionMiddleware('UsersService', 'get', false),
      async (req, res) => {
        await this.usersController.getBalance(req, res)
      }
    )

    // USERS CP

    /**
     * @swagger
     * tags:
     *   - name: CP
     *     description: Control Panel related endpoints
     * /api/cp/getUsers:
     *   get:
     *     tags: [CP]
     *     summary: Get all users
     *     security:
     *       - cookieAuth: []
     *     responses:
     *       200:
     *         description: array users
     *       400:
     *         description: Invalid request
     */
    app.get(
      '/api/cp/getUsers',
      checkSessionMiddleware('UsersService', 'get', true),
      async (req, res) => {
        await this.usersController.getUsers(req, res)
      }
    )

    /**
     * @swagger
     * tags:
     *   - name: CP
     *     description: CP related endpoints
     * /api/cp/replenisheBalanceUser:
     *   patch:
     *     tags: [CP]
     *     summary: Replenishment of user balance
     *     security:
     *       - cookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               userId:
     *                 type: number
     *               balance:
     *                 type: number
     *     responses:
     *       200:
     *         description: balance
     *       400:
     *         description: Invalid request
     */
    app.patch(
      '/api/cp/replenisheBalanceUser',
      checkSessionMiddleware('UsersService', 'update', true),
      async (req, res) => {
        await this.usersController.replenishBalanceUser(req, res)
      }
    )

    // LLM

    /**
     * @swagger
     * tags:
     *   - name: LLM
     *     description: LLM related endpoints
     * /api/generateText:
     *   post:
     *     tags: [LLM]
     *     summary: Request to AI awaiting response
     *     security:
     *       - cookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               model:
     *                 type: string
     *                 default: 'gpt3'
     *                 required: false
     *               text:
     *                 type: string
     *                 required: true
     *     responses:
     *       200:
     *         description: message AI
     *       400:
     *         description: Invalid request
     */
    app.post(
      '/api/generateText',
      checkSessionMiddleware('LlmService', 'get', false),
      async (req, res) => {
        await this.llmController.generateText(req, res)
      }
    )

    /**
     * @swagger
     * tags:
     *   - name: LLM
     *     description: LLM related endpoints
     * /api/generateTextStream:
     *   post:
     *     tags: [LLM]
     *     summary: Request to AI with response in the form of a stream
     *     security:
     *       - cookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               model:
     *                 type: string
     *                 default: 'gpt3'
     *                 required: false
     *               text:
     *                 type: string
     *                 required: true
     *     responses:
     *       200:
     *         description: message AI
     *       400:
     *         description: Invalid request
     */
    app.post(
      '/api/generateTextStream',
      checkSessionMiddleware('LlmService', 'get', false),
      async (req, res) => {
        await this.llmController.generateTextPart(req, res)
      }
    )

    // SWAGGER
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }
}
