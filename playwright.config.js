import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',


    reporter: 'html',

    use: {
        baseURL: '',
        headless: true, 
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ]
});