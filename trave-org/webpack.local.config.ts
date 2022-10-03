import merge from "webpack-merge";
import * as webpack from 'webpack';
import 'webpack-dev-server';
import baseConfig from "./webpack.config";

const config = merge(baseConfig, {
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify("http://localhost:8080"),
      }),
    ]
  }
)

export default config;