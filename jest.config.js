/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/__mocks__/"],
};

if (process.env.GITHUB_RUN_ID) {
  config.reporters = [["github-actions", { silent: false }], "summary"];
}

export default config;
