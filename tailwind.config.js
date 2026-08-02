/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './main.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Open Sans"', 'sans-serif']
            },
            colors: {
                killerz: {
                    bg: '#000',
                    accent: '#009ed4',
                    cyan: '#00ffff'
                }
            }
        }
    },
    plugins: []
};
