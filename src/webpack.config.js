"use strict";
const path = require("path");
const webpack = require("webpack");
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

let common = {
    entry: ["babel-polyfill", "./app/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    resolve: {
        alias: {
            content: path.resolve(__dirname, "./content/")
        },
        extensions: ["*", ".js", ".jsx"],
        modules: [path.resolve(__dirname, "."), "node_modules"]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {loader: "babel-loader"}
        }, {
           test: /\.css$/,
           use: ["style-loader", "css-loader"],
        }, {
           test: /\.(png|j?g|gif)?$/,
           use: "file-loader"
        }, {
            test: /\.svg$/,
            use: "@svgr/webpack"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/Pages/MainApp/index.html",
            filename: "index.html",
            favicon: "./content/images/metro-transit-icon.png"
        }),
        new MonacoWebpackPlugin({
            languages: []
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin()]
    }
};

let build = {
    devtool: "cheap-module-source-map",
    mode: "development"
};

module.exports = merge(common, build);