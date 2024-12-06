

import { click } from "../../utils/action-utils"
import { expectElementToBeVisible } from "../../utils/assert-utils"
import { getLocatorByText } from "../../utils/locator-utils"


const homePageElements = {
  logoutBtn: () => getLocatorByText(`Logout`)
}

export async function clickOnLogoutBtn() {
  await expectElementToBeVisible(homePageElements.logoutBtn())
  await click(homePageElements.logoutBtn())
}



