var mysql = require('mysql')
// ADMIN PASSWORD P@ssw0rd

var connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || "localhost",
  user: process.env.RDS_USERNAME || "root",
  password: process.env.RDS_PASSWORD || "",
  database: process.env.RDS_DATABASE || "thesis",
  port: process.env.RDS_PORT || "3306"
});


async function connectNOW() {
  return new Promise(async (resolve, reject) => {
    var open = (await connection.state) == "authenticated";
    if (!open) {
      connection.connect(function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }
  });
}

function query(statement) {
  return new Promise(async (resolve, reject) => {
    await connection.beginTransaction();
    try {
      await connection.query(statement, async function (err, rows) {
        if (err) {
          await connection.rollback();
          reject(err.message);
        }
        console.log("mysql: ", rows);
        await connection.commit();
        resolve(rows);
      });
    } catch (error) {
      await connection.rollback();
      connection.end()
      reject(error.message);
    }
  });
}

module.exports = {
  query,
  connectNOW,
  connection
};