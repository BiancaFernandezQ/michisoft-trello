import sqlite3 from 'sqlite3';
import { faker } from '@faker-js/faker';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'data', 'boards.db');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS boards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      permissionLevel TEXT,
      createdAt TEXT
    )
  `);

  db.run(`DELETE FROM boards`);

  const stmt = db.prepare(`INSERT INTO boards (name, description, permissionLevel, createdAt) VALUES (?, ?, ?, ?)`);

  for (let i = 0; i < 5; i++) {
    stmt.run(
      faker.company.name() + ' ' + faker.string.alphanumeric(3),
      faker.lorem.sentence(),
      faker.helpers.arrayElement(['private','public']),
      new Date().toISOString()
    );
  }

  stmt.finalize();
});

db.close();

