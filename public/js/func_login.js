function func_login(){
    button.onclick = function (e) {
        e.preventDefault();
        console.log("按钮被点击")
        var name = uname.value;
        var pwd = upwd.value;
        var check_value = check.checked;
        var Reg = /^\w{6,12}$/

        if (!Reg.test(name)) {
            alert("用户名格式不正确")
            uname.value = null
            return
        }
        if (!Reg.test(pwd)) {
            alert("密码格式不正确")
            upwd.value = null
            return
        }
        // console.log(check_value)
        console.log(name, pwd)
        get(`http://127.0.0.1:8080/login?uname=${name}&upwd=${pwd}`).then(function (result) {
            if (result.code === 1) {
                alert(result.msg)
                if (check_value) {
                    localStorage.setItem("uname", name)
                    localStorage.setItem("check", check)
                } else {
                    localStorage.clear();
                }
                upwd.value = null
                window.location.href = "index.html"
            } else {
                alert(result.msg)
                upwd.value = null
                uname.value = null
            }
        })

    }
}