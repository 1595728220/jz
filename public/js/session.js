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