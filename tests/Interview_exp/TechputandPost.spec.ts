/*
| Point                    | POST                                         | PUT                                                    |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------ |
| Main purpose             | Create a new resource / trigger an operation | Create or completely replace a resource at a known URI |
| Who decides resource ID? | Usually server                               | Usually client                                         |
| Idempotent?              | **No**                                       | **Yes**                                                |
| Same request twice       | Usually creates two resources                | Usually leaves the resource in the same state          |
| Typical response         | `201 Created`                                | `200 OK` / `204 No Content`                            |
| Example                  | Create customer                              | Replace customer details                               |
                              |


"PUT is used to create or completely replace a resource at a client-known URI, depending on the API contract. 
In many practical APIs, it is commonly used for updating an existing resource."

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

public class CustomerAPITest {

    @Test
    public void createCustomer() {

        String requestBody = """
        {
            "name": "Neeraj Kumar",
            "email": "neeraj@test.com",
            "phone": "9876543210"
        }
        """;

        given()
            .baseUri("https://api.example.com")
            .contentType(ContentType.JSON)
            .body(requestBody)

        .when()
            .post("/customers")

        .then()
            .statusCode(201)
            .body("name", equalTo("Neeraj Kumar"));
    }
}

@Test
public void updateCustomer() {

    String requestBody = """
    {
        "name": "Neeraj Kumar",
        "email": "neeraj.new@test.com",
        "phone": "9999999999"
    }
    """;

    given()
        .baseUri("https://api.example.com")
        .contentType(ContentType.JSON)
        .body(requestBody)

    .when()
        .put("/customers/101")

    .then()
        .statusCode(200)
        .body("name", equalTo("Neeraj Kumar"))
        .body("email", equalTo("neeraj.new@test.com"));
}

*/