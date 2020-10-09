const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenkey = "thesis2020BG9";

const Result = require("../responses/result");
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

const mysql = require("../dbconfig/mysql");
const SMS = require("../sendService")

var fetch = require("node-fetch");
router.get("/test-3", async (req, res) => {
  const url = "https://pokeapi.co/api/v2/pokemon/ditto";
  const response = await fetch(url);
  const json = await response.json();
  res.json({ json });
});

router.get("/pool", async (req, res) => {
  var pool = req.app.get('pool');
  pool.query("SELECT * FROM users;", resp => {
    if (resp.error) {
      return res.json(resp)
    } else {
      // do the logic if success then return a response.
      return res.json(resp)
    }

  })
});

router.post("/login", (req, res) => {
  var result = new Result();
  var usernamei = req.body.username;
  var passwordi = req.body.password;
  var spcall = `call usersGetByUN('${usernamei}')`;
  mysql
    .query(spcall)
    .then(resp => {
      if (resp[0][0]._error) {
        result.error = true;
        result.message = resp[0][0]._message;
        return res.json({
          result
        });
      }
      var user = resp[0][0];
      user.birthdate.setDate(user.birthdate.getDate() + 1);
      if (bcrypt.compareSync(passwordi, user.password)) {
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
        return res.json({
          result
        });
      } else {
        result.error = true;
        result.message = "Incorrect Password";
        return res.json({
          result
        });
      }
    })
    .catch(err => {
      result.error = true;
      result.message = err;
      res.json({
        result
      });
    });
});

router.post("/register", function (req, res) {
  var result = new Result()
  var random = require('../random')
  var confirmationCode = random.randomCode();
  console.log("confirmationCode: ", confirmationCode)
  var user = req.body;
  console.log(user)
  user.password = bcrypt.hashSync(user.password, 10);
  var queryStatement = `INSERT INTO users(username, role, firstname, lastname, gender, password, mobileno, address, image,isdefaultpass, pin, isConfirm, birthdate)
          value ('${user.username}','${user.role}','${user.firstname}','${user.lastname}','${user.gender}','${user.password}',
          '${user.mobileno}','${user.address}','${user.image}','${user.isdefaultpass}','${confirmationCode}','${user.isConfirm}', ${user.birthdate})`
  // var statement = `INSERT INTO users(username, role, firstname, lastname, gender, password, mobileno, address, image, isdefaultpass, pin) 
  // VALUES (''${user.username}','${user.role}','${user.firstname}','${user.lastname}','${user.gender}','${user.password}',
  // '${user.mobileno}','${user.address}','${user.image}','${user.isdefaultpass}','${confirmationCode}')`
  try {
    // SMS.sendSMS();
    mysql
      .query(queryStatement)
      .then(resp => {
        if (resp.affectedRows < 1) {
          result.error = true;
          result.message = "Please try again";
          result.body = {
            token: null
          };
          return res.json({
            result
          });
        }
        result.message = "Successfully Register. Please verify.";
        result.body = resp;
        result.body.code = confirmationCode
        return res.json({
          result
        });
      })
      .catch(err => {
        result.error = true;
        result.message = err;
        return res.json({
          result
        });
      });
  } catch (err) {
    result.error = true;
    result.message = err;
    return res.json({
      result
    });
  }
});

router.post("/confirm", (req, res) => {
  var result = new Result();
  var userid = req.body.userid;
  var confirmationCodei = req.body.confirmationCode;
  var queryStatement = `call verifyCode('${userid}', '${confirmationCodei}');`;
  mysql
    .query(queryStatement)
    .then(resp => {
      if (resp[0][0]._error) {
        result.error = true;
        result.message = resp[0][0]._message;
        return res.json({
          result
        });
      }
      var user = resp[0][0];
      var acc_token = jwt.sign({
        user
      }, tokenkey, {
          expiresIn: "12h"
        });
      result.message = "Verified successfully.";
      result.body = {
        token: acc_token,
        user: user
      };
      return res.json({
        result
      });
    })
    .catch(err => {
      result.error = true;
      result.message = err;
      result.body = {
        token: null
      };
      return res.json({
        result
      });
    });
});

router.get("/is-exists/:username", function (req, res) {
  var result = new Result();
  var usernamei = req.params.username;
  let statement = `select userid from users where username = '${usernamei}'`
  mysql
    .query(statement)
    .then(resp => {
      if (resp[0] == null) {
        result.error = false;
        return res.json({
          result
        });
      } else {
        result.error = true;
        result.body = resp
        return res.json({
          result
        });
      }
    })
    .catch(error => {
      console.log("error on check username.", error.message);
    });
});


router.post("/user/change-password", function (req, res) {
  var result = new Result()
  var data = req.body;
  let newpassword = bcrypt.hashSync(data.newpassword, 10);
  let updateQuery = `call thesis.changePassword('${newpassword}', ${data.id});`
  var pool = req.app.get('pool');
  pool.query(updateQuery, resp => {
    if (resp.error) {
      return res.json(resp)
    } else {
      if (resp.body.affectedRows < 1) {
        result.error = true
        result.message = "Failed to update password."
        return res.json({ result })
      }
      result.error = false
      result.message = "Password successfully updated."
      return res.json({ result })
    }
  })
})

router.get("/load", function (req, res) {
  var result = new Result()
  var random = require('../random')
  var confirmationCode = random.randomCode();
  console.log("confirmationCode: ", confirmationCode)
  var user = {
    username: "admin",
    role: "admin",
    firstname: "Super",
    lastname: "Admin",
    mobileno: "09123456789",
    password: "P@ssw0rd",
    address: "Admin Address",
    isActive: true,
    isdefaultpass: false,
    birthdate: new Date(),
    image: "default.jpg",
    isConfirm: true,
    gender: "Male"
  };
  console.log(user)
  user.password = bcrypt.hashSync(user.password, 10);
  var queryStatement = `INSERT INTO users(username, role, firstname, lastname, gender, password, mobileno, address, image,isdefaultpass, pin, isConfirm, birthdate)
          value ('${user.username}','${user.role}','${user.firstname}','${user.lastname}','${user.gender}','${user.password}',
          '${user.mobileno}','${user.address}','${user.image}','${user.isdefaultpass}','${confirmationCode}',${user.isConfirm}, ${user.birthdate})`
  try {
    mysql
      .query(queryStatement)
      .then(resp => {
        if (resp.affectedRows < 1) {
          result.error = true;
          result.message = "Please try again";
          result.body = {
            token: null
          };
          return res.json({
            result
          });
        }
        result.message = "Successfully Loaded Super Admin.";
        result.body = resp;
        result.body.code = confirmationCode
        return res.json({
          result
        });
      })
      .catch(err => {
        result.error = true;
        result.message = err;
        return res.json({
          result
        });
      });
  } catch (err) {
    result.error = true;
    result.message = err;
    return res.json({
      result
    });
  }
});


module.exports = router;