const http = require('axios')

var url = require('./serviceConfig').base;

var uplink = 'https://mk3zk3iufi.execute-api.us-east-1.amazonaws.com/dev/upload'
    //var hello = 'https://mk3zk3iufi.execute-api.us-east-1.amazonaws.com/dev/hello-world'
    // http.defaults.headers = {
    //     "Content-Type": "form-data",
    //     authorization: localStorage.getItem('token') || null
    // }

function image(file) {
    return new Promise((resolve, reject) => {
        try {
            http.post(`${uplink}`, file).then((resp) => {
                resolve(resp)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

function uploadToS3(file) {
    return new Promise((resolve, reject) => {
        try {
            http.post(`${url}/api/file/upload`, file, {
                headers: {
                    'Content-Type': 'form-data'
                }
            }).then((resp) => {
                resolve(resp.data.result)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    image,
    uploadToS3
}