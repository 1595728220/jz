{
    // console.log("js文件加载完成")
    //调用定义好的方法
    window.onload = function () {
        login()
        register()
        submit()
        otherJump()
    }
    //设置按钮点击登录
    function login() {
        var checkElement = document.getElementById("check")
        var button = document.getElementById("btnFinish")
        uname.value = localStorage.getItem("uname")
        checkElement.checked = localStorage.getItem("check")
        //直接调用封装好的验证登录方法
        func_login(button,successLogin,checkElement)
    }
    //设置点击去注册弹出注册
    function register() {
        var go = document.getElementById("goto")
        // console.log(form)
        go.onclick = function (e) {
            //展开注册框
            var register = document.getElementById("register")
            register.style.width = ""
            var loginArea = document.getElementById("loginArea")
            loginArea.style.width = "0"
        }
    }
    //设置点击提交注册信息
    function submit() {
        //为完成注册按钮绑定单击事件
        btn.onclick = function (e) {
            e.preventDefault
            var list = form.children
            var len = list.length;
            var data = {}
            var nameStr
            var url = "/user/register?"
            // 循环遍历数组，取出表单内的值
            for (var i = 0; i < len; i++) {
                if (list[i].nodeName === "INPUT") {
                    nameStr = list[i].name.toString()
                    //检查表单内数据是否为空，为空重新注册
                    if (list[i].value === "") {
                        my_alert("请完善注册信息")
                        return
                    }
                    data[nameStr] = list[i].value
                    //检查两次密码输入是否一致，不一致提示并清空再次输入密码
                    if (nameStr === "repet") {
                        if (data.upwd !== data.repet) {
                            my_alert("两次密码输入不一致，请重新输入")
                            list[i].value = ""
                            return
                        }
                    }
                    url += nameStr + "=" + list[i].value + "&"
                }
                // 取出raio中的值
                if (list[i].className === "gender fl") {
                    if (list[i].children[0].checked) {
                        nameStr = list[i].children[0].name.toString()
                        data[nameStr] = list[i].children[0].value
                        url += nameStr + "=" + list[i].children[0].value
                    }
                }
            }
            //发送注册请求
            get(url).then(function (res) {
                if (res.code === 1) {
                    var register = document.getElementById("register")
                    register.style.width = "0"
                    loginArea.style.width = ""
                    my_alert(res.msg)
                } else {
                    my_alert(res.msg + "，请重新填写注册信息")
                }
                for (var i = 0; i < len; i++) {
                    if (list[i].nodeName === "INPUT") {
                        list[i].value = ""
                    }
                }
            })
        }
    }
    //其他登录界面跳转需注册时
    function otherJump(){
        var loc = location.href;
        var n = loc.indexOf("=")
        if(n !== -1){
            var register = document.getElementById("register")
            var loginArea = document.getElementById("loginArea")
            register.style.width = ""
            loginArea.style.width = "0px";
        }
    }
    //登陆成功后要执行的方法
    function successLogin(sign) {
        setTimeout(() => {
            if(sign) location.href = "/person.html"
        },3000)
    }
}
