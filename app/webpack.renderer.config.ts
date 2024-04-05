module.exports = {
	mode: "development",
	entry: "./src/renderer/index.ts",
	target: "electron-renderer",
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|woff|woff2)$/i,
				type: "asset/resource",
			},
		],
	},
};
