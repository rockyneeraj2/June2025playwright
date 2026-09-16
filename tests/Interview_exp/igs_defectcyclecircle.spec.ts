// explain defect cycle circle

//Severity = Impact
// Priority = Urgency

/*
Defect Lifecycle

The typical flow is:

New
 ↓
Assigned
 ↓
Open / In Progress
 ↓
Fixed
 ↓
Ready for Retest
 ↓
Retest
 ├── Pass → Closed
 │
 └── Fail → Reopened
              ↓
           Assigned
              ↓
             Fixed

There can also be states like Rejected, Duplicate, Deferred, Won't Fix, Cannot Reproduce, depending on the organization's Jira workflow.

1. New

QA finds a problem and creates a defect.

Real example

Suppose you're testing a healthcare application.

Requirement:

When a user submits a claim, the claim status should become Submitted.

You execute:

Submit Claim
     ↓
Expected: Submitted
Actual: Pending

You create a Jira defect:

Title:
Claim status remains Pending after successful submission

Environment:
QA

Severity:
High

Steps:
1. Login
2. Search member
3. Create claim
4. Submit claim

Expected:
Claim status = Submitted

Actual:
Claim status = Pending

Status:

NEW
2. Assigned

The QA lead/manager assigns the defect to a developer.

QA
 ↓
Create defect
 ↓
New
 ↓
Assign to Developer

Developer becomes responsible for investigating it.

3. Open / In Progress

Developer starts investigating.

They may check:

UI
 ↓
API
 ↓
Database
 ↓
Logs
 ↓
Code

For example:

UI shows Pending
       ↓
API response
       ↓
status = PENDING
       ↓
Backend issue identified

Status:

IN PROGRESS
4. Fixed

Developer fixes the issue and moves the defect to Fixed.

For example, backend logic is corrected so that:

POST /claims

returns:

{
  "claimId": "CLM1001",
  "status": "SUBMITTED"
}

The developer says:

"Fix is completed. Please retest."

5. Ready for Retest

Depending on the team's workflow, the defect may move to:

READY FOR RETEST

Now QA validates the fix.

6. Retest

This is where automation becomes very useful.

Suppose your Playwright test originally failed:

await page.getByRole('button', {
  name: 'Submit Claim'
}).click();

await expect(
  page.getByText('Submitted')
).toBeVisible();

After the developer fixes the defect, you execute the test again.

If:

Expected = Submitted
Actual   = Submitted

the defect can move toward Closed.

7. Closed

QA verifies:

Expected behavior
        ↓
Actual behavior
        ↓
PASS

Then QA closes the defect.

Fixed
 ↓
Retest
 ↓
PASS
 ↓
CLOSED
8. Reopened

This is extremely important.

Suppose developer says:

Fixed.

QA tests again:

Expected: Submitted
Actual: Pending

The defect still exists.

QA changes:

Fixed
 ↓
Retest
 ↓
FAIL
 ↓
REOPENED
 ↓
Developer

Then the developer investigates again.
*/