import { test } from '../src/setup/page-setup';
import * as LoginPage from '../src/pages/login/login-page';
import * as HomePage from '../src/pages/homePage/home-page';
import * as TaskPage from '../src/pages/Nav-Menu/Task-Status/task-status-page';
import * as WebApplicationPage from '../src/pages/Nav-Menu/web-application-page';
import * as MobileApplicationPage from '../src/pages/Nav-Menu/mobile-application-page';
import * as MarketCampaignPage from '../src/pages/Nav-Menu/market-campaign-page';

import { ASANA_URLS, AppData, TaskStatusName, USER_INFO, WebApplicationData } from './testdata/test-data';
import { allure } from 'allure-playwright';
import { click, gotoURL, wait } from '../src/utils/action-utils';



test.describe('Loop QA  UseCases => Login to Test site', () => {





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

  testData.forEach(data => {
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
    test(`Verify task "${data.task}" in "${data.app}"`, async ({ page }) => {
      allure.label('Verify task', `"${data.task}" in "${data.app}"`);
      if (data.app !== AppData.webApplicationName) {
        // Navigate to the appropriate section if not already in the correct app
        await page.click(`text=${data.app}`);
      }
      TaskPage.verifySelectedComponentDetails([TaskStatusName.todo, TaskStatusName.inProgress, TaskStatusName.review, TaskStatusName.done],
        AppData.webApplicationName, AppData.webApplicationSubtext)
      TaskPage.verifyContentWithTaskStatus(
        TaskStatusName.todo,
        WebApplicationData.Todo.task,
        WebApplicationData.Todo.taskDetails,
        WebApplicationData.Todo.tags)
    });
  });
})