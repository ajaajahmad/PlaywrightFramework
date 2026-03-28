const { devices, expect } = require('@playwright/test');

const config = ({
  testDir: './tests',
  timeoute: 30 * 1000,
  expect: {
    timeoute: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false
  }

});

module.exports = config