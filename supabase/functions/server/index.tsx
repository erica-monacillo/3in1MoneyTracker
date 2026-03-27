import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-198ff430/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ TRANSACTIONS (Cash Flow) ============

// Get all transactions for a user and month
app.get("/make-server-198ff430/transactions/:userId/:month/:year", async (c) => {
  try {
    const userId = c.req.param("userId");
    const month = c.req.param("month");
    const year = c.req.param("year");
    const key = `transactions:${userId}:${year}:${month}`;
    
    const data = await kv.get(key);
    return c.json({ transactions: data || [] });
  } catch (error) {
    console.log(`Error fetching transactions: ${error}`);
    return c.json({ error: "Failed to fetch transactions" }, 500);
  }
});

// Save transactions
app.post("/make-server-198ff430/transactions/:userId/:month/:year", async (c) => {
  try {
    const userId = c.req.param("userId");
    const month = c.req.param("month");
    const year = c.req.param("year");
    const key = `transactions:${userId}:${year}:${month}`;
    const body = await c.req.json();
    
    await kv.set(key, body.transactions);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error saving transactions: ${error}`);
    return c.json({ error: "Failed to save transactions" }, 500);
  }
});

// ============ DUES (Bills) ============

// Get dues for a user and month
app.get("/make-server-198ff430/dues/:userId/:month", async (c) => {
  try {
    const userId = c.req.param("userId");
    const month = c.req.param("month");
    const key = `dues:${userId}:${month}`;
    
    const data = await kv.get(key);
    return c.json({ dues: data || [] });
  } catch (error) {
    console.log(`Error fetching dues: ${error}`);
    return c.json({ error: "Failed to fetch dues" }, 500);
  }
});

// Save dues
app.post("/make-server-198ff430/dues/:userId/:month", async (c) => {
  try {
    const userId = c.req.param("userId");
    const month = c.req.param("month");
    const key = `dues:${userId}:${month}`;
    const body = await c.req.json();
    
    await kv.set(key, body.dues);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error saving dues: ${error}`);
    return c.json({ error: "Failed to save dues" }, 500);
  }
});

// ============ IPON CHALLENGES ============

// Get challenge progress
app.get("/make-server-198ff430/challenges/:userId/:challengeId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const challengeId = c.req.param("challengeId");
    const key = `challenge:${userId}:${challengeId}`;
    
    const data = await kv.get(key);
    return c.json({ circles: data || [] });
  } catch (error) {
    console.log(`Error fetching challenge: ${error}`);
    return c.json({ error: "Failed to fetch challenge" }, 500);
  }
});

// Save challenge progress
app.post("/make-server-198ff430/challenges/:userId/:challengeId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const challengeId = c.req.param("challengeId");
    const key = `challenge:${userId}:${challengeId}`;
    const body = await c.req.json();
    
    await kv.set(key, body.circles);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error saving challenge: ${error}`);
    return c.json({ error: "Failed to save challenge" }, 500);
  }
});

// ============ USER SETTINGS ============

// Get user settings (starting balance, person name, etc.)
app.get("/make-server-198ff430/settings/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const key = `settings:${userId}`;
    
    const data = await kv.get(key);
    return c.json({ settings: data || {} });
  } catch (error) {
    console.log(`Error fetching settings: ${error}`);
    return c.json({ error: "Failed to fetch settings" }, 500);
  }
});

// Save user settings
app.post("/make-server-198ff430/settings/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const key = `settings:${userId}`;
    const body = await c.req.json();
    
    await kv.set(key, body.settings);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error saving settings: ${error}`);
    return c.json({ error: "Failed to save settings" }, 500);
  }
});

Deno.serve(app.fetch);