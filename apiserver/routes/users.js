const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenkey = "thesis2020BG9";

const Result = require('../responses/result');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const mysql = require('../dbconfig/mysql');
const authorized = require('../middleware/authorization').authorized;

router.get('/users', (req, res) => {
    var result = new Result()
    try {
        var usernamei = req.body.username;
        var passwordi = req.body.password;
        var queryStatement = `call thesis.usersGet();`;
        mysql.query(queryStatement).then((resp) => {
            if (resp[0] == null) {
                result.error = true
                result.message = "Username not found."
                return res.json({ result })
            }
            result.error = false
            result.message = "lsit of users"
            result.body = resp
            return res.json({ result })

        }).catch((err) => {
            result.error = true
            result.message = err;
            return res.json({ result })
        })
    } catch (err) {
        result.error = true
        result.message = err;
        res.json({ result })
    }
})

router.get('/test/:username', (req, res) => {
    var result = new Result();
    try {
        var usernamei = req.params.username
        mysql.query(`call thesis.usersGetByUN('${usernamei}')`).then(resp => {
            result.message = "sp is working"
            result.body = resp[0]
            return res.json({ result })
        }).catch(err => {
            result.message = err.message
            return res.json({ result })
        })
    } catch (error) {
        result.message = error.message
        return res.json({ result })
    }
})

router.get('/allusers', authorized, async (req, res) => {
    var result = new Result()
    try {
        var queryStatement = 'SELECT * FROM users';
        mysql.query(queryStatement).then((resp) => {
            result.error = false
            result.message = "List of all users."
            result.body = resp;
            res.json({ result })
        }).catch((err) => {
            result.error = true
            result.message = err;
            res.json({ result })
        })

    } catch (err) {
        result.error = true
        result.message = err;
        res.json({ result })
    }
})

router.get("/users/:id", authorized, async (req, res) => {
    var result = new Result();
    try {
        var id = req.params.id;
        var queryStatement = `SELECT * FROM users where userid = '${id}'`;
        mysql
            .query(queryStatement)
            .then(resp => {
                result.message = "User Retrieve By ID";
                result.body = resp[0];
                res.json({ result });
            })
            .catch(err => {
                result.error = true;
                result.message = err;
                res.json({ result });
            });
    } catch (err) {
        result.error = true;
        result.message = err;
        res.json({ result });
    }
});

router.put("/users", async (req, res) => {
    var result = new Result();
    try {
        var user = req.body;
        if (user.isdefaultpass == true) {
            user.password = bcrypt.hashSync(user.password, 10);
        }
        // var queryStatement = ` CALL userUpdate('${user.username}','${user.role}','${user.firstname}',
        //'${user.lastname}', '${user.password}','${user.mobileno}', '${user.address}','${user.isdefaultpass}','${user.isActive}', '${user.updatedID}');`
        var updateStatement = `UPDATE users SET username='${user.username}',role='${user.role}',firstname='${user.firstname}'
        ,lastname='${user.lastname}',mobileno='${user.mobileno}',password='${user.password}',address='${user.address}',isActive='${user.isActive}',isdefaultpass='${user.isdefaultpass}'
        WHERE userid = '${user.updatedID}';`
        mysql
            .query(updateStatement)
            .then(resp => {
                // resp = resp[0];
                console.log("response", resp.affectedRows)
                if (resp.changedRows == 0) {
                    result.error = true;
                    result.message = "User's unsuccessfully updated.";
                    return res.json({ result });
                }
                result.message = "User's successfully updated.";
                result.body = resp;
                return res.json({ result });
            })
            .catch(err => {
                result.error = true;
                result.message = err;
                result.body = null;
                return res.json({ result });
            });
    } catch (err) {
        result.error = true;
        result.message = err;
        return res.json({ result });
    }
});


router.post('/users/mobileno', (req, res) => {
    var result = new Result()
    console.log("RESPONSE: ", req.body)
    try {
        var lower = req.body.lowerLimit;
        var upper = req.body.upperLimit;
        var queryStatement = `call getMobileNo('${lower}','${upper}');`;
        mysql.query(queryStatement).then((resp) => {
            console.log("RESPONSE: ", resp)
            if (resp[0] == null) {
                result.error = true
                result.message = "Mobile is not Existing"
                return res.json({ result })
            }
            result.error = false
            result.message = "list of Mobile Number"
            result.body = resp
            return res.json({ result })

        }).catch((err) => {
            result.error = true
            result.message = err;
            return res.json({ result })
        })
    } catch (err) {
        result.error = true
        result.message = err;
        res.json({ result })
    }
})


router.delete("/users/:userid", async (req, res) => {
    var result = new Result();
    try {
        var id = req.params.userid;
        console.log("id: ", id);
        var queryStatement = `DELETE FROM users WHERE userid = '${id}'`;

        mysql
            .query(queryStatement)
            .then(resp => {
                if (resp.affectedRows < 1) {
                    result.error = true;
                    result.message = "User unsuccessfully deleted.";
                    return res.json({ result });
                }
                result.message = "User successfully deleted.";
                result.body = resp;
                return res.json({ result });
            })
            .catch(err => {
                result.error = true;
                result.message = err;
                result.body = null;
                return res.json({ result });
            });
    } catch (err) {
        result.error = true;
        result.message = err;
        return res.json({ result });
    }
});

router.put("/user-update", (req, res) => {
    var result = new Result();
    var pool = req.app.get('pool');
    let user = req.body
    var updateStatement = `UPDATE users SET mobileno='${user.mobileno}',address='${user.address}' WHERE userid = '${user.userid}';`
    pool.query(updateStatement, resp => {
        if (resp.error) {
            return res.json(resp)
        } else {
            if (resp.body.affectedRows < 1) {
                result.error = true
                result.message = "Failed to update."
                return res.json({ result })
            }
            result.error = false
            result.message = "Details successfully updated."
            return res.json({ result })
        }

    })
})

router.get("/transaction-track/:id", (req, res) => {
    var result = new Result();
    var pool = req.app.get('pool');
    var updateStatement = `call thesis.GetTransactionTrack(${req.params.id});`
    pool.query(updateStatement, resp => {
        if (resp.error) {
            return res.json(resp)
        } else {
            result.error = false
            result.message = "List of Transactions."
            result.body = resp.body[0]
            return res.json({ result })
        }

    })
})

router.put("/customers", (req, res) => {
    var result = new Result();
    var pool = req.app.get('pool');
    var updateStatement = `call thesis.GetTransactionTrack(${req.params.id});`
    pool.query(updateStatement, resp => {
        if (resp.error) {
            return res.json(resp)
        } else {
            result.error = false
            result.message = "List of Transactions."
            result.body = resp.body[0]
            return res.json({ result })
        }

    })
})

router.put("/user/update-profile", (req, res) => {
    var result = new Result();
    var pool = req.app.get('pool');
    let data = req.body
    var updateStatement = `call thesis.userUpdateProfile(${data.id}, '${data.username}', '${data.firstname}', '${data.lastname}', '${data.gender}', '${data.mobileno}', '${data.address}', '${data.birthdate}');`
    pool.query(updateStatement, resp => {
        if (resp.error) {
            return res.json(resp)
        } else {
            getToken(data.username, tokenBody => {
                result.error = false
                result.message = "Update profile."
                result.body = tokenBody.body
                return res.json({ result })
            })

        }

    })
})

router.put("/user/update-profile-pic", (req, res) => {
    var result = new Result();
    var pool = req.app.get('pool');
    let data = req.body
    var updateStatement = `call thesis.userUpdateProfilePIC(${data.id}, '${data.url}');`
    pool.query(updateStatement, resp => {
        if (resp.error) {
            return res.json(resp)
        } else {
            result.error = false
            result.message = "Update profile picture."
            result.body = resp.body[0]
            return res.json({ result })
        }

    })
})

function getToken(username, callback) {
    var result = new Result()
    let query = `call thesis.usersGetByUN('${username}');`
    mysql
        .query(query)
        .then(resp => {
            if (resp[0][0]._error) {
                result.error = true;
                result.message = "Something went wrong."
                callback(result);
            }
            var user = resp[0][0];
            user.birthdate.setDate(user.birthdate.getDate() + 1);
            var acc_token = jwt.sign({
                user
            }, tokenkey, {
                    expiresIn: "12h"
                });
            result.message = "Authenticated successfully.";
            result.body = {
                token: acc_token,
                user: user
            };
            callback(result);
        })
        .catch(err => {
            result.error = true;
            result.message = err;
            callback(result);
        });
}

module.exports = router;