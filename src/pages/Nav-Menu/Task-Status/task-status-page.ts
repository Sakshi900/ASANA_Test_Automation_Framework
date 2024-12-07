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
  // If taskHeader (contentHeader) is not blank
  if (contentHeader && contentHeader.trim() !== '') {
    await expectElementToBeVisible(TaskBoardElements.contentTaskBox(taskStatus));
    await expectElementToBeVisible(TaskBoardElements.taskDetailsHeader(taskStatus, contentHeader));
    await expectElementToBeVisible(TaskBoardElements.taskDetailsSubtext(taskStatus, contentSubheader));

    // Check if tags exist and are visible
    const tagElements = await TaskBoardElements.taskDetailsTags(taskStatus, contentHeader).all();
    await Promise.all(tagElements.map(async (element) => await element.waitFor()));

    if (taskTags.length > 0) {
      // Expect each tag to be visible if taskTags are present
      for (const tag of taskTags) {
        await expectElementToBeVisible(TaskBoardElements.taskDetailsTags(taskStatus, tag));
      }
    } else {
      // If no tags, make sure tags are not visible
      await expectElementNotToBeVisible(TaskBoardElements.taskDetailsTags(taskStatus, contentHeader));
    }
  } else {
    // For blank task case (Test Case 7), check task status only
    await expectElementToBeVisible(TaskBoardElements.contentTaskBox(taskStatus));
    
    // Don't expect task details or tags to be visible
    await expectElementNotToBeVisible(TaskBoardElements.taskDetailsHeader(taskStatus, contentHeader));
    await expectElementNotToBeVisible(TaskBoardElements.taskDetailsSubtext(taskStatus, contentSubheader));
    await expectElementNotToBeVisible(TaskBoardElements.taskDetailsTags(taskStatus, contentHeader));
  }
}



