const router = require("express").Router();

// ejsではパスをview以下の相対パスで指定する。
// よって、以下で：views/index.ejs を呼び出す
router.get("/",(req,res) => {
    res.render("./index.ejs");
});

module.exports = router;