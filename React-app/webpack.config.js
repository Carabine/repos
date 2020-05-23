const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src') + '/index.tsx'
    },
    output: {
      filename: 'bundle.[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src') + '/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    }
}