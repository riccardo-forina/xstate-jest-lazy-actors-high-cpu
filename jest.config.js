const path = require("path");
module.exports = {
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  setupFilesAfterEnv: [path.resolve(__dirname, "./setupTests.ts")],
};
