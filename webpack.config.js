const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './js/index.js',
	output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "scripts.js",
  },
  module: {
    rules: [
        {
            test: /.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['es2015']
            },
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: "sass-loader"
              }
            ],
            // use style-loader in development
            fallback: "style-loader"
          }),
        }
    ]
  },
    plugins: [
      new ExtractTextPlugin({
          filename: "styles.css",
      }),
    ],
}
