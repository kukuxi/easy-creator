const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const projectRoot = process.cwd();

module.exports = {
    entry: {
        index: path.join(projectRoot, './src/index.js'),
    },
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: '[name]_[chunkhash:8].js',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: [{
                    loader: 'thread-loader',
                    options: {
                        worker: 3
                    }
                }, 'babel-loader'],
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer(),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        // function errorPlugin() {
        //     this.hooks.done.tap('done', (stats) => {
        //         if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
        //             console.log(stats.compilation.errors)
        //             process.exit(1);
        //         }
        //     });
        // },
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugins({
            template: path.join(projectRoot, 'src/index.html'),
            filename: 'index.html',
            chunks: ['vendors', 'index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()], // 开启并行压缩
    },
    stats: 'errors-only',
};
