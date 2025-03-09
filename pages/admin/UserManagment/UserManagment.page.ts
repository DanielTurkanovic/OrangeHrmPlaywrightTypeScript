import { Locator, Page } from '@playwright/test';
import { highlightClick } from '../../../utils/commonTools';

export class UserManagmentPage {
    private page: Page;

    // Locators
    private adminTabButton: Locator;
    private addUserButton: Locator;
    private userRoleDropDown: Locator;
    private adminUserRole: Locator;
    private employeeNameInputField: Locator;
    private chooseName: Locator;
    private statusDropDown: Locator;
    private chooseStatus: Locator;
    private userNameInputField: Locator;
    private passwordInputField: Locator;
    private confirmPasswordInputField: Locator;
    private addUserSaveButton: Locator;
    private searchUserName: Locator;
    private userSearchButton: Locator;
    private trashIconClick: Locator;
    private yesDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Define locators
        this.adminTabButton = this.page.locator('a[href*="/web/index.php/admin/viewAdminModule"]');
        this.addUserButton = this.page.locator('button:has-text("Add")');
        this.userRoleDropDown = this.page.locator('.oxd-select-text--after').first();
        this.adminUserRole = this.page.locator('div[role="option"] span', { hasText: 'Admin' });
        this.employeeNameInputField = this.page.locator('input[placeholder="Type for hints..."]');
        this.chooseName = this.page.locator('div[role="option"]').first();
        this.statusDropDown = this.page.locator('//div[@class="oxd-select-text-input" and text()="-- Select --"]');
        this.chooseStatus = this.page.locator('.oxd-select-option span', { hasText: 'Enabled' });
        this.userNameInputField = this.page.locator('div.oxd-input-group:has(label:has-text("Username")) input');
        this.passwordInputField = this.page.locator('//label[text()="Password"]/ancestor::div[contains(@class, "oxd-input-group")]/div/input');
        this.confirmPasswordInputField = this.page.locator('//label[text()="Confirm Password"]/ancestor::div[contains(@class, "oxd-input-group")]//input[@type="password"]');
        this.addUserSaveButton = this.page.locator('[type="submit"]')
        this.searchUserName = this.page.locator('div.oxd-input-group:has(label:has-text("Username")) input');
        this.userSearchButton = this.page.locator('[type="submit"]');
        this.trashIconClick = this.page.locator(`//div[contains(text(),'Buggs Bonney')]/ancestor::div[@role='row']//i[contains(@class,'bi-trash')]`);
        this.yesDeleteButton = this.page.locator('//button[contains(@class, "oxd-button--label-danger")]');
    }

    // Methods
    async clickAdminTab() {
        await this.adminTabButton.click();
    }

    async clickOnAddButton() {
        await this.addUserButton.click();
    }

    async addUser() {
        console.log('Add user');
        await this.userRoleDropDown.click();
        await this.adminUserRole.click();
        await this.employeeNameInputField.press('a');
        await this.page.waitForTimeout(1500);
        await this.chooseName.click();
        await this.statusDropDown.click();
        await this.chooseStatus.click();
        await this.userNameInputField.click();
        await this.userNameInputField.fill('Buggs Bonney');
        await this.passwordInputField.click();
        await this.passwordInputField.fill('Tester111');
        await this.confirmPasswordInputField.fill('Tester111');
        await this.addUserSaveButton.waitFor({ state: 'visible' });
        await highlightClick(this.page, '[type="submit"]');
        await this.addUserSaveButton.waitFor({ state: 'attached' });
        await this.addUserSaveButton.click();
        await this.page.waitForTimeout(500);
    }

    async searchAddedUser() {
        console.log('Search added user');
        await this.searchUserName.click();
        await this.searchUserName.fill('Buggs Bonney');
        await highlightClick(this.page, '[type="submit"]');
        await this.userSearchButton.click();
        await this.page.waitForTimeout(2000);
    }

    async deleteAddedUser() {
        console.log('Delete user');
        await this.trashIconClick.click();
        await highlightClick(this.page, '//button[contains(@class, "oxd-button--label-danger")]');
        await this.yesDeleteButton.waitFor();
        await this.yesDeleteButton.click();
        await this.page.waitForTimeout(2000);
    }
}