module.exports = {
  root: true,
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
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-extraneous-class': 'off'
  },

  ignorePatterns: ['frontend/src/stories/*']
}
