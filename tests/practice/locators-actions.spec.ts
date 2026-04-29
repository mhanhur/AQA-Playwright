import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


test('Registration', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/register');
    await page.getByRole('textbox', { name: 'First Name' }).fill(faker.person.firstName())
    await page.getByRole('textbox', { name: 'Last Name' }).fill(faker.person.lastName())
    await page.getByRole('textbox', { name: 'Enter phone number' }).fill(faker.phone.number());
    await page.locator('#countries_dropdown_menu').selectOption('Ukraine');
    await page.getByRole('textbox', { name: 'Enter email' }).fill(faker.internet.email());
    await page.getByRole('textbox', { name: 'Password' }).fill(faker.internet.password());
    await page.getByRole('checkbox', { name: 'I agree with the terms and' }).check();
    await page.getByRole('button', { name: 'Register' }).click();
    const alert = page.locator('#message')
    await expect(alert).toBeVisible()
})

test('Click at iFrame test', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/iframe')
    const iFrame = page.frameLocator('#iframe-checkboxes')
    await iFrame.getByRole('button', {name: 'Learn more'}).click()
    await iFrame.locator('#show-text').isVisible()
})

test('Check checkboxes', async ({ page }) => {
    await page.goto('https://www.qa-practice.com/elements/checkbox/mult_checkbox');
    const checkboxes = page.getByRole('checkbox');
    const checkboxesLabel = page.locator('.form-check-label')
    let checkboxValue = 'three'
    const submitButton = page.getByRole('button', {name: 'Submit'})
    const resultText = page.locator('#result-text')
    
    for(let checkbox of await checkboxes.all()){ 
        if(await checkbox.getAttribute('value') === checkboxValue){
            await checkbox.check()
        }
        expect(submitButton).toBeEnabled()
        await submitButton.click()
    } // third requirement
    expect(await resultText.textContent()).toEqual(checkboxValue)
    await expect(checkboxes).toHaveCount(3) // first requirement
    expect(await checkboxesLabel.allInnerTexts()).toEqual(['One', 'Two', 'Three']) // second requirement
    
})

test('Work with tables', async ({ page }) => {
    await page.goto('https://letcode.in/table');
    const tablePricesArray = await page.locator('#shopping tbody tr td:nth-child(2)').allTextContents()
    const totalPrice = await page.locator('#shopping tfoot tr td:nth-child(2)').textContent()
    const sortedPrice = tablePricesArray.map(Number).sort((a: number, b: number) => a - b)
    const resultPrice = sortedPrice.reduce((a, b) => a + b).toString()
    expect(resultPrice).toEqual(totalPrice)
})
