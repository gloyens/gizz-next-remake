/**
 * Jest Configuration for King Gizzard Discography Site
 * 
 * This configuration sets up Jest to work with Next.js, TypeScript,
 * and React components. It includes proper module resolution, 
 * transforms, and test environment settings.
 */

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Test environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  
  // Module name mapper for path aliases
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured by Next.js)
    '^@/(.*)$': '<rootDir>/src/$1',
    
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    
    // Handle image imports
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  // Module directories
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // Test path ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/out/',
  ],
  
  // Transform ignore patterns
  transformIgnorePatterns: [
    'node_modules/(?!(next-mdx-remote)/)',
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/_*.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)',
    '**/?(*.)+(spec|test).(js|jsx|ts|tsx)',
  ],
  
  // Watch plugins for better developer experience
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  
  // Globals
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)