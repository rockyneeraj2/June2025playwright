/*

| Challenge                      | Short answer                                                                                                                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Flaky tests**             | “I identify the root cause first—usually synchronization, data, or environment issues. I use Playwright auto-waiting, web-first assertions, and proper API synchronization instead of hardcoded sleeps.”
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2. Dynamic elements**        | “I avoid dynamic IDs and use stable locators like `getByRole`, `getByLabel`, or `getByTestId`. I also scope locators to the required row or component.”            
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                      
| **3. Synchronization**         | “Instead of `waitForTimeout`, I wait for the actual condition, such as an element becoming visible or an API response completing.”  
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| **4. Duplicate code**          | “I use Page Object Model, fixtures, and reusable utilities so common actions and locators are maintained in one place.”   
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                               |
| **5. Login/SSO**               | “I don't perform UI login for every test. I create an authenticated `storageState` and reuse it. I keep separate states when multiple user roles are required.” 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                         |
| **6. Test data**               | “I avoid shared hardcoded data. I create unique test data through fixtures, APIs, or data factories so tests remain independent.”        
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                |
| **7. Parallel execution**      | “Parallel execution can cause data conflicts. I isolate test data and state per test or worker so tests can run independently.”  
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                        |
| **8. API dependency**          | “If a UI test needs backend data, I create the prerequisite data through API instead of creating it repeatedly through the UI.”     
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                     |
| **9. CI failure**              | “If it passes locally but fails in CI, I check environment, browser, data, network and configuration. I use trace, screenshot, video and logs to find the root cause.”    
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                               |
| **10. Large test suite**       | “I use parallel execution, tagging, sharding and separate smoke/regression suites to reduce execution time.” 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                            |
| **11. Locator maintenance**    | “I prefer user-facing or stable locators and centralize them in Page Objects. If the UI changes, I update the locator in one place.”    
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                 |
| **12. Environment management** | “I keep environment-specific configuration outside the test code using environment variables and Playwright configuration.”  
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                            |
| **13. Test isolation**         | “Each test should be independent. I avoid shared browser state and shared mutable data unless it is intentionally managed.”     
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                         |
| **14. Debugging failures**     | “I capture traces, screenshots, videos, console logs and API information on failure so I can identify the actual root cause.”   
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                         |
| **15. Retry strategy**         | “I use retries only as a safety net in CI. I don't use retries to hide flaky tests; I investigate and fix the root cause.”  
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                             |
| **16. UI + API validation**    | “I use API calls to prepare data and validate backend responses, while Playwright validates the user-facing UI flow.”  
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                  |
| **17. Browser differences**    | “I configure required browsers in Playwright and run critical tests across Chromium, Firefox and WebKit when the project requires cross-browser coverage.”    
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                           |
| **18. Framework scalability**  | “I separate tests, pages, fixtures, utilities, API clients, test data and configuration so new tests can be added without affecting existing code.”                                                      |


*/