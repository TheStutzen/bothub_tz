import * as session from 'express-session'
import Models from '../../models'

export class CustomSessionStore extends session.Store {
  async get(
    sid: string,
    callback: (err: any, session?: session.SessionData | null) => void
  ): Promise<void> {
    try {
      const response = await Models.SessionsModel.sessionRead({ sid: sid })

      if (!response) {
        return callback(null, null) // not found
      }

      const now = Math.round(Date.now() / 1000)
      if (response.expires < now) {
        return callback(null, null) // expired
      }

      let data = response.session

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch (error) {
          console.error(`Failed to parse data for session (${sid})`)
          console.error(error)
          return callback(error)
        }
      }

      return callback(null, data)
    } catch (error) {
      console.error(`Failed to get session: ${sid}`)
      console.error(error)
      return callback(error)
    }
  }

  async set(
    sid: string,
    session: session.SessionData,
    callback?: (err?: any) => void
  ): Promise<void> {
    try {
      let expires

      if (session.cookie) {
        if (session.cookie.expires) {
          expires = session.cookie.expires
        }
      }

      if (!expires) {
        expires = Date.now()
      }
      if (!(expires instanceof Date)) {
        expires = new Date(expires)
      }

      expires = Math.round(expires.getTime() / 1000)
      const data = JSON.stringify(session)

      await Models.SessionsModel.sessionCreate({
        sid,
        expires,
        session: data
      })

      if (callback) {
        callback()
      }
    } catch (error) {
      if (callback) {
        callback(error)
      }
    }
  }

  async destroy(sid: string): Promise<void> {
    await Models.SessionsModel.sessionDelete({ sid: sid })
  }
}
