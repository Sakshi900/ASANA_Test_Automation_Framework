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
import { hover } from './action-utils';

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
 * Asserts that the given element is not present in the DOM or is Hidden.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeHidden(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeHidden(options);
}

/**
 * Asserts that the given element is present in the DOM and visible.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeVisible(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeVisible(options);

  /**
   * To Demo on how to get a css value on all visible assertions.
   * If the font is something we don't expect console.log(locator selector string)
   */
  // const font = await locator.evaluate((el) => {
  //   return window.getComputedStyle(el).getPropertyValue('font-family');
  // });
  // if (font) {
  //   console.log(font);
  //   if (font === 'Arial' || font === `"Times New Roman"`) {
  //     console.log(locator);
  //     list.push(`${font}  )-(  ${locator}`);
  //   }
  // }
}
// const list = [] as string[];
// export async function getFontList(): Promise<string[]> {
//   return list;
// }
/**
 * Asserts that the given element is present in the DOM.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeAttached(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeAttached(options);
}

/**
 * Asserts that the given element is present in the DOM and visible in the viewport of the page.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeInViewport(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeInViewport(options);
}

/**
 * Asserts that the given element is checked.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeChecked(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeChecked(options);
}

/**
 * Asserts that the given element is not checked.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementNotToBeChecked(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toBeChecked(options);
}

/**
 * Asserts that the given element is disabled.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeDisabled(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeDisabled(options);
}

/**
 * Asserts that the given element is enabled.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeEnabled(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeEnabled(options);
}

/**
 * Asserts that the given element is editable.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToBeEditable(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeEditable(options);
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
 * Asserts that the element does not equal the provided string or string array or regular expression.
 * @param {string | Locator} input - Either a string (selector) or a Locator object from where we retrieve the text to assert.
 * @param {string | string[] | RegExp} text - The string, string array or regular expression to match against the element's text.
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function expectElementNotToHaveText(
  input: string | Locator,
  text: string | RegExp | Array<string | RegExp>,
  options?: ExpectOptions & ExpectTextOptions
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toHaveText(text, options);
}

/**
 * Asserts that the element contains the provided string or string array or regular expression.
 * @param {string | Locator} input - Either a string (selector) or a Locator object from where we retrieve the text to assert.
 * @param {string | string[] | RegExp} text - The string, string array or regular expression to match against the element's text.
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function expectElementToContainText(
  input: string | Locator,
  text: string | RegExp | Array<string | RegExp>,
  options?: ExpectOptions & ExpectTextOptions
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toContainText(text, options);
}

/**
 * Asserts that the element does not contain the provided string or string array or regular expression.
 * @param {string | Locator} input - Either a string (selector) or a Locator object from where we retrieve the text to assert.
 * @param {string | string[] | RegExp} text - The string, string array or regular expression to match against the element's text.
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function expectElementNotToContainText(
  input: string | Locator,
  text: string | RegExp | Array<string | RegExp>,
  options?: ExpectOptions & ExpectTextOptions
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toContainText(text, options);
}

/**
 * Asserts that the given element points to an input text box with the given text or Regex.
 * @param {string | Locator} input - Either a string (selector) or a Locator object from where we retrieve the input value to assert.
 * @param {string | RegExp} text - The string or regular expression to match against the element's value.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToHaveValue(
  input: string | Locator,
  text: string | RegExp,
  options?: ExpectOptions
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveValue(text, options);
}

/**
 * Asserts that the given element points to a multi-select/combobox (i.e. a select with the multiple attribute) and the specified values are selected.
 * @param {string | Locator} input - Either a string (selector) or a Locator object from where we retrieve the input value to assert.
 * @param {Array<string | RegExp>} text - The array of strings or regular expressions to match against the element's values.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToHaveValues(
  input: string | Locator,
  text: Array<string | RegExp>,
  options?: ExpectOptions
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveValues(text, options);
}

/**
 * Asserts that the given element points to an empty editable element or to a DOM node that has no text.
 * @param {string | Locator} input - Either a string (selector) or a Locator object from where we retrieve the input value to assert.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementValueToBeEmpty(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeEmpty(options);
}

/**
 * Asserts that the given element points to a non-empty editable element or to a DOM node that has text.
 * @param {string | Locator} input - Either a string (selector) or a Locator object from where we retrieve the input value to assert.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementValueNotToBeEmpty(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toBeEmpty(options);
}

/**
 * Asserts that an element has an attribute with the given value.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {string} attribute - The attribute to check for.
 * @param {string | RegExp} value - The value to match against the attribute.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToHaveAttribute(
  input: string | Locator,
  attribute: string,
  value: string | RegExp,
  options?: ExpectOptions
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveAttribute(attribute, value, options);
}

/**
 * Asserts that an element has an attribute which contains the given value.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {string} attribute - The attribute to check for.
 * @param {string | RegExp} value - The value to match against the attribute.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToContainAttribute(
  input: string | Locator,
  attribute: string,
  value: string | RegExp,
  options?: ExpectOptions
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveAttribute(attribute, new RegExp(value), options);
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


/**
 * 2. Page Assertions: This section contains functions that perform assertions on the entire page.
 * These functions check for conditions such as URL, title, etc.
 */

/**
 * Asserts that the current page URL matches exactly the provided URL or regular expression.
 * @param {string | RegExp} urlOrRegExp - The URL or regular expression to match against the current page URL.
 */
export async function expectPageToHaveURL(urlOrRegExp: string | RegExp, options?: ExpectOptions): Promise<void> {
  const assert = getExpectWithSoftOption(options);
  await assert(getPage()).toHaveURL(urlOrRegExp, options);
}

/**
 * Asserts that the current page URL contains the provided URL.
 * @param {string } url - The URL to match against the current page URL.
 */
export async function expectPageToContainURL(url: string, options?: ExpectOptions): Promise<void> {
  const assert = getExpectWithSoftOption(options);
  await assert(getPage()).toHaveURL(new RegExp(url), options);
}

/**
 * This method will be used for future stories validations Asserts that the current page Title
 * matches exactly the provided title or regular expression.
 * @param {string | RegExp} titleOrRegExp - The title or regular expression to match against the current page title.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectPageToHaveTitle(titleOrRegExp: string | RegExp, options?: ExpectOptions): Promise<void> {
  const assert = getExpectWithSoftOption(options);
  await assert(getPage()).toHaveTitle(titleOrRegExp, options);
}

/**
 * Asserts that an element has an CSS name with the given value.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {string} name - The CSS name to check for.
 * @param {string } value - The value to match against the CSS.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToHaveCss(
  input: string | Locator,
  name: string,
  value: string,
  options?: ExpectOptions
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveCSS(name, value, options);
}

/**
 * Asserts that an element has an CSS name which contains the given value.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {string} name - The CSS name to check for.
 * @param {string | RegExp} value - The value to match against the CSS.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementToContainCss(
  input: string | Locator,
  name: string,
  value: string | RegExp,
  options?: ExpectOptions
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveCSS(name, new RegExp(value), options);
}

/**
 * Asserts that an element has a given date format
 * @param input - Either a string (selector) or a Locator object.
 * @param dateFormat - Format based on backend dateformat of auth.client and auth.user tables
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function expectElementToHaveDateFormat(
  input: string | Locator,
  dateFormat: string,
  options?: ExpectOptions & ExpectTextOptions
) {
  switch (dateFormat) {
    case 'M/DD/YY':
      await expectElementToHaveText(input, /^\d+\/\d\d\/\d\d$/, options);
      break;
    case 'DD/M/YYYY':
      await expectElementToHaveText(input, /^\d\d\/\d+\/\d\d\d\d$/, options);
      break;
    case 'DD/M/YY':
      await expectElementToHaveText(input, /^\d\d\/\d+\/\d\d$/, options);
      break;
    case 'DD.MM.YYYY':
      await expectElementToHaveText(input, /^\d\d\.\d\d\.\d\d\d\d$/, options);
      break;
    case 'DD-MM-YYYY':
      await expectElementToHaveText(input, /^\d\d-\d\d-\d\d\d\d$/, options);
      break;
    case 'YYYY/M/DD':
      await expectElementToHaveText(input, /^\d\d\d\d\/\d+\/\d\d$/, options);
      break;
    case 'YYYY.MM.DD':
      await expectElementToHaveText(input, /^\d\d\d\d\.\d\d\.\d\d$/, options);
      break;
    case 'YYYY-MM-DD':
      await expectElementToHaveText(input, /^\d\d\d\d-\d\d-\d\d$/, options);
      break;
    default:
      console.error('Assert Fail - Incorrect Date Format: ', dateFormat);
      break;
  }
}

/**
 * Asserts that an element has a given number format
 * @param input - Either a string (selector) or a Locator object.
 * @param numberFormat - Format based on backend numberformat of auth.client and auth.user tables
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function expectElementToHaveNumberFormat(
  input: string | Locator,
  numberFormat: string,
  options?: ExpectOptions & ExpectTextOptions
) {
  switch (numberFormat) {
    case '1,234,567.89':
      await expectElementToHaveText(input, /^(\d{1,3},)+\d{1,3}\.\d{2}/, options);
      break;
    case '1.234.567,89':
      await expectElementToHaveText(input, /^(\d{1,3}\.)+\d{1,3},\d{2}/, options);
      break;
    case '1234567,89':
      await expectElementToHaveText(input, /^\d+,\d{2}/, options);
      break;
    default:
      console.error('Assert Fail - Incorrect Number Format: ', numberFormat);
      break;
  }
}

/**
 * Generic validation for Save Button
 * @param {String | Locator} input  element to be evulated
 * @param {Boolean} enabled  Disabled State = true/fasle with nothing passed defaults to enabled
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function assertSaveButton(
  input: string | Locator,
  enabled?: boolean,
  options?: ExpectOptions & ExpectTextOptions
) {
  const enabledCheck = typeof enabled === 'boolean' ? enabled : true;
  if (enabledCheck === true) {
    await expectElementToBeEnabled(input, options);
  } else {
    await expectElementToBeDisabled(input, options);
  }
  await expectElementToBeVisible(input, options);
  await expectElementToHaveText(input, 'Save', options);
  await expectElementToHaveCss(input, 'color', 'rgb(0,30,55)', options);
  await expectElementToHaveCss(input, 'font-weight', '500', options);
  await expectElementToHaveCss(input, 'background-color', 'rgb(38, 225, 207)', options);
}

/**
 * Generic validation for Action Button
 * @param {String | Locator} input  element to be evulated
 * @param {String} name innerText of element
 * @param {Boolean} enabled  Disabled State = true/fasle with nothing passed defaults to enabled
 * @param {Boolean} hoverCheck If true will hover over button and assert background color
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function assertActionButton(
  input: string | Locator,
  name: string,
  enabled?: boolean,
  hoverCheck?: boolean,
  options?: ExpectOptions & ExpectTextOptions
) {
  const enabledCheck = typeof enabled === 'boolean' ? enabled : true;
  if (enabledCheck === true) {
    await expectElementToBeEnabled(input, options);
  } else {
    await expectElementToBeDisabled(input, options);
  }
  await expectElementToBeVisible(input, options);
  await expectElementToHaveText(input, name, options);
  await expectElementToHaveCss(input, 'color', 'rgb(242, 246, 247)', options);
  await expectElementToHaveCss(input, 'font-weight', '500', options);
  await expectElementToHaveCss(input, 'background-color', 'rgb(0, 87, 102)', options);
  if (hoverCheck) {
    await hover(input);
    await expectElementToBeVisible(input, options);
  }
}

/**
 * Generic validation for Negative Button
 * @param {String | Locator} input  element to be evulated
 * @param {String} name innerText of element
 * @param {Boolean} enabled  Disabled State = true/fasle with nothing passed defaults to enabled
 * @param {Boolean} hoverCheck If true will hover over button and assert background color
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function assertNegativeButton(
  input: string | Locator,
  name: string,
  enabled?: boolean,
  hoverCheck?: boolean,
  options?: ExpectOptions & ExpectTextOptions
) {
  const enabledCheck = typeof enabled === 'boolean' ? enabled : true;
  if (enabledCheck === true) {
    await expectElementToBeEnabled(input, options);
  } else {
    await expectElementToBeDisabled(input, options);
  }
  await expectElementToBeVisible(input, options);
  await expectElementToHaveText(input, name, options);
  await expectElementToHaveCss(input, 'color', 'rgb(0,30,55)', options);
  await expectElementToHaveCss(input, 'font-weight', '500', options);
  await expectElementToHaveCss(input, 'background-color', 'rgba(0, 0, 0, 0)', options);
  if (hoverCheck) {
    await hover(input);
    await expectElementToHaveCss(input, 'background-color', 'rgb(238, 236, 255)', options);
    await expectElementToHaveCss(input, 'color', 'rgb(0,30,55)', options);
  }
}

/**
 * Generic validation for Cancel Button
 * @param {String | Locator} input  element to be evulated
 * @param {Boolean} enabled  Disabled State = true/fasle with nothing passed defaults to enabled
 * @param {Boolean} hoverCheck If true will hover over button and assert background color
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function assertCancelButton(
  input: string | Locator,
  enabled?: boolean,
  hoverCheck?: boolean,
  options?: ExpectOptions & ExpectTextOptions
) {
  const enabledCheck = typeof enabled === 'boolean' ? enabled : true;
  if (enabledCheck === true) {
    await expectElementToBeEnabled(input, options);
  } else {
    await expectElementToBeDisabled(input, options);
  }
  await expectElementToBeVisible(input, options);
  await expectElementToHaveText(input, 'Cancel', options);
  await expectElementToHaveCss(input, 'color', 'rgb(0,30,55)', options);
  await expectElementToHaveCss(input, 'font-weight', '500', options);
  await expectElementToHaveCss(input, 'background-color', 'rgba(0, 0, 0, 0)', options);
  if (hoverCheck) {
    await hover(input);
    await expectElementToHaveCss(input, 'background-color', 'rgb(0,30,55)', options);
    await expectElementToHaveCss(input, 'color', 'rgb(255, 255, 255)', options);
  }
}

/**
 * Generic validation for Red Action Button
 * @param {String | Locator} input  element to be evulated
 * @param {String} name innerText of element
 * @param {Boolean} enabled  Disabled State = true/fasle with nothing passed defaults to enabled
 * @param {Boolean} hoverCheck If true will hover over button and assert background color
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function assertRedActionButton(
  input: string | Locator,
  name: string,
  enabled?: boolean,
  hoverCheck?: boolean,
  options?: ExpectOptions & ExpectTextOptions
) {
  const enabledCheck = typeof enabled === 'boolean' ? enabled : true;
  if (enabledCheck === true) {
    await expectElementToBeEnabled(input, options);
  } else {
    await expectElementToBeDisabled(input, options);
  }
  await expectElementToBeVisible(input, options);
  await expectElementToHaveText(input, name, options);
  await expectElementToHaveCss(input, 'color', 'rgb(0,30,55)', options);
  await expectElementToHaveCss(input, 'font-weight', '500', options);
  await expectElementToHaveCss(input, 'background-color', 'rgb(253, 117, 87)', options);
  if (hoverCheck) {
    await hover(input);
    await expectElementToHaveCss(input, 'background-color', 'rgb(255, 148, 124)', options);
  }
}

/**
 * Generic validation for Edit Button
 * @param {String | Locator} input  element to be evulated
 * @param {Boolean} enabled  Disabled State = true/fasle with nothing passed defaults to enabled
 * @param {Boolean} hoverCheck If true will hover over button and assert background color
 * @param {ExpectOptions & ExpectTextOptions} options - The options to pass to the expect function.
 */
export async function assertEditButton(
  input: string | Locator,
  enabled?: boolean,
  hoverCheck?: boolean,
  options?: ExpectOptions & ExpectTextOptions
) {
  const enabledCheck = typeof enabled === 'boolean' ? enabled : true;
  if (enabledCheck === true) {
    await expectElementToBeEnabled(input, options);
  } else {
    await expectElementToBeDisabled(input, options);
  }
  await expectElementToBeVisible(input, options);
  await expectElementToHaveText(input, 'Edit', options);
  await expectElementToHaveCss(input, 'color', 'rgb(0,30,55)', options);
  await expectElementToHaveCss(input, 'font-weight', '500', options);
  await expectElementToHaveCss(input, 'background-color', 'rgba(0, 0, 0, 0)', options);
  if (hoverCheck) {
    await hover(input);
    await expectElementToHaveCss(input, 'background-color', 'rgb(0,30,55)', options);
    await expectElementToHaveCss(input, 'color', 'rgb(255, 255, 255)', options);
  }
}

export async function expectElementNotToBeVisible(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toBeVisible(options);
}

export async function expectElementNotToBeNull(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await assert(locator, options).not.toBeNull();
}
/**
 * Asserts that the given element is not enabled.
 * @param {string | Locator} input - Either a string (selector) or a Locator object.
 * @param {ExpectOptions} options - The options to pass to the expect function.
 */
export async function expectElementNotToBeEnabled(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toBeEnabled(options);
}
