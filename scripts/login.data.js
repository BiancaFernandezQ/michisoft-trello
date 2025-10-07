import 'dotenv/config'; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';

const casosInvalidos = [
  {
    nombre: 'Email no registrado',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  {
    nombre: 'Campo email vacío',
    email: '',
    password: faker.internet.password()
  },
  {
    nombre: 'Email sin arroba',
    email: faker.internet.email().replace('@', ''),
    password: faker.internet.password()
  },
  {
    nombre: 'Email no válido',
    email: faker.internet.email().replace('.', ''),
    password: faker.internet.password()
  },
  {
    nombre: 'Contraseña muy corta',
    email: process.env.TRELLO_USER,
    password: faker.string.alphanumeric(3)
  },
  {
    nombre: 'Contraseña no válida',
    email: process.env.TRELLO_USER,
    password: '            '
  },
  {
    nombre: 'Campo contraseña vacío',
    email: process.env.TRELLO_USER,
    password: ''
  }
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '..', 'data', 'login.json');
fs.writeFileSync(outputPath, JSON.stringify(casosInvalidos, null, 2));
