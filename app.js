const PORT = process.env.PORT;
const express = require("express");
const app = express();

// 今回追加（ここから）

app.set('view engine','ejs'); // ejsを使うための決まり文句
app.use('/',require("./routes/index.js")); // ルーティング処理をroutes以下のフォルダで行うように設定

// 今回追加（ここまで）

// サーバー起動
app.listen(PORT,()=>{
    console.log(`Application listening at ${PORT}`);
});