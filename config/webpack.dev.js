const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
module.exports = webpackMerge(commonConfig, {
    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        disableHostCheck: true
    }
});