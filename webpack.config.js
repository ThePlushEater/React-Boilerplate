var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var Settings = require('./src/constraints/settings.json');
var HistoryApiFallback = require('connect-history-api-fallback')

var BUILD_DIR = path.resolve(__dirname, './dist');
var APP_DIR = path.resolve(__dirname, './src/client');
var MODULES_DIR = path.resolve(__dirname, './node_modules');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

var config = {
  entry: {
    'client': path.join(APP_DIR, './client.js')
  },
  output: {
    path: path.join(BUILD_DIR, "./js/"),
    filename: '[name]-bundle.js'
  },
  watch: true,
  plugins: [
    definePlugin,
    new BrowserSyncPlugin({
      host: process.env.IP + Settings.uBaseNameForWebPack || 'localhost' + Settings.uBaseNameForWebPack,
      port: process.env.PORT || 3000,
      open: true,
      server: {
        baseDir: "./",
        middleware: [ HistoryApiFallback() ]
      }
      // proxy: 'http://localhost' + Settings.uBaseNameForWebPack
    }),
    new webpack.ProvidePlugin({
      // 'createjs': 'imports?this=>global!exports?createjs!createjs',
    })
  ],
  resolve: {
    // Absolute path that contains modules
    root: __dirname,
    // Directory names to be searched for modules
    modulesDirectories: ['libraries', 'node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      // 'createjs' : path.join(__dirname, './libraries/createjs.js')
    }
  },
  module : {
    loaders : [
      { test: /\.json$/, loader: 'json' },
      { test: /\.jsx?/, include: APP_DIR, exclude: MODULES_DIR, loader: 'babel' },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
    ]
  }
};

module.exports = config;
