import process from "node:process";

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: "ts-jest",
  resolver: "ts-jest-resolver",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/__mocks__/"],
};

if (process.env.GITHUB_RUN_ID) {
  config.reporters = [["github-actions", { silent: false }], "summary"];
}

export default config;
