var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: path.join(__dirname, 'src'),
	devtool: debug ? 'inline-sourcemap' : false,
	entry: './js/client.jsx',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: [ 'react', 'es2015', 'stage-0' ],
					plugins: [ 'react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties' ],
				},
			},
			{
				test: /\.scss$/,
				exclude: /(node_modules|bower_components)/,
				loader: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	output: {
		path: `${__dirname}/build/`,
		filename: 'client.min.js',
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
	},
	plugins: debug ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	],
};
