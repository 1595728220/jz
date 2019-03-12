(() => {
    //调用定义好的方法加载页面中的内容
    window.onload = function () {
        loadNews()
        loadImgs()
        loadGame()
        shock()
    }
    //定义的方法如下：
    //轮播图的整体函数
    function loadImgs() {
        //调用封装好的get函数请求数据,函数的返回值为promise对象，可以通过在then方法里写回调函数获得请求得到的数据
        get("http://127.0.0.1:8080/banner")
            //在then方法中写入带参的回调函数，并返回一个promise对象
            .then(function (data) {
                // console.log(data)
                return banner(data)
            })
            //在then方法中写入不带参的回调函数，返回一个方法
            .then(function () {
                return newBanner()
            })
    }
    //定义函数实现将数据显示到视图，并挂载对应的标签到dom树上，返回一个promise对象
    function banner(res) {
        return new Promise(function (resolve, reject) {
            //将第一张图复制到数组末尾
            res[res.length] = res[0]
            //定义要加载的html文本字符串
            var html = "";
            //定义修改后的的数组长度
            var length = res.length;
            //for循环遍历数据数组并拼接到相应的html标签中
            for (var i of res) {
                html += `<a href="${i.addr}" style="">
                <img src="${i.img}" alt="" class="fixWidth">
                </a>`
            }
            //挂载到dom树上
            imgs.innerHTML = html;
            //设置外层用于包裹图片的父元素的宽度
            imgs.style.width = 1500 * length + "px";
            //将修改后的数据数组的长度赋值给自定义扩展属性length
            imgs.dataset.length = length;
            resolve()
        })
    }

    //智能动画实现轮播
    function newBanner() {
        console.log("正在轮播中")
        //设置父元素相对定位
        imgs.className = "pr"
        //记录智能动画未开始的时间节点
        var lastTime = new Date()
        //定义智能动画执行的间隔
        var deltaTime = 0
        //通过自定义扩展属性length获取数据数组的长度
        var length = imgs.dataset.length
        //定义播放的速度
        var speed = 3
        //定义智能动画的唯一标识
        var timer
        //定义绝对定位的left属性值
        var left = 0
        //定义当前图片的下标
        var n = 0
        //定义每张图片的累积边界值
        var juli = 1500
        //定义何时该等待执行智能动画，0表示等待，1表示直接执行
        var sign = 0
        //定义父元素的宽度
        var totalWidth = parseInt(imgs.style.width)
        //调用智能动画的封装后的方法
        smartLoop()
        //调用click为小圆点添加事件监听
        click()
        //该方法封装了智能动画
        function smartLoop() {
            //定义开始执行时的时间节点
            var now = new Date()
            //计算中间的时间间隔
            deltaTime = now - lastTime
            if (sign === 1) {
                lunbo()
                requestAnimationFrame(smartLoop)
            } else {
                //当图片到达边界点时，等待3秒继续
                timer = setTimeout(function () {
                    lunbo()
                    sign = 1
                    requestAnimationFrame(smartLoop)
                }, 3000)
            }
        }
        //轮播实现的方法
        function lunbo() {
            //如果累计的边界不小于父元素的宽度，那么重置参数
            if (juli >= totalWidth) {
                juli = 1500
                left = 0
                n = 0
            }
            //限制时间间隔在40ms以内
            if (deltaTime > 40) {
                deltaTime = 40
            }
            //计算left属性值
            left -= speed * deltaTime
            //left属性超出累积的边界值时，将left属性值规范化，并计算新的累积边界值，
            if (-left > juli) {
                sign = 0
                n++
                left = -juli
                juli = 1500 * (n + 1)
            }
            //调用setClass方法对下标除n外的元素清除样式类，并为下标为n的元素添加current样式,特殊的n=7时返回0
            setClass(n < length - 1 ? n : 0)
            //将属性值添加到父元素的style属性中
            imgs.style.left = left + "px"
        }
        //实现点击小圆点切换图片
        function click() {
            //获取小圆点的父元素
            var div = document.getElementsByClassName("round")[0]
            // 获取小圆点的元素的数组
            var length = div.children.length
            //利用冒泡为小圆点添加点击事件
            div.addEventListener("click", e => {
                //获取标签名为i的元素
                if (e.target.nodeName === "I") {
                    //如果定时器在运行，停止定时器
                    clearTimeout(timer)
                    //为点击的元素添加定义好的类样式
                    e.target.className = "current"
                    //取得被点击元素的下标值
                    n = parseInt(e.target.dataset.index)
                    //控制等待3s后进行轮播
                    sign = 0
                    //改变参数与点击的元素下标相适应
                    left = -1500 * n
                    juli = 1500 * (n + 1)
                    //调用setClass方法对下标除n外的元素清除样式类，并为下标为n的元素添加current样式,特殊的n=7时返回0
                    setClass(n < length ? n : 0)
                    //将修改后的属性赋给父元素
                    imgs.style.left = left + "px"
                    //继续动画循环
                    smartLoop()
                }
            })
        }
        function setClass(index) {
            var iList = document.getElementById("round").children
            for (var i = 0; i < iList.length; i++) {
                if (i !== index) {
                    iList[i].className = ""
                } else {
                    iList[i].className = "current"
                }
            }
        }
    }
    //加载游戏列表
    function loadGame() {
        get("http://127.0.0.1:8080/game")
            .then(function (res) {
                return game(res)
            }).then(showGame)

    }
    //定义函数实现将游戏数据显示到视图，返回promise对象
    function game(res) {
        return new Promise(function (resolve, reject) {
            var html = ""
            var len = res.length
            var gameList = document.getElementById("gameList")
            for (var i = 0; i < len; i++) {
                html += `<li class="${res[i].simName} ${res[i].gstate} pr fl">
                <a>
                    <p class="front pa">
                        <span class="name pa">
                            ${res[i].gname}
                            <em>${res[i].origin}</em>
                        </span>
                        <span></span>
                    </p>
                    <p class="back pa" style="overflow: hidden;top:200px;height:0px" data-p="back"></p>
                    <i class="pa"></i>
                </a>
                <div class="detail tr" data-div="detail">
                    <span>${res[i].gname}</span>
                    <hr>
                </div>
            </li>`
            }
            gameList.innerHTML = html
            resolve()
        })
    }
    //设置点击按钮滑动游戏列表
    function showGame() {
        //获取Id为gameList的元素的子元素数组
        var liList = gameList.children
        //定义子元素的个数
        var len = liList.length
        //描述最左侧元素的下标
        var count = 0
        // 设置鼠标移入时的效果
        gameList.addEventListener("mouseover", function (e) {
            //为gameList下的P元素添加鼠标移入事件
            if (e.target.nodeName === "P") {
                //阻止事件的默认行为
                e.preventDefault();
                // 将触发事件的元素的下一个兄弟元素的style属性值清空
                e.target.parentElement
                    .children[1].style = ""
            }
        })
        //设置鼠标移出时恢复效果
        gameList.addEventListener("mouseout", function (e) {
            if (e.target.nodeName === "P") {
                //鼠标移入时恢复style里的值
                e.target.parentElement
                    .children[1].style = "overflow: hidden;top:200px;height:0px"
            }
        })
        //设置点击切换图片
        games.addEventListener("click", function (e) {
            if (e.target.nodeName === "I") {
                if (e.target.dataset.page === "next") {
                    //向右按钮
                    if (count !== 2)
                        count++
                    gameList.style.marginLeft = -366 * count + "px";

                }
                if (e.target.dataset.page === "prev") {
                    //向左按钮
                    if (count !== 0)
                        count--
                    gameList.style.marginLeft = -366 * count + "px"

                }
            }
        })
        //设置点击详情弹出窗口
        games.addEventListener("click", function (e) {
            e.preventDefault;
            if (e.target.dataset.p === "back") {
                var div = e.target.parentElement.parentElement.children[1]
                div.style.width = "1200px"
                div.style.height = "600px"
            }
        })
        games.addEventListener("mouseout", function (e) {
            if (e.target.dataset.div === "detail") {
                e.target.style.width = "0px"
                e.target.style.height = "0px"
            }
        })
    }
    // 加载新闻列表
    function loadNews() {
        get("http://127.0.0.1:8080/news").then(function (res) {
            return news(res)
        }).then(border)
    }
    //加载新闻的方法
    function news(res){
        return new Promise(function(resolve,reject){
            var html = "<h2>+游戏资讯</h2>"
        var length = res.length
        var news = document.getElementById("news")
        for (var i of res) {
            html += `<div class="pr">
            <p class="pic fl pr">
                <a href="${i.addr}" target="_blank"><img src="asets/${i.sm_img}"></a>
                <b data-line="one" class="pa one tr"></b>
                <b data-line="two" class="pa two tr"></b>
                <b data-line="three" class="pa three tr"></b>
                <b data-line="four" class="pa four tr"></b>       
            </p>
            <p class="headline tc">${i.title}</p>
            <p class="brief pr">
                <span>${i.content}</span>
                <a href="${i.addr}" class="more pa" target="_blank">
                    查看详情
                </a>
            </p>
            <i class="lt pa"></i>
            <i class="rb pa"></i>
        </div>`
        }
        news.innerHTML = html
        resolve(res)
        })
    }
    //定义新闻图片鼠标悬停的边框效果
    function border(){
        var news = document.getElementById("news")
        news.addEventListener("mouseover",function(e){
            e.preventDefault
            if(e.target.nodeName === "IMG"){
                var list = e.target.parentElement.parentElement.children
                var one = list[1]
                var two = list[2]
                var three = list[3]
                var four = list[4]
                one.style.width = "231px"
                four.style.height = "120px"
                three.style.width = "231px"
                two.style.height = "121px"
            }
        })
        news.addEventListener("mouseout",function(e){
            e.preventDefault
            if(e.target.nodeName === "IMG"){
                var list = e.target.parentElement.parentElement.children
                var one = list[1]
                var two = list[2]
                var three = list[3]
                var four = list[4]
                one.style.width = "0px"
                four.style.height = "0px"
                three.style.width = "0px"
                two.style.height = "0px"
            }
        })
    }
    //添加电话摇晃效果
    function shock(){
        var eventArea = document.getElementById("eventArea")
        eventArea.onmouseenter = e=>{
            e.preventDefault
            e.target.nextElementSibling.style.animation = "turn 1.5s linear infinite"
        }
        eventArea.onmouseleave = e=>{
            e.target.nextElementSibling.style.animation = ""
        }
    }
})();
