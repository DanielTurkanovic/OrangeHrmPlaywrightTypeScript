import { Page, Locator } from '@playwright/test';
import { highlightClick } from '../../../utils/commonTools';
import * as path from 'path';
import * as fs from 'fs';

export class JobTitles {
    private page: Page;

    // Locators
    private adminTabButton: Locator;
    private jobDropDownList: Locator;
    private jobTitlesFromDropDownList: Locator;
    private addButton: Locator;
    private jobTitle: Locator;
    private jobDescription: Locator;
    private browseButton: Locator;
    private note: Locator;
    private saveButton: Locator;
    private trashIcon: Locator;
    private yesDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Define locators
        this.adminTabButton = page.locator("//a[contains(@href, '/web/index.php/admin/viewAdminModule')]");
        this.jobDropDownList = page.locator("(//span[@class='oxd-topbar-body-nav-tab-item'])[2]");
        this.jobTitlesFromDropDownList = page.locator("(//a[@class='oxd-topbar-body-nav-tab-link'])[1]");
        this.addButton = page.locator("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
        this.jobTitle = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.jobDescription = page.locator("(//textarea[@class='oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical'])[1]");
        this.browseButton = page.locator("//input[@type='file']");
        this.note = page.locator('[placeholder="Add note"]');  

        this.saveButton = page.locator("//button[@type='submit']");
        this.trashIcon = page.locator("//div[contains(text(),'Automation test')]/ancestor::div[@role='row']/descendant::i[contains(@class,'bi-trash')]");
        this.yesDeleteButton = page.locator("//button[@class='oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin']");
    }

    // Methods
    async addJobTitles(): Promise<void> {
        console.log("Adding Job Title");

        await this.adminTabButton.click();
        await this.jobDropDownList.click();
        await this.jobTitlesFromDropDownList.click();
        await this.addButton.click();
        await this.jobTitle.fill("Automation test");
        await this.jobDescription.fill("Automation test");

        const imagePath = path.resolve(process.cwd(), 'testData/251411.png');
        console.log("Image Path: ", imagePath);

        // Check to see if the file exists before uploading it
        if (!fs.existsSync(imagePath)) {
            throw new Error(`File not found: ${imagePath}`);
        }

        // Load file in Playwright test
        await this.browseButton.setInputFiles(imagePath);

        await this.note.fill('We are making automation test easy');
        await this.saveButton.waitFor({ state: 'visible' });
        await highlightClick(this.page, "//button[@type='submit']");
        await this.saveButton.waitFor({ state: 'attached' });
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
    }

    async deleteJobTitles(): Promise<void> {
        console.log("Deleting Job Title");

        await this.trashIcon.click();
        await this.yesDeleteButton.waitFor({state: 'visible'});
        await highlightClick(this.page, "//button[@class='oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin']");
        await  this.yesDeleteButton.waitFor({ state: 'attached' });
        await this.yesDeleteButton.click();
        await this.page.waitForTimeout(1000);
    }
}

