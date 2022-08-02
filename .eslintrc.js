module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:@angular-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: [
      './tsconfig.json',
      'projects/core/tsconfig.lib.json',
      'projects/core/tsconfig.lib.prod.json',
      'projects/core/tsconfig.spec.json',
      'projects/demo/tsconfig.app.json',
      'projects/demo/tsconfig.spec.json',
    ],
  },
  rules: {
    '@angular-eslint/component-selector': ['error', { type: 'element', style: 'kebab-case' }],
    '@angular-eslint/component-class-suffix': [
      'error',
      {
        suffixes: ['Page', 'Component'],
      },
    ],
    '@angular-eslint/directive-selector': ['error', { type: 'attribute', style: 'camelCase' }],
    '@angular-eslint/no-input-rename': 'off',
    '@angular-eslint/no-output-native': 'off',
    '@typescript-eslint/semi': 'error',
    'max-len': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      plugins: ['import'],
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      rules: {
        '@angular-eslint/no-output-on-prefix': 'off',
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
          },
        ],
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/unbound-method': 'off',
        'import/no-deprecated': 'off',
        'import/order': [
          'warn',
          {
            groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
            pathGroups: [
              { pattern: '@environment', group: 'parent', position: 'before' },
              { pattern: '@/**', group: 'parent', position: 'after' },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: false },
          },
        ],
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0 }],
        'no-shadow': [
          'warn',
          {
            hoist: 'all',
          },
        ],
        'no-console': [
          'warn',
          {
            allow: [
              'warn',
              'time',
              'timeEnd',
              'timeLog',
              'trace',
              'clear',
              'count',
              'countReset',
              'group',
              'groupEnd',
              'table',
              'dirxml',
              'error',
              'groupCollapsed',
              'profile',
              'profileEnd',
              'timeStamp',
            ],
          },
        ],
      },
    },
    {
      files: ['*.component.html'],
      parser: '@angular-eslint/template-parser',
      plugins: ['@angular-eslint', '@angular-eslint/template'],
      rules: {
        '@angular-eslint/template/banana-in-box': 'error',
        '@angular-eslint/template/cyclomatic-complexity': 'off',
        '@angular-eslint/template/no-negated-async': 'error',
        '@angular-eslint/template/i18n': 'off',
      },
    },
  ],
};
