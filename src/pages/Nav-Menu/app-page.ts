import { AppData } from "../../../tests/testdata/test-data";
import { click, wait, waitForPageLoadState } from "../../utils/action-utils";
import { expectElementToBeVisible } from "../../utils/assert-utils";
import { getLocatorByText, waitFor, waitForSelector } from "../../utils/locator-utils";

const AppPageElements = {
  appName: (appName: string) => getLocatorByText(appName),
  logoutBtn: () => getLocatorByText(`Logout`)
}

export async function navigateToApp(appName: string) {
  await waitForPageLoadState()
  if (appName !== AppData.webApplicationName) {
    await click(AppPageElements.appName(appName).first());
    await waitForPageLoadState()

  }
}

export async function clickOnLogoutBtn() {
  await expectElementToBeVisible(AppPageElements.logoutBtn())
  await click(AppPageElements.logoutBtn())
}