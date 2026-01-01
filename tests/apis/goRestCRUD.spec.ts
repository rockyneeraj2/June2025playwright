import{test, expect} from'@playwright/test';

const Token = 'bb18855fc1dc5a53d2672f7aeedb0e186e2b6c6e8abddc5940b452fd05469c58';
const baseURL = 'https://gorest.co.in/public/v2/users';

//common header:
const headers = {
    'Authorization': `Bearer ${Token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

test('Get = fetch all users', async ({ request }) => {

    const response = await request.get(baseURL, {headers});
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

    const response = await request.post(baseURL, {headers,
        data: responseBody
    });

    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log(data);

});

test('PUT = update the user', async ({ request }) => {

    const userId = 8115421; // Replace with the actual user ID to update

    const responseBody = {
        status: "inactive"
    };

    const response = await request.put(`${baseURL}/${userId}`, {headers,
        data: responseBody
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);

});

test('delete = delete the user', async ({ request }) => {

    const userId = 8115421; // Replace with the actual user ID to updat

    const response = await request.delete(`${baseURL}/${userId}`, {headers,
        
    });

    expect(response.status()).toBe(404);
  

});