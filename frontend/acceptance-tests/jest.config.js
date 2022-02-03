module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './acceptance-tests/.*.test.js$',
    setupFilesAfterEnv: ["expect-puppeteer"],
    setupFiles: ["./setup-tests.ts"]
  }