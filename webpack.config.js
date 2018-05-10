// webpack.config.js

require('require-yaml');

var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var settings = require('./settings.yml');
// console.log(settings.map(function(setting) { return setting.title}))
module.exports = {
  entry: {
    app   : ['./src/js/app.js', './src/css/app.sass'],
    index : ['./src/js/index.js', './src/css/index.sass']
  },
  output: {
    path       : path.resolve(__dirname, 'dist'),
    publicPath : '/',
    filename   : 'js/[name].bundle.js'
  },
  module: {
    loaders: [{
      test   : /\.pug$/,
      loader : 'pug?pretty'
    }, {
      test   : /\.sass$/,
      loader : ExtractTextPlugin.extract('style', 'css!sass', {
        publicPath: '/'
      })
    }, {
      test   : /\.(jpg|png|gif)$/,
      loader : 'file?name=[name].[ext]&outputPath=img/'
    }]
  },
  plugins: settings.map(function(setting) {
    return new HtmlWebpackPlugin({
      template       : 'src/' + setting.file + '.pug',
      filename       : setting.file + '.html',
      title          : setting.title,
      meta           : setting.meta,
      chunks         : setting.chunks,
      chunksSortMode : 'none'
    })
  }).concat([
    new CleanWebpackPlugin(['dist'], {
      root    : __dirname,
      verbose : true,
      dry     : false,
      exclude : 'lib'
    }),
    new ExtractTextPlugin('css/[name].css', {allChunks: true})
  ])
};
