module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue_wasm_gif_to_video/'
        : '/',
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()

        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
    }
}
