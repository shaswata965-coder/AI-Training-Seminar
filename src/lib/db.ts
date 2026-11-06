import mongoose from "mongoose";

export class DbUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbUnavailableError";
  }
}

type ConnCache = {
  promise: Promise<typeof mongoose> | null;
  /** Set once the connection is to the database the site will use (see `siteDatabase`). */
  ready: boolean;
  failedAt: number;
  boot: Promise<void> | null;
};

// Reuse one connection across hot reloads and route invocations.
const g = globalThis as unknown as { __diuaiMongo?: ConnCache };
const cache: ConnCache = (g.__diuaiMongo ??= { promise: null, ready: false, failedAt: 0, boot: null });

export const isDbConfigured = () => Boolean(process.env.MONGODB_URI);

/** The site's own database, on the server MONGODB_URI names, when the configured one can't be used (below). */
export const SITE_DB = "diu-ai-training";

const OPTIONS = { serverSelectionTimeoutMS: 5_000, maxPoolSize: 10, bufferCommands: false } as const;

/**
 * A database the site's earlier version (before it became the DIU AI Training Seminars) set up holds that
 * version's name, texts, schedule, FAQs and people, which would otherwise show on this site. It is recognised by
 * the record that version always stored and this one never does: a "hackathon" entry among the settings.
 */
async function holdsEarlierVersion(db: NonNullable<typeof mongoose.connection.db>): Promise<boolean> {
  return Boolean(await db.collection("singletons").findOne({ key: "hackathon" }, { projection: { _id: 1 } }));
}

/**
 * Connect to the configured database (MONGODB_DB, or the one in MONGODB_URI), unless it holds the earlier version
 * of the site: then to SITE_DB on the same server, which starts with this site's own default content. Admin
 * accounts are carried over to it (once, while it has none), so the organisers can still sign in. The earlier
 * database is left exactly as it is.
 */
async function siteDatabase(uri: string) {
  await mongoose.connect(uri, { ...OPTIONS, dbName: process.env.MONGODB_DB || undefined });
  const configured = mongoose.connection.db;
  if (!configured || configured.databaseName === SITE_DB || !(await holdsEarlierVersion(configured))) return mongoose;

  const earlier = configured.databaseName;
  await mongoose.disconnect();
  await mongoose.connect(uri, { ...OPTIONS, dbName: SITE_DB });
  const client = mongoose.connection.getClient();
  const users = client.db(SITE_DB).collection("users");
  if (!(await users.countDocuments({}, { limit: 1 }))) {
    const accounts = await client.db(earlier).collection("users").find().toArray();
    // Another process may copy them at the same moment: the second copy is turned away as duplicates.
    if (accounts.length) await users.insertMany(accounts, { ordered: false }).catch((err) => { if (!isDuplicateKeyError(err)) throw err; });
    console.warn(`[db] "${earlier}" holds the site's earlier version: using "${SITE_DB}" on the same server, with its ${accounts.length} admin account(s) carried over.`);
  }
  return mongoose;
}

/** Connect (once) to MongoDB. Throws DbUnavailableError when not configured or unreachable. */
export async function connectDb(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new DbUnavailableError("MONGODB_URI is not configured");
  if (cache.ready && mongoose.connection.readyState === 1) return mongoose;

  if (!cache.promise) {
    // Don't hammer an unreachable server (e.g. during a build without a database).
    if (Date.now() - cache.failedAt < 10_000) throw new DbUnavailableError("Database was unreachable moments ago");
    cache.promise = siteDatabase(uri)
      .then((m) => {
        cache.ready = true;
        return m;
      })
      .catch((err: Error) => {
        cache.promise = null;
        cache.failedAt = Date.now();
        throw new DbUnavailableError(err.message);
      });
  }
  await cache.promise;
  return mongoose;
}

/** Run a one-time task per process (used to bootstrap default content). */
export function once(task: () => Promise<void>): Promise<void> {
  if (!cache.boot) {
    cache.boot = task().catch((err) => {
      cache.boot = null;
      throw err;
    });
  }
  return cache.boot;
}

export function isDuplicateKeyError(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: number }).code === 11000;
}
