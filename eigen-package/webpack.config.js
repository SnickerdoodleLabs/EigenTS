const path = require("path");
const webpack = require("webpack"); // Make sure to import webpack

module.exports = {
  mode: "development", // or 'production', depending on your current focus
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Handles both .ts and .tsx files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // Ensure .js is handled if needed
    alias: {
      // Create an alias for 'eigen.js' if the direct path is troublesome
      eigen: path.resolve(__dirname, "src/api/eigen.js"),
    },
    fallback: {
      fs: false, // Set to false if 'fs' module is not used
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      vm: require.resolve("vm-browserify"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser", // Include this only if you need the 'process' polyfill
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true, // Consider controlling this based on 'mode'
  },
};
