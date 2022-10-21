const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        '../../packages/frontend-shared/src/components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
        extend: {
            maxWidth: {
                "4/5": "80%",
                "3/4": "75%",
            },
            colors: {
                "primary-base": "#955ca6",
                "primary-lighter": "#b075c1",
                success: "#0AB39C",
                danger: "#E94E1B",
                warning: "#F7B84B",
                "placeholder-gray": "#7C8F98",
                turquish: "#5BC8AF",
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar-hide"),
        require("@tailwindcss/line-clamp"),
    ],
};
