//用于发送get 请求,返回一个promise对象,dataType表示要接收的格式默认json，可选text
function get(url, dataType) {
    return new Promise(function (resolve, reject) {
        var res
        // 创建xhr
        var xhr = new XMLHttpRequest(); //标准创建
		if(!dataType){
			url = "http://47.103.4.25:8080" +url
		}else{
			url = "http://47.103.4.25:5500" +url	
		}
        // 创建请求
        xhr.open("get", url, true)
        xhr.withCredentials = true
        // 设置回调函数
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (!dataType)
                    res = JSON.parse(xhr.responseText);
                else if (dataType === "text")
                    res = xhr.responseText
                resolve(res)
            }
        }
        xhr.send(null)
    })
}