const express = require('express')
// const mysql = require('mysql');
// let pool = mysql.createPool({user:'root'})
const cookieParser = require('cookie-parser')
const session = require('express-session')
const pool = require("./pool")
const cors = require("cors")
let app = express()
// app.use(cookieParser("sessiontest"))
app.use(cookieParser("12345"))
app.use(cors({
    origin: 'http://127.0.0.1:5500',    //控制响应头Access-Control-Allow-Origin
    credentials: true, //控制响应头Access-Control-Allow-Credentials
    //这一项是为了跨域专门设置的
    // maxAge: '1728000'
}))

// app.all('*', function(req, res, next) {
//        res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
//          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//         res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//         res.header("Access-Control-Allow-Credentials",true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
//         next();
//     });
// // app.use(cookieParser())
app.use(session({
    secret:"12345",
    resave:false,
    saveUninitialized:true
}))
//处理加载游戏新闻请求
app.get("/news", (req, res) => {
    var sql = "select gid,title,content,addr,sm_img from jz.games,jz.imgs where imgId = iid and gid IN (select gameId from jz.news)";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result)
        res.send(result)
    })
})
//处理加载banner请求
app.get("/banner", (req, res) => {
    var sql = "select bid,img,addr from jz.banner"
    pool.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result)
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
    var sql = `select uid,uname from jz.user where uname = ? and upwd = ?`
    pool.query(sql, [uname, upwd], (err, result) => {
        if (err) throw err
        // console.log(result)
        if (result.length === 0) {
            res.send({ code: -3, msg: "用户名或密码错误" })
        } else {
            req.session.user = result[0].uname
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
app.get("/session",(req,res)=>{
    if(req.session.user === undefined) res.send({code:"-1",msg:"用户未登陆"})
    else res.send({code:"1",msg:req.session.user})
})
app.get("/logout",(req,res)=>{
    delete req.session.user
    res.send({code:1,msg:"清空session"})
})
app.listen(8080)