function checkSession(){
    get("http://127.0.0.1:8080/session").then(callback)
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