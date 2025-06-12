import { users, type User, type InsertUser, Diary, InsertDiary, Whisper, InsertWhisper, MindMaze, InsertMindMaze, NightCircle, InsertNightCircle, MidnightCafe, InsertMidnightCafe } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Diary operations
  createDiary(diary: InsertDiary): Promise<Diary>;
  getDiaries(filterPublic?: boolean): Promise<Diary[]>;
  getDiary(id: number): Promise<Diary | undefined>;
  
  // Whisper operations
  createWhisper(whisper: InsertWhisper): Promise<Whisper>;
  getWhispers(): Promise<Whisper[]>;
  incrementWhisperHearts(id: number): Promise<void>;
  
  // Mind Maze operations
  createMindMaze(mindMaze: InsertMindMaze): Promise<MindMaze>;
  getMindMaze(): Promise<MindMaze[]>;
  incrementMindMazeResponses(id: number): Promise<void>;
  
  // Night Circle operations
  createNightCircle(nightCircle: InsertNightCircle): Promise<NightCircle>;
  getNightCircles(): Promise<NightCircle[]>;
  updateNightCircleMembers(id: number, members: number): Promise<void>;
  
  // Midnight Cafe operations
  createMidnightCafe(midnightCafe: InsertMidnightCafe): Promise<MidnightCafe>;
  getMidnightCafe(): Promise<MidnightCafe[]>;
  incrementCafeReplies(id: number): Promise<void>;
}

import { db } from "./db";
import { users, diaries, whispers, mindMaze, nightCircles, midnightCafe } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Diary operations
  async createDiary(diary: InsertDiary): Promise<Diary> {
    const [newDiary] = await db.insert(diaries).values(diary).returning();
    return newDiary;
  }

  async getDiaries(filterPublic = false): Promise<Diary[]> {
    let result = await db.select().from(diaries).orderBy(desc(diaries.timestamp));
    
    if (filterPublic) {
      return result.filter(diary => !diary.isPrivate);
    }
    return result;
  }

  async getDiary(id: number): Promise<Diary | undefined> {
    const [diary] = await db.select().from(diaries).where(eq(diaries.id, id));
    return diary || undefined;
  }

  // Whisper operations
  async createWhisper(whisper: InsertWhisper): Promise<Whisper> {
    const [newWhisper] = await db.insert(whispers).values(whisper).returning();
    return newWhisper;
  }

  async getWhispers(): Promise<Whisper[]> {
    return await db.select().from(whispers).orderBy(desc(whispers.timestamp));
  }

  async incrementWhisperHearts(id: number): Promise<void> {
    const [whisper] = await db.select().from(whispers).where(eq(whispers.id, id));
    if (whisper) {
      await db.update(whispers)
        .set({ hearts: (whisper.hearts || 0) + 1 })
        .where(eq(whispers.id, id));
    }
  }

  // Mind Maze operations
  async createMindMaze(maze: InsertMindMaze): Promise<MindMaze> {
    const [newMaze] = await db.insert(mindMaze).values(maze).returning();
    return newMaze;
  }

  async getMindMaze(): Promise<MindMaze[]> {
    return await db.select().from(mindMaze).orderBy(desc(mindMaze.timestamp));
  }

  async incrementMindMazeResponses(id: number): Promise<void> {
    const [maze] = await db.select().from(mindMaze).where(eq(mindMaze.id, id));
    if (maze) {
      await db.update(mindMaze)
        .set({ responses: (maze.responses || 0) + 1 })
        .where(eq(mindMaze.id, id));
    }
  }

  // Night Circle operations
  async createNightCircle(circle: InsertNightCircle): Promise<NightCircle> {
    const [newCircle] = await db.insert(nightCircles).values(circle).returning();
    return newCircle;
  }

  async getNightCircles(): Promise<NightCircle[]> {
    return await db.select().from(nightCircles).orderBy(desc(nightCircles.timestamp));
  }

  async updateNightCircleMembers(id: number, members: number): Promise<void> {
    await db.update(nightCircles)
      .set({ members })
      .where(eq(nightCircles.id, id));
  }

  // Midnight Cafe operations
  async createMidnightCafe(cafe: InsertMidnightCafe): Promise<MidnightCafe> {
    const [newCafe] = await db.insert(midnightCafe).values(cafe).returning();
    return newCafe;
  }

  async getMidnightCafe(): Promise<MidnightCafe[]> {
    return await db.select().from(midnightCafe).orderBy(desc(midnightCafe.timestamp));
  }

  async incrementCafeReplies(id: number): Promise<void> {
    const [cafe] = await db.select().from(midnightCafe).where(eq(midnightCafe.id, id));
    if (cafe) {
      await db.update(midnightCafe)
        .set({ replies: (cafe.replies || 0) + 1 })
        .where(eq(midnightCafe.id, id));
    }
  }
}

export const storage = new DatabaseStorage();
