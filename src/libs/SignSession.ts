import * as signature from 'cookie-signature'

export const signSession = function (sessionId: string): string {
  return encodeURIComponent(
    's:' + signature.sign(sessionId, process.env.SESSION_SECRET)
  )
}
