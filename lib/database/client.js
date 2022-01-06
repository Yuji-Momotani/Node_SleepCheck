const pool = require("./pool.js");
const MySQLClient = {
    executeQuery:async function(query, values){
        var result = await pool.executeQuery(query,values);
        return result;
    }
}

module.exports = {
    MySQLClient
}