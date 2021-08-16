'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_BASEURL: '"http://192.168.10.105:8092/"',
  API_BASEURL: '"http://192.168.31.181:8000/"',
})
