/**
 * action-utils.ts: This module provides a set of utility functions for performing various actions in Playwright tests.
 * These actions include navigation, interaction with page elements, handling of dialogs, and more.
 */
import { Dialog, Locator, Response } from '@playwright/test';
import { getPage } from './page-utils';
import {
  CheckOptions,
  ClearOptions,
  ClickOptions,
  DoubleClickOptions,
  DragOptions,
  FillOptions,
  GotoOptions,
  HoverOptions,
  NavigationOptions,
  SelectOptions,
  TimeoutOption,
  TypeOptions,
  UploadOptions,
  UploadValues,
  WaitForLoadStateOptions,
} from '../setup/optional-parameter-types';
import { STANDARD_TIMEOUT } from './timeout-constants';
import { getLocator } from './locator-utils';
import { LOADSTATE } from '../../playwright.config';

/**
 * 1. Navigations: This section contains functions for navigating within a web page or between web pages.
 * These functions include going to a URL, waiting for a page to load, reloading a page, and going back to a previous page.
 */

/**
 * Navigates to the specified URL.
 * @param {string} path - The URL to navigate to.
 * @param {GotoOptions} options - The navigation options.
 * @returns {Promise<null | Response>} - The navigation response or null if no response.
 */
export async function gotoURL(path: string, options: GotoOptions = { waitUntil: LOADSTATE }): Promise<null | Response> {
  // eslint-disable-next-line no-return-await
  return await getPage().goto(path, options);
}

/**
 * Waits for a specific page load state.
 * @param {NavigationOptions} options - The navigation options.
 */
export async function waitForPageLoadState(options?: NavigationOptions): Promise<void> {
  let waitUntil: WaitForLoadStateOptions = LOADSTATE;

  if (options?.waitUntil && options.waitUntil !== 'commit') {
    waitUntil = options.waitUntil;
  }

  await getPage().waitForLoadState(waitUntil);
}

/**
 * Reloads the current page.
 * @param {NavigationOptions} options - The navigation options.
 */
export async function reloadPage(options?: NavigationOptions): Promise<void> {
  await Promise.all([getPage().reload(options), getPage().waitForEvent('framenavigated')]);
  await waitForPageLoadState(options);
}

/**
 * Navigates back to the previous page.
 * @param {NavigationOptions} options - The navigation options.
 */
export async function goBack(options?: NavigationOptions): Promise<void> {
  await Promise.all([getPage().goBack(options), getPage().waitForEvent('framenavigated')]);
  await waitForPageLoadState(options);
}

/**
 * Waits for a specified amount of time.
 * @param {number} ms - The amount of time to wait in milliseconds.
 */
export async function wait(ms: number): Promise<void> {
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await getPage().waitForTimeout(ms);
}

/**
 * 2. Actions: This section contains functions for interacting with elements on a web page.
 * These functions include clicking, filling input fields, typing, clearing input fields, checking and unchecking checkboxes, selecting options in dropdowns, and more.
 */

/**
 * Clicks on a specified element.
 * @param {string | Locator} input - The element to click on.
 * @param {ClickOptions} options - The click options.
 */
export async function click(input: string | Locator, options?: ClickOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.click(options);
}
/**
 * Fills a specified element with a value.
 * @param {string | Locator} input - The element to fill.
 * @param {string} value - The value to fill the element with.
 * @param {FillOptions} options - The fill options.
 */
export async function fill(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.fill(value, options);
}

/**
 * Clicks on a specified element.
 * @param {string | Locator} input - The element to click on.
 * @param {ClickOptions} options - The click options.
 */
export async function textContent(input: string | Locator, options?: ClickOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.textContent(options);
}
