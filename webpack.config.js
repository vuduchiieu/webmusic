const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "umd",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "media/",
              esModule: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ogg|mp3|wav)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "media/",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "public", "manifest.json"),
          to: path.join(__dirname, "build"),
        },
        {
          from: path.join(__dirname, "public", "logo192.png"),
          to: path.join(__dirname, "build"),
        },
        {
          from: path.join(__dirname, "public", "logo512.png"),
          to: path.join(__dirname, "build"),
        },
        {
          from: path.join(__dirname, "public", "preview.png"),
          to: path.join(__dirname, "build"),
        },
        {
          from: path.join(__dirname, "public", "robots.txt"),
          to: path.join(__dirname, "build"),
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
