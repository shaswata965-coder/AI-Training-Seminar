#!/usr/bin/env node
/*
 * Gets a load-test database ready: empties it, stores the default content (trainers, schedule) and the
 * samples (past participants, labs, partners), so pages are as full as they will be, opens registration,
 * publishes the schedule, and creates the organiser account the k6 scripts sign in with.
 *
 *   node loadtest/tools/prepare.mjs        (MONGODB_URI, default mongodb://127.0.0.1:27017/diuai-loadtest)
 *
 * It refuses any database whose name doesn't contain "loadtest", so it can't wipe a real one.
 */
import { execFileSync } from "node:child_process";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/diuai-loadtest";
const admin = { email: process.env.LOADTEST_ADMIN_EMAIL ?? "loadtest-admin@example.com", password: process.env.LOADTEST_ADMIN_PASSWORD ?? "Load-test-organiser-2026" };

await mongoose.connect(uri, { dbName: process.env.MONGODB_DB || undefined, serverSelectionTimeoutMS: 5000 });
const db = mongoose.connection.db;
if (!/loadtest/i.test(db.databaseName)) {
  console.error(`Refusing to wipe "${db.databaseName}": use a database whose name contains "loadtest".`);
  process.exit(1);
}
await db.dropDatabase();
console.log(`Emptied database "${db.databaseName}".`);

const npm = (...args) => execFileSync("npm", ["run", "--silent", ...args], { stdio: ["ignore", "inherit", "inherit"], env: { ...process.env, MONGODB_URI: uri, NODE_ENV: "production" } });
npm("seed"); // default content (trainers, the tentative schedule), and every index (one registration per e-mail)
npm("seed:demo"); // past participants, labs, demos, partners …
npm("create-admin", "--", "--email", admin.email, "--name", "Load test organiser", "--role", "admin", "--password", admin.password);

// Registration open with no deadline, and the schedule published (calendar and PDF have sessions).
const open = { "data.workshopStatus": "open", "data.workshopUrl": "", "data.workshopDeadline": "", "data.programmeStatus": "final" };
await db.collection("singletons").updateOne({ key: "settings" }, { $set: open });
console.log("Opened registration; schedule status final.");
await mongoose.disconnect();
