// http://eslint.org/docs/user-guide/configuring
module.exports = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    'html',
  ],
  extends: 'airbnb-base',
  root: true,
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2],
    'space-before-function-paren': ['error', 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // allow debugger in development
    'quotes': ['error', 'single', {
      'allowTemplateLiterals': true,
      'avoidEscape': true,
    }],
    // 'semi': ['error', 'never'],
    'func-names': ['error', 'never'],
    'import/extensions': ['error', 'always', {
      'js': 'never', // don't require .js extension when importing
    }],
    'import/no-extraneous-dependencies': [
      'error',
      { 'devDependencies': true }
    ]
  },
};
