// IIFE function : config file is not appplicable

import { chromium,Page } from "@playwright/test";

(async()=>{

    let browser = await chromium.launch({channel:'chrome',headless:false});
    let page:Page =await browser.newPage();


});