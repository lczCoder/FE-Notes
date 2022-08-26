const path = require('path');
const {CleanWebpackPlugin} =require('clean-webpack-plugin') 
module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          path.resolve(__dirname, 'loaders/a.loader.js'),
          path.resolve(__dirname, 'loaders/b.loader.js')
        ],
      },
    ]
  },
  plugins:[
    new CleanWebpackPlugin()
  ],
  mode:'none',

}