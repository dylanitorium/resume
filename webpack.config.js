const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: './src/index.js',
	output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "scripts.js",
  },
  module: {
    rules: [
        {
            test: /.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['es2015', 'react']
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
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        },
        {
          test: /\.(png|svg)$/,
          include: [
            path.resolve(__dirname, "src/images"),
          ],
          loader: 'file-loader?name=images/[name].[ext]'
        }
    ]
  },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Dylan Sweetensen - PHP / JS Engineer',
        template: 'src/templates/index.html'
      }),
      new ExtractTextPlugin({
          filename: "styles.css",
      }),
    ],
}
