import { test } from '../../utils/testSetup';
import { JobTitles } from '../../pages/admin/job/JobTitles.page';

test('Adding job title and delete job title', async ({page}) => {
    const userPage = new JobTitles(page);

    await userPage.addJobTitles();
    await userPage.deleteJobTitles();
})