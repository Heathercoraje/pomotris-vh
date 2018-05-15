const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './public/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: './node_modules/babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|gif|jpeg|ico)$/,
				loader: 'file-loader?name=[name].[ext]'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	mode: 'development',
	watch: true
};
