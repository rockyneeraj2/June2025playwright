// acceptance cretia how you start testing

/*

For a **Senior SDET interview**, answer it as a process rather than just listing test cases.

## Interview Answer: How do you start testing once you receive Acceptance Criteria?

**Direct answer:**

> “Once I receive the acceptance criteria, I first understand the business requirement and identify what exactly needs to be validated. Then I break each acceptance criterion into positive, negative, boundary, validation, API, integration, and regression scenarios. I identify dependencies and test data, automate the stable scenarios, execute them through CI/CD, and finally verify that the story meets the agreed production-readiness criteria.”

### My approach

```text
User Story
    ↓
Understand Acceptance Criteria
    ↓
Clarify Ambiguities
    ↓
Impact / Risk Analysis
    ↓
Test Scenarios
    ↓
Test Data
    ↓
UI + API + Integration Testing
    ↓
Positive + Negative + Boundary
    ↓
Automation
    ↓
Regression
    ↓
Defect Triage
    ↓
Production Readiness
```

---

## 1. First, understand the Acceptance Criteria

Suppose the story says:

> **As a customer, I want to submit an insurance claim online.**

Acceptance Criteria:

1. Customer must enter a valid policy number.
2. Claim amount is mandatory.
3. Claim amount cannot exceed the allowed limit.
4. On successful submission, a claim number should be generated.
5. Customer should see a success message.

I don't immediately start writing automation.

First I ask:

* What is a valid policy?
* What is the maximum claim amount?
* What happens for an expired policy?
* Can the same claim be submitted twice?
* Which API is called?
* What happens if the API fails?
* Is authentication required?
* What downstream systems are involved?

This helps me understand the **business behavior**, not just the UI.

---

# 2. Convert each Acceptance Criteria into test scenarios

For example:

| Acceptance Criteria    | What I test                                                |
| ---------------------- | ---------------------------------------------------------- |
| Valid policy required  | Valid policy, invalid policy, expired policy, blank policy |
| Claim amount mandatory | Blank, valid amount, invalid format                        |
| Amount has limit       | Below limit, exactly at limit, above limit                 |
| Claim number generated | Verify number exists and format                            |
| Success message        | Verify message and claim status                            |
| Submission             | UI + API + integration                                     |
| Duplicate submission   | Submit same claim twice                                    |
| Unauthorized access    | User without permission                                    |
| API failure            | 400/401/403/500/503 scenarios                              |

---

# 3. Positive testing

I verify the **happy path** first.

Example:

```text
Valid Policy
     +
Valid Claim Amount
     ↓
Click Submit
     ↓
API successful
     ↓
Claim Number generated
     ↓
Success message displayed
```

Playwright:

```ts
await page.getByLabel('Policy Number').fill('POL1001');

await page.getByLabel('Claim Amount').fill('50000');

await page.getByRole('button', { name: 'Submit Claim' }).click();

await expect(
  page.getByText('Claim Submitted Successfully')
).toBeVisible();

await expect(
  page.getByTestId('claim-number')
).toBeVisible();
```

---

# 4. Negative testing

Then I test what happens when the user gives invalid input.

Examples:

```text
Blank policy number
Invalid policy number
Expired policy
Blank claim amount
Negative amount
Characters instead of amount
Amount greater than allowed limit
Unauthorized user
Duplicate claim
```

Example:

```ts
await page.getByLabel('Policy Number').fill('INVALID');

await page.getByRole('button', { name: 'Submit Claim' }).click();

await expect(
  page.getByText('Invalid policy number')
).toBeVisible();
```

---

# 5. Boundary testing

This is especially important for a Senior SDET.

Suppose:

> Maximum claim amount = ₹100,000

I don't test only ₹50,000.

I test:

```text
₹99,999       → valid
₹100,000      → valid
₹100,001      → invalid
₹0            → according to business rule
negative      → invalid
```

This helps catch boundary-related defects.

---

# 6. API testing

I don't depend only on UI automation.

If the UI calls:

```http
POST /claims
```

I validate the API separately.

For example:

```text
Request
   ↓
POST /claims
   ↓
Status Code = 201
   ↓
Response body
   ↓
Claim ID generated
   ↓
Correct claim status
```

I check:

* Status code
* Response body
* JSON schema
* Required fields
* Headers
* Business rules
* Error responses
* Authentication/authorization
* Response time where applicable
* Duplicate requests/idempotency where applicable

---

# 7. Integration testing

I also check downstream dependencies.

For example:

```text
UI
 ↓
Claim API
 ↓
Policy Service
 ↓
Payment Service
 ↓
Notification Service
```

I verify that the claim submission works correctly across these integrations.

For example:

> After claim submission, the claim should be created in the claim service and the customer should receive the expected notification.

---

# 8. Database validation — if applicable

If database validation is part of the project's testing strategy, I verify that the backend data is correct.

Example:

```text
UI → API → Database
```

After submitting a claim:

```text
Claim ID = CLM10001
Status = SUBMITTED
Amount = 50000
Policy = POL1001
```

I verify the relevant persisted data.

---

# 9. Test data

I identify the required test data before execution.

For example:

```text
Valid active policy
Expired policy
Cancelled policy
Maximum claim amount
Invalid policy
Existing claim
New customer
Unauthorized customer
```

For parallel automation, I avoid using the same mutable data across workers. Where appropriate, I generate unique test data through APIs or fixtures.

---

# 10. Automation

Once I understand the scenarios, I decide what should be automated.

Typically:

```text
UI automation
    +
API automation
    +
Integration validation
```

I don't automate every scenario blindly.

For example:

**Good candidates:**

* Smoke
* Regression
* Critical business flows
* Repetitive validations
* Stable acceptance criteria

**May remain manual initially:**

* Exploratory testing
* Frequently changing UI
* One-time investigation
* Usability-related checks

---

# 11. Regression testing

This is where a **Senior SDET answer** becomes stronger.

I ask:

> “What existing functionality could this new story impact?”

For example, if the claim submission changes:

```text
Claim creation
   ↓
Claim status
   ↓
Payment
   ↓
Notification
   ↓
Customer portal
```

I don't test only the new feature. I run the **impacted regression** as well.

---

# 12. Defect triage

If automation fails, I don't immediately create a Jira defect.

First I investigate:

```text
Test failure
     ↓
Playwright Trace
     ↓
Screenshot / Video
     ↓
Console / Network
     ↓
API response
     ↓
Test data
     ↓
Environment / logs
     ↓
Root cause
```

Then I determine whether it is:

* Application defect
* Automation issue
* Test-data issue
* Environment issue
* Dependency issue

If it's a genuine application defect, I raise it in Jira with proper evidence.

---

# 13. Production readiness

Before saying the story is ready for production, I verify:

```text
✓ Acceptance criteria passed
✓ Positive scenarios passed
✓ Negative scenarios passed
✓ Boundary scenarios passed
✓ API validation passed
✓ Integration validation passed
✓ Automation passed
✓ Impacted regression passed
✓ Critical/high defects handled according to release criteria
✓ CI/CD pipeline successful
✓ Test evidence available
✓ No unresolved release-blocking issues
```

### Strong interview closing answer

> **“I don't consider a story production-ready just because my automation is green. I make sure every acceptance criterion is covered, positive, negative and boundary scenarios are validated, API and integration behavior is checked, impacted regression is completed, defects are triaged, and the agreed release criteria are satisfied. Finally, I communicate any remaining risks to the team before release.”**

### Easy way to remember the thinking

Don't memorize 20 testing types. Think:

**“What should happen → What if it doesn't → What are the limits → What systems are involved → What can I break → Can I prove it?”**

That naturally leads you to **positive → negative → boundary → API → integration → regression → production readiness**.


*/