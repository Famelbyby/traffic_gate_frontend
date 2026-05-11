export default {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: './svelte.config.js'
      }
    ],
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.json'
      }
    ],
    '^.+\\.js$': 'babel-jest'
  },
  extensionsToTreatAsEsm: ['.svelte', '.ts'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^\\$lib/(.*)$': '<rootDir>/src/lib/$1',
    '^\\$app/(.*)$': '<rootDir>/src/.svelte-kit/dev/runtime/app/$1'
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|js|svelte)',
    '**/?(*.)+(spec|test).+(ts|js|svelte)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/.svelte-kit/'],
  collectCoverageFrom: [
    'src/**/*.{ts,svelte}',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/**/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  clearMocks: true,
  verbose: true
};