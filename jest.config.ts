export default {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        "^.+\\.svg$": "jest-svg-transformer",
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
