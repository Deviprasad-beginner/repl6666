import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const diaries = pgTable("diaries", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  authorId: text("author_id").notNull(),
  isPrivate: boolean("is_private").default(false),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const whispers = pgTable("whispers", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  hearts: integer("hearts").default(0),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const mindMaze = pgTable("mind_maze", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'puzzle' or 'philosophy'
  content: text("content").notNull(),
  responses: integer("responses").default(0),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const nightCircles = pgTable("night_circles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  members: integer("members").default(0),
  active: boolean("active").default(false),
  online: integer("online").default(0),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const midnightCafe = pgTable("midnight_cafe", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  authorId: text("author_id").notNull(),
  replies: integer("replies").default(0),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDiarySchema = createInsertSchema(diaries).omit({
  id: true,
  timestamp: true,
});

export const insertWhisperSchema = createInsertSchema(whispers).omit({
  id: true,
  timestamp: true,
  hearts: true,
});

export const insertMindMazeSchema = createInsertSchema(mindMaze).omit({
  id: true,
  timestamp: true,
  responses: true,
});

export const insertNightCircleSchema = createInsertSchema(nightCircles).omit({
  id: true,
  timestamp: true,
});

export const insertMidnightCafeSchema = createInsertSchema(midnightCafe).omit({
  id: true,
  timestamp: true,
  replies: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Diary = typeof diaries.$inferSelect;
export type InsertDiary = z.infer<typeof insertDiarySchema>;

export type Whisper = typeof whispers.$inferSelect;
export type InsertWhisper = z.infer<typeof insertWhisperSchema>;

export type MindMaze = typeof mindMaze.$inferSelect;
export type InsertMindMaze = z.infer<typeof insertMindMazeSchema>;

export type NightCircle = typeof nightCircles.$inferSelect;
export type InsertNightCircle = z.infer<typeof insertNightCircleSchema>;

export type MidnightCafe = typeof midnightCafe.$inferSelect;
export type InsertMidnightCafe = z.infer<typeof insertMidnightCafeSchema>;
