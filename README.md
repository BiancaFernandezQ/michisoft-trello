- Inicializa un proyecto Node.js con un archivo `package.json` por defecto:
  - `npm init -y`

- Instala Playwright como dependencia de desarrollo:
  - `npm i -D @playwright/test`

- Instala los navegadores necesarios para Playwright:
  - `npx playwright install`

- Ejecuta las pruebas en modo con interfaz gráfica:
  - `npx playwright test --headed`

- Ejecuta todas las pruebas en modo headless:
  - `npx playwright test`