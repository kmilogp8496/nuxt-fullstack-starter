import { eq } from 'drizzle-orm'
import type { InsertUser } from '~/server/database/user/users.schema'
import { users } from '~/server/database/user/users.schema'

interface GoogleTokensSession {
  access_token: string
  expires_in: number
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid'
  token_type: 'Bearer'
  id_token: string
}
interface GoogleUserSession {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: true
  locale: 'es' | 'en' | (string & NonNullable<unknown>)
}

export default oauth.googleEventHandler({
  config: {
    redirectUrl: '/auth/google',
  },
  // @ts-expect-error expected error for miss typing
  async onSuccess(event, { user }: { user: GoogleUserSession, tokens: GoogleTokensSession }) {
    const db = useDB()
    let dbUser = await db.select().from(users).where(eq(users.email, user?.email)).get()

    if (!dbUser) {
      const newUser: InsertUser = {
        email: user.email,
        firstName: user.name,
        lastName: user.family_name,
      }

      dbUser = await db.insert(users).values(newUser).returning().get()
    }

    await setUserSession(event, {
      user: dbUser,
      loggedInAt: new Date().toISOString(),
    })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
