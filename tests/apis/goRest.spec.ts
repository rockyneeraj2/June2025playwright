import { test, expect } from '@playwright/test';

const TOken = 'bb18855fc1dc5a53d2672f7aeedb0e186e2b6c6e8abddc5940b452fd05469c58';

test('Get = fetch all users', async ({ request }) => {

    const response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: {
            Authorization: `Bearer ${TOken}`,
        }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);

});

test('Get = fetch single users', async ({ request }) => {

    const response = await request.get('https://gorest.co.in/public/v2/users/8115421', {
        headers: {
            Authorization: `Bearer ${TOken}`,
        }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);

});

test('Post = create new user', async ({ request }) => {

    const responseBody = {
        name: "Test User",
        email: `pwtest${Date.now()}@mail.com`,
        gender: "male",
        status: "active"
    };

    const response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: {
            Authorization: `Bearer ${TOken}`,
        },
        data: responseBody
    });

    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log(data);

});