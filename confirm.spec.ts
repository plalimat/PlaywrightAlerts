import { test, expect } from '@playwright/test';
import {  type Page } from '@playwright/test';
import {  type  Dialog } from '@playwright/test';


test('Handle confirm box', async ({ page }: { page: Page }) => {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.on('dialog', async (dialog: Dialog) => {

        console.log("Confirm Message:", dialog.message());
        console.log("Confirm Type:", dialog.type());

        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toContain("I am a JS Confirm");

        await dialog.accept();
        // await dialog.dismiss();
    });

    await page.waitForTimeout(3000);
    console.log("waiting for 3 seconds before clicking the button...");

    await page.locator("//button[text()='Click for JS Confirm']").click();
});