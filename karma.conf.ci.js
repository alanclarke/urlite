const karmaConfig = require('./karma.conf')
const customLaunchers = {
  ChromeCustom: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox']
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest'
  },
  sl_ios_safari_10: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '10.0'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  sl_android: {
    base: 'SauceLabs',
    browserName: 'Browser',
    platform: 'Android',
    version: '6.0',
    deviceName: 'Android Emulator'
  }
}

module.exports = function (config) {
  karmaConfig({
    set: function setter (baseConfig) {
      config.set(sauceConfig(baseConfig))
    }
  })
}

function sauceConfig (baseConfig) {
  return Object.assign({}, baseConfig, {
    sauceLabs: { testName: 'urlite' },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['progress', 'saucelabs'],
    coverageReporter: null
  })
}
