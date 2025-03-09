import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { highlightClick } from '../../../utils/commonTools';

export class GeneralInformation {
    private page: Page;

    // Locators
    private adminTabButton: Locator;
    private organizationDropDownList: Locator;
    private generalInformationFromDropDownList: Locator;
    private editButton: Locator;
    private organizationName: Locator;
    private registrationNumber: Locator;
    private taxId: Locator;
    private phone: Locator;
    private fax: Locator;
    private email: Locator;
    private addressStreet1: Locator;
    private addressStreet2: Locator;
    private city: Locator;
    private stateProvince: Locator;
    private zipPostalCode: Locator;
    private country: Locator;
    private chooseCountry: Locator;
    private notes: Locator;
    private save: Locator;

    constructor(page: Page) {
        this.page = page;

        // Define locators
        this.adminTabButton = page.locator("//a[contains(@href, '/web/index.php/admin/viewAdminModule')]");
        this.organizationDropDownList = page.locator("(//span[@class='oxd-topbar-body-nav-tab-item'])[3]");
        this.generalInformationFromDropDownList = page.locator("(//a[@class='oxd-topbar-body-nav-tab-link'])[1]");
        this.editButton = page.locator("//label[contains(., 'Edit')]");
        this.organizationName = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.registrationNumber = page.locator("(//input[@class='oxd-input oxd-input--active'])[3]");
        this.taxId = page.locator("//label[text()='Tax ID']/following::input[1]");
        this.phone = page.locator("//label[contains(text(),'Phone')]/ancestor::div[@class='oxd-input-group oxd-input-field-bottom-space']/descendant::input[contains(@class,'oxd-input oxd-input--active')]");
        this.fax = page.locator("//label[contains(text(),'Fax')]/ancestor::div[@class='oxd-input-group oxd-input-field-bottom-space']/descendant::input[@class='oxd-input oxd-input--active']");
        this.email = page.locator("//label[contains(text(),'Email')]/ancestor::div[@class='oxd-grid-item oxd-grid-item--gutters']/descendant::input[@class='oxd-input oxd-input--active']");
        this.addressStreet1 = page.locator("//label[contains(text(),'Address Street 1')]/ancestor::div[@class='oxd-grid-item oxd-grid-item--gutters']/descendant::input[@class='oxd-input oxd-input--active']");
        this.addressStreet2 = page.locator("//label[contains(text(),'Address Street 2')]/ancestor::div[@class='oxd-grid-item oxd-grid-item--gutters']/descendant::input[@class='oxd-input oxd-input--active']");
        this.city = page.locator("//label[contains(text(),'City')]/ancestor::div[@class='oxd-grid-item oxd-grid-item--gutters']/descendant::input[@class='oxd-input oxd-input--active']");
        this.stateProvince = page.locator("//label[contains(text(),'State/Province')]/ancestor::div[@class='oxd-grid-item oxd-grid-item--gutters']/descendant::input[@class='oxd-input oxd-input--active']");
        this.zipPostalCode = page.locator("//label[contains(text(),'Zip/Postal Code')]/ancestor::div[@class='oxd-grid-item oxd-grid-item--gutters']/descendant::input[@class='oxd-input oxd-input--active']");
        this.country = page.locator("//div[@class='oxd-select-text--after']");
        this.chooseCountry = page.locator("//span[contains(text(), 'Canada')]");
        this.notes = page.locator("//label[contains(text(),'Notes')]/ancestor::div[@class='oxd-input-group oxd-input-field-bottom-space']/descendant::textarea[@class='oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical']");
        this.save = page.locator("//button[@class='oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space']");
    }

    // Method
    async editGeneralInformation(): Promise<void> {
        console.log("Editing General Information");

        await this.adminTabButton.waitFor();
        await this.adminTabButton.click();
        await this.organizationDropDownList.click();
        await this.generalInformationFromDropDownList.click();
        await this.editButton.waitFor();
        await this.editButton.click();

        // Generating fake data
        const registrationNumber = faker.string.alphanumeric(5);
        const taxId = faker.number.int({ min: 1, max: 11 });
        const phoneNumber = faker.string.numeric(10);
        const email = faker.internet.email();
        const address = faker.location.streetAddress();
        const province = faker.location.city();
        const street = faker.location.street();
        const state = faker.location.state();
        const zip = faker.location.zipCode();
        const notesText = faker.lorem.sentence();

        await this.organizationName.fill("Lazy tim");
        await this.registrationNumber.fill(registrationNumber);
        await this.taxId.fill(taxId.toString());
        await this.phone.fill(phoneNumber);
        await this.fax.fill(phoneNumber);
        await this.email.fill(email);
        await this.addressStreet1.fill(address);
        await this.addressStreet2.fill(province);
        await this.city.fill(street);
        await this.stateProvince.fill(state);
        await this.zipPostalCode.fill(zip);
        await this.notes.fill(notesText);

        // Scroll down to Save button
        await this.page.evaluate(() => window.scrollBy(0, 500));

        await this.country.click();
        await this.chooseCountry.click();

        await this.save.waitFor();
        await highlightClick(this.page, "//button[@class='oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space']");
        await this.page.waitForTimeout(500);
        await this.save.click();
        await this.page.waitForTimeout(500);
    }
}
