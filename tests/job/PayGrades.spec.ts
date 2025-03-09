import { test } from '../../utils/testSetup';
import { PayGrades } from '../../pages/admin/job/PayGrades.page';

test('Add, edit and delete Pay Grades', async ({page}) => {
    const userPage = new PayGrades(page);

    await userPage.addPayGrades();
    await userPage.deletePayGrades();

    const workShifts = await page.locator("//div[@role='table']");
    const tableRows = await workShifts.locator("(//div[@role='rowgroup'])[2]").locator("//div[@class='oxd-table-card']").all();

    let QAEngineer = false;

    for (const row of tableRows) {
        const textContent = await row.textContent();
        if (textContent?.includes("QA Engineer")) {
            QAEngineer = true;
            throw new Error("The value has not been deleted");
        }
    }

    if (!QAEngineer) {
        console.log("The 'QA Engineer' value was successfully deleted from the table");
    }
})