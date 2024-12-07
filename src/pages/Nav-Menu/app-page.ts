import { AppData } from "../../../tests/testdata/test-data";
import { click } from "../../utils/action-utils";
import { expectElementToBeVisible } from "../../utils/assert-utils";
import { getLocatorByText } from "../../utils/locator-utils";

const AppPageElements = {
  appName: (appName:string) => getLocatorByText(appName),
  logoutBtn: () => getLocatorByText(`Logout`)
}

export async function navigateToApp(appName: string) {
    if (appName !== AppData.webApplicationName) {
        await click(AppPageElements.appName(appName).first());
      }
}
  
  export async function clickOnLogoutBtn() {
    await expectElementToBeVisible(AppPageElements.logoutBtn())
    await click(AppPageElements.logoutBtn())
  }