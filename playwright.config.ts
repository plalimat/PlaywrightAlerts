import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  reporter: [['html'], ['allure-playwright']],

  use: {
    headless: false, // --headed
    // trace: 'on',
    launchOptions: {
      slowMo: 3000 // slow down by 1 second => --slow-mo 1000milli
    }
  }

});