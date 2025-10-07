import sqlite3 from 'sqlite3';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

faker.locale = 'es';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'data', 'listas_varias.db');

if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS listas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        color TEXT
    )`);

    db.run(`DELETE FROM listas`);

    const stmt = db.prepare(`INSERT INTO listas (nombre, color) VALUES (?, ?)`);

    for (let i = 0; i < 25; i++) {
        const nombre = faker.word.words(1); 
        //<button type="button" data-testid="color-tile-gray" ></button>
        const color = faker.helpers.arrayElement(['color-tile-green', 'color-tile-yellow', 'color-tile-orange', 'color-tile-red', 'color-tile-purple', 'color-tile-blue', 'color-tile-teal', 'color-tile-lime', 'color-tile-magenta']); //data-testid 'color-tile-gray'
        stmt.run(nombre, color);
    }
    stmt.finalize();

    console.log('Base de datos poblada');
});

db.close();