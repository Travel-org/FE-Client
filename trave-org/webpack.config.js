const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const mode = process.env.NODE_ENV || "development";

dotenv.config();

module.exports = {
  mode,
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  entry: {
    app: path.join(__dirname, "index.tsx"),
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@atoms": path.resolve(__dirname, "src/components/atoms"),
      "@organisms": path.resolve(__dirname, "src/components/organisms"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      publicPath: "/",
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};