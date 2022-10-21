/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["hr", "en"],
        react: { useSuspense: false },
        localePath: path.resolve("./public/locales"),
    },
};
