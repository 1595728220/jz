const express = require("express")
const pool = require("../pool")
let router = express.Router()
//处理登陆请求
router.get("/login", (req, res) => {
    var uname = req.query.uname
    var upwd = req.query.upwd;
    var Reg = /^\w{6,12}$/
    if (!Reg.test(uname)) {
        res.send({ code: -1, msg: "用户名格式错误" })
        return
    }
    if (!Reg.test(upwd)) {
        res.send({ code: -2, msg: "密码格式错误" })
        return
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
router.get("/register", (req, res) => {
    var { uname, upwd, phone, email, gender } = req.query
    var Reg = /^\w{6,12}$/
    if (!Reg.test(uname)) {
        res.send({ code: -2, msg: "用户名格式错误" })
        return
    }
    if (!Reg.test(upwd)) {
        res.send({ code: -3, msg: "密码格式错误" })
        return
    }
    var sql = "select uid from jz.user where uname = ? "
    // console.log(uname)
    pool.query(sql, [uname], (err, result) => {
        if (err) throw err
        // console.log(result)
        if (result.length === 1) {
            res.send({ code: -1, msg: "用户名已经存在" })
        } else {
            sql = "insert into jz.user values(null,?,?,?,?,?)"
            pool.query(sql, [uname, upwd, phone, email, gender], (err, result) => {
                if (err) throw err
                // console.log(result)
                if (result.affectedRows > 0) {
                    res.send({ code: 1, msg: "注册成功" })
                } else {
                    res.send({ code: -2, msg: "注册失败" })
                }
            })
        }
    })
})
//session
router.get("/session",(req,res)=>{
    if(req.session.user === undefined) res.send({code:"-1",msg:"用户未登陆"})
    else res.send({code:"1",msg:req.session.user})
})
router.get("/logout",(req,res)=>{
    delete req.session.user
    res.send({code:1,msg:"清空session"})
})
module.exports = router