const { test, expect } = require('@playwright/test');

test('Client App Test', async ({ page }) => {

    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body b');
    const email = "test.user@domain.com";

    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').pressSequentially(email);
    await page.getByPlaceholder('enter your passsword').pressSequentially("Asdf@123");
    await page.getByRole('button', { name: 'login' }).click();
    await expect(products.first()).toBeVisible();

    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    await page.locator('.card-body').filter({ hasText: "ZARA COAT 3" })
        .getByRole('button', { name: ' Add To Cart' }).click();
    await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
    await page.locator("div li").first().waitFor();
    expect(await page.getByText('ZARA COAT 3').isVisible());
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.locator("select.input").first().selectOption("03");
    await page.locator("select.input").last().selectOption("30");
    await page.locator("div input").nth(1).fill("876");
    await page.locator("div input").nth(2).fill("Test Name");
    await page.getByPlaceholder('Select Country').pressSequentially("ind");

    const countryDropdown = page.locator(".ta-results");
    await countryDropdown.first().waitFor();

    await page.getByRole('button', { name: 'India' }).nth(1).click();

    // const countryCount = await countryDropdown.locator("button").count();

    // for (let i = 0; i < countryCount; i++) {
    //     const countryName = await countryDropdown.locator("button").nth(i).textContent();
    //     if (countryName.trim() === "India") {
    //         await countryDropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }

    await expect(page.locator(".user__name [type=text]").first()).toHaveText(email);
    await page.getByText("PLACE ORDER").click();
    expect(await page.getByText(" Thankyou for the order. ").isVisible());

    const rawOrderId = (await page.locator('.em-spacer-1 .ng-star-inserted').textContent()).trim();
    const orderId = rawOrderId.replace(/\|/g, '').trim();
    console.log(orderId);

    await page.locator('tbody tr').filter({ hasText: orderId })
        .getByRole('button', { name: 'View' })
        .click();

    // const rows = page.locator('tbody tr');
    // const rowCount = await rows.count();

    // for (let i = 0; i < rowCount; i++) {
    //     const rowId = await rows.nth(i).locator('th').textContent();
    //     if (rowId.trim().includes(orderId)) {
    //         await rows.nth(i).locator('button', { hasText: 'View' }).click();
    //         break;
    //     }
    // }


    await page.pause();
});