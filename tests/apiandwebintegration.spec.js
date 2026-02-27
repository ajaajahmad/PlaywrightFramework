const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');

const requestBody = { userEmail: "test.user@domain.com", userPassword: "Asdf@123" };
const orderRequest = { orders: [{ country: "inda", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };

let token;
let orderId;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtil = new ApiUtils(apiContext, requestBody);
    const responses = await apiUtil.createOrder(orderRequest);
    token = responses.token;
    orderId = responses.orderId;

});

test('Client App Test', async ({ page }) => {

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);

    }, token);

    await page.goto('https://rahulshettyacademy.com/client');

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
    await page.pause();
    await expect(orderIdDetails).toContain(orderId);
});