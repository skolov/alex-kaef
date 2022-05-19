const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const globImporter = require('node-sass-glob-importer')
const getLogger = require('webpack-log')
const log = getLogger({ name: 'webpack' })

const EXT = {
    HTML: '.html',
    PUG: '.pug',
}

class Path {
    static root = path.resolve(__dirname)

    static components = path.resolve(Path.root, 'components')
    static nodeModules = path.resolve(Path.root, 'node_modules')
    static layouts = path.resolve(Path.root, 'layouts')
    static js = path.resolve(Path.root, 'js')
    static entry = path.resolve(Path.js, 'main.js')
    static output = path.resolve(Path.root, 'dist')
    static pages = path.resolve(Path.root, 'pages')

    static assets = path.resolve(Path.root, 'assets')
    static images = path.resolve(Path.assets, 'images')
    static fonts = path.resolve(Path.assets, 'fonts')

    static page(file) {
        return path.resolve(Path.pages, file)
    }
}

const pages = fs.readdirSync(Path.pages).map((file) => ({
    name: path.parse(file).name + EXT.HTML,
    path: Path.page(file),
}))

if (fs.existsSync(Path.output)) {
    log.info('Чистим dist')
    fs.rmSync(Path.output, {
        recursive: true,
        force: true,
    })
}

log.info(`
    В сборке участвуют следующие страницы:
    - ${pages.map((e) => e.name).join('\n- ')}
`)

module.exports = {
    entry: Path.entry,

    stats: 'errors-only',

    watchOptions: {
        ignored: [Path.nodeModules],
    },

    output: {
        filename: 'js/bundle.js',
        path: Path.output,
    },

    resolve: {
        alias: {
            '@': Path.root,
            images: Path.images,
        },
    },

    devServer: {
        static: false,
        open: true,
        hot: true,
        liveReload: true,
        watchFiles: [Path.components, Path.layouts, Path.pages],
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                        },
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            basedir: Path.root,
                            pretty: true,
                        },
                    },
                ],
            },

            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true, // <-- !!IMPORTANT!!
                            sassOptions: {
                                importer: globImporter(),
                            },
                        },
                    },
                ],
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name].[hash][ext]',
                },
            },

            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name].[hash][ext]',
                },
            },

            {
                test: /\.svg$/,
                use: [
                    { loader: 'svg-sprite-loader', options: {} },
                    'svg-transform-loader',
                    'svgo-loader',
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        ...pages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    filename: page.name,
                    template: page.path,
                    minify: false,
                })
        ),
    ],
}