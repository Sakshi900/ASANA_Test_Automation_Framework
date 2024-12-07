import { expect } from "playwright/test";
import { textContent, wait, waitForPageLoadState } from "../../../utils/action-utils";
import { expectElementNotToBeVisible, expectElementToBeVisible, expectElementToContainText, expectElementToHaveCount, expectElementToHaveText } from "../../../utils/assert-utils";
import { getLocator, getLocatorByText, waitForSelector } from "../../../utils/locator-utils";

const TaskBoardElements = {
  appHeader: (appName: string) => getLocator(`//h1[text()='${appName}']`),
  appSubHeader: (appSubheader: string) => getLocatorByText(`${appSubheader}`).last(),

  taskStatus: (taskHeader: string) => getLocatorByText(`${taskHeader}`),
  taskContentBox: (taskStatus: string) => getLocator(`//h2[text()='${taskStatus}']/following-sibling::div//div[@class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]`),
  task: (taskStatus: string, text: string) => getLocator(`//h2[text()='${taskStatus}']/following-sibling::div//div[@class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]//h3[text()="${text}"]`),
  taskDetails: (taskStatus: string, text: string) => getLocator(`//h2[text()='${taskStatus}']/following-sibling::div//div[@class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]//p[text()="${text}"]`),
  taskTags: (taskStatus: string, task:string) => getLocator(`//h2[text()="${taskStatus}"]/parent::div//h3[text()='${task}']/following-sibling::div[@class="flex flex-wrap gap-2 mb-3"]//span`)


}

export async function verifySelectedComponentDetails(taskHeader: string[], task: string) {
  await waitForPageLoadState()
  if(task.includes("Mobile Application") == false) {
    await expectElementToBeVisible(await TaskBoardElements.appHeader(task), {timeout:30000})


  }
  for (const taskStatus of taskHeader) {
    await expectElementToBeVisible(await TaskBoardElements.taskStatus(taskStatus));
  }
}

export async function verifyContentWithTaskStatus(
  taskStatus: string,
  task: string,
  taskDetails: string,
  taskTags: string[] = []
) {

  if (!task || taskDetails == null || taskDetails === '') {
    // If either task is empty/null or taskDetails is empty/null
    await expectElementNotToBeVisible(TaskBoardElements.taskContentBox(taskStatus));
    await expectElementNotToBeVisible(TaskBoardElements.task(taskStatus, task).first());
    await expectElementNotToBeVisible(TaskBoardElements.taskDetails(taskStatus, taskDetails).first());
  } else {
    // If both task and taskDetails are non-empty
    await expectElementToBeVisible(TaskBoardElements.taskContentBox(taskStatus).first());
    await expectElementToBeVisible(TaskBoardElements.task(taskStatus, task).first());
    await expectElementToBeVisible(TaskBoardElements.taskDetails(taskStatus, taskDetails).first());
  }
  if (taskTags.length == 0) {
    await expectElementToHaveCount(TaskBoardElements.taskTags(taskStatus,task), 0)
  } else {
    await expect(await TaskBoardElements.taskTags(taskStatus,task).count()).toBeGreaterThanOrEqual(1)

    for (let i = 0; i< await TaskBoardElements.taskTags(taskStatus,task).count(); i++) {
      await expectElementToHaveText(await TaskBoardElements.taskTags(taskStatus,task).nth(i), taskTags[i])
    }
  }
} 
