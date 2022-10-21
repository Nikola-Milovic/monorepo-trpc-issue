/* eslint-disable @typescript-eslint/no-var-requires */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

const { i18n } = require("./next-i18next.config");

const withTM = require("next-transpile-modules")(["@company/frontend-shared"]);

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    env,
    swcMinify: true,
    //TODO
    reactStrictMode: true,
    i18n,
    //TODO
    eslint: {
      ignoreDuringBuilds: true,
    },
    compiler: {
      removeConsole: isProd ? { exclude: ["error"] } : false,
    },
    experimental: {
      forceSwcTransforms: true,
    },
    webpack: (config, options) => {
      config.watchOptions = {
        ignored: /node_modules/,
      };

      config.module.rules.push({
        test: /\.pdf$/,
        issuer: /\.tsx?$/,
        use: [
          "next-swc-loader",
          {
            loader: "swc-loader",
            options: {
              babel: false,
              name: "*.pdf",
            },
          },
        ],
      });

      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.tsx?$/,
        include: [options.dir],
        use: [
          "next-swc-loader",
          {
            loader: "@svgr/webpack",
            options: { babel: false },
          },
        ],
      });

      return config;
    },
  };

  return withTM(nextConfig);
};
