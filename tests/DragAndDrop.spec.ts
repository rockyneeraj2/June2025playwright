import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

test('Drag And Drop Handle', async ({ page }) => {
   
  // await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

  // let source = page.locator('#column-a');
  // let target = page.locator('#column-b');

  // await source.dragTo(target);
  // await expect(target).toContainText('A');

    await page.goto('https://jqueryui.com/resources/demos/droppable/default.html');
     let source = page.locator('#draggable');
    let target = page.locator('#droppable');

  await source.dragTo(target);
  await expect(target).toContainText('Dropped!');

});