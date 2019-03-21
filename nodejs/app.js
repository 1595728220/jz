const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require("cors")
const loadRouter = require("./routes/load")
const userRouter = require("./routes/user")
let app = express()
app.use(cookieParser("12345"))
app.use(cors({
    origin: 'http://127.0.0.1:5500',    //控制响应头Access-Control-Allow-Origin
    credentials: true, //控制响应头Access-Control-Allow-Credentials
    //这一项是为了跨域专门设置的
}))
app.use(session({
    secret:"12345",
    resave:false,
    saveUninitialized:true
}))
app.use("/load",loadRouter)
app.use("/user",userRouter)

app.listen(8080)