# Playwright & Typsecript Test Automation Framework

This repository contains the ASANA Test Automation Framework, which is designed to automate end-to-end testing for the ASANA application. The framework is built using **Playwright** for web automation and **TypeScript** for scripting. It follows best practices for modularity, maintainability, and scalability in automated testing.

## Project Structure

The project is organized in a modular fashion, with each section handling a specific aspect of the framework's functionality.

### Root Level

- **.github/workflows/**: Contains GitHub Actions workflow configuration files to automate tasks such as running tests, builds, and deployments in a CI/CD pipeline.
  - **playwright.yml**: Defines Playwright configurations for the CI/CD pipeline, including tasks like running tests and generating reports.

### src/

Contains the core source code for the test framework.

- **pages/**
  - **login-page.ts**: Page Object Model (POM) class that handles the login page interactions and element locators.
  - **Nav-Menu/**
    - **Task-Status/**
      - **task-status-page.ts**: POM class that handles task status-related actions and element locators.
    - **app-page.ts**: POM class that handles interactions with the application page (e.g., navigation, logging out).
  
- **setup/**
  - **cache.ts**: Utility for handling cache-related tasks, such as caching browser contexts or storing session information.
  - **custom-logger.ts**: Custom logging utility for consistent and formatted logging throughout the test execution.
  - **optional-parameter-types.ts**: Defines optional parameter types for various test functions and components.
  - **page-setup.ts**: Utility for setting up the test environment, such as browser launch configurations, and initializing tests.

- **utils/**
  - **action-utils.ts**: Provides helper functions for interacting with web elements, such as clicking, typing, and waiting.
  - **assert-utils.ts**: Contains assertion utilities, such as verifying visibility, text, and other element conditions.
  - **element-utils.ts**: Helper functions for working with elements and locating them on the page.
  - **locator-utils.ts**: Contains functions for building dynamic locators based on user input or test data.
  - **timeout-constants.ts**: Defines constants related to timeouts for various operations.

### tests/

Contains the test cases and test data.

- **TasksTest/**
  - **testdata/**
    - **test-data.ts**: Contains test data for tasks, including task names, statuses, details, and tags.
  - **test.e2e.spec.ts**: The main end-to-end test suite for the application, using Playwright and TypeScript.
  - **testdata.ts**: Additional test data or configurations related to tasks, statuses, or other aspects of the ASANA application.

### test-results/

Contains the results of test runs, including reports and logs.

- **allure-report/**: Directory for storing Allure reports that provide detailed insights into test executions and results.
- **allure-results/**: Stores the raw results for Allure reporting.

### Configuration Files

- **package-lock.json**: Contains the exact versioning of all installed dependencies.
- **package.json**: Lists all the dependencies and scripts for the project.
- **playwright.config.ts**: Configuration file for Playwright, where you can define browser settings, timeouts, and other global configurations.
- **results.xml**: The XML file generated after test execution, containing the test results for further analysis.

## Prerequisites

Before running the tests, make sure you have the following installed:

- **Node.js**: The JavaScript runtime environment.
- **Playwright**: A Node.js library for browser automation.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sakshi900/ASANA_Test_Automation_Framework.git
   cd ASANA_Test_Automation_Framework
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up any necessary environment variables (e.g., login credentials, base URL).

## Running Tests

To run the tests locally:

1. Run the Playwright tests with the following command:

   ```bash
   npx playwright test
   ```

2. For CI/CD integration, the tests will be automatically executed using the GitHub Actions workflows.

## Test Reports

Test results are generated using **Allure** reporting and can be found in the `allure-report/` directory after the tests have been executed.

To generate the Allure report:

1. Install Allure CLI:

   ```bash
   npm install -g allure-commandline --save-dev
   ```

2. Generate the report:

   ```bash
   allure generate allure-results --clean
   allure open allure-report
   ```
   
## Contributing

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test them.
4. Submit a pull request.
