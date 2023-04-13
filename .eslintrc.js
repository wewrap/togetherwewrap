module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname
  },
  rules: {
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    ' @typescript-eslint/no-misused-promises': 'off'
  }
}
