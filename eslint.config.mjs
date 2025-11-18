import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

export default withNuxt({
  files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.js'],
  plugins: {
    prettier: pluginPrettier,
  },
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
      },
    ],
    'no-console': 'error',
    'vue/v-on-event-hyphenation': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        tabWidth: 4,
        trailingComma: 'none',
        useTabs: true,
        endOfLine: 'auto',
      },
    ],
    'semi-style': ['error', 'last'],
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': 'warn',
    'vue/no-reserved-component-names': 'warn',
  },
  extends: [prettier],
})
