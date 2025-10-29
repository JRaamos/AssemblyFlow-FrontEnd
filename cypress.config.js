import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "cypress";
import { devServer } from "cypress-rspack-dev-server";
import { createRsbuild } from "@rsbuild/core";
import rsbuildConfig from "./rsbuild.config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aliases = {
  assets: path.resolve(__dirname, "src/assets"),
  components: path.resolve(__dirname, "src/components"),
  containers: path.resolve(__dirname, "src/containers"),
  context: path.resolve(__dirname, "src/context"),
  docs: path.resolve(__dirname, "src/docs"),
  hooks: path.resolve(__dirname, "src/hooks"),
  router: path.resolve(__dirname, "src/router"),
  screens: path.resolve(__dirname, "src/screens"),
  services: path.resolve(__dirname, "src/services"),
  ui: path.resolve(__dirname, "src/ui"),
  utils: path.resolve(__dirname, "src/utils"),
};

const projectPath = path.resolve(__dirname);
const htmlSupport = path.join(__dirname, 'cypress/support/component-index.html')

export default defineConfig({
  e2e: {
    specPattern: "src/**/*.test.{js,jsx,ts,tsx}",
    supportFile: false,
    baseUrl: "http://localhost:3000",

    async setupNodeEvents(on, config) {
      on('file:preprocessor', async (file) => {

        if (!config.projectRoot) {
          config.projectRoot = projectPath
          console.log('Defined projectRoot:', config.projectRoot)
        }
        
        if (!config.indexHtmlFile) {
          config.indexHtmlFile = htmlSupport
          console.log('Defined indexHtmlFile:', config.indexHtmlFile)
        }

        const rsbuild = await createRsbuild({ rsbuildConfig })
        const [rspackConfig] = await rsbuild.initConfigs()

        rspackConfig.resolve = rspackConfig.resolve || {}
        rspackConfig.resolve.alias = {
          ...(rspackConfig.resolve.alias || {}),
          ...aliases
        }
        rspackConfig.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', '.json']
        console.log('Aliases no devServer:', rspackConfig.resolve.alias)

        rspackConfig.module.rules.push({
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { plugins: ['istanbul'] },
          },
          enforce: 'post',
        })

        console.log('DEV-SERVER ARGS:', {
          projectRoot: config.projectRoot,
          framework: 'react',
          hasRspack: !!rspackConfig
        })

        console.log('[DEBUG] config:', config) 

        return devServer({
          file,    
          cypressConfig: { 
            ...config,
            devServerPublicPathRoute: "http://localhost:3000"
          }, // <--- CRUCIAL
          framework: 'react',
          rspackConfig,
          devServerEvents: { on: () => null }
        });

        
      })
      return config;
    },
  },
  component: {
    specPattern: "src/**/*.test.{js,jsx,ts,tsx}",
    supportFile: false,
    devServer: {
      framework: "react",
      bundler: "webpack",
      setupDevServer: async ({ devServerEvents, cypressConfig }) => {
        const rsbuild = await createRsbuild({ rsbuildConfig });
        const [rspackConfig] = await rsbuild.initConfigs();

        rspackConfig.resolve = rspackConfig.resolve || {};
        rspackConfig.resolve.alias = {
          ...(rspackConfig.resolve.alias || {}),
          ...aliases,
        };
        rspackConfig.resolve.extensions = [".js", ".jsx", ".ts", ".tsx", ".json"];

        return rspackDevServer({
          framework: "react",
          devServerEvents,
          cypressConfig,
          rspackConfig,
        });
      },
    },
  },
});
