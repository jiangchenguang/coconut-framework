const path = require('path');

const config = {
  mode: 'production',
  entry: './src/.coco/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
                [
                  '@babel/plugin-transform-react-jsx',
                  {
                    runtime: 'automatic',
                    importSource: 'coco-mvc',
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/dist'),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8000,
  },
};

module.exports = config;
