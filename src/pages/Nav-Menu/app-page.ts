import { AppData } from "../../../tests/testdata/test-data";
import { click } from "../../utils/action-utils";
import { getLocatorByText } from "../../utils/locator-utils";

const AppPageElements = {
  appName: (appName:string) => getLocatorByText(appName)
}

export async function navigateToApp(appName: string) {
    if (appName !== AppData.webApplicationName) {
        await click(AppPageElements.appName(appName).first());
      }
}