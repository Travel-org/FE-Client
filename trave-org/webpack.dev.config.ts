import merge from "webpack-merge";
import * as webpack from 'webpack';
import 'webpack-dev-server';
import baseConfig from "./webpack.config";

const config = merge(baseConfig, {
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify("https://api.dev.travely.guide"),
      }),
    ]
  }
)

export default config;