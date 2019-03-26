{
    // nologin()
    console.log("chongzhi.js文件已加载")
    //在页面加载完成后调用定义好的方法
    window.onload = function () {
        heightLight()
        zhichong()
        nologin()
        // smallLogin()
    }
    //定义一个方法为导航条添加高亮显示效果
    function heightLight() {
        var nav = document.getElementById("nav")
        var heightLight = document.getElementById("heightLight")
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
}
