import { join } from 'pathe'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: 'server/database/migrations',
  schema: ['./server/database/**/*.schema.ts'],
  driver: 'better-sqlite',
  dbCredentials: {
    url: join(process.cwd(), './db.sqlite'),
  },
})