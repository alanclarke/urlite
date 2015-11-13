module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [ 'test/**/test-*' ],
    preprocessors: { 'test/**/test-*': ['webpack', 'sourcemap'] },
    webpack: {
      watch: true,
      devtool: 'inline-source-map'
    },
    webpackServer: {
      quiet: true,
      noInfo: true
    },
    browsers: ['Chrome']
  })
}
