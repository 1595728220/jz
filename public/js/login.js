(() => {
    console.log("js文件加载完成")
    //调用定义好的方法
    window.onload = function () {
        login()
        register()
        submit()
    }
    //使用canvas实现文字滚动
    function draw(square, wall, deltaTime) {
        if (deltaTime > 40) {
            deltaTime = 40
        }
        // console.log(square)
        //获取画笔对象
        var ctx = c3.getContext("2d")
        ctx.clearRect(0, 0, 430, 430)
        ctx.fillStyle = "rgba(220, 220, 220,.3)"
        ctx.fillRect(square.x, square.y, 300, 80)
        var str = "PLEASE LOGIN."
        ctx.fillStyle = "#000"
        ctx.font = "30pt sans-serif"
        ctx.textBaseline = "top"
        ctx.fillText(str, square.x + 2, square.y + 44)
        str = "WELCOME."
        ctx.fillStyle = "#000"
        ctx.font = "30pt sans-serif"
        ctx.textBaseline = "top"
        ctx.fillText(str, square.x + 2, square.y + 2)
        //如果文字触碰水平方向边界，改变角度
        if (square.x > wall.maxW || square.x < wall.minW) {
            square.alpha = Math.PI - square.alpha
        }
        //如果文字触碰竖直方向边界，改变角度
        if (square.y > wall.maxH || square.y < wall.minH) {
            square.alpha = 2 * Math.PI - square.alpha
        }
        //计算下一次的文字位置
        square.x += square.speed * deltaTime * Math.cos(square.alpha)
        square.y += square.speed * deltaTime * Math.sin(square.alpha)
        console.log(square.x, square.y, square.alpha)
    }
    //定义左侧框内文字的滚动效果
    function gundong() {
        var square = {
            x: 10,
            y: 10,
            speed: .07, //控制方块运动速度
            alpha: Math.PI / 5 //控制方块运动方向与x轴正方向夹角
        }
        var wall = {
            minH: 10,
            maxH: 280,
            minW: 10,
            maxW: 100
        }
        var lastTime = Date.now()
        var deltaTime = 0
        textLoop();
        function textLoop() {
            console.log("智能动画正在运行...")
            // console.log(square)
            var now = Date.now()
            deltaTime = now - lastTime
            lastTime = now
            draw(square, wall, deltaTime)
            requestAnimationFrame(textLoop)
            // if(square.x>wall.maxW || square.x<wall.minW){
            //     square.alpha = Math.PI-square.alpha
            // }
            // if(square.y >wall.maxH || square.y<wall.minH){
            //     square.alpha = 2*Math.PI-square.alpha
            // }
            // square.x += square.speed*deltaTime*Math.cos(square.alpha)
            // square.y += square.speed*deltaTime*Math.sin(square.alpha)

            // var left = document.getElementsByClassName("text")[0]
            // left.style.marginLeft = square.x+"px";
            // left.style.marginTop = square.y+"px";
        }
    }
    //以上两个函数未使用

    //设置按钮点击登录
    function login() {
        var check = document.getElementById("check")
        var button = document.getElementById("btnFinish")
        console.log(button)
        uname.value = localStorage.getItem("uname")
        check.checked = localStorage.getItem("check")
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
    //设置点击去注册弹出注册
    function register() {
        var go = document.getElementById("goto")
        // console.log(form)
        go.onclick = function (e) {
            //展开注册框
            var register = document.getElementById("register")
            register.style.width = ""
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
            var url = "http://127.0.0.1:8080/register?"
            // 循环遍历数组，取出表单内的值
            for (var i = 0; i < len; i++) {
                if (list[i].nodeName === "INPUT") {
                    // console.log(list[i])
                    nameStr = list[i].name.toString()
                    // console.log(nameStr)
                    //检查表单内数据是否为空，为空重新注册
                    if (list[i].value === "") {
                        alert("请完善注册信息")
                        return
                    }
                    data[nameStr] = list[i].value
                    //检查两次密码输入是否一致，不一致提示并清空再次输入密码
                    if (nameStr === "repet") {
                        if (data.upwd !== data.repet) {
                            alert("两次密码输入不一致，请重新输入")
                            list[i].value = ""
                            return
                        }
                    }
                    url += nameStr + "=" + list[i].value + "&"
                }
                // 取出raio中的值
                if (list[i].className === "gender fl") {
                    // console.log(list[i].children[0].checked)
                    if (list[i].children[0].checked) {
                        nameStr = list[i].children[0].name.toString()
                        data[nameStr] = list[i].children[0].value
                        url += nameStr + "=" + list[i].children[0].value
                    }
                }
                // console.log(url)
            }
            //发送注册请求
            get(url).then(function (res) {
                if (res.code === 1) {
                    var register = document.getElementById("register")
                    register.style.width = "0"
                    alert(res.msg)
                } else {
                    alert(res.msg + "，请重新填写注册信息")
                }
                for (var i = 0; i < len; i++) {
                    if (list[i].nodeName === "INPUT") {
                        list[i].value = ""
                    }
                }
            })
        }
    }
})();