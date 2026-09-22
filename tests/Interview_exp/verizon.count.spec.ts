/*

If an interviewer asks **“How will you execute the same API test 100 times in parallel?”**, explain it as **100 independent executions distributed across multiple workers/threads**, not necessarily 100 threads at once.

### Rest Assured + TestNG example

```java
@Test(invocationCount = 100, threadPoolSize = 10)
public void createUserTest() {

    given()
        .baseUri("https://api.example.com")
        .body(requestBody)
    .when()
        .post("/users")
    .then()
        .statusCode(201);
}
```

### What happens here?

```text
TestNG
  |
  +-- Thread 1 → 10 executions
  +-- Thread 2 → 10 executions
  +-- Thread 3 → 10 executions
  +-- ...
  +-- Thread 10 → 10 executions
              ↓
        Total = 100 executions
```

`invocationCount = 100` → test runs **100 times**.

`threadPoolSize = 10` → maximum **10 executions run concurrently**.

So you get **100 total executions**, but only **10 at a time**.

### Important senior-level point

Don't blindly create 100 threads.

If the requirement is:

> "Run 100 requests simultaneously."

Then I would consider the API/server capacity and use a controlled concurrency level, for example:

```java
@Test(invocationCount = 100, threadPoolSize = 20)
```

That means:

**100 requests total + 20 concurrent executions.**

### If interviewer asks "What problems can happen?"

Mention:

* Thread safety of test data
* Duplicate user/order IDs
* Shared variables
* Database conflicts
* Rate limiting — `429`
* Server capacity
* Connection pool limits
* Authentication/token handling
* Test data cleanup

**Interview answer:**

> “For 100 executions, I use TestNG's `invocationCount` with `threadPoolSize`. For example, `invocationCount=100` executes the test 100 times and `threadPoolSize=10` controls concurrency to 10 parallel executions. I prefer controlled concurrency rather than creating 100 threads, and I make sure test data and shared resources are thread-safe.”


*/