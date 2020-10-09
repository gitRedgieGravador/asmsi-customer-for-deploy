const configureAPI = require('./apiserver/configure')
const express = require('express')
const app = express()
module.exports = {
    "transpileDependencies": [
        "vuetify",
        "vue-tel-input-vuetify"
    ],
    devServer: {
        port: 3232,
        before: configureAPI.bind(app)
    }
}