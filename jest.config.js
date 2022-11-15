// const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'esbuild-jest',
      {
        sourcemap: true,
      },
    ],
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  snapshotSerializers: ['<rootDir>/test/plugins/ignore-asset-hash.ts'],
};
