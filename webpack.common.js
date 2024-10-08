const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");
const Webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

require("dotenv").config({
  path: path.resolve(".env"),
});

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "dist/*")],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
          globOptions: {
            ignore: ["**/images/heros/**"],
          },
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: "./sw.bundle.js",
      runtimeCaching: [
        {
          urlPattern: ({ url }) =>
            url.href.startsWith("https://restaurant-api.dicoding.dev"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "restaurant-api",
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith(
              "https://restaurant-api.dicoding.dev/images/large/"
            ),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "restaurant-api-image",
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "static-images",
          },
        },
      ],
    }),

    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "report.html",
    }),
  ],
};
