// File: test/pageobjects/login.page.ts (atau nama file Page Object kamu)

export class APIDemosPage {
    // Locator Menu Utama
    get menuApp() { return $('~App'); }
    get menuAlertDialogs() { return $('~Alert Dialogs'); }

    // Locator Spesifik Dialog (Taruh di sini)
    get menuTextEntryDialog() { 
        return $('android=new UiSelector().text("Text Entry Dialog")'); 
    }

    // Locator Input di dalam Dialog
    get inputName() { 
    return $('id=io.appium.android.apis:id/username_edit'); 
}

get inputPassword() { 
    return $('id=io.appium.android.apis:id/password_edit'); 
}
    get btnOk() { return $('id=android:id/button1'); }
}
