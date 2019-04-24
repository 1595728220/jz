{
    /**
     * 
     * @param {string} msg 要显示到提示框的消息
     */
    function my_alert(msg) {
        //将消息添加到提示框
        // console.log(alert_area.parentElement)
        alert_area.innerHTML = msg
        let high = alert_area.parentElement.clientHeight, //获取父元素高度
            wid = alert_area.parentElement.clientWidth, //获取父元素宽度
            eWid = alert_area.clientWidth //获取元素宽度
        // console.log(high, wid)
        //相对于父元素宽度居中
        alert_area.style.left = (wid - eWid) / 2 + "px"
        // 相对于父元素高度居中
        alert_area.style.top = high / 2 - 30 + "px"
        //不透明
        alert_area.style.opacity = 1
        //恢复高度
        alert_area.style.height = "60px"
        //2s后提示框隐藏
        setTimeout(() => {
            alert_area.style.opacity = 0
            alert_area.style.height = "0"
        }, 2000)
    }
}
console.log("my_alert on ready")