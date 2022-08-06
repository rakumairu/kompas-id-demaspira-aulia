const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './pages/**/*.tsx',
        './components/**/*.tsx',
    ],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3730A3',
                    dark: '#261EA6',
                },
                secondary: {
                    DEFAULT: '#6B7280',
                    dark: '#5D6471',
                },
                gray: {
                    ...colors.gray,
                    1: '#DCDFE3',
                    2: '#F5F5F7',
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
