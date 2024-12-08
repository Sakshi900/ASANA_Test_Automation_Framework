/**
 * page-setup.ts: Responsible for initializing the page context and managing browser interactions
 * for each test. This ensures consistent setup and teardown for all tests.
 */

import { Browser, Page, test as baseTest, expect } from '@playwright/test';
import { getPage, setPageWithCache } from '../utils/page-utils';

let beforeAllPage: Page;

// Hook to run before all tests
baseTest.beforeAll(async ({ browser }: { browser: Browser }) => {
  beforeAllPage = await browser.newPage();
  
  // Grant permissions for notifications in the test browser context
  await beforeAllPage.context().grantPermissions(['notifications']);
  
  const isPageCached = await setPageWithCache(beforeAllPage);
  expect(isPageCached).toBe(true);
});



// Hook to run after all tests
baseTest.afterAll(async () => {
  if (beforeAllPage) {
    await beforeAllPage.close();
  }
});

/**
 * Exporting a base test object with standardized setup.
 * This ensures all tests inherit a consistent page context.
 */
export const test = baseTest;
