//定义访问session的方法，参数回调
function getSession(callback){
    get("http://127.0.0.1:8080/session").then(callback)
}
// 定义函数检查session
function checkSession(){
    // get("http://127.0.0.1:8080/session").then(callback)
    getSession(callback)
    function callback(result){
        console.log(result)
        if(result.code === "-1"){
        //    alert("将跳转登陆")
        //    setTimeout(()=>{
            location.href = "/login.html"
        //    },1000)            
        }else{
            console.log("用户已登陆")
        }
    }
}
//定义函数清空session
function sessionLogout(){
    // button.onclick = ()=>{
        get("http://127.0.0.1:8080/logout").then(function(result){
            console.log(result.msg)
            history.go(0)
        })
        
    // }
}
//定义一个免登陆的方法，需要有一个id为qiehuan的标签作为容器
function nologin() {
    getSession(switchLogin)
    function switchLogin(result) {
        var qiehuan = document.getElementById("qiehuan")
        console.log(result)
        if (result.code === "-1") {
            //未登陆  
            qiehuan.innerHTML = `<span class="cp" id="toLogin">登陆充值中心</span>`
        } else {
            //已登陆
            qiehuan.innerHTML = `<span>${result.msg},欢迎回来~</span>
            <span class="cp" id="toLogout" onclick="sessionLogout()")">退出登陆</span>
             `
            //  logout()
        }
    }
}