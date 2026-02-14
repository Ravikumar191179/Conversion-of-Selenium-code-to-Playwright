# 🎭 Playwright Test Automation Framework

## Practice Test Automation - Login Page Testing

A production-ready Playwright test automation framework built with TypeScript, Page Object Model architecture, and comprehensive reporting capabilities.

### 🌐 Application Under Test
- **URL**: https://practicetestautomation.com/practice-test-login/
- **Test Credentials**:
  - Username: `student`
  - Password: `Password123`

---

## 📁 Project Structure

```
practice-test-automation-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline
├── src/
│   ├── pages/                      # Page Object Models
│   │   ├── BasePage.ts            # Base POM with reusable methods
│   │   └── LoginPage.ts           # Login page POM
│   ├── fixtures/                   # Test fixtures
│   │   └── baseFixtures.ts        # Custom test fixtures
│   ├── utils/                      # Helper utilities
│   │   ├── logger.ts              # Winston logger
│   │   ├── testData.ts            # Test data management
│   │   └── helpers.ts             # Helper functions
│   └── config/                     # Configuration
│       └── constants.ts           # Application constants
├── tests/                          # Test files
│   └── e2e/
│       └── login.spec.ts          # Login functionality tests
├── reports/                        # Custom reports
│   └── custom-reporter.ts         # Custom test reporter
├── screenshots/                    # Test screenshots
├── logs/                          # Application logs
├── test-results/                  # Test execution results
├── playwright-report/             # HTML reports
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── .gitignore
├── package.json
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
   ```bash
   cd practice-test-automation-framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:browsers
   ```

4. **Configure environment (optional)**
   ```bash
   cp .env.example .env
   # Edit .env if needed
   ```

---

## 🧪 Running Tests

### All Tests
```bash
npm test
```

### Headed Mode (See Browser)
```bash
npm run test:headed
```

### UI Mode (Interactive)
```bash
npm run test:ui
```

### Specific Browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Debug Mode
```bash
npm run test:debug
```

### Specific Test File
```bash
npm run test:login
```

### View Reports
```bash
npm run report
```

---

## 📋 Test Coverage

### ✅ Positive Test Cases
- **TC001**: Login with valid credentials
- **TC002**: Verify success page title
- **TC003**: Logout functionality

### ❌ Negative Test Cases
- **TC004**: Invalid username
- **TC005**: Invalid password
- **TC006**: Both credentials invalid

### 📊 Data-Driven Tests
- Multiple invalid credential combinations
- Empty field validations

### 🎨 UI Tests
- **TC007**: All page elements visible
- **TC008**: Correct page title
- **TC009**: Submit button enabled
- **TC010**: Form field clearing

### ⚡ Performance Tests
- **TC011**: Login completion time validation

---

## 🏗️ Framework Features

### ✨ Key Capabilities

✅ **Page Object Model (POM)** - Clean separation of test logic and page interactions  
✅ **TypeScript** - Full type safety and IntelliSense support  
✅ **Custom Fixtures** - Dependency injection for Page Objects  
✅ **Multi-Browser Support** - Chrome, Firefox, Safari, Mobile  
✅ **Custom Reporters** - HTML, JSON, JUnit, and custom reporter  
✅ **Screenshot on Failure** - Automatic screenshot capture  
✅ **Video Recording** - Video on test failure  
✅ **Parallel Execution** - Faster test execution  
✅ **CI/CD Ready** - GitHub Actions workflow included  
✅ **Comprehensive Logging** - Winston logger integration  
✅ **Environment Configuration** - .env file support  
✅ **Test Data Management** - Centralized test data  
✅ **Helper Utilities** - Reusable helper functions  

---

## 📊 Reports

After test execution, reports are available in:

### HTML Report
```bash
npm run report
# Opens: playwright-report/index.html
```

### JSON Report
```
test-results/results.json
```

### JUnit Report
```
test-results/junit.xml
```

### Custom Report
```
reports/custom-report.json
```

### Console Output
```
=============================================================
📊 Test Execution Summary
=============================================================
Total Tests:    11
✅ Passed:      8
❌ Failed:      3
⚠️  Skipped:     0
🔄 Flaky:       0
⏱️  Duration:    12.45s
=============================================================
```

---

## 🔧 Configuration

### Playwright Configuration
Edit `playwright.config.ts` to customize:
- Test directory
- Browser projects
- Timeouts
- Reporters
- Screenshot/video settings
- Parallel execution

### Environment Variables
Edit `.env` file:
```env
BASE_URL=https://practicetestautomation.com
HEADLESS=true
TIMEOUT=30000
SCREENSHOT_ON_FAILURE=true
VIDEO_ON_FAILURE=true
```

---

## 📝 Writing New Tests

### 1. Create Page Object Model

```typescript
// src/pages/NewPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewPage extends BasePage {
  readonly element: Locator;

  constructor(page: Page) {
    super(page);
    this.element = page.locator('#element-id');
  }

  async performAction() {
    await this.clickElement(this.element);
  }
}
```

### 2. Add to Fixtures

```typescript
// src/fixtures/baseFixtures.ts
import { NewPage } from '../pages/NewPage';

type MyFixtures = {
  loginPage: LoginPage;
  newPage: NewPage;  // Add new page
};

export const test = base.extend<MyFixtures>({
  // ... existing fixtures
  newPage: async ({ page }, use) => {
    const newPage = new NewPage(page);
    await use(newPage);
  },
});
```

### 3. Write Test

```typescript
// tests/e2e/new-feature.spec.ts
import { test, expect } from '../../src/fixtures/baseFixtures';

test.describe('New Feature Tests', () => {
  test('should perform action', async ({ newPage }) => {
    await newPage.navigate('/path');
    await newPage.performAction();
    // assertions
  });
});
```

---

## 🐛 Debugging

### Debug Specific Test
```bash
npx playwright test --debug tests/e2e/login.spec.ts
```

### Generate Test Code
```bash
npm run codegen
```

### View Trace
```bash
npx playwright show-trace test-results/trace.zip
```

---

## 🔄 CI/CD Integration

### GitHub Actions
The framework includes a pre-configured GitHub Actions workflow:
- Runs on push to main/develop branches
- Runs on pull requests
- Scheduled daily runs at 2 AM UTC
- Tests across Chrome, Firefox, and Safari
- Uploads test reports and screenshots

### Running in CI
```yaml
# .github/workflows/playwright.yml is already configured
# Just push your code to trigger the pipeline
```

---

## 📚 Best Practices Implemented

1. **Page Object Model** - Separation of concerns
2. **DRY Principle** - Reusable methods in BasePage
3. **Type Safety** - Full TypeScript support
4. **Proper Waiting** - No hard waits, smart waiting strategies
5. **Error Handling** - Comprehensive error handling
6. **Logging** - Detailed execution logs
7. **Test Independence** - Each test can run independently
8. **Data-Driven Testing** - Parameterized test cases
9. **Meaningful Assertions** - Clear assertion messages
10. **Clean Code** - Well-documented and maintainable

---

## 🤝 Contributing

1. Create a new branch for your feature
2. Write tests following the existing patterns
3. Ensure all tests pass
4. Submit a pull request

---

## 📞 Support

For issues or questions:
- Check the [Playwright Documentation](https://playwright.dev)
- Review test execution logs in `logs/`
- Check screenshots in `screenshots/` for failures

---

## 📄 License

ISC

---

## 🎯 Next Steps

1. ✅ Review the generated framework structure
2. ✅ Run the tests: `npm test`
3. ✅ View the HTML report: `npm run report`
4. ✅ Explore the Page Object Models in `src/pages/`
5. ✅ Check the test cases in `tests/e2e/`
6. ✅ Customize configuration in `playwright.config.ts`
7. ✅ Add more test cases as needed

---

**Happy Testing! 🎭**
