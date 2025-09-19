import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/?lang=en_US',
    /*storageState: 'auth.json',*/
    testIdAttribute: 'data-tab-item',
    video: 'off',
    screenshot: 'on',
    headless: false,
    trace: 'on',
    actionTimeout: 60000,
  },

  reporter: [
    ['html'],
    ['json', { outputFile: 'json-test-report.json' }],
  ],

  projects: [
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //   },
    // },
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
