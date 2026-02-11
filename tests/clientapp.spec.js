const { test, expect } = require('@playwright/test');

test('Client App Test', async ({ page }) => {

    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body b');
    const email = "test.user@domain.com";

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').pressSequentially(email);
    await page.locator('#userPassword').pressSequentially("Asdf@123");
    await page.locator('#login').click();
    await expect(products.first()).toBeVisible();

    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const text = await products.nth(i).textContent();
        if (text.trim() === productName) {
            await page.locator('.card-body')
                .filter({ hasText: productName })
                .locator('text=Add To Cart')
                .click();
            break;
        }
    }

    await page.locator("[routerlink*=cart]").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("select.input").first().selectOption("03");
    await page.locator("select.input").last().selectOption("30");
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
            break;
        }
    }

    await expect(page.locator(".user__name [type=text]").first()).toHaveText(email);
    await page.locator("[class*=submit]").click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");

    const rawOrderId = (await page.locator('.em-spacer-1 .ng-star-inserted').textContent()).trim();
    const orderId = rawOrderId.replace(/\|/g, '').trim();
    console.log(orderId);

    await page.locator("button[routerlink*='myorder']").click();
    await page.locator('tbody').waitFor();

    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
        const rowId = await rows.nth(i).locator('th').textContent();
        if (rowId.trim().includes(orderId)) {
            await rows.nth(i).locator('button', { hasText: 'View' }).click();
            break;
        }
    }

    const orderIdDetails = (await page.locator('.col-text').textContent()).trim();
    await expect(orderId.includes(orderIdDetails)).toBeTruthy();
});