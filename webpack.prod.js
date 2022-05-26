const path = require('path'),
	basePath = __dirname,
	publicPath = 'public',
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'),
	TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/i,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
					options: {presets: ['@babel/preset-env']},
				},
			},
			{
				test: /\.pug$/i,
				use: [{loader: 'pug-loader'}],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif|webp|svg)$/,
				use: ['file-loader'],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},

	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/view/pages/index.pug',
			filename: './index.html',
			scriptLoading: 'blocking',
		}),
		new HtmlWebpackPlugin({
			template: './src/view/pages/details.pug',
			filename: './details.html',
			scriptLoading: 'blocking',
		}),
		new MiniCssExtractPlugin({
			filename: 'css/styles.css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{from: './src/assets/icons', to: 'assets/icons'},
				{from: './src/assets/image', to: 'assets/image'},
			],
		}),
	],
	// Output point
	output: {
		clean: true,
		path: path.join(basePath, publicPath),
		filename: 'js/script.js',
	},
};
