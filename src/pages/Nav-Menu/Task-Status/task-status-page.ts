import { waitForPageLoadState } from "../../../utils/action-utils";
import { expectElementNotToBeVisible, expectElementToBeVisible, expectElementToHaveText } from "../../../utils/assert-utils";
import { getLocator, getLocatorByText } from "../../../utils/locator-utils";

const TaskBoardElements = {
  componentSelectedHeader: (componentName: string) => getLocator(`//h1[text()='${componentName}']`),
  componentSelectedSubtext: (componentSubText: string) => getLocatorByText(`${componentSubText}`).last(),

  taskHeaders: (taskHeader: string) => getLocatorByText(`${taskHeader}`),
  contentTaskBox: (taskStatus: string) => getLocator(`//h2[text()='${taskStatus}']/following-sibling::div//div[@class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]`).first(),
  taskDetailsHeader: (taskStatus: string, text: string) => getLocator(`//h2[text()='${taskStatus}']/following-sibling::div//div[@class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]//h3[text()='${text}']`),
  taskDetailsSubtext: (taskStatus: string, text: string) => getLocator(`//h2[text()='${taskStatus}']/following-sibling::div//div[@class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]//p[text()='${text}']`),
  taskDetailsTags: (taskStatus: string, contentsubheader: string) => getLocator(`//h2[text()='${taskStatus}']/parent::div/div//h3[text()='${contentsubheader}']/parent::div//div[@class="flex flex-wrap gap-2 mb-3"]//span`),


}

export async function verifySelectedComponentDetails(taskHeader: string[], componentname: string) {
  await waitForPageLoadState()
  await expectElementToBeVisible(await TaskBoardElements.componentSelectedHeader(componentname))
  // await expectElementToHaveText(await TaskBoardElements.componentSelectedHeader(componentname), componentname)

  for (const taskStatus of taskHeader) {
    await expectElementToBeVisible(await TaskBoardElements.taskHeaders(taskStatus));
  }
}

export async function verifyContentWithTaskStatus(
  taskStatus: string,
  contentHeader: string,
  contentSubheader: string,
  taskTags: string[]
) {
  if (contentHeader && contentHeader.trim() !== '') {
    await expectElementToBeVisible(TaskBoardElements.contentTaskBox(taskStatus));
    await expectElementToBeVisible(TaskBoardElements.taskDetailsHeader(taskStatus, contentHeader));
    await expectElementToBeVisible(TaskBoardElements.taskDetailsSubtext(taskStatus, contentSubheader));

    const tagElements = await TaskBoardElements.taskDetailsTags(taskStatus, contentHeader).all();
    await Promise.all(tagElements.map(async (element) => await element.waitFor()));

    if (taskTags.length > 0) {
      for (const tag of taskTags) {
        await expectElementToBeVisible(TaskBoardElements.taskDetailsTags(taskStatus, tag));
      }
    } else {
      // For blank contentHeader, expect elements to be not visible
      await expectElementNotToBeVisible(TaskBoardElements.contentTaskBox(taskStatus));
      await expectElementNotToBeVisible(TaskBoardElements.taskDetailsSubtext(taskStatus, contentSubheader));
      // Ensure no tags are visible when taskTags is empty
      await expectElementNotToBeVisible(TaskBoardElements.taskDetailsTags(taskStatus, contentHeader));
    }
  } else {
    // In case of a blank task (empty contentHeader), ensure all related elements are not visible
    await expectElementNotToBeVisible(TaskBoardElements.contentTaskBox(taskStatus));
    await expectElementNotToBeVisible(TaskBoardElements.taskDetailsHeader(taskStatus, contentHeader));
    await expectElementNotToBeVisible(TaskBoardElements.taskDetailsSubtext(taskStatus, contentSubheader));
    await expectElementNotToBeVisible(TaskBoardElements.taskDetailsTags(taskStatus, contentHeader));
  }
}


