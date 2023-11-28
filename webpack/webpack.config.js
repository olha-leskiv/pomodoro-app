const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = (envVars) => {
    const { env } = envVars
    const envConfig = require = require(`./webpack.${env}.js`)
    const config = merge(commonConfig, envConfig)
    return config
}