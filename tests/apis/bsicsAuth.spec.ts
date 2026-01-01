import { test, expect } from '@playwright/test';

test('bsics Auth API tests', async ({ request }) => {

    const username = 'admin';
    const password = 'admin';

    const Credential = Buffer.from(`${username}:${password}`).toString('base64');

   const response = request.get('https://the-internet.herokuapp.com/basic_auth', {
        headers: {
            'Authorization': `Basic ${Credential}`
        }
    });

    expect((await response).status()).toBe(200);
    const responseBody = await (await response).text();
    console.log(responseBody);

});


test('bsics Auth API tests with credentials', async ({ request }) => {

    const username = 'admin';
    const password = 'admin';

    const Credential = Buffer.from(`${username}:${password}`).toString('base64');

   const response = request.get('https://the-internet.herokuapp.com/basic_auth', {
        headers: {
            'Authorization': `Basic ${Credential}`
        }
    });

    expect((await response).status()).toBe(200);
    const responseBody = await (await response).text();
    console.log(responseBody);

});