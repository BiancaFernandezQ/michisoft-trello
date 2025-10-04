const { faker } = require('@faker-js/faker');

let cachedEmail = null; // Guarda el último email generado

function generateEmail(domain = 'gmail.com') {
  const username = faker.internet.username().replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  cachedEmail = `${username}@${domain}`;
  return cachedEmail;
}

function generateEmailName() {
  if (!cachedEmail) {
    throw new Error('No se ha generado un email aún. Llama primero a generateEmail()');
  }
  const username = cachedEmail.split('@')[0]; // toma la parte antes del @
  return `@${username}`;
}

module.exports = { generateEmail, generateEmailName };
