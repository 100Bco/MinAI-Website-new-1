import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

const insertDemoRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const input = insertDemoRequestSchema.parse(req.body);

    // If DATABASE_URL is configured, persist to PostgreSQL
    if (process.env.DATABASE_URL) {
      const pg = await import("pg");
      const pool = new pg.default.Pool({
        connectionString: process.env.DATABASE_URL,
      });
      try {
        const result = await pool.query(
          `INSERT INTO demo_requests (name, email, phone, company, message, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           RETURNING *`,
          [input.name, input.email, input.phone ?? null, input.company ?? null, input.message ?? null]
        );
        await pool.end();
        return res.status(201).json(result.rows[0]);
      } catch (dbErr) {
        await pool.end();
        console.error("Database error:", dbErr);
        return res.status(500).json({ message: "Database error" });
      }
    }

    // No DATABASE_URL — return success with mock response
    return res.status(201).json({
      id: Date.now(),
      ...input,
      phone: input.phone ?? null,
      company: input.company ?? null,
      message: input.message ?? null,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join("."),
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
