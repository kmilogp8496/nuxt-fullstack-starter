import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').notNull().unique(),
})

export type InsertUser = typeof users.$inferInsert

export type User = typeof users.$inferSelect
