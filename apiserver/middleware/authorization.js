//axios.defaults.headers.common['Authorization'] = acc_token

const jwt = require("jsonwebtoken");
const tokenkey = "thesis2020BG9";
var Result = require('../responses/result')

function authorized(req, res, next) {
    const token = req.headers.authorization;
    var result = new Result()
    if (token) {
        jwt.verify(token, tokenkey, (err, user) => {
            if (err) {
                result.error = true
                result.message = "You are forbidden."
                return res.json({ result });
            }
            req.user = user;
            next();
        });
    } else {
        result.error = true
        result.message = "You are not authenticated."
        return res.json({ result });
    }
};



module.exports = {
    authorized
}