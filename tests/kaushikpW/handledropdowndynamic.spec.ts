import {test} from '@playwright/test';

test("dynamic dropdown", async ({page})=>{

    await page.goto("https://www.amazon.in/");
    await page.getByPlaceholder("Search Amazon.in").fill("shoes");
  //  let dd =await page.locator("//div[@class='left-pane-results-container']").first().click();
  //  let dd1 =await page.locator("//div[@class='left-pane-results-container']").last().click();
  //  let dd12 =await page.locator("//div[@class='left-pane-results-container']").selectOption("1");
    const options = await page.locator("//div[@class='left-pane-results-container']").allTextContents();
    console.log(options);
    
    

})