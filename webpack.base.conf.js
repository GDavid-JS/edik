const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

module.exports = {
    entry: toObject(glob.sync('./src/assets/js/*.js')),
    output: {
        filename: `[name].js`
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|vendor)/,
                use: [
                    {
                        loader: `babel-loader`
                    },
                    {
                        loader: `eslint-loader`
                    }
                ]
            }
        ]
    }
}

function toObject(paths) {
    const entry = {};
    paths.forEach(function(p) {
        const name = path.basename(p, '.js');
        entry[name] = p;
    });
    return entry;
}