/**
 * playwright.config.ts: This module is responsible for configuring the Playwright test runner.
 * It includes settings for test execution, browser configuration, and environment variables.
 * See https://playwright.dev/docs/test-configuration for more details.
 */
import { defineConfig, devices } from '@playwright/test'; // Ensure correct import
import dotenv from 'dotenv';
import { TEST_TIMEOUT, EXPECT_TIMEOUT, ACTION_TIMEOUT, NAVIGATION_TIMEOUT } from './src/utils/timeout-constants';
import { WaitForLoadStateOptions } from './src/setup/optional-parameter-types';
import { gotoURL } from './src/utils/action-utils';

// Load environment variables
dotenv.config(); // If you decide to use .env files later

/**
 * Default load state to be used while loading a URL or performing a click and navigate operation.
 * The load state is set to 'domcontentloaded', which means the action will wait until the 'DOMContentLoaded' event is fired.
 */
export const LOADSTATE: WaitForLoadStateOptions = 'domcontentloaded';

export default defineConfig({
  /**
   * The directory where tests are located.
   */
  testDir: './tests',

  /**
   * Determines whether to run tests within each spec file in parallel, in addition to running the spec files themselves in parallel.
   */
  fullyParallel: false,

  /**
   * Whether to fail the build on CI if you accidentally left test.only in the source code.
   */
  forbidOnly: !!process.env.CI,

  /**
   * The number of times to retry failed tests. Retries value is only set to happen on CI.
   */
  retries: process.env.CI ? 0 : 0,

  /**
   * The number of worker threads to use for running tests. This is set to a different value on CI.
   */
  workers: process.env.CI ? 4 : 4,

  /* Note: Add allure-playwright report */
  /**
   * The reporter to use. This can be set to use a different value on CI.
   */
  reporter: [
    ['allure-playwright'],
  ],
  timeout: TEST_TIMEOUT,

  expect: {
    timeout: EXPECT_TIMEOUT,
  },

  use: {
    headless: true,
    launchOptions: {
      args: [
        '--enable-features=NativeNotifications',
        '--disable-popup-blocking', // Allow popups
      ],
    },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    /**
     * The base URL to be used in navigation actions such as `await page.goto('/')`.
     * You can specify a default URL here, if needed. Otherwise, remove the line or keep it empty.
     */
    baseURL: `https://animated-gingersnap-8cf7f2.netlify.app/`, // Default: empty, you can set a URL here if required.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: ACTION_TIMEOUT,
    navigationTimeout: NAVIGATION_TIMEOUT,
  },

  /**
   * Configure projects for major browsers.
   */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
        launchOptions: {
          args: ['--disable-web-security'],
          slowMo: 0,
        },
      },
    },
  ],

  /**
   * Remove localhost configuration as you don't have env.url.
   * If you need to start a web server, you can add the configuration here.
   */
  webServer: undefined, // Reset this to undefined if not using localhost
});
