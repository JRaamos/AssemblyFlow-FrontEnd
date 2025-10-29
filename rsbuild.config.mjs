import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [pluginReact({
    jsxRuntime: 'automatic',
  })],
  resolve: {
    resolveBaseUrl: './src',
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      context: path.resolve(__dirname, 'src/context'),
      docs: path.resolve(__dirname, 'src/docs'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      router: path.resolve(__dirname, 'src/router'),
      screens: path.resolve(__dirname, 'src/screens'),
      services: path.resolve(__dirname, 'src/services'),
      ui: path.resolve(__dirname, 'src/ui'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  tools: {
    webpack: (config) => {
      config.resolve = config.resolve || {};
      config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', '.json'];
    },
    htmlPlugin: (config) => {
      config.template = path.resolve(__dirname, 'public/index.html');
      config.inject = 'body';
      return config;
    },
  }
});
