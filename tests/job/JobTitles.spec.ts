import { test, expect } from '../../utils/testSetup';
import { JobTitles } from '../../pages/admin/job/JobTitles.page';

test('Adding job title and delete job title', async ({page}) => {
    const userPage = new JobTitles(page);

    await userPage.addJobTitles();
    await userPage.deleteJobTitles();
    
    const table = page.locator("//div[@role='table']");

    await expect(table.locator("text=Automation test")).toHaveCount(0);

    console.log("The 'Automation test' value was successfully deleted from the table");
});