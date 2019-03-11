//使用express设置静态资源文件在public下，设置端口号为5500
const express = require("express")
const session = require("express-session")
let app = express()
//中间件
app.use(express.static("./public"))
app.listen(5500)