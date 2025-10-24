/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            colors: {
                white: '#FFFFFF',
                primary: '#17589c',
                'primary-hover': '#1e6bb8',
                'primary-active': '#134a7a',
            },
        },
    },
    plugins: [],
};
