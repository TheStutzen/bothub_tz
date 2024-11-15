import { SessionOptions } from 'express-session'
import { CustomSessionStore } from './session-store'

export function SessionConfig(): SessionOptions {
  const sessionStore = new CustomSessionStore()

  return {
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    saveUninitialized: false,
    resave: true,
    proxy: true,
    store: sessionStore,
    cookie:
      process.env.NODE_ENV === 'development'
        ? {
            path: '/',
            httpOnly: false,
            maxAge: 2592000000,
            domain: process.env.COOKIE_DOMAIN
          }
        : {
            path: '/',
            httpOnly: false,
            maxAge: 2592000000,
            domain: process.env.COOKIE_DOMAIN
          }
  }
}
