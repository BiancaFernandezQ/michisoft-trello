import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',

    reporter: 'html',

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: '',
        headless: false, //headless false para ver la ejecucion en un navegador
        screenshot: 'only-on-failure', 
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ]
});