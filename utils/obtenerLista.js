import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

export async function obtenerListasAleatorias(count = 1) {
    const db = await open({
        filename: path.resolve('data', 'listas_varias.db'),
        driver: sqlite3.Database
    });
    const listas = await db.all(`SELECT * FROM listas ORDER BY RANDOM() LIMIT ${count}`);
    await db.close();
    return listas;
}
