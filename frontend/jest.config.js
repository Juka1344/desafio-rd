module.exports = {
  // Configuração para transformar arquivos ES6 e JSX
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Configuração para ignorar node_modules
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$))'],

  // Configuração para suportar módulos ES6
  extensionsToTreatAsEsm: ['.jsx'],

  // Configuração para ambiente de teste
  testEnvironment: 'jsdom',

  // Configuração para setup de testes
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Configuração para módulos
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Configuração para coletar cobertura
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
  ],

  // Configuração para threshold de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
