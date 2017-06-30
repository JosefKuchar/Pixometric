const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
            filename: "pixometric.js",
            path: path.resolve(__dirname, "bin")
    }
}