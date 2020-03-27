module.exports = {
    entry: './app.js',
    output: {
        libraryTarget: "var",
        filename: 'bundle.js'
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.html|.glsl$/i,
                loader: 'raw-loader',
                options: {
                    esModule: true,
                }
            }
        ],
    }
};