var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var webpack = require("webpack");

module.exports = {
	entry: './js/index.js',
	output: {
        path: './',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test:   /.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
}
