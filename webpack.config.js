module.exports = {
  entry: './browser/react/index.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react' ]
        }
      }
    ]
  }
}
