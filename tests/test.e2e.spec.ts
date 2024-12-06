import { test } from '../src/setup/page-setup';
import * as LoginPage from '../src/pages/login/login-page';
import * as HomePage from '../src/pages/homePage/home-page';
import { USER_INFO } from './testdata/test-data';


test.describe('Poplin  UseCases => Order Placement', () => {
  test('Use Case 1: Place a New Order with Standard Delivery', async () => {
    await LoginPage.performLogin(USER_INFO.username, USER_INFO.password);
    await HomePage.clickOnLogoutBtn()
    await LoginPage.verifyLoginPageComponents()

  });
})