import { test, expect } from "@playwright/test";
const { generateEmail } = require('../utils/generateEmail');

test.use({ storageState: 'storage/trelloSession.json' });

test.describe("Trello API - Agregar miembro al tablero", () => {
  
  const boardId = 'Lc7kGQ5x'; // de tablero_1
  const apiKey = process.env.TRELLO_KEY;
  const token = process.env.TRELLO_TOKEN;
  const email = generateEmail();

  test("TC01 - Agregar miembro válido al tablero (éxito)",  async ({ request }) => {
    test.info().annotations.push({ type: 'tag', description: '@api' });
    test.info().annotations.push({ type: 'tag', description: '@positivo' });
    test.info().annotations.push({ type: 'tag', description: '@fucional' });

    console.log(`Correo generado: ${email}`);
    const response = await request.put(`https://api.trello.com/1/boards/${boardId}/members`, {
      params: {
        key: apiKey,
        token: token,
        email: email,
        type: "normal"
      }
    });
    //falta revisar
    expect(response.status(), "Código de estado").toBe(200);

    const body = await response.json();
    console.log("Respuesta:", body);

    expect(body.memberType).toBe("normal");
    expect(body.id).toBeTruthy();
  });


  test("TC02 - Intentar agregar miembro con correo inválido", async ({ request }) => {
    test.info().annotations.push({ type: 'tag', description: '@api' });
    test.info().annotations.push({ type: 'tag', description: '@negativo' });
    test.info().annotations.push({ type: 'tag', description: '@fucional' });
    const email = "%$&%/33.&/@gmail.com";

    const response = await request.put(`https://api.trello.com/1/boards/${boardId}/members`, {
      params: {
        key: apiKey,
        token: token,
        email: email,
        type: "Miembro"
      }
    });

    expect([400, 401, 404]).toContain(response.status()); 

    const body = await response.text();
    console.log("Respuesta error:", body);

    expect(body).toContain("invalid");
  });


  test("TC03 - Intentar agregar miembro ya existente", async ({ request }) => {
    test.info().annotations.push({ type: 'tag', description: '@api' });
    test.info().annotations.push({ type: 'tag', description: '@negativo' });
    test.info().annotations.push({ type: 'tag', description: '@fucional' });
    

    const response = await request.put(`https://api.trello.com/1/boards/${boardId}/members`, {
      params: {
        key: apiKey,
        token: token,
        email: email,
        type: "Miembro"
      }
    });
    //falta revisar v
    const body = await response.text();
    console.log("Respuesta:", body);

    expect([400, 409]).toContain(response.status());
    expect(body).toMatch(/already.*member/i);
  });

});
