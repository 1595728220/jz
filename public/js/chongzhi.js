(() => {
    nologin()
    console.log("chongzhi.js文件已加载")
    //在页面加载完成后调用定义好的方法
    window.onload = function () {
        heightLight()
        zhichong()
        show_login()
        login()
        // logout()
    }
    //定义一个方法为导航条添加高亮显示效果
    function heightLight() {
        var nav = document.getElementById("nav")
        var heightLight = document.getElementById("heightLight")
        // console.log(nav)
        nav.addEventListener("mouseover", e => {
            e.preventDefault
            if (e.target.dataset.raise === "left") {
                heightLight.style.left = "350px"
            }
            if (e.target.dataset.raise === "right") {
                heightLight.style.left = ""
            }
        })
    }
    //定义一个方法为直冲的游戏添加鼠标悬停事件
    function zhichong() {
        //获取该区块的父元素（最外元素）
        var game = document.getElementById("game")
        //利用冒泡为子元素添加鼠标悬停事件
        game.addEventListener("mouseover", e => {
            e.preventDefault
            if (e.target.dataset.game === "top") {
                e.target.previousElementSibling.style.top = "0px"
            }
        })
        game.addEventListener("mouseout", e => {
            e.preventDefault
            if (e.target.dataset.game === "top") {
                e.target.previousElementSibling.style.top = "257px"
            }
        })
    }
    //定义登陆的方法
    function login() {
        var button = document.getElementById("button")
        var uname = document.getElementById("uname")
        var upwd = document.getElementById("upwd")
        var loginForm = document.getElementById("loginForm")
        // console.log(button, uname, upwd)
        func_login(button, successLogin)
    }
    //展开登陆窗口的方法
    function show_login() {
        //获取展示和关闭按钮的元素
        var toLogin = document.getElementById("toLogin")
        var closeLogin = document.getElementById("closeLogin")
        var loginForm = document.getElementById("loginForm")
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
    //成功登陆后要执行的方法
    function successLogin(sign) {
        if (sign) {
            loginForm.style.width = "0"
            loginForm.style.height = "0"
            history.go(0)
        }
    }
    // //定义退出登陆的方法
    // function logout(){
    //     var toLogout = document.getElementById("toLogout")
    //     console.log(toLogout)
    //     sessionLogout(toLogout)
    // }
})();
