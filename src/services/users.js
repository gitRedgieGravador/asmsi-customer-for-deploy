const url = require('./serviceConfig').base;
const http = require('axios')
/* 2 coco bread 1 ensay mada */
export default {
    getUsers() {
        return new Promise((resolve, reject) => {
            try {
                http.get(`${url}/allusers`).then((resp) => {
                    resolve(resp.data.result)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    },

    getUserById(id) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .get(`${url}/users/${id}`)
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

    addUser(users) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .post(`${url}/users`, users)
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
    updateUser(updatedUser) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .put(`${url}/users`, updatedUser)
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
    updateProfilePic(data) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .put(`${url}/user/update-profile-pic`, data)
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
    updateUserMobileAddress(updatedUser) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .put(`${url}/user-update`, updatedUser)
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
    deleteUser(userid) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .delete(`${url}/users/${userid}`)
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
    getTransactionTrack(userid) {
        return new Promise((resolve, reject) => {
            try {
                http
                    .get(`${url}/transaction-track/${userid}`)
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
    }
}
// module.exports = {
//     getUsers,
//     getUserById,
//     addUser,
//     updateUser,
//     deleteUser,
//     updateUserMobileAddress
// }