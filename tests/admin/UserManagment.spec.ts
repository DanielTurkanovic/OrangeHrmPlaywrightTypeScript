import { test, expect } from '../../utils/testSetup';
import { UserManagmentPage } from '../../pages/admin/UserManagment/UserManagment.page';

test('Add New User, delete and assert user is deleted', async ({ page }) => {
    const userPage = new UserManagmentPage(page);

    await userPage.clickAdminTab();
    await userPage.clickOnAddButton();
    await userPage.addUser();
    await userPage.searchAddedUser();
    await userPage.deleteAddedUser();

    const userNameInputField = page.locator('div.oxd-input-group:has(label:has-text("Username")) input');
    await userNameInputField.click();
    await userNameInputField.fill('');

    const userSearchButton = page.locator('[type="submit"]');
    userSearchButton.click();
    await page.waitForTimeout(1000);

    const workShifts = await page.locator("//div[@role='table']");

    const tableRows = await workShifts.locator("(//div[@role='rowgroup'])[2]").locator("//div[@class='oxd-table-card']").all();

    let BuggsBonney = false;

    for (const row of tableRows) {
        const textContent = await row.textContent();
        if (textContent?.includes("Buggs Bonney")) {
            BuggsBonney = true;
            throw new Error("The value has not been deleted");
        }
    }

    if (!BuggsBonney) {
        console.log("The 'Buggs Bonney' value was successfully deleted from the table");
    }
});
