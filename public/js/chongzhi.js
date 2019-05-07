{
    // console.log("chongzhi.js文件已加载")
    //定义一个方法为导航条添加高亮显示效果
    let heightLight = function () {
        //获取导航条元素
        var nav = document.getElementById("nav")
        //获取滑动的小方块
        var heightLight = document.getElementById("heightLight")
        //为导航条绑定事件监听，监听鼠标进入导航条事件
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
            //将隐藏的图层覆盖原图层
            if (e.target.dataset.game === "top") {
                e.target.previousElementSibling.style.top = "0px"
            }
        })
        game.addEventListener("mouseout", e => {
            e.preventDefault
            //显示原图层，隐藏原来显示的图层
            if (e.target.dataset.game === "top") {
                e.target.previousElementSibling.style.top = "257px"
            }
        })
    }
    //在页面加载完成后调用定义好的方法
    window.onload = function () {
        heightLight()
        zhichong()
        nologin()
    }
}
