import { expect, Page, Locator } from '@playwright/test';
import { highlightClick } from '../../../utils/commonTools';

export class PayGrades {
    private page: Page;

    // Locators
    private adminTabButton: Locator;
    private jobDropDownList: Locator;
    private payGradesFromDropDownMenu: Locator;
    private addButton: Locator;
    private inputName: Locator;
    private saveButton: Locator;
    private currenciesAddButton: Locator;
    private currencySelectDropDownMenu: Locator;
    private currencySelect: Locator;
    private inputMinimumSalary: Locator;
    private inputMaximumSalary: Locator;
    private trashIcon: Locator; 
    private yesDeleteButton: Locator;
    private buttonSave: Locator;


    constructor(page: Page) {
        this.page = page;

        // Define locators
        this.adminTabButton = this.page.locator('a[href*="/web/index.php/admin/viewAdminModule"]');
        this.jobDropDownList = page.locator("(//span[@class='oxd-topbar-body-nav-tab-item'])[2]");
        this.payGradesFromDropDownMenu = page.locator("(//a[@class='oxd-topbar-body-nav-tab-link'])[2]");
        this.addButton = page.locator("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
        this.inputName = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.saveButton = page.locator("//button[@class='oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space']");
        this.currenciesAddButton = page.locator("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
        this.currencySelectDropDownMenu = page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-select-text--arrow']");
        this.currencySelect = page.locator("//div[@role='option']/span[contains(text(),'EUR - Euro')]");
        this.inputMinimumSalary = page.locator("(//input[@class='oxd-input oxd-input--active'])[3]");
        this.inputMaximumSalary = page.locator("//label[text()='Maximum Salary']/following::input");
        this.trashIcon = page.locator("//div[contains(text(),'QA Engineer')]/ancestor::div[@role='row']/descendant::i[contains(@class,'bi-trash')]");
        this.yesDeleteButton = page.locator("//button[@class='oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin']");
        this.buttonSave = page.locator("button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space").first();
    }

    async addPayGrades() {
        console.log('Add Pay Grades');
        await this.adminTabButton.waitFor({ state: 'visible' });
        await this.adminTabButton.click();
        await this.jobDropDownList.click();
        await this.payGradesFromDropDownMenu.click();
        await this.addButton.click();
        await this.inputName.fill("QA Engineer");
        await this.saveButton.waitFor({ state: 'visible' });
        await highlightClick(this.page, "//button[@class='oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space']");
        await this.saveButton.waitFor({ state: 'attached' });
        await this.saveButton.click();
        await this.currenciesAddButton.click();
        await this.currencySelectDropDownMenu.click();
        await this.currencySelect.click();
        await this.inputMinimumSalary.fill("30000");
        await expect(this.inputMaximumSalary).toBeVisible();
        await expect(this.inputMaximumSalary).toBeEnabled();
        await this.inputMaximumSalary.click();
        await this.inputMaximumSalary.fill("155888");
        await this.buttonSave.click();
        await this.jobDropDownList.click();
        await this.payGradesFromDropDownMenu.click();
    }

    async deletePayGrades() {
        console.log('Delete Pay Grades');
        await this.trashIcon.click();
        await this.yesDeleteButton.waitFor({ state: 'visible' }); 
        await highlightClick(this.page, "//button[@class='oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin']");
        await this.yesDeleteButton.waitFor({ state: 'attached' });
        await this.yesDeleteButton.click();
        await this.page.waitForTimeout(500);
    }
}
