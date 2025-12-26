import { test, expect, Locator, Page, } from '@playwright/test';
import { promises } from 'node:dns';


test('drop down Handle: ', async ({ page }) => {

    await page.goto('https://www.facebook.com/r.php?entry_point=login');

    let day: Locator = page.locator('#day');
    let month: Locator = page.locator('#month');
    let year: Locator = page.locator('#year');

    //selectOption() method will check select-Option html tag

    /*

    //select by value attribute:
    await day.selectOption('5');
    await month.selectOption('10');
    await year.selectOption('2010');

    await page.waitForTimeout(3000);

    //select by visible text (label):
    await day.selectOption({ label: '15' });
    await month.selectOption({ label: 'May' });
    await year.selectOption({ label: '2022' });

    await page.waitForTimeout(3000);

    //select by index:
    await day.selectOption({ index: 2 });
    await month.selectOption({ index: 3 });
    await year.selectOption({ index: 5 });

     await page.waitForTimeout(3000);

     */

    await selectDropDownValue(day, '2');
    await selectDropDownValue(month, '5');
    await selectDropDownValue(year, '2020');

    await page.waitForTimeout(3000);

    await selectDropDownLabelValue(day, '4')
    await selectDropDownLabelValue(month, 'Jun');
    await selectDropDownLabelValue(year, '2019')

    await page.waitForTimeout(3000);

    await selectDropDownIndex(day, 2);
    await selectDropDownIndex(month, 3);
    await selectDropDownIndex(year, 8);

});

async function selectDropDownValue(element: Locator, value: string): Promise<void> {
    await element.selectOption(value);
    await expect(element).toHaveValue(value);
}

async function selectDropDownLabelValue(element: Locator, labelvalue: string): Promise<void> {
    await element.selectOption({ label: labelvalue });
    let selectValue = await element.inputValue();
    await expect(element).toHaveValue(selectValue);
}

async function selectDropDownIndex(element: Locator, indexvalue: number): Promise<void> {
    await element.selectOption({ index: indexvalue });
    let selectValue = await element.inputValue();
    await expect(element).toHaveValue(selectValue);
}
