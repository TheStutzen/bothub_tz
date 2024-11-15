import * as express from 'express'
// import * as request from 'supertest'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import { pgDataSource } from '../src/database/database.config'
import { SessionConfig } from '../src/libs/sessionstore/sessiondb.config'
import { Routes } from '../src/routes'

describe('BotHub API', () => {
  let app: express.Application
  // let agent: request.SuperAgentTest
  // let cookies: string

  beforeAll(async () => {
    await pgDataSource
      .initialize()
      .then(() => console.info('Database connected'))
      .catch((err) => console.error(err))

    app = express()

    app.use(express.json())
    app.use(cookieParser())
    app.use(session(SessionConfig()))

    new Routes(app)
  })

  afterAll(async () => {
    await pgDataSource.destroy()
  })
})
