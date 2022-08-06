module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@next/next/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'react-hooks',
        'jsx-a11y',
        'import',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': 0,
        'semi': [
            'error',
            'never'
        ],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        'react-hooks/exhaustive-deps': 0,
        'quotes': 0,
        'curly': 0,
        'no-extra-boolean-cast': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'react/react-in-jsx-scope': 0,
    }
}
