const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MinifyHtmlWebpackPlugin = require('minify-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');




module.exports = {
    mode: 'development',
    devtool: 'false', // Disable default "eval" due to browser restrictions
    entry: {
        background: './src/js/controllers/background/backgroundController.js',
        content: './src/js/controllers/content/contentController.js',
        'content.frameInjector': './src/js/controllers/content.frameInjector/frameInjectorController.js',
        options: './src/js/controllers/options/optionsController.js',
        popup: './src/js/controllers/popupController.js',
        backendApp: './src/js/controllers/backendApp.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MinifyHtmlWebpackPlugin({
            src: './src/html',
            dest: './dist/html',
            rules: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                minifyJS: true,
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/manifest.json'),
                    to: path.resolve(__dirname, './dist'),
                },
                {
                    from: '*',
                    to: path.resolve(__dirname, './dist/img'),
                    context: 'src/img/used',
                },
                {
                    from: '**/*',
                    to: path.resolve(__dirname, './dist/fonts'),
                    context: 'src/fonts/',
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '../css/[name].css',
        }),
    ]
};