import { test } from '../src/setup/page-setup';
import * as LoginPage from '../src/pages/login/login-page';
import * as HomePage from '../src/pages/homePage/home-page';
import * as TaskPage from '../src/pages/Nav-Menu/Task-Status/task-status-page';
import * as WebApplicationPage from '../src/pages/Nav-Menu/web-application-page';
import * as MobileApplicationPage from '../src/pages/Nav-Menu/mobile-application-page';
import * as MarketCampaignPage from '../src/pages/Nav-Menu/market-campaign-page';

import { ASANA_URLS, AppData, TaskStatusName, USER_INFO, WebApplicationData } from './testdata/test-data';
import { allure } from 'allure-playwright';
import { gotoURL, wait } from '../src/utils/action-utils';



test.describe('Loop QA  UseCases => Login to Test site', () => {


  test.beforeAll('Login Test', async () => {
    allure.label('BeforeAll', 'Login To Application');
    await gotoURL(ASANA_URLS.baseUrl)
    await LoginPage.verifyLoginPageComponents()
    await LoginPage.performLogin(USER_INFO.username, USER_INFO.password);

  });
  test.afterAll('Logout Test', async () => {
    allure.label('AfterAll', 'Logout From Application');
    await HomePage.clickOnLogoutBtn()
    await LoginPage.verifyLoginPageComponents()
  });

  test('Test Case 1 : ', async () => {
    allure.label('Test Case 1', 'Logout From Application');
    TaskPage.verifySelectedComponentDetails([TaskStatusName.todo, TaskStatusName.inProgress, TaskStatusName.review, TaskStatusName.done],
      AppData.webApplicationName, AppData.webApplicationSubtext)
    TaskPage.verifyContentWithTaskStatus(
      TaskStatusName.todo,
      WebApplicationData.Todo.header,
      WebApplicationData.Todo.subheader,
      WebApplicationData.Todo.tags)
  });
})