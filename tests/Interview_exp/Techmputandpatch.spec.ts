/*

Absolutely. For a **Senior SDET interview**, the easiest way to understand **PUT vs PATCH** is:

> **PUT = replace/update the resource representation**
> **PATCH = partially modify specific fields**

### Real-time customer example

Suppose we have:

```text
GET /customers/101
```

Response:

```json
{
  "id": 101,
  "name": "Neeraj",
  "email": "neeraj@test.com",
  "phone": "9876543210",
  "city": "Bangalore"
}
```

## PUT — Full update / replacement

Suppose the requirement is:

> Update the customer's complete profile.

Request:

```http
PUT /customers/101
```

```json
{
  "name": "Neeraj Kumar",
  "email": "neeraj.kumar@test.com",
  "phone": "9876543210",
  "city": "Hyderabad"
}
```

### Real use

Imagine an **employee profile management API**.

The UI has an "Update Profile" screen containing:

```text
Name
Email
Phone
City
Department
```

When the user clicks **Save**, the application sends the complete profile:

```text
PUT /employees/101
```

So PUT is useful when the API contract expects you to send the **complete/current representation**.

---

# PATCH — Partial update

Now suppose the customer only wants to change the phone number.

Instead of sending everything:

```http
PATCH /customers/101
```

```json
{
  "phone": "9999999999"
}
```

Only the phone number changes.

The other fields remain unchanged:

```json
{
  "id": 101,
  "name": "Neeraj",
  "email": "neeraj@test.com",
  "phone": "9999999999",
  "city": "Bangalore"
}
```

### Real use

Suppose you have an **order management system**:

```text
Order ID: ORD1001
Status: Pending
Payment: Paid
Shipping: Processing
```

You only want to change:

```text
Status → Shipped
```

You could use:

```http
PATCH /orders/ORD1001
```

```json
{
  "status": "Shipped"
}
```

You don't need to send payment, customer, shipping and all other order information.

---

# PUT vs PATCH

| Feature     | PUT                       | PATCH                                    |
| ----------- | ------------------------- | ---------------------------------------- |
| Purpose     | Full update/replacement   | Partial update                           |
| Data sent   | Usually complete resource | Only changed fields                      |
| Example     | Update entire customer    | Change only phone                        |
| Idempotent  | Generally yes             | Can be yes or no, depending on operation |
| Typical use | Full profile update       | Status/phone/email change                |
| Payload     | Larger                    | Smaller                                  |

### Important interview point

Don't say:

> ❌ "PUT is only update and PATCH is update."

A better answer is:

> **"PUT generally replaces or updates the resource representation at a known URI, while PATCH applies a partial modification to an existing resource. The exact behavior depends on the API contract."**

---

# Rest Assured example

### PUT

```java
given()
    .baseUri("https://api.example.com")
    .contentType(ContentType.JSON)
    .body("""
        {
          "name": "Neeraj Kumar",
          "email": "neeraj.kumar@test.com",
          "phone": "9876543210",
          "city": "Hyderabad"
        }
        """)
.when()
    .put("/customers/101")
.then()
    .statusCode(200);
```

### PATCH

```java
given()
    .baseUri("https://api.example.com")
    .contentType(ContentType.JSON)
    .body("""
        {
          "phone": "9999999999"
        }
        """)
.when()
    .patch("/customers/101")
.then()
    .statusCode(200);
```

---

# Real SDET scenario

Imagine your test has created a customer:

```text
POST /customers
       ↓
Customer ID = 101
```

Now your test needs to verify updating the customer.

### Full customer update

```text
POST
 ↓
Create customer
 ↓
101
 ↓
PUT /customers/101
 ↓
Update complete customer
 ↓
GET /customers/101
 ↓
Validate all fields
```

### Partial update

```text
POST
 ↓
Create customer
 ↓
101
 ↓
PATCH /customers/101
 ↓
Change only phone
 ↓
GET /customers/101
 ↓
Verify phone changed
 ↓
Verify other fields remained unchanged
```

---

## ⭐ Strong interview answer

If the interviewer asks **"What is the difference between PUT and PATCH?"**, answer:

> "PUT is generally used when I want to replace or update the complete representation of a resource, whereas PATCH is used when I want to modify only specific fields. For example, if I have a customer API and want to update the complete customer profile, I use PUT and send the required full representation. If I only need to change the customer's phone number or status, I use PATCH and send only that field. In automation, after the PUT or PATCH operation, I usually perform a GET and validate both the updated fields and, for PATCH, that unrelated fields were not modified."

### One-line memory trick

```text
PUT   → "Here is the complete updated resource"
PATCH → "Change only these fields"
```

**One more Senior SDET point:** PUT is generally **idempotent**—sending the same PUT repeatedly should leave the resource in the same intended state. PATCH **can** be idempotent, but it depends on the specific patch operation/API design.


*/