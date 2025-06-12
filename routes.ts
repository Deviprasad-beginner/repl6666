import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDiarySchema, insertWhisperSchema, insertMindMazeSchema, insertNightCircleSchema, insertMidnightCafeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Diary routes
  app.get("/api/diaries", async (req, res) => {
    try {
      const diaries = await storage.getDiaries(true); // Filter public only
      res.json(diaries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch diaries" });
    }
  });

  app.post("/api/diaries", async (req, res) => {
    try {
      const validatedData = insertDiarySchema.parse(req.body);
      const diary = await storage.createDiary(validatedData);
      res.status(201).json(diary);
    } catch (error) {
      res.status(400).json({ error: "Invalid diary data" });
    }
  });

  // Whisper routes
  app.get("/api/whispers", async (req, res) => {
    try {
      const whispers = await storage.getWhispers();
      res.json(whispers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch whispers" });
    }
  });

  app.post("/api/whispers", async (req, res) => {
    try {
      const validatedData = insertWhisperSchema.parse(req.body);
      const whisper = await storage.createWhisper(validatedData);
      res.status(201).json(whisper);
    } catch (error) {
      res.status(400).json({ error: "Invalid whisper data" });
    }
  });

  app.patch("/api/whispers/:id/hearts", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.incrementWhisperHearts(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update hearts" });
    }
  });

  // Mind Maze routes
  app.get("/api/mindMaze", async (req, res) => {
    try {
      const mindMaze = await storage.getMindMaze();
      res.json(mindMaze);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mind maze" });
    }
  });

  app.post("/api/mindMaze", async (req, res) => {
    try {
      const validatedData = insertMindMazeSchema.parse(req.body);
      const mindMaze = await storage.createMindMaze(validatedData);
      res.status(201).json(mindMaze);
    } catch (error) {
      res.status(400).json({ error: "Invalid mind maze data" });
    }
  });

  app.patch("/api/mindMaze/:id/responses", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.incrementMindMazeResponses(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update responses" });
    }
  });

  // Night Circles routes
  app.get("/api/nightCircles", async (req, res) => {
    try {
      const nightCircles = await storage.getNightCircles();
      res.json(nightCircles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch night circles" });
    }
  });

  app.post("/api/nightCircles", async (req, res) => {
    try {
      const validatedData = insertNightCircleSchema.parse(req.body);
      const nightCircle = await storage.createNightCircle(validatedData);
      res.status(201).json(nightCircle);
    } catch (error) {
      res.status(400).json({ error: "Invalid night circle data" });
    }
  });

  app.patch("/api/nightCircles/:id/members", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { members } = req.body;
      await storage.updateNightCircleMembers(id, members);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update members" });
    }
  });

  // Midnight Cafe routes
  app.get("/api/midnightCafe", async (req, res) => {
    try {
      const midnightCafe = await storage.getMidnightCafe();
      res.json(midnightCafe);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch midnight cafe" });
    }
  });

  app.post("/api/midnightCafe", async (req, res) => {
    try {
      const validatedData = insertMidnightCafeSchema.parse(req.body);
      const midnightCafe = await storage.createMidnightCafe(validatedData);
      res.status(201).json(midnightCafe);
    } catch (error) {
      res.status(400).json({ error: "Invalid midnight cafe data" });
    }
  });

  app.patch("/api/midnightCafe/:id/replies", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.incrementCafeReplies(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update replies" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
