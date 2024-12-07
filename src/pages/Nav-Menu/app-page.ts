import { AppData } from "../../../tests/testdata/test-data";
import { click, wait, waitForPageLoadState } from "../../utils/action-utils";
import { expectElementToBeVisible } from "../../utils/assert-utils";
import { getLocatorByText, waitFor, waitForSelector } from "../../utils/locator-utils";

const AppPageElements = {
  appName: (appName: string) => getLocatorByText(appName),
  logoutBtn: () => getLocatorByText(`Logout`)
}

export async function navigateToApp(appName: string) {
  await waitForPageLoadState(); // Ensure the page has fully loaded before any action

  // Ensure the app name is valid and navigate
  const appLocator = AppPageElements.appName(appName).first();
  if (appName === AppData.mobileApplicationName || appName === AppData.webApplicationName) {
    await click(appLocator, { timeout: 30000 }); // Set timeout for app navigation
    await appLocator.waitFor({ state: 'visible' }); // Wait until the element is visible
    await waitForPageLoadState(); // Wait for the page load after navigation
  } else {
    throw new Error(`Invalid app name: ${appName}. Cannot navigate.`);
  }
}


export async function clickOnLogoutBtn() {
  await expectElementToBeVisible(AppPageElements.logoutBtn())
  await click(AppPageElements.logoutBtn())
}