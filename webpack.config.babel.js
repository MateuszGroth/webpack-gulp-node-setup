const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => ({
    mode: 'development',
    entry: {
        example: './src/example/index.js'
    },
    output: {
        path: path.resolve(__dirname, env.dev ? 'local-dev' : 'public'),
        filename: './[name]/index.js',
        chunkFilename: './[name]/index.chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: '2'
                                }
                            ],
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true
            })
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        ...(env.dev
            ? [
                  new CopyWebpackPlugin({
                      patterns: [
                          {
                              from: path.resolve(__dirname, './public/style'),
                              to: path.resolve(__dirname, './local-dev/style')
                          }
                      ]
                  })
              ]
            : [])
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 1512000,
        maxAssetSize: 1512000
    },

    devServer: {
        host: 'localhost',
        watchContentBase: true,
        contentBase: path.resolve(__dirname, 'local-dev'),
        historyApiFallback: true,
        stats: {
            assets: false
        }
    }
});
