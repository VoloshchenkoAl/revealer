module.exports = {
    'ignorePatterns': ["docs/revealer.js", 'node_modules/'],
    'plugins': [
        'cypress'
    ],
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:cypress/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
