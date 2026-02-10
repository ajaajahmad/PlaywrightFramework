const { test, expect } = require('@playwright/test');

test('First Test', async function ({ browser }) {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('Second Test', async ({ page }) => {

    const userName = page.locator("input#username");
    const signIn = page.locator("input.btn-info");
    const productTitle = page.locator('.card-body a');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await console.log(await page.title());
    await userName.fill("rahulshettyacademyq");
    await page.locator("[id='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    await userName.fill("rahulshettyacademy")
    await await page.locator("[id='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await productTitle.first().textContent());
    console.log(await productTitle.nth(1).textContent());
    const titleList = await productTitle.allTextContents();
    console.log(titleList);
});

test('UI Control', async ({ page }) => {

    const userName = page.locator("input#username");
    const signIn = page.locator("input.btn-info");
    const docuementLink = page.locator("[href*='documents-request']");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const dropDown = page.locator("select.form-control");
    await dropDown.selectOption("consult");
    await page.locator(".customradio").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".customradio").last()).toBeChecked();
    console.log(await page.locator(".customradio").last().isChecked());
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(docuementLink).toHaveAttribute("class", "blinkingText");
});

test('Child Window Handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const docuementLink = page.locator("[href*='documents-request']");
    const userName = page.locator("input#username");
    await expect(docuementLink).toHaveAttribute("class", "blinkingText");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), docuementLink.click(),
        ]
    )
    const text = await newPage.locator(".red").textContent();
    const textArry = text.split("@");
    const domain = textArry[1].split(" ")[0];
    console.log(domain);
    await page.locator("input#username").fill(domain);
    console.log(await page.locator("input#username").inputValue());
});