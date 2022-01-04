const log4js = require("log4js");//log4jsの読み込み
const config = require("../../config/log4js.config");//log4js用のconfigファイルを読み込む

var console, application,access;

log4js.configure(config);//configの設定

// Console Logger(デフォルトなので、引数はなしでOK)
console = log4js.getLogger();

// Application Logger
application = log4js.getLogger("application");

// Access logger
access = log4js.getLogger("access");

module.exports ={
    console,
    application,
    access
}