import { test } from '../src/setup/page-setup';
import * as LoginPage from '../src/pages/login/login-page';
import * as HomePage from '../src/pages/homePage/home-page';
import * as TaskPage from '../src/pages/Nav-Menu/Task-Status/task-status-page';
import * as AppPage from '../src/pages/Nav-Menu/app-page';
import { ASANA_URLS, USER_INFO } from './testdata/test-data';
import { allure } from 'allure-playwright';
import { gotoURL, wait } from '../src/utils/action-utils';

test.describe('Loop QA UseCases => Login to Test site', () => {
  const { test, expect } = require('@playwright/test');

  // Sample data-driven input from JSON
  const testData = [
    {
      app: "Web Application",
      task: "Implement user authentication",
      taskDetails: 'Add login and signup functionality',
      column: "To Do",
      tags: ["Feature", "High Priority"]
    },
    {
      app: "Web Application",
      task: "Fix navigation bug",
      taskDetails: 'Menu does not close on mobile',
      column: "To Do",
      tags: ["Bug"]
    },
    {
      app: "Web Application",
      task: "Design system updates",
      taskDetails: 'Update color palette and typography',
      column: "In Progress",
      tags: ["Design"]
    },
    {
      app: "Mobile Application",
      task: "Push notification system",
      taskDetails: 'Implement push notifications for iOS and Android',
      column: "To Do",
      tags: ["Feature"]
    },
    {
      app: "Mobile Application",
      task: "Offline mode",
      taskDetails: 'Enable offline data synchronization',
      column: "In Progress",
      tags: ["Feature", "High Priority"]
    },
    {
      app: "Mobile Application",
      task: '',
      taskDetails: '',
      column: "Review",
      tags: []
    },
    {
      app: "Mobile Application",
      task: "App icon design",
      taskDetails: 'Create app icons for all required sizes',
      column: "Done",
      tags: ["Design"]
    }
  ];

  // Define beforeEach and afterEach hooks outside the loop, at the describe level
  test.beforeEach('Login Test', async () => {
    allure.label('BeforeAll', 'Login To Application');
    await gotoURL(ASANA_URLS.baseUrl);
    await LoginPage.verifyLoginPageComponents();
    await LoginPage.performLogin(USER_INFO.username, USER_INFO.password);
  });

  test.afterEach('Logout Test', async () => {
    allure.label('AfterAll', 'Logout From Application');
    await HomePage.clickOnLogoutBtn();
    await LoginPage.verifyLoginPageComponents();
  });

  // Now, loop through the test data and create dynamic test cases
  testData.forEach(data => {
    test(`Verify task "${data.task}" in "${data.app}"`, async ({ page }) => {
      allure.label('Verify task', `"${data.task}" in "${data.app}"`);
      // Navigate to the appropriate app section if not already on the correct app
      AppPage.navigateToApp(data.app)

      const taskStatus = data.column; // Get the column dynamically
      const appName = data.app; // Get the app name dynamically

      // Verify component details for the selected task column
      TaskPage.verifySelectedComponentDetails([taskStatus], appName);
      await wait(5000)

      // Verify content with task status, task name, and tags
      TaskPage.verifyContentWithTaskStatus(
        taskStatus,
        data.task,
        data.taskDetails,
        data.tags
      );
    });
  });
});
