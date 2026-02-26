import { db } from "./db";
import { demoRequests, type InsertDemoRequest, type DemoRequestResponse, type DemoRequest } from "@shared/schema";

export interface IStorage {
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequestResponse>;
}

export class DatabaseStorage implements IStorage {
  async createDemoRequest(insertRequest: InsertDemoRequest): Promise<DemoRequestResponse> {
    if (!db) throw new Error("Database not initialized");
    const [request] = await db.insert(demoRequests).values(insertRequest).returning();
    return request;
  }
}

export class MemStorage implements IStorage {
  private demoRequests: DemoRequest[] = [];
  private currentId: number = 1;

  async createDemoRequest(insertRequest: InsertDemoRequest): Promise<DemoRequestResponse> {
    const request: DemoRequest = {
      id: this.currentId++,
      name: insertRequest.name,
      email: insertRequest.email,
      phone: insertRequest.phone ?? null,
      company: insertRequest.company ?? null,
      message: insertRequest.message ?? null,
      createdAt: new Date(),
    };
    this.demoRequests.push(request);
    return request;
  }
}

export const storage = db ? new DatabaseStorage() : new MemStorage();