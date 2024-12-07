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


  const { test, expect } = require('@playwright/test');

  // Sample data-driven input from JSON
  const testData = [
    {
      app: "Web Application",
      task: "Implement user authentication",
      column: "To Do",
      tags: ["Feature", "High Priority"]
    },
    {
      app: "Web Application",
      task: "Fix navigation bug",
      column: "To Do",
      tags: ["Bug"]
    },
    {
      app: "Web Application",
      task: "Design system updates",
      column: "In Progress",
      tags: ["Design"]
    },
    {
      app: "Mobile Application",
      task: "Push notification system",
      column: "To Do",
      tags: ["Feature"]
    },
    {
      app: "Mobile Application",
      task: "Offline mode",
      column: "In Progress",
      tags: ["Feature", "High Priority"]
    },
    {
      app: "Mobile Application",
      task: "App icon design",
      column: "Done",
      tags: ["Design"]
    }
  ];

  testData.forEach(data => {
    test(`Verify task "${data.task}" in "${data.app}"`, async ({ page }) => {
      // Login
      await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
      await page.fill('input[name="email"]', 'admin');
      await page.fill('input[name="password"]', 'password123');
      await page.click('button[type="submit"]');

      // Navigate and verify tasks
      await page.click(`text=${data.app}`);
      const taskLocator = await page.locator(`text=${data.task}`);
      await expect(taskLocator).toBeVisible();

      // Verify column
      const columnLocator = await page.locator(`text=${data.column}`);
      await expect(columnLocator).toBeVisible();

      // Verify tags
      data.tags.forEach(tag => {
        const tagLocator = page.locator(`text=${tag}`);
        expect(tagLocator).toBeVisible();
      });
    });
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

  test('Test Case 2 : ', async () => {
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