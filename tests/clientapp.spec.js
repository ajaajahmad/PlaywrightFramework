const { test, expect } = require('@playwright/test');

test.only('Client App Test', async ({ page }) => {

    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body b');

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill("anshika@gmail.com");
    await page.locator('#userPassword').fill("Iamking@000");
    await page.locator('#login').click();

    await expect(products.first()).toBeVisible();

    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const text = await products.nth(i).textContent();

        if (text.trim() === productName) {
            await page.locator('.card-body').filter({ hasText: productName }).locator('text=Add To Cart').click();
            break;
        }
    }

    await page.locator("[routerlink*=cart]").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    const monthDropdown = page.locator("select.input").first();
    await monthDropdown.selectOption("03");
    const yearDropdown = page.locator("select.input").last();
    await yearDropdown.selectOption("30");
    await page.locator("div input").nth(1).fill("876");
    await page.locator("div input").nth(2).fill("Test Name");
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const countryDropdown = page.locator(".ta-results");
    await countryDropdown.first().waitFor();
    const countryCount = await countryDropdown.locator("button").count();

    for (let i = 0; i < countryCount; i++) {
        const countryName = await countryDropdown.locator("button").nth(i).textContent();
        if (countryName.trim() === "India") {
            await countryDropdown.locator("button").nth(i).click();
            await page.locator("[class*=submit]").click();
            break;
        }
    }

    await page.pause();
});