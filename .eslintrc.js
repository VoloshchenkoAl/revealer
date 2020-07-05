module.exports = {
  root: true,
  extends: ['airbnb-typescript/base', 'prettier/@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['jest'],
  rules: {
    'object-curly-newline': 'off',
  },
};
