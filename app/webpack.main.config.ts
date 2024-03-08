module.exports = {
    target: "electron-main",
    mode: 'development',
    entry: './src/main.ts',

    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
        }]
    }
};