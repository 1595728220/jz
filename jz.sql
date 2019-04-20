set names utf8;
drop database if exists jz;
create database jz charset=UTF8;
use jz;
create table user(
    uid int primary key auto_increment,
    uname varchar(32),
    upwd varchar(32),
    email varchar(64),
    phone varchar(16),
    gender tinyint
); 
insert into user values(null,"dangdang","123456","dangdang@qq.com","15057391911","0");
insert into user values(null,"dongdong","123456","dongdong@qq.com","15057391911","0");
insert into user values(null,"qiangqiang","123456","qiangqiang@qq.com","15057391911","1");
insert into user values(null,"zhuangzhuang","123456","zhuangzhuang@qq.com","15057391911","0");
insert into user values(null,"dingding","123456","dingding@qq.com","15057391911","1");
create table news(
    nid int primary key auto_increment,
    gameId int
);
insert into news values(null,1);
insert into news values(null,2);
insert into news values(null,3);

create table banner(
    bid int primary key auto_increment,
    img varchar(128),
    addr varchar(128)
);
insert into banner values(null,"asets/20160527013826358.jpg","http://us.jzyx.com/news/detail/144.html");
insert into banner values(null,"asets/20180403092202595.jpg","http://df.jzyx.com/");
insert into banner values(null,"asets/20180428032243248.jpg","http://game.jzyx.com/jzmy");
insert into banner values(null,"asets/20180712052317135.jpg","http://shop.jzyx.com");
insert into banner values(null,"asets/20180426055306757.jpg","http://mx.jzyx.com/");
insert into banner values(null,"asets/20181224011048752.jpg","http://dy.jzyx.com/home/");
insert into banner values(null,"asets/20180905095228251.jpg","http://jgyx.qq.com/bbc/");
create table games(
    gid int primary key auto_increment,
    gname varchar(16),
    title varchar(64),
    content varchar(128),
    addr varchar(64),
    imgId varchar(64),
    origin varchar(8),
    simName varchar(8),
    gstate varchar(8),
    videoName varchar(64)
);
insert into games values(null,"文明大爆炸","《文明大爆炸》极光独代 今日首发","超有趣的养肝护发休闲手游，一起来开创文明进程吧！","https://jgyx.qq.com/bbc/",3,"手游","bbc","hot","song_mv_1.mp4");
insert into games values(null,"魔侠传","《魔侠传》十年经典 专注PK","激情PK网游《魔侠传》火爆公测，带你回归最经典的热血战斗时代！","http://mx.jzyx.com/",2,"端游","mx","new","song_mv_2.mp4");
insert into games values(null,"道友请留步","《道友请留步》颠覆修仙 今日公测","极致游戏最火爆的修仙手游《道友请留步》火爆公测进行中！","http://dy.jzyx.com/home/",1,"手游","dy","new","song_mv_3.mp4");
insert into games(gname,imgId,origin,simName,gstate,videoName) values("决战荣耀",4,"手机页游","jzmy","hot","song_mv_4.mp4");
insert into games(gname,imgId,origin,simName,gstate,videoName) values("巫神归来",5,"端游","df","new","song_mv_5.mp4");
create table imgs(
    iid int primary key auto_increment,
    sm_img varchar(128),
    md_img varchar(128)
);
insert into imgs values(null,"20170626035647895.jpg","games-dy.jpg"); #道友
insert into imgs values(null,"20170420104517250.jpg","games-mx.jpg"); #魔侠
insert into imgs values(null,"20180905081756612.png","games-bbc.jpg"); #文明大爆炸
insert into imgs values(null,null,"games-jzmy.jpg");  #决战荣耀
insert into imgs values(null,null,"games-dy.jpg"); #巫神归来
