const express = require("express")
const pool = require("../pool")
let router = express.Router()
//处理加载游戏新闻请求
router.get("/news", (req, res) => {
    var sql = "select gid,title,content,addr,sm_img from jz.games,jz.imgs where imgId = iid and gid IN (select gameId from jz.news)";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result)
        res.send(result)
    })
})
//处理加载banner请求
router.get("/banner", (req, res) => {
    var sql = "select bid,img,addr from jz.banner"
    pool.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result)
        res.send(result)
    })
})
//处理游戏展示请求
router.get("/game", (req, res) => {
    var sql = "select gname,origin,simName,gstate,md_img from games,imgs where imgId = iid"
    pool.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

module.exports = router