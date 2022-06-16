module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest, true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': ['error','windows' ],
    'semi': ['error', 'never' ],
    'arrow-parens': ['error', 'as-needed'],
    'nonblock-statement-body-position': ['error', 'below'],
    'no-nested-ternary': 'off',
    'no-unused-expressions':['error', { 'allowShortCircuit': false, 'allowTernary': true }],
  },
};
