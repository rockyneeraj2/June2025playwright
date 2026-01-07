
import { test, expect, Page, Locator, chromium } from '@playwright/test'

test('Remove duplicate', async ({ page }) => {

    let str = 'Hello, World!';
    let result = "";

    for (let i = 0; i < str.length; i++) {
        if (!result.includes(str[i])) {
            result += str[i];
        }

    }
    console.log(result);

});

test('find duplicate', async ({ page }) => {

    let str = 'Hello, World!';
    let duplicates = "";

    for(let i=0;i<str.length;i++){
        for(let j=i+1;j<str.length;j++){
            if(str[i]===str[j] && !duplicates.includes(str[i])){
                duplicates += str[i];
            }
        }
    }
    console.log(duplicates);

});