import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',

//allure
    reporter: [
        ['html'], 
        ['allure-playwright']
    ],

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