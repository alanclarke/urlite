module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: ['test/test*'],
    preprocessors: { '/**/*.js': ['webpack', 'sourcemap'] },
    webpackMiddleware: {
      stats: 'errors-only',
      logLevel: 'error'
    },
    webpack: {
      mode: 'development',
      watch: true,
      devtool: 'inline-source-map'
    },
    browsers: ['Chrome']
  })
}
