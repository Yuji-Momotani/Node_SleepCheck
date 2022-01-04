const PORT = process.env.PORT;
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const app = express();


app.set('view engine','ejs');
app.disable("x-powered-by");


// 静的コンテンツの配信
app.use("/public",express.static(path.join(__dirname,"public")));

// アクセスログ
app.use(accesslogger());

// 動的コンテンツの配信
app.use('/',require("./routes/index.js"));

// アプリケーションログ
app.use(applicationlogger());

// サーバー起動
app.listen(PORT,()=>{
    logger.application.info(`Application listening at ${PORT}`);
});