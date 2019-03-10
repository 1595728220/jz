const express = require('express');
// const mysql = require('mysql');
// let pool = mysql.createPool({user:'root'})
const pool = require("./pool");
let app = express();
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("X-Powered-By", "3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
//处理加载游戏新闻请求
app.get("/news", (req, res) => {
    var sql = "select gid,title,content,addr,sm_img from jz.games,jz.imgs where imgId = iid and gid IN (select gameId from jz.news)";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(result)
    })
})
//处理加载banner请求
app.get("/banner", (req, res) => {
    var sql = "select bid,img,addr from jz.banner"
    pool.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(result)
    })
})
//处理登陆请求
app.get("/login", (req, res) => {
    var uname = req.query.uname
    var upwd = req.query.upwd;
    var Reg = /^\w{6,12}$/
    if (!Reg.test(uname)) {
        res.send({ code: -1, msg: "用户名格式错误" })
    }
    if (!Reg.test(upwd)) {
        res.send({ code: -2, msg: "密码格式错误" })
    }
    var sql = `select uid from jz.user where uname = ? and upwd = ?`
    pool.query(sql, [uname, upwd], (err, result) => {
        if (err) throw err
        if (result.length === 0) {
            res.send({ code: -3, msg: "用户名或密码错误" })
        } else {
            res.send({ code: 1, msg: "登录成功" })
        }
    })
})
//处理注册请求
app.get("/register", (req, res) => {
    var { uname, upwd, phone, email, gender } = req.query
    var Reg = /^\w{6,12}$/
    if (!Reg.test(uname)) {
        res.send({ code: -2, msg: "用户名格式错误" })
    }
    if (!Reg.test(upwd)) {
        res.send({ code: -3, msg: "密码格式错误" })
    }
    var sql = "select uid from jz.user where uname = ? "
    // console.log(uname)
    pool.query(sql, [uname], (err, result) => {
        if (err) throw err
        console.log(result)
        if (result.length === 1) {
            res.send({ code: -1, msg: "用户名已经存在" })
        } else {
            sql = "insert into jz.user values(null,?,?,?,?,?)"
            pool.query(sql, [uname, upwd, phone, email, gender], (err, result) => {
                if (err) throw err
                console.log(result)
                if (result.affectedRows > 0) {
                    res.send({ code: 1, msg: "注册成功" })
                } else {
                    res.send({ code: -2, msg: "注册失败" })
                }
            })
        }
    })
})
//处理游戏展示请求
app.get("/game", (req, res) => {
    var sql = "select gname,origin,simName,gstate,md_img from games,imgs where imgId = iid"
    pool.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })

})
app.listen(8080)