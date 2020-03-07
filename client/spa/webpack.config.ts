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
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    esModule: true,
                }
            },
        ],
    }
};