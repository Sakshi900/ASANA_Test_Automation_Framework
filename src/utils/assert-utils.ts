/**
 * assert-utils.ts: This module contains utility functions for assertions in tests.
 * All expect assertions will dynamically wait until either the expect timeout specified in the
 * playwright.config is reached or the condition becomes true.
 * @module AssertUtils
 */

import { Expect, Locator, TestInfo, expect } from '@playwright/test';
import { ExpectOptions, ExpectTextOptions, SoftOption } from '../setup/optional-parameter-types';
import { getLocator } from './locator-utils';
import { getPage } from './page-utils';

/**
 * Returns an Expect object configured with the given soft option.
 * @param {SoftOption} options - The soft option to configure the Expect object with.
 * @returns {Expect} - The configured Expect object.
 */
function getExpectWithSoftOption(options?: SoftOption): Expect {
  return expect.configure({ soft: options?.soft });
}

/**
 * Returns a Locator object and an Expect object configured with the given soft option.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {SoftOption} options - The soft option to configure the Expect object with.
 * @returns {Object} - An object containing the Locator and Expect objects.
 */
function getLocatorAndAssert(input: string | Locator, options?: SoftOption): { locator: Locator; assert: Expect } {
  const locator = getLocator(input);
  const assert = getExpectWithSoftOption(options);
  return { locator, assert };
}

/**
 * Use this function to assert all the soft assertions.
 * @param {TestInfo} testInfo - The TestInfo object containing the test's information.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function assertAllSoftAssertions(testInfo: TestInfo) {
  expect(testInfo.errors).toHaveLength(0);
}

/**
 * 1. Locator Assertions: This section contains functions that perform assertions on specific locators.
 * These functions check for various conditions such as visibility, presence in the DOM, text content, etc.
 */



/**
 * Asserts that the given element is present in the DOM and visible.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeVisible(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeVisible(options);

}

/**
 * Asserts that the given element is present in the DOM and visible.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeEnabled(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeEnabled(options);

}

export async function expectElementNotToBeVisible(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toBeVisible(options);

}

  /**
   * Asserts that the element equals the provided string or string array or regular expression.
   * @param {string | Locator} input - Either a string (selector) or a Locator object from where we retrieve the text to assert.
   * @param {string | string[] | RegExp} text - The string, string array or regular expression to match against the element's text.
   * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
   */
  export async function expectElementToHaveText(
    input: string | Locator,
    text: string | RegExp | Array<string | RegExp>,
    options?: ExpectOptions & ExpectTextOptions
  ): Promise<void> {
    const { locator, assert } = getLocatorAndAssert(input, options);
    await assert(locator, options).toHaveText(text, options);
  }



  /**
   * Asserts that the given element has the specified count.
   * @param {string | Locator} input - Either a string (selector) or a Locator object to get the element count.
   * @param {number} count - The count to match against the element's count.
   * @param {ExpectOptions} options - The options to pass to the expect function.
   */
  export async function expectElementToHaveCount(
    input: string | Locator,
    count: number,
    options?: ExpectOptions
  ): Promise<void> {
    const { locator, assert } = getLocatorAndAssert(input, options);
    await assert(locator, options).toHaveCount(count, options);
  }
