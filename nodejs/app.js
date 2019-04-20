const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const url = require("url")
const loadRouter = require("./routes/load")
const userRouter = require("./routes/user")
let White_list = ["http://47.103.4.25:5500","http://127.0.0.1:5500","http://127.0.0.1"],
index
let app = express()
app.all("*",(req,res,next)=>{
	let ori = req.headers.origin
	index = White_list.indexOf(ori)
	//console.log("在中间件中")
	if(index === -1) index = 0
	//console.log(White_list[index])
	res.header("Access-Control-Allow-Origin", White_list[index])
	res.header("Access-Control-Allow-Credentials", true)
	next()
})
app.use(cookieParser("12345"))
app.use(session({
    secret:"12345",
    resave:false,
    saveUninitialized:true
}))
app.use("/load",loadRouter)
app.use("/user",userRouter)

app.listen(8080)