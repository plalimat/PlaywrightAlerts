import { test, expect } from '@playwright/test';
import {  type Page } from '@playwright/test';
import {  type  Dialog } from '@playwright/test';
test('To handle alert', async ({ page }: { page: Page }) => {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    /*
    page.on works only for one dialog at a time,
     if there are multiple dialogs then we have to use page.once 
     which will work for one dialog and then we can use page.on for the next dialog, 
     but in this case we have only one dialog so we can use page.on directly.
    */
    page.on('dialog', async (dialog: Dialog) => {

        console.log("Alert Message:", dialog.message());
        console.log("Alert Type:", dialog.type());

        /* To validate the type of dialog, we can use the type() method which will return the type of dialog as a string,
        it can be either alert, confirm or prompt */

        expect(dialog.type()).toBe("alert");

        await dialog.accept();
    });

    await page.locator("//button[text()='Click for JS Alert']").click();
});


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

    await page.locator("//button[text()='Click for JS Confirm']").click();
});