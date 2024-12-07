import { textContent } from "../../../utils/action-utils";
import { expectElementToBeVisible, expectElementToHaveText } from "../../../utils/assert-utils";
import { getLocator, getLocatorByText } from "../../../utils/locator-utils";

const TaskBoardElements = {
  componentSelectedHeader: (componentName: string) => getLocatorByText(`${componentName}`).nth(2),
  componentSelectedSubtext: (componentSubText: string) => getLocatorByText(`${componentSubText}`).last(),

  taskHeaders: (taskHeader: string) => getLocatorByText(`${taskHeader}`),
  contentTaskBox: (taskStatus: string) => getLocator(`//h2[text()='${taskStatus}']/following-sibling::div//div[@class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]`).first(),
  taskDetailsHeader: (taskStatus: string, text: string) => getLocator(`//h2[text()='${taskStatus}']/following-sibling::div//div[@class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]//h3[text()='${text}']`),
  taskDetailsSubtext: (taskStatus: string, text: string) => getLocator(`//h2[text()='${taskStatus}']/following-sibling::div//div[@class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]//p[text()='${text}']`),
  taskDetailsTags: (taskStatus: string, contentsubheader: string) => getLocator(`//h2[text()='${taskStatus}']/parent::div/div//h3[text()='${contentsubheader}']/parent::div//div[@class="flex flex-wrap gap-2 mb-3"]//span`),


}

export async function verifySelectedComponentDetails(taskHeader: string[], componentname: string, componentSubtext: string) {
  await expectElementToBeVisible(TaskBoardElements.componentSelectedHeader(componentname))
  await expectElementToHaveText(TaskBoardElements.componentSelectedHeader(componentname), componentname)
  await expectElementToBeVisible(TaskBoardElements.componentSelectedSubtext(componentSubtext))
  await expectElementToHaveText(TaskBoardElements.componentSelectedSubtext(componentSubtext), componentSubtext)
  for (const taskStatus of taskHeader) {
    await expectElementToBeVisible(TaskBoardElements.taskHeaders(taskStatus));
  }
}

export async function verifyContentWithTaskStatus(
  taskStatus: string,
  contentHeader: string,
  contentSubheader: string,
  taskTags: string[]
) {
  await expectElementToBeVisible(TaskBoardElements.contentTaskBox(taskStatus).first());
  await expectElementToBeVisible(TaskBoardElements.taskDetailsHeader(taskStatus, contentHeader));
  await expectElementToBeVisible(TaskBoardElements.taskDetailsSubtext(taskStatus, contentSubheader));
  const tagElements = await TaskBoardElements.taskDetailsTags(taskStatus, contentHeader).all();

// Wait for the elements to be present
await Promise.all(tagElements.map(async (element) => await element.waitFor()));

const actualTags = await Promise.all(
  tagElements.map(async (element) => await element.textContent()) // Extract the text from each element
);

// Verify all expected tags are present
for (const tag of taskTags) {
  if (!actualTags.includes(tag)) {
    throw new Error(`Expected tag "${tag}" not found in task tags. Found: ${actualTags.join(', ')}`);
  }
}
}

