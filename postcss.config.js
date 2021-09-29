module.exports = {
    syntax: "postcss-scss",
    plugins: [
        require('stylelint')({
            configOverrides: './.stylelintrc'
        }),
        require("postcss-easy-import")({
            extensions: ".scss"
        }),
        require("autoprefixer")({
            cascade: false
        }),
        require("postcss-nested"),
        require("cssnano")(),
        require('postcss-pxtorem')({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        }),
        require('css-mqpacker')
    ]
};