const HtmlWebpackPlugin = require('html-webpack-plugin');
import * as webpack from 'webpack';
import * as path from "path";
import 'webpack-dev-server';
const mode = (process.env.NODE_ENV || "development") as "development" | "none" | "production";
const config: webpack.Configuration = {
  mode,
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
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
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: [
          "babel-loader",
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },

  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_SERVER_URL),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      publicPath: "/",
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
};
export default config;