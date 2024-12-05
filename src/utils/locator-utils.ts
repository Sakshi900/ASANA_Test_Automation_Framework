/**
 * locator-utils.ts: This module provides utility functions for handling and manipulating locators in Playwright.
 * These utilities make it easier to interact with elements on the page, providing a layer of abstraction over Playwright's built-in locator methods.
 */

import { ElementHandle, FrameLocator, Locator, selectors } from '@playwright/test';
import { getPage } from './page-utils';
import {
  GetByPlaceholderOptions,
  GetByRoleOptions,
  GetByRoleTypes,
  GetByTextOptions,
  LocatorOptions,
  WaitForOptions,
  waitForRequest,
  waitForResponse,
} from '../setup/optional-parameter-types';

/**
 * 1. Locators: This section contains functions and definitions related to locators.
 * Locators are used to find and interact with elements on the page.
 */

/**
 * Returns a Locator object based on the input provided.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {LocatorOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */

export function getLocator(input: string | Locator, options?: LocatorOptions): Locator {
  return typeof input === 'string' ? getPage().locator(input, options) : input;
}

/**
 * Returns a Locator object with a specific testId. The global testId attribute is set in the playwright.config.ts file with default value as 'data-testid' if not set explicitly, but can be overridden by providing an attributeName.
 * @param {string | RegExp} testId - The testId to create the Locator from.
 * @param {string} [attributeName] - Optional attribute name for the testId. If provided, this will override the default 'testId' attribute value set in the playwright.config.ts file only for this instance.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByTestId(testId: string | RegExp, attributeName?: string): Locator {
  if (attributeName) {
    selectors.setTestIdAttribute(attributeName);
  }
  return getPage().getByTestId(testId);
}

/**
 * Returns a Locator object with a specific text.
 * @param {string | RegExp} text - The text to create the Locator from.
 * @param {GetByTextOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByText(text: string | RegExp, options?: GetByTextOptions): Locator {
  return getPage().getByText(text, options);
}

/**
 * Returns a Locator object with a specific role.
 * @param {GetByRoleTypes} role - The role to create the Locator from.
 * @param {GetByRoleOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByRole(role: GetByRoleTypes, options?: GetByRoleOptions): Locator {
  return getPage().getByRole(role, options);
}

/**
 * Returns a Locator object with a specific label.
 * @param {string | RegExp} text - The label text to create the Locator from.
 * @param {GetByRoleOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByLabel(text: string | RegExp, options?: GetByRoleOptions): Locator {
  return getPage().getByLabel(text, options);
}

/**
 * Returns a Locator object with a specific placeholder.
 * @param {string | RegExp} text - The place holder text to create the Locator from.
 * @param {GetByPlaceholderOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByPlaceholder(text: string | RegExp, options?: GetByPlaceholderOptions): Locator {
  return getPage().getByPlaceholder(text, options);
}

/**
 * Returns all Locator objects based on the input provided.
 * @param {string | Locator} input - The input to create the Locators from.
 * @param {LocatorOptions} options - Optional parameters for the Locators.
 * @returns {Promise<Locator[]>} - The created Locator objects.
 */
export async function getAllLocators(input: string | Locator, options?: LocatorOptions): Promise<Locator[]> {
  // eslint-disable-next-line no-return-await
  return typeof input === 'string' ? await getPage().locator(input, options).all() : await input.all();
}

/**
 * 2. Frames: This section contains functions and definitions related to frames.
 * Frames are used to handle and interact with iframes or frames within the web page.
 */

/**
 * Returns a FrameLocator object based on the input provided.
 * @param {string | FrameLocator} frameInput - The input to create the FrameLocator from.
 * @returns {FrameLocator} - The created FrameLocator object.
 */
export function getFrameLocator(frameInput: string | FrameLocator): FrameLocator {
  return typeof frameInput === 'string' ? getPage().frameLocator(frameInput) : frameInput;
}

/**
 * Returns a Locator object within a specific frame based on the input provided.
 * @param {string | FrameLocator} frameInput - The input to create the FrameLocator from.
 * @param {string | Locator} input - The input to create the Locator from, within the frame.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorInFrame(frameInput: string | FrameLocator, input: string | Locator): Locator {
  return getFrameLocator(frameInput).locator(input);
}

/**
 * Wait for Selector With Locator String
 * @param {string} input - Locator String
 * @param {any} options - PageWaitForSelectorOptionsHidden
 * @returns {Promise<ElementHandle<SVGElement | HTMLElement>>} - Returns a promise that waits for selector input
 */
export function waitForSelector(input: string, options?: object): Promise<ElementHandle<SVGElement | HTMLElement>> {
  return getPage().waitForSelector(input, options);
}

/**
 * Wait for Locator
 * @param {string | Locator} input - The input to create the locator from
 * @param {LocatorOptions} locatorOptions - Optional parameters for the Locator.
 * @param {WaitForOptions} waitForOptions - Optional parameters for the waitFor.
 * @returns {Promise<void>} - Returns a void promise
 */
export async function waitFor(
  input: string | Locator,
  locatorOptions?: LocatorOptions,
  waitForOptions?: WaitForOptions
): Promise<void> {
  return typeof input === 'string'
    ? await getPage().locator(input, locatorOptions).waitFor(waitForOptions)
    : await input.waitFor(waitForOptions);
}

/**
 * This will intercept the API information with playwright
 * @param {string} endpoint - this is the endpoint of the API
 * @param {undefined | number} timeout - time in ms for promise to resolve
 * @returns response of the API
 */
export function interceptAPI(endpoint: string, timeout?: number): waitForResponse {
  const time = typeof timeout === 'number' ? timeout : 40000;
  console.log(`Trying to get the response of endpoint : ${endpoint}`);
  const response = getPage().waitForResponse(
    async (resp) => {
      if (!resp.url().includes(endpoint)) {
        return false;
      }
      const responseBody = await resp.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
      return responseBody;
    },
    { timeout: time }
  );
  return response;
}

export function interceptAPIWithoutResponse(endpoint: string, timeout?: number): waitForResponse {
  const time = typeof timeout === 'number' ? timeout : 40000;
  console.log(`Trying to get the response of endpoint : ${endpoint}`);
  const response = getPage().waitForResponse(
    async (resp) => {
      if (!resp.url().includes(endpoint)) {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
      return (await resp.headersArray()) as any;
      // return resp as Object;
    },
    { timeout: time }
  );
  return response;
}

/**
 * This will intercept the Request API information with playwright
 * @param {string} endpoint - this is the endpoint of the API
 * @param {undefined | number} timeout - time in ms for promise to resolve
 * @returns response of the API
 */
export function interceptRequest(endpoint: string, timeout?: number): waitForRequest {
  const time = typeof timeout === 'number' ? timeout : 20000;
  const response = getPage().waitForRequest(
    async (request) => {
      if (!request.url().includes(endpoint)) {
        return false;
      }
      const responseBody = await request.postDataJSON();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
      return responseBody;
    },
    { timeout: time }
  );
  return response;
}
