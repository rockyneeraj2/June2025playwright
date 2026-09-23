import { expect, test } from '@playwright/test'



test('WebTable Handle', async ({ page }) => {

    await page.goto("https://demoqa.com/webtables");

    // Find row containing Cierra Vega
    const row = page.locator("//table//tr").filter({ hasText: 'Cierra' });

    //Verify the row
    await expect(row).toHaveCount(1);

    //print complete row
    console.log(await row.innerText());

    // Click Edit inside the same row
    await row.locator("//span[@title='Edit']").click();

    /*
Table
  ↓
Find row by unique data
  ↓
Cierra Vega
  ↓
Find Edit inside that row
  ↓
Click Edit
    */

});

test('Get all rows', async ({ page }) => {

    await page.goto("https://demoqa.com/webtables");
    const row = page.locator("//table//tr");
    console.log("no of rows: " + await row.count());

    for (let i = 0; i < await row.count(); i++) {
        console.log(await row.nth(i).innerText());

    }


});

test('Get all names', async ({ page }) => {

    await page.goto("https://demoqa.com/webtables");
    const names = page.locator("//table//tr");
    console.log("no of rows: " + await names.count());

    for (let i = 0; i < await names.count(); i++) {
        console.log(await names.nth(i).innerText());
    }


});

test('Find employee from Department Find an employee whose department is Insurance and click Edit.', async ({ page }) => {

    await page.goto("https://demoqa.com/webtables");
    const row = page.locator("//table//tr").filter({ hasText: 'Insurance' }).first();
    console.log(await row.innerText());

    await row.locator("//span[@title='Edit']").click();


});

test('Find the employee whose name is Cierra Vega and department is Insurance.', async ({ page }) => {

    await page.goto("https://demoqa.com/webtables");
    const row = page.locator("//table//tr").filter({ hasText: 'Cierra' })
        .filter({ hasText: 'Insurance' });
    console.log("no of rows: " + await row.count());

    await expect(row).toHaveCount(1);

    await row.locator("//span[@title='Edit']").click();

});

test('Edit a value in the table After clicking Edit, suppose a popup opens.', async ({ page }) => {

    await page.goto("https://demoqa.com/webtables");
    const row = page.locator("//table//tr").filter({ hasText: 'Cierra' })
        .filter({ hasText: 'Insurance' });
    console.log("no of rows: " + await row.count());

    await expect(row).toHaveCount(1);

    await row.locator("//span[@title='Edit']").click();


    await page.getByPlaceholder('Salary')
        .fill('90000');

    await page.locator("#submit").click();

    //Then verify:
    const updatedRow = page.locator('//table//tr')
        .filter({ hasText: 'Cierra' });

    await expect(updatedRow).toContainText('90000');

});

test('Delete a specific row Find Cierra Vega and delete only that record.', async ({ page }) => {

    await page.goto("https://demoqa.com/webtables");
    const row = page.locator("//table//tr").filter({ hasText: 'Cierra' })
        .filter({ hasText: 'Insurance' });
    console.log("no of rows: " + await row.count());

    await expect(row).toHaveCount(1);

    await row.locator("//span[@title='Edit']").click();


    await page.getByPlaceholder('Salary')
        .fill('90000');

    await page.locator("#submit").click();

    //Then verify:
    const updatedRow = page.locator('//table//tr')
        .filter({ hasText: 'Cierra' });

    await expect(updatedRow).toContainText('90000');

    /*
    const row = page.locator('div.rt-tr-group')
        .filter({ hasText: 'Cierra Vega' });
    
    await row.getByRole('button', { name: 'Delete' }).click();
    
    await expect(
        page.locator('div.rt-tr-group')
            .filter({ hasText: 'Cierra Vega' })
    ).toHaveCount(0);
    */

});

test('8. Add a new employee and verify', async ({ page }) => {

    await page.getByRole('button', { name: 'Add' }).click();

    await page.getByPlaceholder('First Name').fill('Neeraj');
    await page.getByPlaceholder('Last Name').fill('Kumar');
    await page.getByPlaceholder('name@example.com').fill('neeraj@test.com');
    await page.getByPlaceholder('Age').fill('34');
    await page.getByPlaceholder('Salary').fill('80000');
    await page.getByPlaceholder('Department').fill('QA');

    await page.getByRole('button', { name: 'Submit' }).click();

    //Verify:

    const row = page.locator('div.rt-tr-group')
        .filter({ hasText: 'Neeraj Kumar' });

    await expect(row).toHaveCount(1);
    await expect(row).toContainText('QA');

});


