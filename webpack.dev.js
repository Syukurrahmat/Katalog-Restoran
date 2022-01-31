const { merge } = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.html$/,
            use: 'raw-loader'
        }]
    },
    mode: 'development',

    stats: {
        warningsFilter: [
            'InjectManifest'
        ],
        modules: false,
        colors: true
    }
})
