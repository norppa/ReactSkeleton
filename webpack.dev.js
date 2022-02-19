const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    output: {
        publicPath: '/'

    },
    mode: 'development',
    devServer: {
        historyApiFallback: true
    },
})