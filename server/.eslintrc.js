module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-extra-parens': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_+(?!\\w)',
        varsIgnorePattern: '_+(?!\\w)',
        caughtErrorsIgnorePattern: '_+(?!\\w)'
      }
    ]
  }
}
