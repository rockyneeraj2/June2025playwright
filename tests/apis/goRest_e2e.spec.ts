import{test, expect} from'@playwright/test';

const Token = 'bb18855fc1dc5a53d2672f7aeedb0e186e2b6c6e8abddc5940b452fd05469c58';
const baseURL = 'https://gorest.co.in/public/v2/users';

//common header:
const headers = {
    'Authorization': `Bearer ${Token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

test('e2e CRUD operations', async ({ request }) => {

    // 1. Create a new user (POST)
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
        const createdUser = await response.json();
        console.log(createdUser);
        const userId = createdUser.id;
        console.log(userId);

        console.log("=============POST call===============");

        // 2. Fetch the created user (GET)
        const getResponse = await request.get(`${baseURL}/${userId}`, {headers});
        expect(getResponse.status()).toBe(200);
        expect((await getResponse.json()).id).toBe(userId);
        const fetchedUser = await getResponse.json();
        console.log(fetchedUser);

        console.log("============GET call================");

        // 3. Update the user (PUT)
        const updateBody = {
        status: "inactive"
    };
       const responseupdate = await request.put(`${baseURL}/${userId}`, {headers,
        data: updateBody
    });

    expect(responseupdate.status()).toBe(200);
    const updatedUser = await responseupdate.json();
    console.log(updatedUser);
    console.log("============PUT call================");

    //4. Delete the user (DELETE)
    const deleteResponse = await request.delete(`${baseURL}/${userId}`, {headers});
    expect(deleteResponse.status()).toBe(204);
    console.log(`User with ID ${userId} deleted successfully.`);

    console.log("===========DELETE call==============");

});