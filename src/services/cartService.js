const url = require("./serviceConfig").base;
const http = require("axios");

http.default.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};
export default {
  addtoCart(data) {
    return new Promise((resolve, reject) => {
      try {
        http
          .post(`${url}/cart`, data)
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

  getCart(custid) {
    return new Promise((resolve, reject) => {
      try {
        http
          .get(`${url}/cart/${custid}`)
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

  removeItem(itemid) {
    return new Promise((resolve, reject) => {
      try {
        http
          .delete(`${url}/basket/${itemid}`)
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

  setCheckout(itemid, ischeckout) {
    return new Promise((resolve, reject) => {
      try {
        http
          .put(`${url}/checkout/${itemid}/${ischeckout}`)
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
  updateQuan(itemid, quan) {
    return new Promise((resolve, reject) => {
      try {
        http
          .put(`${url}/quantity/${itemid}/${quan}`)
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
  placeOrder(userid) {
    return new Promise((resolve, reject) => {
      try {
        http
          .post(`${url}/place-order/${userid}`)
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
  // addtoCart,
  // getCart,
  // removeItem,
  // setCheckout
};
