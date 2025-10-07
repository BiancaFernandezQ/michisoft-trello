import { faker } from '@faker-js/faker';
let cachedEmail = null; 

export function generateEmail(domain = 'gmail.com') {
  const username = faker.internet.username().replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  cachedEmail = `${username}@${domain}`;
  return cachedEmail;
}

export function generateEmailName() {
  if (!cachedEmail) {
    throw new Error('No se ha generado un email aún. Llama primero a generateEmail()');
  }
  const username = cachedEmail.split('@')[0]; 
  return `@${username}`;
}



