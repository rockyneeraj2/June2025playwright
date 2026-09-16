import { expect, test } from '@playwright/test';
import fs from 'fs';


test('upload file', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/upload");

    //upload the file:
    await page.locator("#file-upload").setInputFiles("C:\\Users\\neera\\Downloads\\AIMLQA.pdf");

    // Click Upload button:
    await page.locator("#file-submit").click();

    //verify upload:
    await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();

    // Verify file name
    await expect(
        page.locator('#uploaded-files')
    ).toHaveText('AIMLQA.pdf');

});

/*

Think of it like:

Find <input type="file">
          ↓
setInputFiles()
          ↓
Select file
          ↓
Click Upload
          ↓
Verify result

You don't need to interact with the Windows file picker.

3. If you have a file path directly

You can also do:

await page.locator('#file-upload')
  .setInputFiles('C:/Users/Neeraj/Documents/sample.txt');

But I prefer a relative/project-based path:

const filePath = path.join(
  process.cwd(),
  'test-data',
  'sample.txt'
);

await page.locator('#file-upload').setInputFiles(filePath);

This makes the automation more portable between your laptop and Jenkins.

4. Upload PDF / Excel / Image

The same method works for different file types.

PDF
await page.locator('#file-upload')
  .setInputFiles('test-data/document.pdf');
Excel
await page.locator('#file-upload')
  .setInputFiles('test-data/testdata.xlsx');
Image
await page.locator('#file-upload')
  .setInputFiles('test-data/profile.png');

The application itself must allow that file type.

5. Multiple files

If the application supports multiple file selection:

await page.locator('#file-upload').setInputFiles([
  'test-data/file1.txt',
  'test-data/file2.txt'
]);

Example:

<input type="file" multiple>

Playwright sends both files to the input.

6. Upload without creating a physical file

This is a very useful Senior SDET scenario.

You can create the file content in memory:

await page.locator('#file-upload').setInputFiles({
  name: 'sample.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('This is test file content')
});

Then:

await page.locator('#file-submit').click();

This is useful when you don't want to maintain hundreds of physical test files.

7. Real interview scenario

Interviewer:

How do you handle file upload in Playwright?

Your answer:

“In Playwright, I generally use setInputFiles() for file uploads. I first identify the file input element, prepare the file path using a project-relative path, set the file using setInputFiles(), click the upload button, and then verify the upload result. I avoid interacting with the OS-level file chooser because Playwright can directly set the file on the input element.”

Then show:

const filePath = path.join(
  process.cwd(),
  'test-data',
  'sample.txt'
);

await page.locator('#file-upload')
  .setInputFiles(filePath);

await page.locator('#file-submit').click();

await expect(
  page.getByRole('heading', { name: 'File Uploaded!' })
).toBeVisible();
8. What if clicking "Choose File" opens a file chooser?

There are applications where you first click a button and then the file chooser event occurs.

Use:

const fileChooserPromise = page.waitForEvent('filechooser');

await page.getByRole('button', { name: 'Choose File' }).click();

const fileChooser = await fileChooserPromise;

await fileChooser.setFiles('test-data/sample.txt');

The flow is:

Click Choose File
       ↓
FileChooser event
       ↓
waitForEvent('filechooser')
       ↓
setFiles()
       ↓
File selected
Important distinction
Situation	Playwright approach
<input type="file"> directly available	setInputFiles()
Clicking UI triggers file chooser	waitForEvent('filechooser') + setFiles()
Multiple files	setInputFiles([file1, file2])
File doesn't physically exist	setInputFiles({ name, mimeType, buffer })
Need to verify upload	UI/API/backend validation
Senior-level point

For a real project, I wouldn't stop at “file name is displayed.” Depending on the requirement, I'd also validate file type, size, upload status, error handling, duplicate upload behavior, and backend/API response.

For example, if the requirement says PDF only and maximum 5 MB, I'd test:

Valid PDF < 5 MB       → Upload
Exactly 5 MB            → Expected business behavior
> 5 MB                  → Error
PNG/JPG                 → Error
Corrupted PDF           → Error
Empty file              → Expected behavior
Duplicate file          → Expected behavior

That is the kind of answer that demonstrates Senior SDET-level thinking, rather than just knowing

*/