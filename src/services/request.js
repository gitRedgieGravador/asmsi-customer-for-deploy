var url = require("./serviceConfig").base;
const http = require("axios");

function get() {
  return new Promise((resolve, reject) => {
    http
      .get(`${url}`)
      .then(resp => {
        resolve(resp.data.result);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  get
};
