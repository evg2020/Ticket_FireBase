module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'consistent-return': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-alert': 0,
    'no-unused-expressions': 0,
    'no-shadow': 0,
    'no-return-assign': 0
  },
  plugins: ['prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  }
};