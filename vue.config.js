const TerserPlugin = require('terser-webpack-plugin');

var debug = process.env.NODE_ENV !== "production";


module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        output: {
            libraryTarget: 'system',
        },
    },
};
