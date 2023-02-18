module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  root: true,
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
