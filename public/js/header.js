{
    //调用get函数获取头部文件代码
    get("/header.html", "text").then(function (html) {
        // console.log(`已获取到文件信息调用回调函数，传入参数html:${html.substr(0,20)}...`)
        //将头部文件代码并加载到id为div的标签中
        header.innerHTML = html
        //为列表项添加鼠标移入移出的效果
        var ul = document.getElementById("headList")
        ul.addEventListener("mouseover", e => {
            if (e.target.nodeName === 'A') {
                e.target.className = "current"
            }
        })
        ul.addEventListener("mouseout", e => {
            if (e.target.nodeName === 'A') {
                e.target.className = ""
            }
        })
        //为全目录添加点击展开列表的效果
        mulu.onclick = e => {
            if (e.target === mulu) {
                var list = e.target.children[1]
                if (list.dataset.show === "hidden") {
                    list.className = "pa show tr"
                    e.target.children[0].className = "triangle-right fr"
                    list.dataset.show = "show"
                }
                else if (list.dataset.show === "show") {
                    list.className = "pa hidden tr"
                    e.target.children[0].className = "triangle-top fr"
                    list.dataset.show = "hidden"
                }
            }
        }
        //获取id 为erwei的标签
        var erwei = document.getElementById("erwei")
        //为该标签添加鼠标移入移出事件展开/收起二维码
        erwei.onmouseover = e => {
            erwei.children[0].style.height = "160px"
        }
        erwei.onmouseout = e => {
            erwei.children[0].style.height = ""
        }
    })
}