module.exports = {
	banner: true,
	input: 'src/index.js',
	output: {
		extractCSS: false
	},
	plugins: {
		vue: {
			css: true
		}
	}
};
