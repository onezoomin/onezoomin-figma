module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'eslint:recommended',
    'preact', 
    'plugin:react/recommended', 
    // 'plugin:react-hooks/recommended',
    'standard-with-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-indent': ['warn', 2, {checkAttributes: true, indentLogicalExpressions: true}],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': ['warn', { 
      "varsIgnorePattern": "^_",
      "argsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^ignore",
    }],
    "@typescript-eslint/no-non-null-assertion": "warn", // for rIF, as type guards don't work there

    // lenient of bad code
    'operator-linebreak': ["warn", "before"],
    'react/prop-types': ["warn"],
    'prefer-const': ["warn"],
    '@typescript-eslint/explicit-function-return-type': "warn",
    '@typescript-eslint/brace-style': "warn",
    '@typescript-eslint/no-floating-promises': "warn",
    '@typescript-eslint/restrict-template-expressions': "warn",
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692505191
    "no-use-before-define": "off",
    '@typescript-eslint/no-use-before-define': "warn",
    'react/no-unescaped-entities': "warn",
    // '@typescript-eslint/prefer-nullish-coalesce': "warn",

    // just too many of them in legacy code
    '@typescript-eslint/strict-boolean-expressions': "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "react/prop-types": "off",

    // @manu, how to change this?
    "multiline-ternary": ["error", "always-multiline"],

    // remove duplicate
    'no-unused-vars': ['off'],
  },
  ignorePatterns: ['.eslintrc.js']
  // settings: {
  //   react: {
  //     version: 'detect', // React version. "detect" automatically picks the version you have installed.
  //     // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
  //     // default to latest and warns if missing
  //     // It will default to "detect" in the future
  //   }
  // },
}
