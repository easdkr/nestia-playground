/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // CUSTOMIZE HERE
  entry: {
    server: './apps/api/src/main.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  optimization: {
    minimize: true,
  },
  // JUST KEEP THEM
  externals: [nodeExternals()],
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /test/],
        options: {
          configFile: 'apps/api/tsconfig.app.json',
        },
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@api': path.resolve(__dirname, 'apps/api/src'),
      '@common/configs': path.resolve(__dirname, 'libs/configs/src'),
      '@common/prisma': path.resolve(__dirname, 'libs/prisma/src'),
    },
  },
};
