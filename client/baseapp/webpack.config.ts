module.exports = {
		mode: 'production',
	entry: './app.js',
	output: {
		libraryTarget: "var", //"var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
		filename: 'bundle.js'
	},
	target: "node",
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