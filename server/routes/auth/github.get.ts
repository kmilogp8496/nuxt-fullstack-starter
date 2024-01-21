import { eq } from 'drizzle-orm'
import type { InsertUser } from '~/server/database/user/users.schema'
import { users } from '~/server/database/user/users.schema'

interface GithubUserSession {
  login: string // username
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: ''
  url: string // profile url
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: false
  name: string
  company: null | string
  blog: string
  location: string | null
  email: string
  hireable: string | null
  bio: string | null
  twitter_username: null | string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

interface GithubTokensSession {
  access_token: string
  token_type: string
  scope: string
}

export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  // @ts-expect-error expected error for miss typing
  async onSuccess(event, { user }: { user: GithubUserSession, tokens: GithubTokensSession }) {
    const db = useDB()
    let dbUser = await db.select().from(users).where(eq(users.email, user.email)).get()

    if (!dbUser) {
      const newUser: InsertUser = {
        email: user.email,
        firstName: user.name,
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
    console.error('Github OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
