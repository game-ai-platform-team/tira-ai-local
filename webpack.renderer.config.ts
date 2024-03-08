module.exports = {
    mode: 'development',
    entry: './src/renderer/index.ts',
    target: "electron-renderer",
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }]
    }
};