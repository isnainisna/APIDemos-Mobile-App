import { expect } from "chai"; // Pastikan install chai untuk assertion
import { APIDemosActions } from "../action/appDemos.action.ts";
import * as fs from 'fs';
import { takeScreenshot } from "../takeScreenShoot/takeScreen.ts";

const apiDemosAction = new APIDemosActions();
let nameInput: string;
let passInput: string;

describe("ApiDemos - Text Entry dialog", async () => {
    
    before(async function() {
        // Inisialisasi data testing
        nameInput = "Apink";
        passInput = "098Apink";
    })

    beforeEach(async function() {
        await driver.relaunchActiveApp();
    })

    afterEach(async function() {
    if (this.currentTest?.state === "failed") {
        const folderPath = './ScreenShoot';
        
        // Pastikan folder ada
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Buat nama file yang bersih (tanpa spasi aneh)
        const fileName = this.currentTest.title.replace(/\s+/g, '_');
        const fullPath = `${folderPath}/${fileName}.png`;

        await driver.saveScreenshot(fullPath);
        console.log(`Screenshot saved to: ${fullPath}`);
    }
});

    after(async function() {
        // Menutup aplikasi setelah semua test selesai
        await driver.terminateApp('io.appium.android.apis');
    })

    it("Verify input name dan password di Text Entry dialog", async () => {
        // 1. Navigasi ke menu
        await apiDemosAction.navigateToTextEntryDialog();
        await takeScreenshot("1_Buka_Dialog");
        // 2. Isi field name dan password
        await apiDemosAction.inputUserCredentials(nameInput, passInput);
        await takeScreenshot("2_Isi_Field_Name_Password");

        // 3. Ambil nilai dari field untuk verifikasi
        const actualName = await apiDemosAction.getNameValue();
        const isPassVisible = await apiDemosAction.isPasswordDisplayed();
        const actualPassText = await apiDemosAction.getPasswordValue(); // Mengambil titik-titik

        // 4. Assertion Nama (Teks biasa)
        expect(actualName).to.equal(nameInput, "Nama yang muncul tidak sesuai!");

        // 5. Assertion Password
        // Cek apakah elemennya tampil
        expect(isPassVisible).to.be.true; 
        // Cek apakah jumlah titik-titik sesuai dengan panjang input
        expect(actualPassText.length).to.equal(passInput.length, "Jumlah masking password tidak sesuai!");

        // 6. Klik tombol OK (Langkah tambahan)
        await apiDemosAction.clickOkButton();
        await takeScreenshot("3_Klik_Button_OK");

        // 7. Verifikasi dialog tertutup (Opsional tapi bagus untuk automation)
        // Jika dialog tertutup, elemen inputName seharusnya sudah tidak ada
        const isDialogClosed = await apiDemosAction.isNameFieldExisting();
        expect(isDialogClosed).to.be.false;
    })
});
