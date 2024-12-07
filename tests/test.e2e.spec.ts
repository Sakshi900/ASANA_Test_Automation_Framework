import { test } from '../src/setup/page-setup';
import * as LoginPage from '../src/pages/login/login-page';
import * as TaskPage from '../src/pages/Nav-Menu/Task-Status/task-status-page';
import * as AppPage from '../src/pages/Nav-Menu/app-page';
import { ASANA_URLS, USER_INFO, TaskStatusData } from './testdata/test-data';
import { allure } from 'allure-playwright';
import { gotoURL, wait } from '../src/utils/action-utils';

test.describe.serial('Loop QA UseCases => Login to Test site', () => {


  test.beforeEach('Login Test', async () => {
    allure.label('BeforeAll', 'Login To Application');
    await gotoURL(ASANA_URLS.baseUrl);
    await LoginPage.verifyLoginPageComponents();
    await LoginPage.performLogin(USER_INFO.username, USER_INFO.password);
  });

  test.afterEach('Logout Test', async () => {
    allure.label('AfterAll', 'Logout From Application');
    await AppPage.clickOnLogoutBtn();
    await LoginPage.verifyLoginPageComponents();
  });

  TaskStatusData.forEach(taskData => {
    test(`Verify task "${taskData.task}" in "${taskData.app}"`, async ({ }) => {
      allure.label('Verify task', `"${taskData.task}" in "${taskData.app}"`);
      AppPage.navigateToApp(taskData.app)
      TaskPage.verifySelectedComponentDetails([taskData.taskStatus], taskData.app);
      TaskPage.verifyContentWithTaskStatus(
        taskData.taskStatus,
        taskData.task,
        taskData.taskDetails,
        taskData.tags
      );
    });
  });
});
