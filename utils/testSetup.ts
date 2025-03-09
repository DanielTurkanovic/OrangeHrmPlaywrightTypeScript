import { test as baseTest, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
export {expect};
import { highlightClick } from './commonTools';

dotenv.config()

// Check the variables immediately, before defining the tests
if (!process.env.USER_NAME || !process.env.PASSWORD) {
  throw new Error("USER_NAME or PASSWORD is not defined in .env file");
}

export const test = baseTest.extend({
  page: async ({ browser }, use) => {
    const page = await browser.newPage();

    // Set viewport size manually
    // await page.setViewportSize({
    //   width: 1920, // Full screen width 
    //   height: 1080, // Full screen height 
    //});

    // Login before all tests
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.locator('[name="username"]').fill(process.env.USER_NAME);
    await page.locator('[name="password"]').fill(process.env.PASSWORD);
    await highlightClick(page, '[type="submit"]');
    await page.locator('[type="submit"]').click();
    await page.waitForSelector('h6:has-text("Dashboard")');

    await use(page);
    await page.close();
  },
});

