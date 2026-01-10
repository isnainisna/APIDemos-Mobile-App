import { APIDemosPage } from "../pageobjects/login.page.ts";

export class APIDemosActions extends APIDemosPage {
    async navigateToTextEntryDialog() {
        // Klik menu App
        await (await this.menuApp).click();
        
        // Klik menu Alert Dialogs
        await (await this.menuAlertDialogs).click();

        /** * PERBAIKAN: Gunakan selector Android UIAutomator untuk scroll otomatis 
         * karena "Text Entry Dialog" berada di urutan bawah daftar.
         */
        const uiSelector = 'new UiSelector().textMatches("(?i)Text Entry dialog")';
        const scrollCommand = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(${uiSelector})`;
        await $(`android=${scrollCommand}`).click();

        // Tunggu sebentar untuk memastikan elemen siap di-klik
    //     await element.waitForExist({ 
    //     timeout: 10000, 
    //     timeoutMsg: 'Gagal menemukan Text Entry dialog setelah scrolling 10 detik' 
    // });
    //     await element.click();
    }

    async inputUserCredentials(name: string, pass: string) {
        // Pastikan dialog muncul sebelum mengisi data
        await (await this.inputName).waitForDisplayed({ timeout: 5000 });
        await (await this.inputName).setValue(name);
        await (await this.inputPassword).setValue(pass);
    }

    async getNameValue(): Promise<string> {
        return await (await this.inputName).getText();
    }

    async getPasswordValue(): Promise<string> {
        return await (await this.inputPassword).getText();
    }
}