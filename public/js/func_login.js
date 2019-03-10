function func_login(button,checkElement=null) {
    console.log(checkElement)
    button.onclick = function (e) {
        e.preventDefault();
        console.log("按钮被点击")
        var name = uname.value;
        var pwd = upwd.value;
        var check_value = localStorage.getItem("check");
        if(checkElement) check_value = check.checked;
        var Reg = /^\w{6,12}$/
        // console.log(check_value)
        if (!Reg.test(name)) {
            alert("用户名格式不正确")
            uname.value = null
            upwd.value = null
            return
        }
        if (!Reg.test(pwd)) {
            alert("密码格式不正确")
            uname.value = null
            upwd.value = null
            return
        }
        // console.log(check_value)
        // console.log(name, pwd)
        get(`http://127.0.0.1:8080/login?uname=${name}&upwd=${pwd}`).then(function (result) {
            if (result.code === 1) {
                console.log("登录成功")
                alert(result.msg)
                checkF(name,check_value)
                upwd.value = null
            } else {
                console.log("登录失败")
                alert(result.msg)
                checkF(name,check_value)
                upwd.value = null
            }
        })
    }
    function checkF(name,check_value){
        if (check_value) {
            localStorage.setItem("uname", name)
            localStorage.setItem("check", check_value)
        } else {
            localStorage.clear();
            localStorage.setItem("check", check_value)
            uname.value = null
        }
    }
}

