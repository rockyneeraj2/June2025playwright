import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

// css:
// 1. id: unique
// #id
// #input-email -- 1 of 1

// tag#id
// input#input-email

// page.locator('#input-email')

// 2. class: can be duplicate
// .clssname
// .form-control -- 1 of 3
// tag.classname
// input.form-control

// 3. multiple classes:
// .c1.c2.c3....cn
// tag.c1.c2.c3....cn
// input.form-control.input-lg
// input.input-lg.form-control
// input.input-lg

// page.locator('input.input-lg')


// 4. id and class:
// #id.class
// tag#id.class
// tag.class#id
// input#input-firstname.form-control


// 5. other attributes:
// [attr='value']
// tag[attr='value']
// input[name='email']

// input[name='email']#input-email
// input[id='input-email']

// tag[attr1='value'][attr2='value']
// input[name='email'][placeholder='E-Mail'][type='email']
// input[name='email'][placeholder='E-Mail'][type='email']#input-email

// input#input-email[name='email'][placeholder='E-Mail'][type='email']
// input[name='agreeTerms'][type='checkbox']


// 6. contains:
// tag[attr *= 'value']
// input[placeholder *= 'Address']
// input[placeholder *= 'Address'][id='input-email']
// img[src*='opencart-logo.png']

// 7. startsWith:
// tag[attr ^= 'value']
// img[alt ^= 'naveen']

// 8. endsWith:
// tag[attr $= 'value']
// img[alt $= 'opencart']

// 9. parent to child element:
// a. parentTag childTag --->  direct + indirect child elements in the DOM
// div#content input#input-email

// b. parentTag > childTag ---> only direct elements
// div.form-group > input#input-email



//xpath: xml html path in the DOM
//--address of the elememt in the DOM

//1. absolute xpath: /html/body/div[2]/div/div/form/fieldset[1]/div[2]/div/input

//2. relative xpath: custom xpath

//1. single attribute:
//tag[@attr='value']
//input[@id='input-firstname']

//2. multiple attributes:
//tag[@attr1='value' and @attr2='value']
//input[@id='input-firstname' and @name='firstname' and @placeholder='First Name']

//3. without tag:
//*[@id='input-firstname'] -- 100
//input[@id='input-firstname'] --10

//4. text() in xpath: span, p, link, div, label
//tag[text()='value']
//h1[text()='Register Account']

//5. contains() in xpath:
//tag[contains(@attr, 'value')]
//input[contains(@placeholder, 'Tele')]
//input[contains(@placeholder, 'Tele') and @id='input-telephone']
//input[contains(@placeholder, 'Tele') and contains(@id,'telephone')]

//6. contains() with text():
//tag[contains(text(),'value')]
//h1[contains(text(),'Register')]
//legend[contains(text(),'Details')]

//7. contains() with text() and contains() with attr:
//tag[contains(text(),'value') and contains(@attr, 'value')]
//a[contains(text(),'Forgotten') and contains(@href, 'account/forgotten')]
//a[contains(text(),'Forgotten') and contains(@href, 'account/forgotten') and contains(@class, 'list-group-item')]

//8. start-with() in xpath:
//tag[starts-with(@attr, 'value')]
//input[starts-with(@placeholder, 'First')]

//tag[starts-with(text(), 'value')]
//h1[starts-with(text(), 'Register')]


//9. parent to child:
//parenttag//childtag --> direct + indirect child elements
//parenttag/childtag --> only direct child elements

//aside[@id='column-right']//a[text()='Register']
//footer//a[text()='Terms & Conditions']

//select[@id='Form_getForm_Country']/option -- 233
//select[@id='Form_getForm_Country']//option -- 233

//10. child to immediate parent:
//input[@id='input-firstname']/..
//input[@id='input-firstname']/parent::div

//input[@id='input-firstname']/../../../../../../../../..
//a[text()='Login']/parent::div


//11. child to ancestor:
//a[text()='Login']/ancestor::aside
//input[@id='input-email']/ancestor::form


//12. following-sibling:
//label[@for='input-email']/following-sibling::input[@id='input-email']
//option[@value='Algeria']/following-sibling::option


//13. preceding-sibling:
//input[@id='input-email']/preceding-sibling::label
//option[@value='Algeria']/preceding-sibling::option[@value='Afghanistan']


//14. indexing in xpath:
// (//input[@class='form-control'])[1]
// (//input[@class='form-control'])[position()=1]
// (//input[@class='form-control'])[last()]
// (//input[@class='form-control'])[last()-3]

//page.locator(`(//input[@class='form-control'])[1]`).fill('1212')