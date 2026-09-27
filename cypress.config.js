import { defineConfig } from "cypress";

import webpackConfig from "./webpack.config.cjs";

export default defineConfig({
  video: false,
  component: {
    specPattern: "src/**/*.test.{js,jsx,ts,tsx}",
    supportFile: false,
    indexHtmlFile: "cypress/support/component-index.html",
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
    },
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    baseUrl: "http://localhost:3000",
  },
});
