import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,css,scss}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                },
                screens: {
                    sm: "640px",
                    md: "768px",
                    lg: "768px",
                    xl: "768px",
                },
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: ["light", "dark"],
    },
}

