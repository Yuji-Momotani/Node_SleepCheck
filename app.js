const IS_PRODUCTION = process.env.NODE_ENV === "production";
const appconfig = require("./config/application.config.js");
const dbconfig = require("./config/mysql.config.js");
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const accesscontrol = require("./lib/security/accesscontrol.js");
const express = require("express");
const { MySQLClient } = require("./lib/database/client.js");
const cookie = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const flash = require("connect-flash");
const app = express();

// Expressの設定
app.set('view engine','ejs');
app.disable("x-powered-by");


// 静的コンテンツの配信
app.use("/public",express.static(path.join(__dirname,"public")));

// アクセスログ
app.use(accesslogger());

// ミドルウェアの設定
app.use(cookie());
app.use(session({
    store: new MySQLStore({
        host:dbconfig.HOST,
        port:dbconfig.PORT,
        user:dbconfig.USERNAME,
        password:dbconfig.PASSWORD,
        database:dbconfig.DATABASE
    }),
    cookie:{
        secure:IS_PRODUCTION
    },
    secret: appconfig.security.SESSION_SECRET,
    resave:false,
    saveUninitialized: true,
    name: "sid"
}))
app.use(express.urlencoded({ extended: true })); //Postを読み解くために必要
app.use(flash());
app.use(...accesscontrol.initialize());


// 動的コンテンツの配信
app.use('/',require("./routes/index.js"));
app.use("/account",require("./routes/account.js"));
app.use("/test",async(req,res,next)=>{
    const sqlQuery = require("./lib/database/sql/TEST_SELECT.js").sqlQuery;
    const MySQLClient = require("./lib/database/client.js").MySQLClient;
    var data;
    try{
        data = await MySQLClient.executeQuery(sqlQuery,[1]);
        console.log(data);
    }catch(err){
        next(err);
    }
    
    res.end("OK");
});

// アプリケーションログ
app.use(applicationlogger());

// サーバー起動
app.listen(appconfig.PORT,()=>{
    logger.application.info(`Application listening at ${appconfig.PORT}`);
});