import { getLocator, getLocatorByLabel } from '../utils/locator-utils';
import { click } from '../utils/action-utils';
import { expectPageToContainURL } from '../utils/assert-utils';

const bagPageElements = {

    continueBtn: () => getLocatorByLabel(`Continue`).last(),
    bagNumberToSelect: (bagType: string) => getLocator(`//poplin-number-stepper[@ng-reflect-description="${bagType}"]//div[@class="stepper-field"]//poplin-button[@icon="plus_custom"]`),

}

async function clickOnContinueBtn() {

    await click(bagPageElements.continueBtn())

}

export async function selectBagTypeAndCount(bagCount: number, bagType: string) {
    await expectPageToContainURL(`/bag-count`)
    for (let i = 0; i < bagCount; i++) {
        await click(bagPageElements.bagNumberToSelect(bagType))
    }
    await clickOnContinueBtn()

}




