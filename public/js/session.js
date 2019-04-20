//定义访问session的方法，参数回调
function getSession(callback){
    get("/user/session").then(callback)
}
// 定义函数检查session
function checkSession(){
    getSession(callback)
    function callback(result){
        if(result.code === "-1"){
            location.href = "/login.html"
        }else{
            console.log("用户已登陆")
        }
    }
}
//定义函数清空session
function sessionLogout(){
        get("/user/logout").then(function(result){
            history.go(0)
        })
}
//定义一个免登陆的方法，需要有一个id为qiehuan的标签作为容器
function nologin() {
    getSession(switchLogin)
}
function switchLogin(result) {
    var qiehuan = document.getElementById("qiehuan")
    if (result.code === "-1") {
        //未登陆  
        qiehuan.innerHTML = `<span class="cp" id="toLogin">登陆充值中心</span>`
    } else {
        //已登陆
        qiehuan.innerHTML = `<span>亲爱的 ${result.msg},欢迎回来~</span>
        <span class="cp" id="toLogout" onclick="sessionLogout()")">退出登陆</span>
         `
    }
    smallLogin()
}
//定义一个登陆框模块,需要有一个id为loginForm的标签作为容器
function smallLogin(){
    // setTimeout(()=>{
        show_login()
        login()
    // },200)  
}
//定义登陆的方法
function login() {
    var button = document.getElementById("button")
    var uname = document.getElementById("uname")
    var upwd = document.getElementById("upwd")
    var loginForm = document.getElementById("loginForm")
    func_login(button, successLogin)
}
//成功登陆后要执行的方法
function successLogin(sign) {
    if (sign) {
        loginForm.style.width = "0"
        loginForm.style.height = "0"
        history.go(0)
    }
}
//展开登陆窗口的方法
function show_login() {
    //获取展示和关闭按钮的元素
    var loginForm = document.getElementById("loginForm")
    loginForm.innerHTML = `<img src="./asets/Cancel.png" class="fr tr" id="closeLogin">
    <h2>登陆极致通行证</h2>
    <form>
        <input type="text" class="inputStyle" placeholder="请输入账号" name="uname" id="uname">
        <input type="password" class="inputStyle" placeholder="请输入密码" name="upwd" id="upwd">
        <button class="cp" id="button">立即登陆</button>
    </form>
    <div class="text">
    <span>还没有账号？</span>
    <a href="login.html?isRegister=1">立即注册</a>
    </div>`
    var toLogin = document.getElementById("toLogin")
    var closeLogin = document.getElementById("closeLogin")
    console.log(toLogin)
    console.log(closeLogin)
    if (toLogin) {
        toLogin.onclick = function (e) {
            e.preventDefault
            loginForm.style.width = "350px"
            loginForm.style.height = "300px"
        }
    }
    if (closeLogin) {
        closeLogin.onclick = function (e) {
            e.preventDefault
            loginForm.style.width = "0";
            loginForm.style.height = "0"
        }
    }
}