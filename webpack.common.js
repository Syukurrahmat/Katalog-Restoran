const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const ImageminMozjpeg = require('imagemin-mozjpeg')
const { InjectManifest } = require('workbox-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src/scripts/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { postcssOptions: { plugins: ['autoprefixer'] } }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]

            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/templates/index.html'),
            filename: 'index.html',
            favicon: 'src/public/favicon.png'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/public/assets/'),
                to: path.resolve(__dirname, 'dist/assets/')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new WebpackPwaManifest({
            name: 'Luwe App',
            short_name: 'Luwe',
            description: 'Aplikasi permudah cari restoran favoritmu',
            background_color: '#ffffff',
            start_url: '/',
            lang: 'id-ID',
            theme_color: 'white',
            publicPath: '/',
            scope: '.',
            ios: true,
            inject: true,
            fingerprints: false,
            icons: [{
                src: path.resolve('src/public/favicon.png'),
                sizes: [72, 128, 144, 152, 192, 384, 512],
                type: 'image/png'
            }]
        }),
        new InjectManifest({
            swSrc: './src/scripts/sw.js'
        }),
        new ImageminWebpackPlugin({
            plugins: [
                ImageminMozjpeg({
                    quality: 80,
                    progressive: true
                }),
            ]
        }),
        new ImageminWebpWebpackPlugin({
            config: [
                {
                    test: /(assets\/images).*(\.(jpe?g|png))/,
                    options: {
                        quality: 80
                    }
                }
            ],
            overrideExtension: true,
        })
    ],
}
