import { ASANA_URLS } from "../../../tests/testdata/test-data"

import { gotoURL, click, fill } from "../../utils/action-utils"
import { expectElementToBeVisible, expectElementToBeEnabled } from "../../utils/assert-utils"
import { getLocatorByText, getLocator } from "../../utils/locator-utils"


const loginPageElements = {
  headerText: () => getLocatorByText(`Project Board Login`),
  usernameInput: () => getLocator(`#username`),
  passwordInput: () => getLocator(`#password`).first(),
  signInBtn: () => getLocator(`[type="submit"]`)
}

export async function performLogin(username: string, password: string) {
  verifyLoginPageComponents()
  enterUsernameAndPassword(username, password)
}

async function enterUsernameAndPassword(username: string, password: string) {

  await fill(loginPageElements.usernameInput(), username)
  await fill(loginPageElements.passwordInput(), password)
  await click(loginPageElements.signInBtn())
}

export async function verifyLoginPageComponents() {
  await expectElementToBeVisible(loginPageElements.headerText())
  await expectElementToBeVisible(loginPageElements.usernameInput())
  await expectElementToBeVisible(loginPageElements.passwordInput())
  await expectElementToBeEnabled(loginPageElements.signInBtn())



}
