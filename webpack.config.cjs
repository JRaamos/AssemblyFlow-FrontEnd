const path = require('path');

module.exports = {
  mode: 'development',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['istanbul'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  devtool: 'eval-source-map',

  plugins: [],
};
