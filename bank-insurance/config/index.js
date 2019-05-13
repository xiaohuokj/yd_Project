'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    env:require('./dev.env'),
    port: 8889,
    host: 'localhost', // can be overwritten by process.env.HOST
    autoOpenBrowser: true,
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/supervise':{
           target:'http://192.168.1.244',
            //target:'http://192.168.1.166:9081',
            changeOrigin:true,
            pathRewrite:{
                '^/api': '/api'
            }
        },
        '/api':{
           target:'http://camera.ior.org.cn',
           changeOrigin:true,
           pathRewrite:{
               '^/api': ''
           }
       }
        // '/supervise-vue':{
        //    target:'http://192.168.1.250',
        //   // target:'http://192.168.1.184:9081',
        //     changeOrigin:true,
        //     pathRewrite:{
        //         '^/api': '/api'
        //     }
        // }
        // '/api': {
        //     target: '192.168.1.250:9081',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/api': ''
        //     }
        // },
        // '/v': {
        //     target: '192.168.1.250:9081',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/v': '/v'
        //     }
        // },
        // '/app': {
        //     target: '192.168.1.250:9081',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/app': '/app'
        //     }
        // }
    },
    // Various Dev Server settings

    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    env:require('./prod.env'),
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/supervise-vue/',
    assetsPublicPath: './',
    proxyTable: {
        '/supervise-vue/':{
           target:'http://192.168.1.244',
          //target:'http://192.168.1.166:9081',
            changeOrigin:true,
            pathRewrite:{
                '^/api': '/api'
            }
        },
        '/api':{
           target:'http://camera.ior.org.cn',
           changeOrigin:true,
           pathRewrite:{
               '^/api': 'http://camera.ior.org.cn'
           }
        }
    },
        // '/supervise-vue':{
        //    target:'http://192.168.1.250',
        //   // target:'http://192.168.1.184:9081',
        //     changeOrigin:true,
        //     pathRewrite:{
        //         '^/api': '/api'
        //     }
        // }
        // '/api': {
        //     target: '192.168.1.250:9081',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/api': ''
        //     }
        // },
        // '/v': {
        //     target: '192.168.1.250:9081',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/v': '/v'
        //     }
        // },
        // '/app': {
        //     target: '192.168.1.244',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/app': '/app'
        //     }
        // }
    //},

    /**tenant-admin
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
