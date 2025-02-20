import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute : 'data-tab-item',
    video : 'off',
    screenshot : 'on',
    headless : false,
  trace: 'on',
  actionTimeout : 40000,
  },
  reporter: [
    ['html'],
    ['json', {outputFile : 'json-test-report.json'}],
  ],
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
