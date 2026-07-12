import { eq, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  users,
  articles,
  contactSubmissions,
  type InsertArticle,
  type InsertContactSubmission,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ----- Users / auth -----

export async function getUserByUsername(username: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function touchLastSignedIn(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, id));
}

// ----- Article queries -----

export async function getArticles() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(articles)
    .where(eq(articles.published, 1))
    .orderBy(desc(articles.publishedAt));
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createArticle(data: InsertArticle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const toInsert = { ...data };
  if (toInsert.published === 1 && !toInsert.publishedAt) {
    toInsert.publishedAt = new Date();
  }

  return await db.insert(articles).values(toInsert);
}

export async function updateArticle(id: number, data: Partial<InsertArticle>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const toUpdate = { ...data };
  if (toUpdate.published === 1) {
    const existing = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
    if (existing.length > 0 && !existing[0].publishedAt) {
      toUpdate.publishedAt = new Date();
    }
  }

  return await db.update(articles).set(toUpdate).where(eq(articles.id, id));
}

export async function deleteArticle(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.delete(articles).where(eq(articles.id, id));
}

export async function getAdminArticles(authorId?: number) {
  const db = await getDb();
  if (!db) return [];

  if (authorId) {
    return await db
      .select()
      .from(articles)
      .where(eq(articles.authorId, authorId))
      .orderBy(desc(articles.updatedAt));
  }

  return await db.select().from(articles).orderBy(desc(articles.updatedAt));
}

export async function incrementArticleViews(id: number, currentViews: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(articles).set({ views: currentViews + 1 }).where(eq(articles.id, id));
}

// ----- Contact submissions -----

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(contactSubmissions).values(data);
}

export async function getContactSubmissions() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function markContactSubmissionRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.update(contactSubmissions).set({ read: 1 }).where(eq(contactSubmissions.id, id));
}

export async function deleteContactSubmission(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

export async function getSubscriberEmails(): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];

  const rows = await db
    .selectDistinct({ email: contactSubmissions.email })
    .from(contactSubmissions);

  return rows.map((r) => r.email).filter(Boolean);
}