/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");
// const tsNode = require("ts-node");
// const tsConfigPaths = require("tsconfig-paths");
//const { compilerOptions } = require("./tsconfig.json");
const { compilerOptions } = require("./test/tsconfig.json");

// tsConfigPaths.register({
//   baseUrl: "./test",
//   paths: {
//     ...mainTSConfig.compilerOptions.paths,
//     ...testTSConfig.compilerOptions.paths,
//   },
// });

// tsNode.register({
//   files: true,
//   transpileOnly: true,
//   project: "./test/tsconfig.json",
// });

//TODO switch to SWC
//https://swc.rs/docs/usage/jest
module.exports = {
  preset: "ts-jest",
  globalSetup: "<rootDir>/test/globalSetup.ts",
  globalTeardown: "<rootDir>/test/globalTeardown.ts",
  setupFilesAfterEnv: ["<rootDir>/test/setupFile.ts"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
  },
};
