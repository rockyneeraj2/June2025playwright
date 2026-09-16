//tsconfig.json → controls how TypeScript understands, checks, and compiles your .ts code
//playwright.config.ts → controls how Playwright runs your tests

/*
1. What is tsconfig.json?

tsconfig.json is the TypeScript configuration file for your project.

It tells TypeScript things like:

Which JavaScript version to generate
Which module system to use
How strictly TypeScript should check code
How to resolve imports
Which files to include/exclude
Whether JavaScript files are allowed
How TypeScript handles type definitions

Typical Playwright project:

playwright-project/
│
├── tests/
│   ├── login.spec.ts
│   └── search.spec.ts
│
├── pages/
│   └── LoginPage.ts
│
├── utils/
│   └── testData.ts
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── node_modules/

2. Typical Playwright tsconfig.json

A simple example:
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node", "@playwright/test"]
  },
  "include": [
  /** */
 //   "tests/**/*.ts",
 //   "pages/**/*.ts",
 //   "utils/**/*.ts",
 //   "playwright.config.ts"
 // ],
 // "exclude": [
 //   "node_modules"
 // ]
//}

/*

3. compilerOptions
"compilerOptions": {
   ...
}

This is the main section.

It tells TypeScript how your TypeScript code should be interpreted.

Think:
tsconfig.json
     |
     +-- How should TypeScript behave?
     |
     +-- How strict should it be?
     |
     +-- What JavaScript version?
     |
     +-- How should imports work?
     |
     +-- What types should be available?

     4. target
     "target": "ES2020"

     This tells TypeScript which JavaScript version your code should target.

For example:

const login = async () => {
    await page.goto("https://example.com");
};

TypeScript can transform newer TypeScript/JavaScript syntax depending on the target.

ES2017
ES2018
ES2019
ES2020
ES2021
ES2022
ESNext

5. module
"module": "CommonJS"

This determines how modules/imports are handled.

Example:

import { test, expect } from "@playwright/test";

and:

export class LoginPage {
}

You may see:

"module": "CommonJS"

or modern projects may use:

"module": "ESNext"

The correct setting depends on your project's Node.js/package configuration.

Interview answer

"module defines the module system TypeScript uses for imports and exports."

6. strict

This is one of the most important settings.

"strict": true

It enables stricter TypeScript type checking.

For example:

let username: string;

username = "Neeraj";

This is valid.

But:

let username: string;

username = 100;

TypeScript reports an error.

With strict checking, TypeScript catches many potential problems before you execute your Playwright tests.

Why useful in automation?

Imagine:

let page: Page;

page = "hello";

That's obviously incorrect.

Strict typing helps catch this kind of issue during development.

Interview answer

"strict: true enables strict type checking. In automation frameworks, it helps catch type-related issues during development instead of discovering them during test execution."

7. esModuleInterop
"esModuleInterop": true

This helps TypeScript work more smoothly with CommonJS modules.

For example, when using packages that were originally designed around CommonJS exports.

You will commonly see:

"esModuleInterop": true

in TypeScript projects.

Simple understanding

Think:

TypeScript
   ↓
ES Modules
   ↕
CommonJS packages

esModuleInterop makes interoperability easier.

8. skipLibCheck
"skipLibCheck": true

This tells TypeScript:

Don't spend time type-checking declaration files from dependencies.

For example:

node_modules/
   |
   +-- @playwright/test
   +-- other packages

Those packages contain .d.ts files.

Instead of checking every dependency's declaration file, TypeScript can skip that checking.

Why is it useful?

It can:

speed up TypeScript checking
avoid unrelated type errors inside dependencies

It does not mean your own TypeScript code isn't checked.

9. types
"types": [
  "node",
  "@playwright/test"
]

This tells TypeScript which type definitions should be available globally.

For Playwright:

"types": ["node", "@playwright/test"]

can provide types for:

import { test, expect } from "@playwright/test";

and Node.js-related APIs.

For example:

process.env.USERNAME

Node types help TypeScript understand process.

10. include

Very important.

"include": [
  "tests/**///*.ts",
 // "pages/**/*.ts",
 // "utils/**/*.ts",
 //// "playwright.config.ts"
/*

This tells TypeScript:

These are the files I want you to process.

For example:

tests/login.spec.ts
tests/search.spec.ts
pages/LoginPage.ts
utils/testData.ts

will be included.

The pattern:

**//*.ts

/*

basically means:

Find TypeScript files recursively.

11. exclude
"exclude": [
  "node_modules"
]

This tells TypeScript which files/directories it should not process.

The most common:

"exclude": [
  "node_modules"
]

because node_modules can contain thousands of dependency files.

12. baseUrl

You may also see:

"baseUrl": "."

This defines the base directory for resolving imports.

Suppose:

project/
├── pages/
│   └── LoginPage.ts
└── tests/
    └── login.spec.ts

You can configure import paths more conveniently.

13. paths

Another useful framework-level option:

"paths": {
  "@pages/*": ["pages/*"],
  "@utils/*": ["utils/*"]
}

Then instead of:

import { LoginPage } from "../pages/LoginPage";

you can use:

import { LoginPage } from "@pages/LoginPage";

This becomes particularly useful in large automation frameworks.

Example:

tests/
pages/
components/
fixtures/
utils/
api/
config/

Without aliases, you can end up with:

../../../../pages/LoginPage

which becomes difficult to maintain.

14. sourceMap

You may see:

"sourceMap": true

A source map helps map generated JavaScript back to the original TypeScript.

Conceptually:

TypeScript
login.spec.ts
      ↓
JavaScript
login.spec.js
      ↓
source map
      ↓
Debug original TypeScript

This can help with debugging.

15. noImplicitAny

Example:

"noImplicitAny": true

Consider:

function login(username) {
    console.log(username);
}

What type is username?

TypeScript doesn't know.

With noImplicitAny: true, TypeScript can report an error.

Better:

function login(username: string) {
    console.log(username);
}

This is one of the reasons strict TypeScript is useful in an automation framework.

16. strictNullChecks

Example:

"strictNullChecks": true

Suppose:

let username: string;

username = null;

With strict null checking, this isn't allowed because:

string ≠ null

You need to explicitly allow null:

let username: string | null;

This is very useful when dealing with:

API responses
optional test data
environment variables
configuration values
17. A practical Playwright framework

Imagine you have:

Playwright Framework
│
├── tests
│    └── login.spec.ts
│
├── pages
│    └── LoginPage.ts
│
├── fixtures
│    └── testFixture.ts
│
├── utils
│    └── APIUtils.ts
│
├── test-data
│    └── users.json
│
├── playwright.config.ts
└── tsconfig.json

Your tsconfig.json can define the TypeScript behavior:
*/
 /*
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "types": [
      "node",
      "@playwright/test"
    ]
  },
  "include": [
    **/
 /** */  // "tests/**/*.ts",
  //  "pages/**/*.ts",
 //   "fixtures/**/*.ts",
 //   "utils/**/*.ts",
 //   "playwright.config.ts"
 // ],
 // "exclude": [
 //   "node_modules"
 // ]
//}

/*
18. Very important: tsconfig.json vs playwright.config.ts

This is a common Senior SDET interview question.

tsconfig.json	playwright.config.ts
TypeScript configuration	Playwright configuration
Controls TypeScript	Controls test execution
Type checking	Workers
Module system	Browsers
JavaScript target	Retries
Import resolution	Timeout
Type definitions	Reporter
Include/exclude files	Projects
Path aliases	Base URL
Strict checking	Screenshots/traces
Example

tsconfig.json:

{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020"
  }
}

This controls TypeScript.

Whereas:

// playwright.config.ts

export default defineConfig({
    workers: 2,
    retries: 1,
    timeout: 30000
});

controls Playwright execution.

19. Easy way to remember it — don't memorize, understand

Think of your framework as a car:

                 PLAYWRIGHT PROJECT
                       |
          ┌────────────┴────────────┐
          ↓                         ↓
   tsconfig.json             playwright.config.ts
          |                         |
   "How should TS              "How should
    understand code?"            tests run?"
          |                         |
      Type system                Workers
      Modules                    Browser
      Imports                    Retries
      Strictness                 Timeout
      Types                      Reporter

So when an interviewer asks:

What is tsconfig.json in Playwright?

A strong answer is:

"tsconfig.json is the TypeScript configuration file used by my Playwright framework. It defines how TypeScript should interpret and type-check the automation code, including the JavaScript target, module system, strict type checking, type definitions, import resolution, and which files are included or excluded. It is different from playwright.config.ts, which controls Playwright test execution such as browsers, workers, retries, timeout, and reporting."


*/


