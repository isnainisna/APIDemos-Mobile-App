import { APIDemosPage } from "../pageobjects/login.page.ts";

export class APIDemosActions extends APIDemosPage {
    async navigateToTextEntryDialog() {
        // Klik menu App
        await (await this.menuApp).click();
        
        // Klik menu Alert Dialogs
        await (await this.menuAlertDialogs).click();

        /** * Menggunakan UIAutomator untuk scroll otomatis.
        
         */
        const uiSelector = 'new UiSelector().textMatches("(?i)Text Entry dialog")';
        const scrollCommand = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(${uiSelector})`;
        
        const element = await $(`android=${scrollCommand}`);
        await element.waitForExist({ timeout: 10000 });
        await element.click();
    }

    async inputUserCredentials(name: string, pass: string) {
        // Tunggu field nama muncul sebelum mengisi data
        await (await this.inputName).waitForDisplayed({ timeout: 5000 });
        await (await this.inputName).setValue(name);
        await (await this.inputPassword).setValue(pass);
    }

    async getNameValue(): Promise<string> {
        return await (await this.inputName).getText();
    }

    // Fungsi untuk mengambil teks yang tidak terlihat
    async getPasswordValue(): Promise<string> {
        return await (await this.inputPassword).getText();
    }

    async isPasswordDisplayed(): Promise<boolean> {
        return await (await this.inputPassword).isDisplayed();
    }

    // Fungsi untuk klik tombol OK
    async clickOkButton() {
        await (await this.btnOk).waitForDisplayed();
        await (await this.btnOk).click();
    }

    // TAMBAHKAN: Fungsi untuk cek apakah dialog sudah tertutup
    async isNameFieldExisting(): Promise<boolean> {
        return await (await this.inputName).isExisting();
    }
}
