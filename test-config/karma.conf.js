var webpackConfig = require('./webpack.test.js');
module.exports = function (config) {
    var _config = {
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-mocha-reporter'),
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        files: [
            { pattern: './karma-test-shim.js', watched: false }
        ],
        preprocessors: {
            './karma-test-shim.js': ['webpack'
                , 'sourcemap'
            ]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        },
        browserConsoleLogOptions: {
            level: 'log',
            format: '%b %T: %m',
            terminal: false
        },
        reporters: config.coverage ? ['mocha', 'coverage-istanbul'] : ['mocha'],
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        // mochaReporter: {
        //     colors: {
        //         success: 'green',
        //         info: 'blue',
        //         warning: 'bgYellow',
        //         error: 'red'
        //     },
        //     symbols: {
        //         success: '+',
        //         info: '#',
        //         warning: '!',
        //         error: 'x'
        //     }
        // },
        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: false,
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--remote-debugging-port=9222',
                ]
            }
        },
        browsers: [
            'ChromeHeadless'
            //'Chrome'
        ],
        singleRun: true
    };
    config.set(_config);
};