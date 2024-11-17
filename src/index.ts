import 'dotenv/config'
import * as express from 'express'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import { pgDataSource } from './database/database.config'
import { SessionConfig } from './libs/sessionstore/sessiondb.config'
import { Routes } from './routes'
import i18n from './locales'

const port = process.env.HTTP_PORT
const host = process.env.HTTP_HOST

async function startServer() {
  await pgDataSource
    .initialize()
    .then(() => console.info('Database connected'))
    .catch((err) => console.error(err))

  const app = express()

  app.use(i18n.init)
  app.use(express.json())
  app.use(cookieParser())
  app.use(session(SessionConfig()))

  new Routes(app)

  app.listen(port, () => {
    console.info(`🚀 Express is running at http://${host}:${port}/api`)
  })
}

startServer().catch((err) => {
  console.error(err)
})
