import { test, expect } from '../../utils/testSetup';
import { PayGrades } from '../../pages/admin/job/PayGrades.page';

test('Add, edit and delete Pay Grades', async ({page}) => {
    const userPage = new PayGrades(page);

    await userPage.addPayGrades();
    await userPage.deletePayGrades();

    const table = page.locator("//div[@role='table']");
    await expect(table.locator("text=QA Engineer")).toHaveCount(0);

    console.log("The 'QA Engineer' value was successfully deleted from the table");
});
