const mysql = require('mysql');
var Result = require("../responses/result");
var result = new Result();
class MySql {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.RDS_HOSTNAME || "localhost",
            user: process.env.RDS_USERNAME || "root",
            password: process.env.RDS_PASSWORD || "",
            database: process.env.RDS_DATABASE || "thesis",
            port: process.env.RDS_PORT || "3306"
        });
    }
    setDatabase(config) {
        this.pool = mysql.createPool(config);
    }
    query(statement, callback) {
        try {
            this.pool.getConnection(function (err, connection) {
                if (err) {
                    result.error = true
                    result.message = err.message
                    result.body = err
                    callback(result)
                    return;
                }
                connection.query(statement, function (err, results) {
                    connection.release();
                    if (err) {
                        result.error = true
                        result.message = err.message
                        result.body = err
                        callback(result)
                        return;
                    }
                    result.error = false
                    result.message = "Success"
                    result.body = results
                    callback(result)
                });
            });
        } catch (err) {
            result.error = true
            result.message = err.message
            result.body = err
            callback(result)
            return;
        }
    };
}

module.exports = MySql;