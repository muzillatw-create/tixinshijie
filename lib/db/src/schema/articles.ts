import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";

export const articlesTable = pgTable("articles", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  heroImage: text("hero_image").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  images: text("images").array().notNull().default([]),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Article = typeof articlesTable.$inferSelect;
export type InsertArticle = typeof articlesTable.$inferInsert;
