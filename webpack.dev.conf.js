const webpack =  require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: `development`
})

// module.exports = new Promise((resolve, reject) => {
//   resolve(devWebpackConfig)
// })
module.exports = devWebpackConfig;
