import type { User } from '~/server/database/user/users.schema'

declare module '#auth-utils' {
  interface UserSession {
    user: User
    loggedInAt: string
  }
}
export {}
