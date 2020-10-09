const url = require("./serviceConfig").base;
const http = require("axios");

http.default.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
};
export default {
    login(user) {
        return new Promise((resolve, reject) => {
            try {
                console.log("logging in..", `${url}/login`);
                http
                    .post(`${url}/login`, user)
                    .then(resp => {
                        console.log("logging in..", resp.data.result);
                        resolve(resp.data.result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } catch (error) {
                reject(error);
            }
        });
    },

    register(user) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .post(`${url}/register`, user)
                    .then(resp => {
                        resolve(resp.data.result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } catch (error) {
                reject(error);
            }
        });
    },

    verifyCode(user) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .post(`${url}/confirm`, user)
                    .then(resp => {
                        resolve(resp.data.result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } catch (error) {
                reject(error);
            }
        });
    },

    isExists(username) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .get(`${url}/is-exists/${username}`)
                    .then(resp => {
                        resolve(resp.data.result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } catch (error) {
                reject(error);
            }
        });
    },
    changePassword(data) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .post(`${url}/user/change-password`, data)
                    .then(resp => {
                        resolve(resp.data.result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } catch (error) {
                reject(error);
            }
        });
    },
    updateProfile(data) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .put(`${url}/user/update-profile`, data)
                    .then(resp => {
                        resolve(resp.data.result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } catch (error) {
                reject(error);
            }
        });
    },
}
// module.exports = {
//     login,
//     register,
//     verifyCode,
//     isExists
// };