module.exports = {
  jest: {
    configure: {
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '^fabric$': '<rootDir>/src/__mocks__/fabric.js'
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
      collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/index.tsx',
        '!src/react-app-env.d.ts',
        '!src/setupTests.ts'
      ]
    }
  }
};
