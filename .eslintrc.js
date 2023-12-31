module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:css/recommended',],

  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint',
    'css'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    'import/prefer-default-export': 'off',
    'max-lines-per-function': ['error', {
      max: 40
    }],
  },
  root: true
}
