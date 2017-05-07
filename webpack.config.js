const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const VENDOR_LIBS=[
    'jquery'
];

module.exports = {
    entry:{
        bundle: './app/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options:{
                            limit:40000
                        }
                    },
                    {
                        loader:'image-webpack-loader',
                        options:{
                        }
                    }
                ]
            }
        ],
    },
    devtool: 'source-map',
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
    ]
};