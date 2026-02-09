const { devices, expect } = require('@playwright/test');
const { trace } = require('node:console');

const config = ({
  testDir: './tests',
  timeoute: 30 * 1000,
  expect: {
    timeoute: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure'
  }

});

module.exports = config