export interface User {
  userId: number
  login: string
  email: string
  balance: number
  dateReg: Date
}

export interface SessionInterface {
  ok: boolean
  user?: User
  message?: string
  sessionId?: string
}
