import { defineConfig } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';

export default defineConfig([
  {
    extends: [
      js.configs.recommended,
    ],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
      '@next/next': fixupPluginRules(nextPlugin)  // 修改后的插件引入方式
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest'
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always'
        }
      ],
      '@next/next/no-html-link-for-pages': 'error',  // Next.js特定规则
      '@next/next/no-img-element': 'warn'
    }
  }
]);
