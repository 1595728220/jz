0.该项目中遇到的问题
    ①免登陆功能 后端服务器使用session存储已登录的用户信息，但在前后端交互的过程中，能够成功登录但是无法操作session读取记录。 问题归因于默认情况下跨域请求浏览器不会携带凭证信息（cookie, ssl证明等），服务器设置的cookie也会被浏览器拦截。需要在请求之前将withCredentials 设为true。
    修改get.js文件在xhr.open后请求前设置xhr.withCredentials = true;修改后端的响应头在cors模块中添加参数credentials: true，问题得以解决
1.本项目是一个游戏类的网站，本网站中使用原生的Js，未引入任何第三方框架、库
2.项目的目录结构为
    .../jz 存放一个web服务器
        /nodejs 存放一个web后台服务器
        /pubic 存放html文件
            /asets  存放项目中使用的图片文件
            /css    存放项编写的css文件
            /js     存放项编写的js文件
3.数据库的建立
    分析项目中的逻辑结构，构建了以下表
        | banne  | 
            用于保存首页轮播图的图片名称，以及需要链接到的页面地址
        | games  |
            用于保存本网站所有的游戏信息，图片的名称需要到imgs中查询
        | imgs   |
            用于保存本网站的游戏所对应的图片名称信息
        | news   |
            用于保存本网站需要发布的游戏新闻信息，游戏的具体信息需要到gmaes中查询
        | user   |
            用于保存注册的用户信息 可用于测试的用户名密码：dangdang,123456
4.后台web服务器
    使用了express,pool,cors模块，设置访问的端口号为8080，只允许本机5500端口跨域访问
    以下请求地址
        /news
            接收查询游戏新闻的请求，返回游戏新闻json格式数据
        /banner
            接收查询首页轮播图的请求，返回图片信息的Json格式数据
        /login
            接收验证登陆的请求，根据请求的参数查询数据库，使用session存储登陆成功后的用户信息，返回登陆状态的json格式信息
        /register
            接收注册的请求，进行格式验证，通过则插入数据库中，返回注册状态的json格式信息
        /game
            接收查询游戏展示的请求，返回要展示的游戏信息json格式数据
        /session
            接收查询当前服务器端session的存储情况并返回一个json格式数据
        /logout
            接收登出请求删除服务器端存储的session，并返回完成消息
5.前端静态资源服务器
    使用express模块中的static方法指定静态资源存放在public文件夹下，并设置访问的端口为5500
6.静态页面
    首页模块            index 
    页尾模块            footer 
    页头模块            header 
    登陆模块            login 
    充值模块            chongzhi 
    个人中心模块         person 
    客服模块             service 
    关于我们模块         about

        
        
