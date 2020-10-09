var url = require("./serviceConfig").base;
const http = require("axios");

function getProducts() {
  return new Promise((resolve, reject) => {
    try {
      http
        .get(`${url}/products`)
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

function getProductById(id) {
  return new Promise((resolve, reject) => {
    try {
      http
        .get(`${url}/products/${id}`)
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

function addProduct(products) {
  return new Promise((resolve, reject) => {
    try {
      http
        .post(`${url}/products`, products)
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

function deleteProduct(productid) {
  return new Promise((resolve, reject) => {
    try {
      http
        .delete(`${url}/products/${productid}`)
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

function updateProduct(products) {
  return new Promise((resolve, reject) => {
    try {
      http
        .put(`${url}/products`, products)
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

function getCategories() {
  return new Promise((resolve, reject) => {
    try {
      http
        .get(`${url}/categories`)
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

function addCategory(category) {
  return new Promise((resolve, reject) => {
    try {
      http
        .post(`${url}/categories`, category)
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

function search(search) {
  return new Promise((resolve, reject) => {
    try {
      http
        .post(`${url}/search`, { search: search })
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

function searchbychar(search) {
  return new Promise((resolve, reject) => {
    try {
      http
        .post(`${url}/searchbychar`, { search: search })
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
module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getCategories,
  addCategory,
  search,
  searchbychar
};
