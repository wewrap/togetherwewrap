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
  plugins: [
  ],
  rules: {
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/semi': 'off'
  }
}
