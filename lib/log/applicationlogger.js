const logger = require("./logger.js").application;

module.exports = function(options){
    //下記4つの引数でerrが受取れる
    return function(err, req, res, next){
        logger.error(err.message);
        next(err);
    };
}