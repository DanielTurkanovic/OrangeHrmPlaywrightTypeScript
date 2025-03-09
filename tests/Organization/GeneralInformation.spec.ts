import { test } from '../../utils/testSetup';
import { GeneralInformation } from '../../pages/admin/Organization/GeneralInformation.page';

test('Editing General Information', async ({page}) => {
    const userPage = new GeneralInformation(page);

    await userPage.editGeneralInformation();
})

