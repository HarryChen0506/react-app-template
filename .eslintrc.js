const OFF = 0;
const WARN = 1;
const ERROR = 2;
const a11yOff = Object
  // eslint-disable-next-line import/no-extraneous-dependencies
  .keys(require('eslint-plugin-jsx-a11y').rules)
  .reduce((acc, rule) => ({ ...acc, [`jsx-a11y/${rule}`]: OFF }), {});

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  settings: {
  },
  rules: {
    'arrow-parens': [ERROR, 'as-needed', { requireForBlockBody: true }],
    'generator-star-spacing': 0,
    indent: ['error', 2, {
      SwitchCase: 1,
    }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-return-assign': 0,
    'no-console': 'warn',
    'no-unused-vars': ['warn'],
    'import/no-unresolved': 0,
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'no-unused-expressions': [OFF, {
      allowTaggedTemplates: true,
      allowShortCircuit: true,
      allowTernary: true,
    }],
    'babel/no-unused-expressions': [OFF, {
      allowShortCircuit: false,
      allowTernary: false,
      allowTaggedTemplates: false,
    }],
    experimentalDecorators: 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': OFF,
    'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
    'max-classes-per-file': WARN,
    // retina app configuration
    'react/prop-types': OFF,
    'react/sort-comp': WARN,
    'react/jsx-props-no-spreading': WARN,
    'react/state-in-constructor': OFF,
    'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx'] }],
    'react/no-did-update-set-state': WARN, // setState in DidUpdate should be used in condition
    'react/no-array-index-key': WARN,
    'react/jsx-one-expression-per-line': OFF,
    ...a11yOff,
  },
  plugins: ['babel'],
  globals: {
    NODE_ENV: false,
    test: false,
    expect: false,
    module: false,
    require: false,
    __dirname: false,
    process: false,
    Promise: false,
    Reflect: false,
    Set: false,
    __MOCK__: false,
    INFINITY: false,
  },
};
