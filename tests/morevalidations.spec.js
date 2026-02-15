const { test, expect } = require('@playwright/test');

test("More Validations", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    // await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator("li [href*='lifetime-access']:visible").click();
    const frameText = await framePage.locator('.text h2').textContent();
    console.log(await frameText.split(" ")[1]);

});