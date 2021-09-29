// const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: `production`
})
// j(pg|peg|fif)|png|ti(f|ff)|gif|bmp
// module.exports = new Promise((resolve, reject) => {
//   resolve(devWebpackConfig)
// })
module.exports = buildWebpackConfig
