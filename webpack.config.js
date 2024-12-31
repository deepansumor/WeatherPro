const path = require('path');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname + "/assets/js/app.js"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js',
        libraryTarget: 'umd',                 // Universal module definition
        globalObject: "typeof self !== 'undefined' ? self : this", // Safe global object
        libraryExport: 'default',
    },
};
