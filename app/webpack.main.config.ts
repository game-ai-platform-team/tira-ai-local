const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

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
    },
    plugins: [
        new CopyPlugin({
            patterns:
                [
                    {
                        from: path.resolve(__dirname, "./../background-service/dist/background-service.pex")
                    }
                ]
        })
    ]
};